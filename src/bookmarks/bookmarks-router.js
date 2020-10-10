const express = require('express')
const xss = require('xss')
const { v4: uuid } = require('uuid')
const logger = require('../logger')
const BookmarksService = require('./bookmarks-service')

const bookmarksRouter = express.Router()
const jsonParser = express.json()

const bookmarkGenerator = bookmark => ({
    id: bookmark.id,
    title: xss(bookmark.title),
    url: xss(bookmark.url),
    description: xss(bookmark.description),
    rating: Number(bookmark.rating)
})

bookmarksRouter
    .route('/bookmarks')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        BookmarksService.getAllBookmarks(knexInstance)
            .then(response => {
                res.json(response.map(bookmarkGenerator))
                })
            .catch(next)
    })
    .post(jsonParser, (req, res) => {
        const { title, url, description, rating } = req.body;
        const newItem = { title, url, description, rating }

        for (const [key, value] of Object.entries(newItem)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }

        BookmarksService.insertBookmark(
            req.app.get('db'),
            newItem
        )
            .then(item => {
                logger.info(`Bookmark with id ${item.id} created`);
                res
                    .status(201)
                    .location(`bookmarks/${item.id}`)
                    .json(bookmarkGenerator(item))
            })
    })

bookmarksRouter
    .route('/bookmarks/:id')
    .all((req, res, next) => {
        BookmarksService.getById(
            req.app.get('db'),
            req.params.id
        )
            .then(bookmark => {
                if (!bookmark) {
                    logger.error(`Bookmark with id ${req.params.id} not found.`)
                    return res.status(404).json({
                        error: { message: `Bookmark doesn't exist` }
                    })
                }
                res.bookmark = bookmark
                next()
            })
            .catch(next)
    })
    .get((req, res) => {
        res.json(bookmarkGenerator(res.bookmark))
    })
    .delete((req, res, next) => {
            BookmarksService.deleteBookmark(
                req.app.get('db'),
                req.params.id
            )
                .then(() => {
                    logger.info(`Bookmark with id ${req.params.id} deleted.`);
                    res.status(204).end()
                })
                .catch(next)
            })

module.exports = bookmarksRouter
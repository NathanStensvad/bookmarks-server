const express = require('express')
const { v4: uuid } = require('uuid')
const logger = require('../logger')
const bookmarks = require('../store')
const BookmarksService = require('../bookmarks-service')

const bookmarksRouter = express.Router()
const bodyParser = express.json()

bookmarksRouter
    .route('/bookmarks')
    /*.get((req, res) => {
        res
            .json(bookmarks);
    })*/
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        BookmarksService.getAllBookmarks(knexInstance)
            .then(response => {
                res.json(response)
            })
            .catch(next)
    })
    .post(bodyParser, (req, res) => {
        const { title, url, description, rating } = req.body;

        if (!title || !url || !description || !rating) {
            logger.error(`Title, url, description, and rating are required`);
            return res
                .status(400)
                .send('Title, url, description, and rating are required');
        }

        const id = uuid();

        const bookmark = {
            id,
            title,
            url,
            description,
            rating
        };

        bookmarks.push(bookmark);

        logger.info(`Bookmark with id ${id} created`);

        res
            .status(201)
            .location(`http://localhost:8000/bookmarks/${id}`)
            .json({ id });
    })

bookmarksRouter
    .route('/bookmarks/:id')
    /*.get((req, res) => {
        const { id } = req.params;
        const bookmark = bookmarks.find(li => li.id === id);

        if (!bookmark) {
            logger.error(`Bookmark with id ${id} not found.`);
            return res
                .status(404)
                .send('Bookmark Not Found');
        }

        res.json(bookmark);
    })*/
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        const { id } = req.params;
        BookmarksService.getById(knexInstance, id)
            .then(response => {
                if (!response) {
                    logger.error(`Bookmark with id ${id} not found.`);
                    return res
                        .status(404)
                        .send('Bookmark Not Found');
                }
                res.json(response)
            })
            .catch(next)
    })
    .delete((req, res) => {
        const { id } = req.params;

        const bookmarkIndex = bookmarks.findIndex(li => li.id == id);

        if (bookmarkIndex === -1) {
            logger.error(`Bookmark with id ${id} not found.`);
            return res
                .status(404)
                .send('Not Found');
        }

        bookmarks.splice(bookmarkIndex, 1);

        logger.info(`Bookmark with id ${id} deleted.`);
        res
            .status(204)
            .end();
    })

module.exports = bookmarksRouter
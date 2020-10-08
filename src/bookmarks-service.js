const BookmarksService = {
    getAllBookmarks(knex) {
        return knex.select('*').from('bookmark_list')
    },
    getById(knex, id) {
        return knex.from('bookmark_list').select('*').where('id', id).first()
    },
}

module.exports = BookmarksService
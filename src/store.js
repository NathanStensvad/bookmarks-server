const { v4: uuid } = require('uuid')

const bookmarks = [
    {
        id: uuid(),
        title: "Google",
        url: "https://www.google.com",
        description: "It's big search time",
        rating: 5
    },
    {
        id: uuid(),
        title: "Youtube",
        url: "https://www.youtube.com",
        description: "Where you can find funny videos and Donald Trump",
        rating: 1
    },
    {
        id: uuid(),
        title: "Github",
        url: "https://www.github.com",
        description: "Push and pull to your heart's content",
        rating: 4
    }
]

module.exports = bookmarks
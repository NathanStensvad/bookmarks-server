function makeBookmarksArray() {
    return [
        {
            id: 1,
            title: 'First Title',
            url: 'www.firsturl.com',
            description: 'This is the first description',
            rating: 2
        },
        {
            id: 2,
            title: 'Second Title',
            url: 'www.secondurl.com',
            description: 'This is the second description',
            rating: 3
        },
        {
            id: 3,
            title: 'Third Title',
            url: 'www.thirdurl.com',
            description: 'This is the third description',
            rating: 4
        },
        {
            id: 4,
            title: 'Fourth Title',
            url: 'www.fourthurl.com',
            description: 'This is the fourth description',
            rating: 5
        },
    ];
}

module.exports = {
    makeBookmarksArray,
}
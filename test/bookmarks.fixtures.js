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

function makeMaliciousBookmark() {
    const maliciousBookmark = {
      id: 911,
      title: 'Naughty naughty very naughty <script>alert("xss");</script>',
      url: 'https://www.hackers.com',
      description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
      rating: 1,
    }
    const expectedBookmark = {
      ...maliciousBookmark,
      title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
      description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
    }
    return {
        maliciousBookmark,
    expectedBookmark,
    }
}

module.exports = {
    makeBookmarksArray,
    makeMaliciousBookmark
}
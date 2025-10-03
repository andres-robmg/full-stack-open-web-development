const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {

  test('of empty list is zero', () => {
    const emptyList = []

    const result = listHelper.totalLikes(emptyList)

    assert.strictEqual(result, emptyList.length)
  })

  test('when list has only one blog equals the likes of that', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]

    const result = listHelper.totalLikes(listWithOneBlog)
    const expected = listWithOneBlog[0].likes

    assert.strictEqual(result, expected)
  })

  test('of a bigger list is calculated right', () => {
    const biggerList = [
      {
        "title": "My first blog",
        "author": "Andres Meregildo",
        "url": "https://www.google.com/?hl=es",
        "likes": 10,
        "id": "68da2c8033702c86d6682f00"
      },
      {
        "title": "My second blog",
        "author": "Andres Meregildo",
        "url": "https://www.google.com/?hl=es",
        "likes": 20,
        "id": "68da301e1856e1a55b622f35"
      },
      {
        "title": "My fourth blog",
        "author": "Andres Meregildo",
        "url": "https://www.google.com/?hl=es",
        "likes": 25,
        "id": "68da36922c9f429a76758767"
      },
      {
        "title": "My fifth blog",
        "author": "Andres Meregildo",
        "url": "https://www.google.com/?hl=es",
        "likes": 45,
        "id": "68dae6113b25b0ef74c13187"
      }
    ]

    const result = listHelper.totalLikes(biggerList)

    assert.strictEqual(result, 100)
  })
})
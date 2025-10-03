const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {

  test('returns an empty object when the blogs list is empty', () => {
    const emptyList = []

    const result = listHelper.favoriteBlog(emptyList)

    assert.deepStrictEqual(result, null)
  })

  test('returns only one favorite blog (the first) between more than 1 options', () => {
    const biggerList = [
      {
        "title": "My first blog",
        "author": "Andres Meregildo",
        "url": "https://www.google.com/?hl=es",
        "likes": 45,
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

    const result = listHelper.favoriteBlog(biggerList)
    const expected = {
      title: biggerList[0].title,
      author: biggerList[0].author,
      likes: biggerList[0].likes
    }

    assert.deepStrictEqual(result, expected)
  })

  test('returns the unique favorite blog', () => {
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

    const result = listHelper.favoriteBlog(biggerList)
    const expected = structuredClone(biggerList[3])
    delete expected.url
    delete expected.id
    
    assert.deepStrictEqual(result, expected)
  })
})
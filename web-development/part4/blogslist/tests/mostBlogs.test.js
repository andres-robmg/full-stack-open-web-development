const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {

  test('returns an empty when the blogs list is empty', () => {
    const emptyList = []

    const result = listHelper.mostBlogs(emptyList)
    const expected = {}

    assert.deepStrictEqual(result, expected)
  })

  test('returns an unique favorite blog', () => {
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
      },
      {
        "title": "My sixth blog",
        "author": "Jhon Doe",
        "url": "https://www.google.com/?hl=es",
        "likes": 10,
        "id": "68dae6113b25b0ef74c13047"
      },
      {
        "title": "My sixth blog",
        "author": "Jhon Doe",
        "url": "https://www.google.com/?hl=es",
        "likes": 10,
        "id": "68dae6113b25b0ef74b55187"
      },
      {
        "title": "My seventh blog",
        "author": "Ada Lovelace",
        "url": "https://www.google.com/?hl=es",
        "likes": 13,
        "id": "68dee6113b25b0ef74f13180"
      },
    ]

    const result = listHelper.mostBlogs(biggerList)
    const expected = { author: 'Andres Meregildo', blogs: 4 }
    
    assert.deepStrictEqual(result, expected)
  })

  test('returns one of the top authors of a bigger list', () => {
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
      },
      {
        "title": "My sixth blog",
        "author": "Jhon Doe",
        "url": "https://www.google.com/?hl=es",
        "likes": 10,
        "id": "68dae6113b25b0ef74c13047"
      },
      {
        "title": "My sixth blog",
        "author": "Jhon Doe",
        "url": "https://www.google.com/?hl=es",
        "likes": 10,
        "id": "68dae6113b25b0ef74b55187"
      },
      {
        "title": "My seventh blog",
        "author": "Ada Lovelace",
        "url": "https://www.google.com/?hl=es",
        "likes": 13,
        "id": "68dee6113b25b0ef74f13180"
      },
      {
        "title": "My eighth blog",
        "author": "Jhon Doe",
        "url": "https://www.google.com/?hl=es",
        "likes": 3,
        "id": "68dae6113b25b0rf34b55189"
      },
      {
        "title": "My ninth blog",
        "author": "Jhon Doe",
        "url": "https://www.google.com/?hl=es",
        "likes": 10,
        "id": "68dae6413b25b0e374b55183"
      },

    ]

    const result = listHelper.mostBlogs(biggerList)
    const expected = { author: 'Jhon Doe', blogs: 4 }

    assert.deepStrictEqual(result, expected)
  })
})
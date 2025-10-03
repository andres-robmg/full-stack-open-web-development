var _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const favorite = blogs.find(blog => blog.likes === Math.max(...blogs.map(b => b.likes)))
  const favoriteFormatted = structuredClone(favorite)
  delete favoriteFormatted.id
  delete favoriteFormatted.url
  delete favoriteFormatted.__v

  return favoriteFormatted
}

const mostBlogs = (blogs) => {
  let authorWithMoreBlogs = {}
  if (blogs.length > 0) {
    const authors = _.countBy(blogs, 'author')
    const authorWithMostBlogs = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b)
    authorWithMoreBlogs = { author: authorWithMostBlogs, blogs: authors[authorWithMostBlogs] }
  } else {
    return {}
  }
  return authorWithMoreBlogs
}

const mostLikes = (blogs) => {
  let likesByAuthor = {}
  if (blogs.length > 0) {
    authors = _.groupBy(blogs, 'author')
    const likes = Object.keys(authors).map(author => {
      return { author: author, likes: authors[author].reduce((sum, blog) => sum + blog.likes, 0) }
    }
    )
    const authorWithMostLikes = likes.reduce((a, b) => a.likes > b.likes ? a : b)
    likesByAuthor = { author: authorWithMostLikes.author, likes: authorWithMostLikes.likes }
  } else {
    return {}
  }
  return likesByAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}


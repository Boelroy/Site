var HomePage = require('./home');
var PostsPage = require('./posts');

const pages = {
  '/(:id)': 'page-home',
  '/page/:id': 'page-home',
  '/posts/:id': 'page-posts',
}

module.exports = pages;
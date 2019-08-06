const users = require('./users/users.service.js')
const posts = require('./posts/posts.service.js')
const series = require('./series/series.service.js')
const sermons = require('./sermons/sermons.service.js')
const pages = require('./pages/pages.service.js')
// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
	app.configure(users)
	app.configure(posts)
	app.configure(series)
	app.configure(sermons)
	app.configure(pages)
}

// Initializes the `series` service on path `/series`
const createService = require('feathers-mongoose')
const createModel = require('../../models/series.model')
const hooks = require('./series.hooks')

module.exports = function(app) {
	const Model = createModel(app)
	const paginate = app.get('paginate')

	const options = {
		Model,
		paginate
	}

	// Initialize our service with any options it requires
	app.use('/series', createService(options))

	// Get our initialized service so that we can register hooks
	const service = app.service('series')

	service.hooks(hooks)
}

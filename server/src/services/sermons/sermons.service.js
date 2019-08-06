// Initializes the `sermons` service on path `/sermons`
const createService = require('feathers-mongoose')
const createModel = require('../../models/sermons.model')
const hooks = require('./sermons.hooks')

module.exports = function(app) {
	const Model = createModel(app)
	const paginate = app.get('paginate')

	const options = {
		Model,
		paginate
	}

	// Initialize our service with any options it requires
	app.use('/sermons', createService(options))

	// Get our initialized service so that we can register hooks
	const service = app.service('sermons')

	service.hooks(hooks)
}

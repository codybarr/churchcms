// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
	return async context => {
		const { query = {} } = context.params

		// if no sort then sort desc by createdAt
		if (!query.$sort) {
			query.$sort = {
				createdAt: -1
			}
		}

		context.params.query = query

		return context
	}
}

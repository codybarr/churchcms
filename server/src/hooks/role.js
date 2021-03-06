// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
	return async context => {
		// set default role as normal if not provided
		if (!context.data.role) {
			context.data.role = 'normal'
		}

		return context
	}
}

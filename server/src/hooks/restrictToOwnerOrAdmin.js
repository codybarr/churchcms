// Ganked from:
// https://stackoverflow.com/questions/48595255/structure-restricttoowner-restricttoroles-in-feathersjs

const { Forbidden } = require('@feathersjs/errors')
const { disallow, iff } = require('feathers-hooks-common')

// eslint-disable-next-line no-unused-vars
// module.exports = function (options = {}) {
// 	return async context => {
// 		const { user } = context.params;

// 		// admin is unrestricted
// 		if (user.role === 'admin') {
// 			return context;
// 		}

// 		if (!context.id) {
// 			// When requesting multiple, restrict the query to the user
// 			context.params.query._id = user._id;
// 		} else {
// 			const item = await context.service.get(context.id);

// 			if(item._id !== user._id) {
// 				throw new Forbidden('You are not allowed to access this');
// 			}
// 		}

// 		return context;
// 	};
// };

module.exports = function(options = {}) {
	return async context => {
		const { user } = context.params
		const item = await context.service.get(context.id)

		iff(context => {
			!user.role === 'admin' || item._id !== user._id
		}, disallow())

		return context
	}
}

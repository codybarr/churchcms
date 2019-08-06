const { authenticate } = require('@feathersjs/authentication').hooks
const { associateCurrentUser } = require('feathers-authentication-hooks')
const { disallow, iff, populate } = require('feathers-hooks-common')
const { protect } = require('@feathersjs/authentication-local').hooks

function disallowUnlessOwnerOrAdmin(options = {}) {
	return async context => {
		const { user } = context.params
		const item = await context.service.get(context.id)

		iff(context => {
			!user.role === 'admin' || item.userId !== user._id
		}, disallow())

		return context
	}
}

const userSchema = {
	include: {
		service: 'users',
		nameAs: 'author',
		parentField: 'authorId',
		childField: '_id'
	}
}

const defaultSort = require('../../hooks/default-sort')

module.exports = {
	before: {
		all: [],
		find: [defaultSort()],
		get: [],
		create: [authenticate('jwt'), associateCurrentUser({ as: 'authorId' })],
		update: [disallowUnlessOwnerOrAdmin(), authenticate('jwt')],
		patch: [disallowUnlessOwnerOrAdmin(), authenticate('jwt')],
		remove: [disallowUnlessOwnerOrAdmin(), authenticate('jwt')]
	},

	after: {
		all: [populate({ schema: userSchema })],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	},

	error: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	}
}

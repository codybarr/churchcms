const { authenticate } = require('@feathersjs/authentication').hooks
const { disallow, iff } = require('feathers-hooks-common')

const {
	hashPassword,
	protect
} = require('@feathersjs/authentication-local').hooks

const gravatar = require('../../hooks/gravatar')

const role = require('../../hooks/role')

// const restrictToOwnerOrAdmin = require('../../hooks/restrictToOwnerOrAdmin');

function disallowUnlessOwnerOrAdmin(options = {}) {
	return async context => {
		const { user } = context.params
		const item = await context.service.get(context.id)

		iff(context => {
			!user.role === 'admin' || item._id !== user._id
		}, disallow())

		return context
	}
}

function disallowUnlessAdmin(options = {}) {
	return async context => {
		const { user } = context.params

		iff(context => {
			!user.role === 'admin'
		}, disallow())

		return context
	}
}

const defaultSort = require('../../hooks/default-sort')

module.exports = {
	before: {
		all: [],
		find: [defaultSort()],
		get: [],
		create: [hashPassword(), gravatar(), role()],
		update: [disallowUnlessOwnerOrAdmin(), hashPassword(), authenticate('jwt')],
		patch: [disallowUnlessOwnerOrAdmin(), hashPassword(), authenticate('jwt')],
		remove: [disallowUnlessOwnerOrAdmin(), authenticate('jwt')]
	},

	after: {
		all: [
			// Make sure the password field is never sent to the client
			// Always must be the last hook
			protect('password')
		],
		find: [],
		get: [protect('password')],
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

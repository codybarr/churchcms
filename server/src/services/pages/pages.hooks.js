const { authenticate } = require('@feathersjs/authentication').hooks
const { associateCurrentUser } = require('feathers-authentication-hooks')
const { populate } = require('feathers-hooks-common')
const { protect } = require('@feathersjs/authentication-local').hooks

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
		create: [authenticate('jwt')],
		update: [authenticate('jwt')],
		patch: [authenticate('jwt')],
		remove: [authenticate('jwt')]
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

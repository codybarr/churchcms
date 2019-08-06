const { authenticate } = require('@feathersjs/authentication').hooks
const { associateCurrentUser } = require('feathers-authentication-hooks')
const { protect } = require('@feathersjs/authentication-local').hooks
const { fastJoin, populate } = require('feathers-hooks-common')

const defaultSort = require('../../hooks/default-sort')

const userSchema = {
	include: {
		service: 'users',
		nameAs: 'author',
		parentField: 'authorId',
		childField: '_id'
	}
}

module.exports = {
	before: {
		all: [],
		find: [defaultSort()],
		get: [],
		create: [authenticate('jwt'), associateCurrentUser({ as: 'authorId' })],
		update: [authenticate('jwt')],
		patch: [authenticate('jwt')],
		remove: [authenticate('jwt')]
	},

	after: {
		// all: [ fastJoin(addSermonsResolver) ],
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

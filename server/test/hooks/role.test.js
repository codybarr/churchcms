const assert = require('assert')
const feathers = require('@feathersjs/feathers')
const role = require('../../src/hooks/role')

describe("'role' hook", () => {
	let app

	beforeEach(() => {
		app = feathers()

		app.use('/dummy', {
			async get(id) {
				return { id }
			}
		})

		app.service('dummy').hooks({
			before: role()
		})
	})

	it('runs the hook', async () => {
		const result = await app.service('dummy').get('test')

		assert.deepEqual(result, { id: 'test' })
	})
})

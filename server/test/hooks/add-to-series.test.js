const assert = require('assert')
const feathers = require('@feathersjs/feathers')
const addToSeries = require('../../src/hooks/add-to-series')

describe("'addToSeries' hook", () => {
	let app

	beforeEach(() => {
		app = feathers()

		app.use('/dummy', {
			async get(id) {
				return { id }
			}
		})

		app.service('dummy').hooks({
			after: addToSeries()
		})
	})

	it('runs the hook', async () => {
		const result = await app.service('dummy').get('test')

		assert.deepEqual(result, { id: 'test' })
	})
})

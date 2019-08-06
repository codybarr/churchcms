const assert = require('assert')
const feathers = require('@feathersjs/feathers')
const defaultSort = require('../../src/hooks/default-sort')

describe("'defaultSort' hook", () => {
	let app

	beforeEach(() => {
		app = feathers()

		app.use('/dummy', {
			async get(id) {
				return { id }
			}
		})

		app.service('dummy').hooks({
			before: defaultSort()
		})
	})

	it('runs the hook', async () => {
		const result = await app.service('dummy').get('test')

		assert.deepEqual(result, { id: 'test' })
	})
})

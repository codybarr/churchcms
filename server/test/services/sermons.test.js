const assert = require('assert')
const app = require('../../src/app')

describe("'sermons' service", () => {
	it('registered the service', () => {
		const service = app.service('sermons')

		assert.ok(service, 'Registered the service')
	})
})

import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex from 'feathers-vuex'
import feathersClient from './feathersClient'

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, {
	idField: '_id',
	enableEvents: true,
	debug: true
})

Vue.use(Vuex)
Vue.use(FeathersVuex)

Vue.config.devtools = true

export default new Vuex.Store({
	plugins: [
		service('pages', {
			instanceDefaults: {
				title: '',
				slug: '',
				image: 'https://dummyimage.com/1280x720/ccc/aaa',
				content: '',
				authorId: null,
				author: 'User'
			}
		}),
		service('posts', {
			instanceDefaults: {
				title: '',
				image: 'https://dummyimage.com/1280x720/ccc/aaa',
				content: '',
				authorId: null,
				author: 'User'
			}
		}),
		service('series', {
			instanceDefaults: {
				title: '',
				description: '',
				// image: 'https://via.placeholder.com/1280x720',
				image: 'https://dummyimage.com/1280x720/ccc/aaa',
				authorId: null,
				author: 'User'
			}
		}),
		service('sermons', {
			instanceDefaults: {
				title: '',
				description: '',
				audio: 'http://traffic.libsyn.com/reformedpub/RPC147.mp3',
				video: '',
				authorId: null,
				author: 'User',
				seriesId: null,
				series: 'Series' || null
			}
		}),
		service('users', {
			instanceDefaults: {
				email: '',
				avatar:
					'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=128',
				role: ''
			}
		}),
		auth({ userService: 'users' })
	]
})

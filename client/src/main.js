import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

// UI
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
Vue.use(Buefy, {
	defaultIconPack: 'fa'
})

// Filters
import '@/filters/date.filter'
import '@/filters/scripture.filter'

Vue.config.productionTip = false

import Page from '@/views/Page.vue'

// Auth first before loading the app
store
	.dispatch('auth/authenticate')
	.catch(() => {})
	// Render the app
	.then(() => {
		// eslint-disable-next-line no-new
		new Vue({
			router,
			store,
			created() {
				store.dispatch('pages/find').then(() => {
					const pages = store.getters['pages/list']
					let routes = pages.map(page => {
						return {
							path: page.slug,
							name: 'page-route',
							component: Page,
							meta: {
								page
							}
						}
					})
					// console.log('Pages: ', pages)
					// console.log('Routes: ', routes)
					router.addRoutes(routes)
				})
			},
			render: h => h(App)
		}).$mount('#app')
	})

<template>
	<div class="websites">
		<ul>
			<li v-for="website in websites" :key="website._id">
				{{ website.name }}<br />
				{{ website.text }}
			</li>
		</ul>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
	name: 'movies',
	computed: {
		...mapGetters('websites', { findWebsitesInStore: 'find' }),
		websites() {
			return this.findWebsitesInStore({ query: {} }).data
		}
	},
	methods: {
		...mapActions('websites', { findWebsites: 'find' })
	},
	created() {
		this.findWebsites({ query: {} }).then(response => {
			// In the find action, the 'todos' array is not a reactive list, but the individual records are.
			const todos = response.data || response
		})
	}
}
</script>

<template>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ resetOrChange }} Password</p>
		</header>
		<section class="modal-card-body">
			<b-input
				v-model="password"
				type="password"
				placeholder="New Password"
				required
				autofocus
			>
			</b-input>
		</section>
		<footer class="modal-card-foot has-text-right">
			<button
				:class="['button', 'is-danger', loadingClass]"
				@click.prevent="changePassword"
			>
				{{ resetOrChange }}
			</button>
		</footer>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'change-password',
	props: ['reset', 'user'],
	data() {
		return {
			password: ''
		}
	},
	methods: {
		changePassword() {
			const { User } = this.$FeathersVuex
			const user = new User(this.user)

			user.password = this.password

			user.save().then(() => {
				this.$parent.close()
				this.$snackbar.open({
					message: 'Password Changed!',
					position: 'is-bottom-right'
				})
			})
		}
	},
	computed: {
		...mapState('users', { loading: 'isPatchPending' }),
		loadingClass() {
			return this.loading ? 'is-loading' : ''
		},
		resetOrChange() {
			return this.reset === undefined ? 'Change' : 'Reset'
		}
	}
}
</script>

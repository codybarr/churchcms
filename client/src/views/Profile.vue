<template>
	<section class="hero is-info is-bold">
		<div class="hero-body">
			<div class="container columns">
				<div class="column is-4">
					<img :src="user.avatar" />
				</div>
				<div class="column">
					<h1 class="title">Profile</h1>
					<h2 class="subtitle">{{ user.email }}</h2>
					<button
						class="block button is-warning"
						@click.prevent="openPasswordModal(user)"
					>
						Change Password
					</button>
				</div>
			</div>
		</div>
		<b-modal :active.sync="passwordModalOpen" has-modal-card>
			<ChangePassword v-bind="passwordModalProps" />
		</b-modal>
	</section>
</template>

<script>
import { mapState } from 'vuex'
import ChangePassword from '@/components/user/ChangePassword.vue'

export default {
	name: 'profile',
	components: {
		ChangePassword
	},
	data() {
		return {
			passwordModalOpen: false,
			profileModalOpen: false,
			passwordModalProps: {},
			profileModalProps: {}
		}
	},
	methods: {
		openPasswordModal(user) {
			this.passwordModalProps = { user }
			this.passwordModalOpen = true
		}
	},
	computed: {
		...mapState('auth', ['user'])
	}
}
</script>

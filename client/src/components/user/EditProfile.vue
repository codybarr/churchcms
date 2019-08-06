<template>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">Edit Profile: {{ user.name }}</p>
		</header>
		<section class="modal-card-body">
			<b-field label="Name">
				<b-input v-model="newUser.name" type="text" placeholder="Name" required>
				</b-input>
			</b-field>
			<b-field label="Email">
				<b-input
					v-model="newUser.email"
					type="text"
					placeholder="Email"
					required
				>
				</b-input>
			</b-field>
			<b-field label="Avatar">
				<b-input v-model="newUser.avatar" type="text" placeholder="Avatar">
				</b-input>
			</b-field>
			<b-field label="Role">
				<b-select placeholder="Select a role" v-model="newUser.role">
					<option value="normal">Normal</option>
					<option value="admin">Admin</option>
				</b-select>
			</b-field>
		</section>
		<footer class="modal-card-foot has-text-right">
			<button
				:class="['button', 'is-primary', loadingClass]"
				@click.prevent="updateProfile"
			>
				Save
			</button>
		</footer>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'edit-profile',
	props: ['user'],
	data() {
		return {
			newUser: {
				name: this.user.name,
				email: this.user.email,
				role: this.user.role,
				avatar: this.user.avatar
			}
		}
	},
	methods: {
		updateProfile() {
			const { User } = this.$FeathersVuex
			const user = new User(this.newUser)

			user._id = this.user._id

			user.patch().then(() => {
				this.$parent.close()
				this.$snackbar.open({
					message: 'Profile Updated!',
					position: 'is-bottom-right'
				})
			})
		}
	},
	computed: {
		...mapState('users', { loading: 'isPatchPending' }),
		loadingClass() {
			return this.loading ? 'is-loading' : ''
		}
	}
}
</script>

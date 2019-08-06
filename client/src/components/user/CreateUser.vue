<template>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">Create User</p>
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
			<b-field label="Password">
				<b-input
					v-model="newUser.password"
					type="password"
					placeholder="Password"
				>
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
				@click.prevent="createUser"
			>
				Create
			</button>
		</footer>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'create-user',
	data() {
		return {
			newUser: {
				name: '',
				email: '',
				password: '',
				role: 'normal'
			}
		}
	},
	methods: {
		createUser() {
			const { User } = this.$FeathersVuex
			const user = new User(this.newUser)

			user.create().then(() => {
				this.$parent.close()
				this.$snackbar.open({
					message: 'User Created!',
					position: 'is-bottom-right'
				})
			})
		}
	},
	computed: {
		...mapState('users', { loading: 'isCreatePending' }),
		loadingClass() {
			return this.loading ? 'is-loading' : ''
		}
	}
}
</script>

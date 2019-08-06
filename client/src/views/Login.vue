<template>
	<section class="hero is-fullheight has-fixed-navbar">
		<div class="hero-body">
			<div class="container has-text-centered">
				<div class="column is-4 is-offset-4">
					<div id="church-icon">
						<span class="icon is-size-1">
							<i class="fas fa-church"></i>
						</span>
					</div>
					<h3 class="title">Login</h3>
					<div v-if="error" class="notification is-danger">
						<button class="delete"></button>
						{{ error.message }}
					</div>
					<div class="box">
						<form @submit.prevent="onSubmit(email, password)">
							<div class="field">
								<label class="label">Email Address</label>
								<div class="control">
									<input
										class="input"
										type="email"
										placeholder="Email"
										autofocus=""
										v-model="email"
									/>
								</div>
							</div>
							<div class="field">
								<label class="label">Password</label>
								<div class="control">
									<input
										class="input"
										type="password"
										placeholder="Password"
										v-model="password"
									/>
								</div>
							</div>
							<button
								v-if="loading"
								class="button is-block is-info is-fullwidth is-loading"
							>
								Loading
							</button>
							<button v-else class="button is-block is-info is-fullwidth">
								<span>Login</span>
								<span class="icon">
									<i class="fas fa-sign-in-alt"></i>
								</span>
							</button>
						</form>
					</div>
					<p class="level">
						<a href="../" class="level-item" disabled>Sign Up</a>
						<a href="../" class="level-item">Forgot Password</a>
						<a href="../" class="level-item">Need Help?</a>
					</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
	data() {
		return {
			email: undefined,
			password: undefined,
			error: undefined
		}
	},
	methods: {
		...mapActions('auth', ['authenticate']),
		dismissError() {
			this.error = undefined
			this.clearAuthenticateError()
		},
		onSubmit(email, password) {
			this.authenticate({ strategy: 'local', email, password })
				.then(() => {
					this.$router.push('/admin')
				})
				.catch(error => {
					// console.log('Login Error', error)

					let type = error.className
					error = Object.assign({}, error)
					error.message =
						type === 'not-authenticated'
							? 'Incorrect email or password.'
							: 'An error prevented login.'
					this.error = error
				})
		}
	},
	computed: {
		...mapState('auth', { loading: 'isAuthenticatePending' })
	}
}
</script>

<style lang="scss">
#church-icon {
	padding: 20px 0;
}
</style>

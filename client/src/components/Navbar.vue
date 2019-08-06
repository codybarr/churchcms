<template>
	<nav
		class="navbar is-dark is-fixed-top"
		role="navigation"
		aria-label="main navigation"
	>
		<div class="navbar-brand">
			<router-link class="navbar-item" to="/">
				<span class="icon">
					<i class="fas fa-church"></i>
				</span>
				<span class="brand-text">Church.CMS</span>
			</router-link>

			<div
				:class="['navbar-burger', 'burger', { 'is-active': mobileNavActive }]"
				data-target="mobileNav"
				@click="toggleNav"
			>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>

		<div
			id="mobileNav"
			:class="['navbar-menu', 'is-dark', { 'is-active': mobileNavActive }]"
		>
			<div class="navbar-start">
				<router-link to="/sermons" class="navbar-item" activeClass="is-active">
					Sermons
				</router-link>
				<router-link to="/blog" class="navbar-item" activeClass="is-active">
					Blog
				</router-link>
				<router-link to="/about" class="navbar-item" activeClass="is-active">
					About
				</router-link>
				<router-link
					v-for="page in pagesInNavbar"
					:to="page.slug"
					:key="page._id"
					class="navbar-item"
					activeClass="is-active"
				>
					{{ page.title }}
				</router-link>
			</div>
			<div class="navbar-end">
				<div v-if="user" class="navbar-item has-dropdown is-hoverable is-right">
					<a class="navbar-link">
						<span class="email-text">{{ user.email }}</span>
						<figure class="image is-24x24 avatar media">
							<img :src="user.avatar" />
						</figure>
					</a>

					<div class="navbar-dropdown">
						<router-link to="/admin" class="navbar-item">
							<span class="icon">
								<i class="fas fa-user-cog"></i>
							</span>
							<span>Admin</span>
						</router-link>
						<router-link to="/profile" class="navbar-item">
							<span class="icon">
								<i class="fas fa-user-circle"></i>
							</span>
							<span>Profile</span>
						</router-link>

						<a class="navbar-item" @click.prevent="logout">
							<span class="icon">
								<i class="fas fa-sign-out-alt"></i>
							</span>
							<span>Logout</span>
						</a>
					</div>
				</div>
				<div v-else class="navbar-item">
					<router-link class="button is-info" to="/login">
						<span>Login</span>
						<span class="icon">
							<i class="fas fa-sign-in-alt"></i>
						</span>
					</router-link>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import store from '@/store'

export default {
	name: 'navbar',
	data() {
		return {
			mobileNavActive: false
		}
	},
	methods: {
		...mapActions('auth', { authLogout: 'logout' }),
		toggleNav() {
			this.mobileNavActive = !this.mobileNavActive
		},
		logout() {
			// store.dispatch('auth/logout')
			this.authLogout().then(() => this.$router.push('/'))
		}
	},
	computed: {
		...mapState('auth', ['user']),
		...mapGetters('pages', { findPagesInStore: 'find' }),
		pagesInNavbar() {
			return this.findPagesInStore({ query: { showInNavbar: true } }).data
		}
	}
}
</script>

<style lang="scss">
.brand-text {
	padding-left: 10px;
}

.email-text {
	padding-right: 10px;
}

.avatar img {
	border-radius: 50%;
}
</style>

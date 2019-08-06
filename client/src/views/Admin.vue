<template>
	<section class="admin section">
		<div class="columns">
			<div class="column is-3">
				<aside class="menu">
					<p class="menu-label">General</p>
					<ul class="menu-list">
						<li>
							<router-link to="/admin/dashboard" activeClass="is-active" exact>
								Dashboard
							</router-link>
						</li>
					</ul>
					<p class="menu-label">Administration</p>
					<ul class="menu-list">
						<li>
							<a class="is-disabled">
								Pages <span class="tag is-success">coming soon</span>
							</a>
						</li>
						<li>
							<router-link to="/admin/posts" activeClass="is-active" exact>
								Posts
							</router-link>
						</li>
						<li>
							<router-link to="/admin/sermons" activeClass="is-active">
								Sermons
							</router-link>
						</li>
						<li v-if="isAdmin">
							<router-link to="/admin/users" activeClass="is-active" exact>
								Users
							</router-link>
						</li>
					</ul>
				</aside>
			</div>

			<div class="column">
				<transition name="fade" mode="out-in">
					<router-view></router-view>
				</transition>
			</div>
		</div>
	</section>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'admin',
	computed: {
		...mapState('auth', ['user']),
		isAdmin() {
			return this.user.role === 'admin'
		}
	}
}
</script>

<style lang="scss" scoped>
a.is-disabled {
	cursor: not-allowed;
}
</style>

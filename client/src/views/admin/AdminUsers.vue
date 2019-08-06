<template>
	<div>
		<section class="hero block is-info welcome is-small">
			<div class="hero-body">
				<h1 class="title">Admin Users</h1>
			</div>
		</section>
		<section class="block">
			<div class="block is-clearfix">
				<button
					class="button is-success is-pulled-right"
					@click.prevent="openCreateUserModal"
				>
					<span class="icon">
						<i class="fa fa-plus"></i>
					</span>
					<span>Create New User</span>
				</button>
			</div>
			<List :items="users" class="user-rows">
				<template slot-scope="{ item }">
					<div class="level">
						<div class="level-left">
							<div class="level-item">
								<figure>
									<img :src="item.avatar" />
								</figure>
							</div>
							<div class="level-item">
								<a @click.prevent="openProfileModal(item)">{{ item.email }}</a>
							</div>
							<div class="level-item">
								<span
									:class="[
										'tag',
										'is-lowercase',
										'is-rounded',
										roleColor(item.role)
									]"
								>
									{{ item.role }}
								</span>
							</div>
							<div class="level-item">
								<span>{{ item.createdAt | date('ago') }}</span>
							</div>
						</div>

						<div class="level-right">
							<button
								class="button is-small is-warning level-item"
								@click.prevent="openPasswordModal(item)"
							>
								Reset Password
							</button>
							<button
								class="button is-small is-danger level-item"
								@click.prevent="deleteUser(item)"
							>
								Delete
							</button>
						</div>
					</div>
				</template>
			</List>

			<b-modal :active.sync="createUserModalOpen" has-modal-card>
				<CreateUser />
			</b-modal>

			<b-modal :active.sync="passwordModalOpen" has-modal-card>
				<ChangePassword reset v-bind="passwordModalProps" />
			</b-modal>

			<b-modal :active.sync="profileModalOpen" has-modal-card>
				<EditProfile v-bind="profileModalProps" />
			</b-modal>
		</section>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

import List from '@/components/List.vue'

import CreateUser from '@/components/user/CreateUser.vue'
import ChangePassword from '@/components/user/ChangePassword.vue'
import EditProfile from '@/components/user/EditProfile.vue'

export default {
	components: {
		List,
		CreateUser,
		EditProfile,
		ChangePassword
	},
	data() {
		return {
			createUserModalOpen: false,
			passwordModalOpen: false,
			profileModalOpen: false,
			passwordModalProps: {},
			profileModalProps: {}
		}
	},
	computed: {
		...mapGetters('users', { findUsersInStore: 'find' }),
		users() {
			return this.findUsersInStore({ query: {} }).data
		}
	},
	methods: {
		...mapActions('users', { findUsers: 'find' }),
		roleColor(role) {
			return role === 'admin' ? 'is-success' : 'is-primary'
		},
		openCreateUserModal() {
			this.createUserModalOpen = true
		},
		openPasswordModal(user) {
			this.passwordModalProps = { user }
			this.passwordModalOpen = true
		},
		openProfileModal(user) {
			this.profileModalProps = { user }
			this.profileModalOpen = true
		},
		deleteUser(user) {
			this.$dialog.confirm({
				title: 'Delete User?',
				message: `Are you sure you want to <strong>delete</strong> ${user.name}? This action cannot be undone.`,
				confirmText: 'Delete',
				type: 'is-danger',
				hasIcon: true,
				iconPack: 'fa',
				onConfirm: () => {
					const { User } = this.$FeathersVuex
					const userToDelete = new User(user)

					userToDelete.remove().then(() => {
						this.$snackbar.open({
							message: 'User Deleted!',
							position: 'is-bottom-right'
						})
					})
				}
			})
		}
	},
	created() {
		this.findUsers({ query: {} })
	}
}
</script>

<style lang="scss">
.user-rows {
	.card-content {
		padding: 0.75rem;
	}

	figure img {
		width: 48px;
		border-radius: 50%;
	}
}
</style>

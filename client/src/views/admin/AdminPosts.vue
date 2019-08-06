<template>
	<div>
		<section class="hero block is-info welcome is-small">
			<div class="hero-body">
				<h1 class="title">Admin Posts</h1>
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
					<span>Create New Post</span>
				</button>
			</div>

			<div class="block">
				<p v-if="posts.length === 0">No posts yet</p>
				<div v-else class="card box" v-for="(post, index) in posts">
					<h1 class="title">
						{{ post.title }}
						<span class="tag">{{ post.createdAt | date('ago') }}</span>
					</h1>
					<div class="block is-clearfix">
						<div class="level">
							<div class="level-left"></div>
							<div class="level-right">
								<button
									class="button level-item is-warning is-small"
									@click.prevent="editPost(post)"
								>
									Edit
								</button>
								<button
									class="button level-item is-danger is-small"
									@click.prevent="deletePost(post)"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<b-modal :active.sync="createPostModalOpen" has-modal-card>
				<CreateEditPost />
			</b-modal>

			<b-modal :active.sync="editPostModalOpen" has-modal-card>
				<CreateEditPost v-bind="editPostModalProps" />
			</b-modal>
		</section>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import CreateEditPost from '@/components/posts/CreateEditPost.vue'

export default {
	name: 'admin-posts',
	components: {
		CreateEditPost
	},
	data() {
		return {
			createPostModalOpen: false,
			editPostModalOpen: false,
			editPostModalProps: {}
		}
	},
	computed: {
		...mapGetters('posts', { findPostsInStore: 'find' }),
		posts() {
			return this.findPostsInStore({ query: {} }).data
		}
	},
	methods: {
		...mapActions('posts', { findPosts: 'find' }),
		openCreateUserModal() {
			this.createPostModalOpen = true
		},
		editPost(post) {
			this.editPostModalProps = { post }
			this.editPostModalOpen = true
		},
		deletePost(post) {
			this.$dialog.confirm({
				title: 'Delete Post?',
				message: `Are you sure you want to <em>delete</em> <strong>${post.title}</strong>? This action cannot be undone.`,
				confirmText: 'Delete',
				type: 'is-danger',
				hasIcon: true,
				iconPack: 'fa',
				onConfirm: () => {
					const { Post } = this.$FeathersVuex
					const postToDelete = new Post(post)

					postToDelete.remove().then(() => {
						this.$snackbar.open({
							message: 'Post Deleted!',
							position: 'is-bottom-right'
						})
					})
				}
			})
		}
	},
	created() {
		this.findPosts({ query: {} }).then(response => {
			const posts = response.data || response
		})
	}
}
</script>

<template>
	<div id="blog">
		<section class="hero is-info is-bold">
			<div class="hero-body">
				<div class="container is-fullhd">
					<h1 class="title">Blog</h1>
				</div>
			</div>
		</section>
		<section class="section">
			<div class="block">
				<p v-if="posts.length === 0">No posts yet</p>
				<div v-else class="card box" v-for="(post, index) in posts">
					<h1 class="title">
						<router-link :to="{ name: 'blog-post', params: { id: post._id } }">
							{{ post.title }}
						</router-link>
					</h1>
					<div class="block">
						<div class="tags has-addons">
							<span class="tag">{{ post.author.name }}</span>
							<span class="tag is-primary">{{
								post.createdAt | date('ago')
							}}</span>
						</div>
					</div>
					<div class="content">{{ post.content }}</div>
				</div>
			</div>
			<b-loading :is-full-page="false" :active.sync="loading"></b-loading>
		</section>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import CreateEditPost from '@/components/posts/CreateEditPost.vue'

export default {
	name: 'blog',
	components: {
		CreateEditPost
	},
	data() {
		return {
			createPostModalOpen: false
		}
	},
	computed: {
		...mapState('posts', { loading: 'isFindPending' }),
		...mapGetters('posts', { findPostsInStore: 'find' }),
		posts() {
			return this.findPostsInStore({ query: { $sort: { createdAt: -1 } } }).data
		}
	},
	methods: {
		...mapActions('posts', { findPosts: 'find' }),
		openCreateUserModal() {
			this.createPostModalOpen = true
		}
	},
	created() {
		this.findPosts({ query: {} }).then(response => {
			const posts = response.data || response
		})
	}
}
</script>

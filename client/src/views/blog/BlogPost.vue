<template>
	<section class="section" v-if="post">
		<div class="container">
			<nav class="breadcrumb" aria-label="breadcrumbs">
				<ul>
					<li>
						<router-link to="/blog">
							<span class="icon is-small">
								<i class="fas fa-book" aria-hidden="true"></i>
							</span>
							<span>Blog</span>
						</router-link>
					</li>
				</ul>
			</nav>
			<h1 class="title">{{ post.title }}</h1>
			<span class="tag block">{{ post.createdAt | date('short') }}</span>
			<img :src="post.image" />
			<div class="content">
				{{ post.content }}
			</div>
			<PreCard :content="post" />
		</div>
	</section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import store from '@/store'

import PreCard from '@/components/PreCard.vue'

export default {
	name: 'blog-post',
	components: {
		PreCard
	},
	props: ['id'],
	methods: {
		...mapActions('posts', { getPost: 'get' })
	},
	computed: {
		...mapGetters('posts', { getPostInStore: 'get' }),
		post() {
			return this.getPostInStore(this.id)
		}
	},
	created() {
		this.getPost(this.id)
	}
}
</script>

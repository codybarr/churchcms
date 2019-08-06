<template>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ createOrEdit }} Post</p>
		</header>
		<section class="modal-card-body">
			<b-field label="Title">
				<b-input
					v-model="newPost.title"
					type="text"
					placeholder="Enter Title"
					required
					autofocus
				>
				</b-input>
			</b-field>
			<b-field label="Featured Image">
				<b-input
					v-model="newPost.image"
					type="text"
					placeholder="Enter Image URL"
				>
				</b-input>
			</b-field>
			<b-field label="Content">
				<b-input
					v-model="newPost.content"
					type="textarea"
					placeholder="Enter Title"
					required
				>
				</b-input>
			</b-field>
		</section>
		<footer class="modal-card-foot has-text-right">
			<button
				:class="['button', 'is-primary', loadingClass]"
				@click.prevent="createPost"
			>
				{{ createOrEdit }}
			</button>
		</footer>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'create-edit-post',
	props: ['post'],
	data() {
		return {
			newPost: { ...this.post }
		}
	},
	methods: {
		createPost() {
			const { Post } = this.$FeathersVuex
			const post = new Post(this.newPost)

			post.save().then(() => {
				const createdOrUpdated = this.post ? 'Updated' : 'Created'

				this.$parent.close()
				this.$snackbar.open({
					message: `Post ${createdOrUpdated}`,
					position: 'is-bottom-right'
				})
			})
		}
	},
	computed: {
		...mapState('posts', { createPending: 'isCreatePending' }),
		...mapState('posts', { patchPending: 'isPatchPending' }),
		loading() {
			return this.createPending || this.patchPending
		},
		createOrEdit() {
			return this.post ? 'Edit' : 'Create'
		},
		loadingClass() {
			return this.loading ? 'is-loading' : ''
		}
	}
}
</script>

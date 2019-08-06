<template>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ createOrEdit }} Page</p>
		</header>
		<section class="modal-card-body">
			<b-field label="Title">
				<b-input
					v-model="newPage.title"
					type="text"
					placeholder="Enter Title"
					required
					autofocus
				>
				</b-input>
			</b-field>
			<b-field
				label="Slug"
				message="Slug should start with a /. This will be the path to the page after the #"
			>
				<b-input
					v-model="newPage.slug"
					type="text"
					placeholder="Enter Page Slug / Route"
				>
				</b-input>
			</b-field>
			<b-field message="Should this page appear in the main navbar?">
				<b-checkbox v-model="newPage.showInNavbar">
					Show in Navbar
				</b-checkbox>
			</b-field>
			<b-field label="Featured Image">
				<b-input
					v-model="newPage.image"
					type="text"
					placeholder="Enter Image URL"
				>
				</b-input>
			</b-field>
			<b-field label="Content">
				<b-input
					v-model="newPage.content"
					type="textarea"
					placeholder="Enter Title"
				>
				</b-input>
			</b-field>
		</section>
		<footer class="modal-card-foot has-text-right">
			<button
				:class="['button', 'is-primary', loadingClass]"
				@click.prevent="createPage"
			>
				{{ createOrEdit }}
			</button>
		</footer>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'create-edit-page',
	props: ['page'],
	data() {
		return {
			newPage: { ...this.page }
		}
	},
	methods: {
		createPage() {
			const { Page } = this.$FeathersVuex
			const page = new Page(this.newPage)

			page.save().then(() => {
				const createdOrUpdated = this.page ? 'Updated' : 'Created'

				this.$parent.close()
				this.$snackbar.open({
					message: `Page ${createdOrUpdated}`,
					position: 'is-bottom-right'
				})
			})
		}
	},
	computed: {
		...mapState('pages', { createPending: 'isCreatePending' }),
		...mapState('pages', { patchPending: 'isPatchPending' }),
		loading() {
			return this.createPending || this.patchPending
		},
		createOrEdit() {
			return this.page ? 'Edit' : 'Create'
		},
		loadingClass() {
			return this.loading ? 'is-loading' : ''
		}
	}
}
</script>

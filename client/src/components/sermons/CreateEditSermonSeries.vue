<template>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ createOrEdit }} Post</p>
		</header>
		<section class="modal-card-body">
			<b-field label="Title">
				<b-input
					v-model="newSeries.title"
					type="text"
					placeholder="Enter Title"
					required
					autofocus
				>
				</b-input>
			</b-field>
			<b-field label="Description">
				<b-input
					v-model="newSeries.description"
					type="textarea"
					placeholder="Enter Description"
					required
				>
				</b-input>
			</b-field>
			<b-field label="Image">
				<b-input
					v-model="newSeries.image"
					type="text"
					placeholder="Enter Image URL"
				>
				</b-input>
			</b-field>
		</section>
		<footer class="modal-card-foot has-text-right">
			<button
				:class="['button', 'is-primary', loadingClass]"
				@click.prevent="createSeries"
			>
				{{ createOrEdit }}
			</button>
		</footer>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'create-edit-sermon-series',
	props: ['series'],
	data() {
		return {
			newSeries: { ...this.series }
		}
	},
	methods: {
		createSeries() {
			const { Series } = this.$FeathersVuex
			const series = new Series(this.newSeries)

			series.save().then(() => {
				const createdOrUpdated = this.series ? 'Updated' : 'Created'

				this.$parent.close()
				this.$snackbar.open({
					message: `Series ${createdOrUpdated}`,
					position: 'is-bottom-right'
				})
			})
		}
	},
	computed: {
		...mapState('series', { createPending: 'isCreatePending' }),
		...mapState('series', { patchPending: 'isPatchPending' }),
		loading() {
			return this.createPending || this.patchPending
		},
		createOrEdit() {
			return this.series ? 'Edit' : 'Create'
		},
		loadingClass() {
			return this.loading ? 'is-loading' : ''
		}
	}
}
</script>

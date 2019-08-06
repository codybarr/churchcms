<template>
	<div class="modal-card" style="width: 960px; max-width: 100%">
		<header class="modal-card-head">
			<p class="modal-card-title">{{ createOrEdit }} Sermon</p>
		</header>
		<section class="modal-card-body">
			<b-field label="Title">
				<b-input
					v-model="newSermon.title"
					type="text"
					placeholder="Enter Title"
					required
					autofocus
				>
				</b-input>
			</b-field>
			<b-field label="Sermon Series">
				<b-select
					placeholder="Select a Sermon Series"
					v-model="newSermon.seriesId"
				>
					<option v-for="serie in series" :value="serie._id" :key="serie._id">
						{{ serie.title }}
					</option>
				</b-select>
			</b-field>
			<b-field label="Date Preached">
				<b-datepicker
					v-model="newSermon.datePreached"
					:date-formatter="formatDate"
					placeholder="Select a date"
					icon="calendar"
					icon-pack="fas"
				>
					<template slot="default">
						<button
							class="button is-primary"
							@click="newSermon.datePreached = new Date()"
						>
							<b-icon pack="fas" icon="calendar"></b-icon>
							<span>Today</span>
						</button>
					</template>
				</b-datepicker>
			</b-field>
			<b-field
				label="Scripture Reference"
				message="Enter one reference like this 'Hebrews 1:1-14'"
			>
				<b-input
					v-model="newSermon.scripture"
					type="text"
					placeholder="Enter Scripture Reference"
				>
				</b-input>
			</b-field>
			<b-field label="Description">
				<b-input
					v-model="newSermon.description"
					type="textarea"
					placeholder="Enter Description"
				>
				</b-input>
			</b-field>
			<b-field label="Audio">
				<b-input
					v-model="newSermon.audio"
					type="text"
					placeholder="Enter URL to Sermon Audio"
					required
				>
				</b-input>
			</b-field>
			<b-field label="Video URL" message="You can use Youtube, Vimeo, etc.">
				<b-input
					v-model="newSermon.video"
					type="text"
					placeholder="Enter Sermon Video URL"
				>
				</b-input>
			</b-field>
		</section>
		<footer class="modal-card-foot has-text-right">
			<button
				:class="['button', 'is-primary', loadingClass]"
				@click.prevent="createSermon"
			>
				{{ createOrEdit }}
			</button>
		</footer>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { format } from 'date-fns'

export default {
	name: 'create-edit-sermon',
	props: ['sermon'],
	data() {
		return {
			newSermon: { ...this.sermon }
		}
	},
	methods: {
		...mapActions('series', { findSeries: 'find' }),
		createSermon() {
			const { Sermon } = this.$FeathersVuex
			const sermon = new Sermon(this.newSermon)

			sermon.save().then(() => {
				const createdOrUpdated = this.sermon ? 'Updated' : 'Created'

				this.$parent.close()
				this.$snackbar.open({
					message: `Sermon ${createdOrUpdated}`,
					position: 'is-bottom-right'
				})
			})
		},
		formatDate(date) {
			return format(date, 'MMMM D, YYYY')
		}
	},
	computed: {
		...mapGetters('series', { findSeriesInStore: 'find' }),
		series() {
			return this.findSeriesInStore({ query: {} }).data
		},

		...mapState('sermons', { createPending: 'isCreatePending' }),
		...mapState('sermons', { patchPending: 'isPatchPending' }),
		loading() {
			return this.createPending || this.patchPending
		},
		createOrEdit() {
			return this.sermon ? 'Edit' : 'Create'
		},
		loadingClass() {
			return this.loading ? 'is-loading' : ''
		}
	},
	created() {
		this.findSeries({ query: {} })
	}
}
</script>

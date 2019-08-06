<template>
	<div id="admin-sermon-series">
		<div class="block is-clearfix">
			<button
				class="button is-success is-pulled-right"
				@click.prevent="openCreateSermonSeriesModal"
			>
				<span class="icon">
					<i class="fa fa-plus"></i>
				</span>
				<span>Create Sermon Series</span>
			</button>
		</div>

		<div class="block">
			<p v-if="series.length === 0">No sermon series yet</p>
			<div v-else class="card box" v-for="(serie, index) in series">
				<h1 class="title">
					{{ serie.title }}
					<span class="tag">{{ serie.createdAt | date('ago') }}</span>
				</h1>
				<div class="content">
					{{ serie.description }}
				</div>

				<figure class="image block">
					<img :src="serie.image" />
				</figure>

				<div class="block is-clearfix">
					<div class="level">
						<div class="level-left"></div>
						<div class="level-right">
							<button
								class="button level-item is-warning is-small"
								@click.prevent="editSeries(serie)"
							>
								Edit
							</button>
							<button
								class="button level-item is-danger is-small"
								@click.prevent="deleteSeries(serie)"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<b-modal :active.sync="createSermonSeriesModalOpen" has-modal-card>
			<CreateEditSermonSeries />
		</b-modal>

		<b-modal :active.sync="editSeriesModalOpen" has-modal-card>
			<CreateEditSermonSeries v-bind="editSeriesModalProps" />
		</b-modal>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import CreateEditSermonSeries from '@/components/sermons/CreateEditSermonSeries.vue'

export default {
	name: 'admin-sermon-series',
	components: {
		CreateEditSermonSeries
	},
	created() {
		this.findSeries({ query: {} }).then(response => {
			const series = response.data || response
		})
	},
	data() {
		return {
			createSermonSeriesModalOpen: false,
			editSeriesModalOpen: false,
			editSeriesModalProps: {}
		}
	},
	methods: {
		...mapActions('series', { findSeries: 'find' }),
		openCreateSermonSeriesModal() {
			this.createSermonSeriesModalOpen = true
		},
		editSeries(series) {
			this.editSeriesModalProps = { series }
			this.editSeriesModalOpen = true
		},
		deleteSeries(series) {
			this.$dialog.confirm({
				title: 'Delete Series?',
				message: `Are you sure you want to <em>delete</em> <strong>${series.title}</strong>? This action cannot be undone.`,
				confirmText: 'Delete',
				type: 'is-danger',
				hasIcon: true,
				iconPack: 'fa',
				onConfirm: () => {
					const { Series } = this.$FeathersVuex
					const seriesToDelete = new Series(series)

					seriesToDelete.remove().then(() => {
						this.$snackbar.open({
							message: 'Series Deleted!',
							position: 'is-bottom-right'
						})
					})
				}
			})
		}
	},
	computed: {
		...mapGetters('series', { findSeriesInStore: 'find' }),
		series() {
			return this.findSeriesInStore({ query: {} }).data
		}
	}
}
</script>

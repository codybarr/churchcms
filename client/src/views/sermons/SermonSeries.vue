<template>
	<div id="sermons">
		<section class="section">
			<div class="block">
				<b-pagination
					:total="total"
					:current.sync="currentPage"
					:per-page="limit"
					order="is-centered"
					class="block"
				>
				</b-pagination>
				<div class="container is-fullhd">
					<b-loading :active.sync="loading" :is-full-page="false"></b-loading>
					<transition v-if="!loading" name="fade" mode="out-in">
						<p v-if="series.length === 0">No Sermon Series yet</p>
						<div class="columns is-multiline">
							<div
								v-for="serie in series"
								:key="serie._id"
								class="column is-one-quarter has-text-centered"
							>
								<Tile type="series" :data="serie" />
							</div>
						</div>
					</transition>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import Tile from '@/components/sermons/Tile.vue'

export default {
	name: 'sermon-series',
	components: {
		Tile
	},
	data() {
		return {
			currentPage: 1,
			limit: 8
		}
	},
	computed: {
		...mapState('series', { loading: 'isFindPending' }),
		...mapGetters('series', { findSeriesInStore: 'find' }),
		...mapState('series', { seriesPagination: 'pagination' }),
		series() {
			return this.findSeriesInStore().data
		},
		total() {
			return (
				(this.seriesPagination.default &&
					this.seriesPagination.default.total) ||
				0
			)
		}
	},
	methods: {
		...mapMutations('series', { clearSeries: 'clearAll' }),
		...mapActions('series', { findSeries: 'find' }),
		querySeriesFromServer() {
			this.clearSeries()
			this.findSeries({
				query: {
					$sort: { createdAt: -1 },
					$limit: this.limit,
					$skip: this.limit * (this.currentPage - 1)
				}
			})
		}
	},
	watch: {
		currentPage: function() {
			this.querySeriesFromServer()
		}
	},
	created() {
		this.querySeriesFromServer()
	}
}
</script>

<style lang="scss"></style>

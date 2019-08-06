<template>
	<div id="sermon-series" v-if="currentSeries">
		<section class="hero is-info is-bold">
			<div class="hero-body">
				<div class="container is-fullhd columns">
					<div class="column is-one-third">
						<img :src="currentSeries.image" />
					</div>
					<div class="column">
						<span class="tag block">CURRENT SERIES</span>
						<h1 class="title">{{ currentSeries.title }}</h1>
						<p>{{ currentSeries.description }}</p>
					</div>
				</div>
			</div>
		</section>
		<section class="section">
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
					<p v-if="sermons.length === 0">No Sermons in this series yet</p>
					<div class="columns is-multiline">
						<div
							v-for="sermon in sermons"
							:key="sermon._id"
							class="column is-4 has-text-centered shrink"
						>
							<Tile type="sermon" :data="sermon" />
						</div>
					</div>
				</transition>
			</div>
		</section>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import PreCard from '@/components/PreCard.vue'
import Tile from '@/components/sermons/Tile.vue'

const currentSeriesQuery = { query: { $sort: { createdAt: -1 }, $limit: 1 } }

export default {
	name: 'current-series',
	components: {
		Tile,
		PreCard
	},
	data() {
		return {
			limit: 9,
			currentPage: 1
		}
	},
	created() {
		this.findSeries(currentSeriesQuery)
		this.querySermonsFromServer()
	},
	methods: {
		...mapMutations('sermons', { clearSermons: 'clearAll' }),
		...mapActions('series', { findSeries: 'find' }),
		...mapActions('sermons', { findSermons: 'find' }),
		querySermonsFromServer() {
			this.clearSermons()
			this.findSermons({
				query: {
					seriesId: this.currentSeries._id,
					$limit: this.limit,
					$skip: this.limit * (this.currentPage - 1)
				}
			})
		}
	},
	computed: {
		...mapState('series', { loadingSeries: 'isFindPending' }),
		...mapState('sermons', { loadingSermons: 'isFindPending' }),
		...mapState('sermons', { sermonPagination: 'pagination' }),
		...mapGetters('series', { seriesList: 'list' }),
		...mapGetters('sermons', { findSermonsInStore: 'find' }),
		loading() {
			return this.loadingSeries || this.loadingSermons
		},
		currentSeries() {
			return this.seriesList.length === 0 ? [] : this.seriesList[0]
		},
		total() {
			return (
				(this.sermonPagination.default &&
					this.sermonPagination.default.total) ||
				0
			)
		},
		sermons() {
			return this.findSermonsInStore({ query: { $sort: { datePreached: -1 } } })
				.data
		}
	},
	watch: {
		currentSeries: function() {
			this.querySermonsFromServer()
		},
		currentPage: function() {
			this.querySermonsFromServer()
		}
	}
}
</script>

<style lang="scss" scoped></style>

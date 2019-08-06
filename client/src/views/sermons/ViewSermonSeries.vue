<template>
	<div id="sermon-series" v-if="series">
		<section class="hero is-info is-bold">
			<div class="hero-body">
				<div class="container is-fullhd columns">
					<div class="column is-one-third">
						<img :src="series.image" />
					</div>
					<div class="column">
						<h1 class="title">{{ series.title }}</h1>
						<p>{{ series.description }}</p>
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

export default {
	name: 'view-sermon-series',
	components: {
		Tile,
		PreCard
	},
	props: ['id'],
	data() {
		return {
			currentPage: 1,
			limit: 9
		}
	},
	methods: {
		...mapMutations('sermons', { clearSermons: 'clearAll' }),
		...mapActions('series', { getSeries: 'get' }),
		...mapActions('sermons', { findSermons: 'find' }),
		querySermonsFromServer() {
			this.clearSermons()
			this.findSermons({
				query: {
					seriesId: this.id,
					$sort: { datePreached: -1 },
					$limit: this.limit,
					$skip: this.limit * (this.currentPage - 1)
				}
			})
		}
	},
	computed: {
		...mapState('sermons', { sermonPagination: 'pagination' }),
		...mapState('sermons', { loading: 'isFindPending' }),
		...mapGetters('series', { getSeriesInStore: 'get' }),
		...mapGetters('sermons', { findSermonsInStore: 'find' }),
		series() {
			return this.getSeriesInStore(this.id)
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
		id: function() {
			this.querySermonsFromServer()
		},
		currentPage: function() {
			this.querySermonsFromServer()
		}
	},
	created() {
		this.getSeries(this.id)
		this.querySermonsFromServer()
	}
}
</script>

<style></style>

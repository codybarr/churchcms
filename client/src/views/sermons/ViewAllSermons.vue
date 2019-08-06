<template>
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
					<p v-if="sermons.length === 0">No sermons yet</p>
					<div class="columns is-multiline">
						<div
							v-for="sermon in sermons"
							:key="sermon._id"
							class="column is-one-quarter has-text-centered"
						>
							<Tile type="sermon" :data="sermon" />
						</div>
					</div>
				</transition>
			</div>
		</div>
	</section>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import Tile from '@/components/sermons/Tile.vue'

export default {
	name: 'view-all-sermons',
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
		...mapState('sermons', { loading: 'isFindPending' }),
		...mapGetters('sermons', { findSermonsInStore: 'find' }),
		...mapState('sermons', { sermonsPagination: 'pagination' }),
		sermons() {
			return this.findSermonsInStore().data
		},
		total() {
			return (
				(this.sermonsPagination.default &&
					this.sermonsPagination.default.total) ||
				0
			)
		}
	},
	methods: {
		...mapMutations('sermons', { clearSermons: 'clearAll' }),
		...mapActions('sermons', { findSermons: 'find' }),
		querySermonsFromServer() {
			this.clearSermons()
			this.findSermons({
				query: {
					$sort: { datePreached: -1 },
					$limit: this.limit,
					$skip: this.limit * (this.currentPage - 1)
				}
			})
		}
	},
	watch: {
		currentPage: function() {
			this.querySermonsFromServer()
		}
	},
	created() {
		this.querySermonsFromServer()
	}
}
</script>

<style lang="scss"></style>

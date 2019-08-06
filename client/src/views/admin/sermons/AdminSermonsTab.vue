<template>
	<div id="admin-sermon-series">
		<div class="block is-clearfix">
			<button
				class="button is-success is-pulled-right"
				@click.prevent="openCreateSermonModal"
			>
				<span class="icon">
					<i class="fa fa-plus"></i>
				</span>
				<span>Create Sermon</span>
			</button>
		</div>

		<div class="block">
			<p v-if="sermons.length === 0">No sermons yet</p>
			<div v-else class="card box block" v-for="(sermon, index) in sermons">
				<h1 class="title">
					{{ sermon.title }}
					<span class="tag">{{ sermon.createdAt | date('ago') }}</span>
				</h1>

				<div class="block" v-if="sermon.series">
					Series:
					<span class="tag is-rounded is-info">{{ sermon.series.title }}</span>
				</div>

				<div class="block" v-if="sermon.series">
					<img :src="sermon.series.image" style="max-width: 200px;" />
				</div>

				<div class="block">
					<PreCard :content="sermon" />
				</div>

				<div class="block" v-if="sermon.scripture">
					Scripture:
					<a :href="sermon.scripture | scripture" target="_blank">{{
						sermon.scripture
					}}</a>
				</div>

				<div class="content block">
					{{ sermon.description }}
				</div>

				<div class="block">
					<audio controls class="audio">
						<source :src="sermon.audio" type="audio/mp3" />
					</audio>
				</div>

				<div class="block is-clearfix">
					<div class="level">
						<div class="level-left"></div>
						<div class="level-right">
							<button
								class="button level-item is-warning is-small"
								@click.prevent="editSermon(sermon)"
							>
								Edit
							</button>
							<button
								class="button level-item is-danger is-small"
								@click.prevent="deleteSermon(sermon)"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<b-modal :active.sync="createSermonModalOpen" has-modal-card>
			<CreateEditSermon />
		</b-modal>

		<b-modal :active.sync="editSermonModalOpen" has-modal-card>
			<CreateEditSermon v-bind="editSermonModalProps" />
		</b-modal>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

import PreCard from '@/components/PreCard.vue'
import Audio from '@/components/Audio.vue'
import CreateEditSermon from '@/components/sermons/CreateEditSermon.vue'

export default {
	name: 'admin-sermon-series',
	components: {
		Audio,
		PreCard,
		CreateEditSermon
	},
	created() {
		this.findSermons({ query: {} })
	},
	data() {
		return {
			createSermonModalOpen: false,
			editSermonModalOpen: false,
			editSermonModalProps: {}
		}
	},
	methods: {
		...mapActions('sermons', { findSermons: 'find' }),
		openCreateSermonModal() {
			this.createSermonModalOpen = true
		},
		editSermon(sermon) {
			this.editSermonModalProps = { sermon }
			this.editSermonModalOpen = true
		},
		deleteSermon(sermon) {
			this.$dialog.confirm({
				title: 'Delete Sermon?',
				message: `Are you sure you want to <em>delete</em> <strong>${sermon.title}</strong>? This action cannot be undone.`,
				confirmText: 'Delete',
				type: 'is-danger',
				hasIcon: true,
				iconPack: 'fa',
				onConfirm: () => {
					const { Sermon } = this.$FeathersVuex
					const sermonToDelete = new Sermon(sermon)

					sermonToDelete.remove().then(() => {
						this.$snackbar.open({
							message: 'Sermon Deleted!',
							position: 'is-bottom-right'
						})
					})
				}
			})
		}
	},
	computed: {
		...mapGetters('sermons', { findSermonsInStore: 'find' }),
		sermons() {
			return this.findSermonsInStore({ query: {} }).data
		}
	}
}
</script>

<style lang="scss">
audio.audio {
	height: 54px;
}

pre {
	white-space: pre-wrap !important;
	word-wrap: break-word !important;
}
</style>

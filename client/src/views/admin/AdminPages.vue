<template>
	<div>
		<section class="hero block is-info welcome is-small">
			<div class="hero-body">
				<h1 class="title">Admin Pages</h1>
			</div>
		</section>
		<section class="block">
			<div class="block is-clearfix">
				<button
					class="button is-success is-pulled-right"
					@click.prevent="openCreatePageModal"
				>
					<span class="icon">
						<i class="fa fa-plus"></i>
					</span>
					<span>Create New Page</span>
				</button>
			</div>

			<div class="block">
				<p v-if="pages.length === 0">No pages yet</p>
				<div v-else class="card box" v-for="(page, index) in pages">
					<h1 class="title">
						{{ page.title }}
						<span class="tag">{{ page.createdAt | date('ago') }}</span>
					</h1>
					<div class="block is-clearfix">
						<div class="level">
							<div class="level-left"></div>
							<div class="level-right">
								<button
									class="button level-item is-warning is-small"
									@click.prevent="editPage(page)"
								>
									Edit
								</button>
								<button
									class="button level-item is-danger is-small"
									@click.prevent="deletePage(page)"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<b-modal :active.sync="createPageModalOpen" has-modal-card>
				<CreateEditPage />
			</b-modal>

			<b-modal :active.sync="editPageModalOpen" has-modal-card>
				<CreateEditPage v-bind="editPageModalProps" />
			</b-modal>
		</section>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import CreateEditPage from '@/components/pages/CreateEditPage.vue'

export default {
	name: 'admin-pages',
	components: {
		CreateEditPage
	},
	data() {
		return {
			createPageModalOpen: false,
			editPageModalOpen: false,
			editPageModalProps: {}
		}
	},
	computed: {
		...mapGetters('pages', { findPagesInStore: 'find' }),
		pages() {
			return this.findPagesInStore({ query: {} }).data
		}
	},
	methods: {
		...mapActions('pages', { findPages: 'find' }),
		openCreatePageModal() {
			this.createPageModalOpen = true
		},
		editPage(page) {
			this.editPageModalProps = { page }
			this.editPageModalOpen = true
		},
		deletePage(page) {
			this.$dialog.confirm({
				title: 'Delete Page?',
				message: `Are you sure you want to <em>delete</em> <strong>${page.title}</strong>? This action cannot be undone.`,
				confirmText: 'Delete',
				type: 'is-danger',
				hasIcon: true,
				iconPack: 'fa',
				onConfirm: () => {
					const { Page } = this.$FeathersVuex
					const pageToDelete = new Page(page)

					pageToDelete.remove().then(() => {
						this.$snackbar.open({
							message: 'Page Deleted!',
							position: 'is-bottom-right'
						})
					})
				}
			})
		}
	},
	created() {
		this.findPages({ query: {} })
	}
}
</script>

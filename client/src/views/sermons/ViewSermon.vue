<template>
	<section
		v-if="sermon"
		class="section sermon-background"
		:style="backgroundImageStyle"
	>
		<div v-if="sermon.video" class="container block video-container">
			<Video :video="sermon.video" />
		</div>
		<div class="columns is-fullhd">
			<div class="column is-8">
				<nav class="breadcrumb" aria-label="breadcrumbs">
					<ul>
						<router-link :to="seriesUrl" tag="li">
							<a>&laquo; back to {{ sermon.series.title }}</a>
						</router-link>
					</ul>
				</nav>
				<h1 class="title">{{ sermon.title }}</h1>
				<span class="tags has-addons">
					<span class="tag is-medium is-rounded"
						>Speaker: {{ sermon.author.name }}</span
					>
					<span class="tag is-medium is-rounded is-info"
						>Date Preached: {{ sermon.datePreached | date('short') }}</span
					>
				</span>
				<p class="block">
					Scripture:
					<span v-html="$options.filters.scripture(sermon.scripture)"></span>
				</p>
				<p class="block">
					<Audio :audio="sermon.audio" />
				</p>
				<hr />
				<p class="block content">{{ sermon.description }}</p>
			</div>
			<div class="column">
				<router-link :to="seriesUrl">
					<img :src="sermon.series.image" />
				</router-link>
			</div>
		</div>
	</section>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import PreCard from '@/components/PreCard.vue'
import Video from '@/components/Video.vue'
import Audio from '@/components/Audio.vue'

export default {
	name: 'view-sermon',
	components: {
		PreCard,
		Video,
		Audio
	},
	props: ['id'],
	methods: {
		...mapActions('sermons', { getSermon: 'get' })
	},
	computed: {
		...mapGetters('sermons', { getSermonInStore: 'get' }),
		sermon() {
			return this.getSermonInStore(this.id)
		},
		seriesUrl() {
			return '/sermons/series/' + this.sermon.series._id
		},
		backgroundImageStyle() {
			return {
				backgroundImage: 'url(' + this.sermon.series.image + ')'
			}
		}
	},
	created() {
		this.getSermon(this.id)
	}
}
</script>

<style lang="scss" scoped>
.sermon-background {
	background-color: #ccc;
	background-attachment: fixed;
	background-size: cover;
	background-position: center;
	background-blend-mode: luminosity;
}

.video-container {
	max-width: 900px;
}
</style>

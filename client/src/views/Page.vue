<template>
	<section class="section">
		<h1 class="title">{{ page.title }}</h1>
		<img :src="page.image" style="width: 300px;" />
		<div class="content">
			{{ page.content }}
		</div>
		<PreCard :content="page"></PreCard>
	</section>
</template>

<script>
import PreCard from '@/components/PreCard.vue'

export default {
	name: 'page',
	components: {
		PreCard
	},
	computed: {
		page() {
			return this.$route.meta.page
		}
	}
}
</script>

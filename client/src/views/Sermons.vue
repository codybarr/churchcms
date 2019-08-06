<template>
	<div id="sermons">
		<section class="hero is-primary is-bold">
			<div class="hero-body">
				<div class="container is-fullhd">
					<h1 class="title">Sermons</h1>
				</div>
			</div>
		</section>
		<section class="section">
			<SermonNavTabs />
		</section>
		<router-view></router-view>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import SermonNavTabs from '@/components/sermons/SermonNavTabs.vue'

export default {
	name: 'sermons',
	components: {
		SermonNavTabs
	}
}
</script>

<style lang="scss"></style>

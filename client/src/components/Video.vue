<template>
	<div class="ns-video">
		<iframe :src="videoUrl" frameborder="0" allowfullscreen> </iframe>
	</div>
</template>

<script>
export default {
	name: 'ns-video',
	props: ['video'],
	computed: {
		videoUrl() {
			return this.video.replace('/watch?v=', '/embed/')
		}
	}
}
</script>

<style lang="scss" scoped>
.ns-video {
	position: relative;
	padding-bottom: 56.25%;
	height: 0;
	overflow: hidden;
	max-width: 100%;

	& iframe,
	& object,
	& embed {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
}
</style>

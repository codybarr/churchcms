<template>
	<div class="ns-audio">
		<audio controls :src="audio"></audio>
	</div>
</template>

<script>
export default {
	name: 'ns-audio',
	props: ['audio']
}
</script>

<style lang="scss" scoped>
.ns-audio audio {
	height: 54px;
}
</style>

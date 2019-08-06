<template>
	<div class="ns-tile">
		<router-link
			class="shrink sermon-tile block"
			:to="link"
			:style="backgroundImage"
		>
		</router-link>
		<h2 class="subtitle">{{ data.title }}</h2>
	</div>
</template>

<script>
export default {
	name: 'tile',
	props: ['type', 'data'],
	computed: {
		link() {
			return this.type.toLowerCase() === 'series'
				? { name: 'view-sermon-series', params: { id: this.data._id } }
				: { name: 'view-sermon', params: { id: this.data._id } }
		},
		backgroundImage() {
			const image =
				this.type.toLowerCase() === 'series'
					? this.data.image
					: this.data.series.image

			return {
				backgroundImage: 'url(' + image + ')'
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.shrink {
	transition: all 0.3s ease;

	&:hover {
		transform: scale(0.9);
	}
}

.sermon-tile {
	display: block;
	background-size: cover;
	background-position: center;
	padding-top: 56.25%;
}
</style>

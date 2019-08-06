<template>
	<nav class="level">
		<div class="level-item">
			<div class="tabs is-toggle">
				<ul>
					<router-link
						tag="li"
						to="/sermons/current-series"
						activeClass="is-active"
						exact
					>
						<a>
							<b-icon pack="fas" icon="calendar-check"></b-icon>
							<span>View Current Series</span>
						</a>
					</router-link>
					<router-link tag="li" to="/sermons/all" activeClass="is-active" exact>
						<a>
							<b-icon pack="fas" icon="music"></b-icon>
							<span>View All Sermons</span>
						</a>
					</router-link>
					<router-link
						tag="li"
						to="/sermons/series"
						activeClass="is-active"
						exact
					>
						<a>
							<b-icon pack="fas" icon="folder-open"></b-icon>
							<span>View All Series</span>
						</a>
					</router-link>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'sermon-nav-tabs'
}
</script>

<style lang="scss" scoped></style>

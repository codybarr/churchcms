<template>
	<div>
		<section class="hero block is-info welcome is-small">
			<div class="hero-body">
				<h1 class="title">Admin Sermons</h1>
			</div>
		</section>
		<section class="block">
			<div class="container is-fullhd">
				<div class="tabs is-boxed">
					<ul>
						<router-link
							tag="li"
							to="/admin/sermons/series"
							activeClass="is-active"
						>
							<a>Sermon Series</a>
						</router-link>
						<router-link
							tag="li"
							to="/admin/sermons/sermons"
							activeClass="is-active"
						>
							<a>Sermons</a>
						</router-link>
					</ul>
				</div>
				<transition name="fade" mode="out-in">
					<router-view></router-view>
				</transition>
			</div>
		</section>
	</div>
</template>

<script></script>

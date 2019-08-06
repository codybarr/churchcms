<template>
	<section>
		<b-collapse class="card" :open.sync="open">
			<div slot="trigger" slot-scope="props" class="card-header">
				<p class="card-header-title">
					<span style="font-family: monospace">&lt;Object&gt;</span>
				</p>
				<a class="card-header-icon">
					<b-icon pack="fas" :icon="props.open ? 'caret-down' : 'caret-up'">
					</b-icon>
				</a>
			</div>
			<div class="card-content">
				<div class="content">
					<pre>{{ content }}</pre>
				</div>
			</div>
		</b-collapse>
	</section>
</template>

<script>
export default {
	name: 'pre-card',
	props: ['content'],
	data() {
		return {
			open: false
		}
	}
}
</script>

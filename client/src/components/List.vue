<template>
	<section class="ns-list block">
		<div v-for="(item, index) in items" :key="index" class="card">
			<div class="card-content">
				<slot :item="item">
					<p>
						You need to add a
						<span style="font-family: monospace;"
							>&lt;template scoped-slot="{ item }"&gt;</span
						>
						template
					</p>
				</slot>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'ns-list',
	props: ['items']
}
</script>

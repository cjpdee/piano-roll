<template>
	<div class="sidebar">
		<Controls></Controls>
		<Rack></Rack>
	</div>
</template>

<script>

import Controls from './Controls.vue';
import Rack from './Rack.vue';

export default {
	name: "Sidebar",
	components: {
		Controls,
		Rack
	},
	props: [],

	methods: {

	}
}

</script>
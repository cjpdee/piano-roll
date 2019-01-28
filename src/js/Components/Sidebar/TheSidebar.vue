<template>
	<div class="sidebar">
		<TheControls></TheControls>
		<TheRack></TheRack>
	</div>
</template>

<script>

import TheControls from './TheControls.vue';
import TheRack from './TheRack.vue';

export default {
	name: "TheSidebar",
	components: {
		TheControls,
		TheRack
	},
	props: [],

	methods: {

	}
}

</script>
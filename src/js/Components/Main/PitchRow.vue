<template>

	<div class="row" :data-note=note></div>

</template>

<script>

export default {
	props: {
		note: {
			type: String
		},
		index: {
			type: Number
		}
	},

	methods : {
		addNote(oscillator,pitch) {

		},

		removeNote(oscillator,pitch) {

		}
	}
}

</script>
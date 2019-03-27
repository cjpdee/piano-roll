<template>
	<div :style="style" class="note">
		<div class="note__handle"></div>
	</div>
</template>

<script>
export default {
	props: {
		data: Object,
		musicKey: String
	},
	computed: {
		style() {
			return (
				"left: " +
				this.data.percentageFromLeft +
				"%; width: " +
				this.data.lengthAsPercentage +
				"%"
			);
		}
	},
	mounted() {
		console.log(this.$el);
		let activeOscillator = this.$store.state.oscillators.find(item => {
			return item.id === this.$store.state.activeOscillator.id;
		});
		console.log(activeOscillator);
		// activeOscillator.notes.push(this.data);

		// this.$store.commit("addNoteForActiveOsc", note);
	}
};
</script>

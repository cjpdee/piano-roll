<template>
	<div class="piano" @mousedown="pianoMousedown" @mouseup="pianoMouseout">
		<button
			v-for="note in notes"
			:key="note"
			:data-key="note"
			@mousedown="playKey"
			@mouseup="stopKey"
			@mouseenter="keyMousein"
			@mouseout="keyMouseout"
			class="piano__key"
		></button>
	</div>
</template>

<script>
import Oscillator from "../Objects/Oscillator";

export default {
	props: {
		notes: {
			type: Array
		}
	},
	methods: {
		pianoMousedown(e) {
			this.$store.commit("setMouseActiveState", true);
		},
		pianoMouseout(e) {
			this.$store.commit("setMouseActiveState", false);
		},
		keyMousein(e) {
			this.$store.state.mouseActive && this.playKey(e);
		},
		keyMouseout(e) {
			this.$store.state.mouseActive == true && this.stopKey(e);
		},

		playKey(e) {
			if (this.$store.state.activeOscillator) {
				let osc = this.$store.state.activeOscillator;
				let note = e.target.getAttribute("data-key");
				Oscillator.playNote(osc, note);
			} else {
				console.error(
					"There is currently no active oscillator to play"
				);
			}
			// this.playOscForInterval
		},

		stopKey(e) {
			if (this.$store.state.activeOscillator) {
				let osc = this.$store.state.activeOscillator;
				Oscillator.stopNote(osc);
			}
		}
	}
};
</script>
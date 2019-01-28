<template>
	<div class="piano" @mousedown="pianoMousedown" @mouseup="pianoMouseout">
		<button
			v-for="note in notes"
			:key="note"
			:data-key="note"
			@mousedown="playOsc" @mouseup="stopOsc"
			@mouseenter="keyMousein" @mouseout="keyMouseout"
			class="piano__key"
		></button>
	</div>
</template>

<script>
import {Oscillator} from '../store/store';

export default {
	props : {
		notes: {
			type: Array
		}
	},
	methods: {
		pianoMousedown(e) {
			this.$store.commit("setMouseActiveState",true);
		},
		pianoMouseout(e) {
			this.$store.commit("setMouseActiveState",false);
		},
		keyMousein(e) {
			this.$store.state.mouseActive && this.playOsc(e);
		},
		keyMouseout(e) {
			this.$store.state.mouseActive == true && this.stopOsc();
		},
		
		playOsc(e) { // might break this down later - playOsc will have to be re-used in different contexts
			let osc = this.$store.state.activeOscillator;
			let note = e.target.getAttribute("data-key");
			let frequency = Oscillator.noteFrequency(note);

			osc.oscillatorNode = this.$store.state.audioContext.createOscillator();
			osc.oscillatorNode.type = osc.waveform;

			this.$store.state.filter.frequency.value = osc.lowpass.cutoff;
			osc.oscillatorNode.connect(this.$store.state.filter);
			console.log(this.$store.state.filter);
			
			
			this.$store.state.filter.connect(this.$store.state.audioContext.destination);

			osc.oscillatorNode.frequency.setValueAtTime(frequency, this.$store.state.audioContext.currentTime);
			osc.oscillatorNode.start();
		},
		stopOsc() {
			let osc = this.$store.state.activeOscillator;
			osc.oscillatorNode.stop(this.$store.state.audioContext.currentTime);
		}
	}
}

/*
For the future:

Create a keypress handler that maps 2 octaves to the keyboard

*/



</script>
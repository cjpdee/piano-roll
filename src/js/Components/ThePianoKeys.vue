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
			console.log("moused down on keyboard");
			// stop all oscillators

			this.$store.commit("setMouseActiveState",true);
		},
		pianoMouseout(e) {
			this.$store.commit("setMouseActiveState",false);
		},
		keyMousein(e) {
			// start oscillator
			if(this.$store.state.mouseActive == true) {
				console.log('mousein true');
				this.playOsc(e);
			}
		},
		keyMouseout(e) {
			// stop oscillator
			this.stopOsc();
		},
		
		playOsc(e) {
			console.log('starting');
			let osc = this.$store.state.activeOscillator;
			let note = e.target.getAttribute("data-key");
			let frequency = Oscillator.noteFrequency(note);

			osc.oscillatorNode = this.$store.state.audioContext.createOscillator();
			osc.oscillatorNode.type = osc.waveform;
			osc.oscillatorNode.connect(this.$store.state.audioContext.destination);

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
<template>
	<div class="piano" @mousedown="pianoMousedown" @mouseup="pianoMouseout">
		<button
			v-for="note in notes"
			:key="note"
			:data-key="note"
			@mousedown="playOsc" @mouseup="stopOsc"
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
	data() {
		return {
			isClicked : false
		}
	},
	methods: {
		pianoMousedown(e) {
			console.log(e.target);
			this.$data.isClicked = true;
			// stop all oscillators
		},
		pianoMouseout() {
			this.$data.isClicked = false;
			// needs to emulate click + drag behaviour to play different notes
		},
		keyMousein() {
			// create oscillator
			// activate oscillator

			this.playOsc();
		},
		keyMouseout() {
			// stop oscillator
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
			console.log('stopping');
			let osc = this.$store.state.activeOscillator;
			osc.oscillatorNode.stop(this.$store.state.audioContext.currentTime);
		}
	}
}

/*

- set starting octave i guess?
so A4 goes to C5 for 24 notes



Octave Select gives starting octave:

for (i = startingOctave; i > startingOctave + 1; i++) {
	data.notes.forEach(note => {
		notesInRoll.push(note + i);
	})
}

then for each notes in roll on the piano keys
use the same array for the 

*/

</script>
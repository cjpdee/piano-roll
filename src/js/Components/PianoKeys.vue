<template>
	<div class="piano" >
		<button v-for="note in notes" :key="note"
			:data-key="note"
			@mousedown="playOsc" @mouseup="stopOsc"
			class="piano__key"></button>

		<!-- <button class="piano__key" data-key="B5"></button>
		<button class="piano__key" data-key="A#5"></button>
		<button class="piano__key" data-key="A5"></button>
		<button class="piano__key" data-key="G#5"></button>
		<button class="piano__key" data-key="G5"></button>
		<button class="piano__key" data-key="F#5"></button>
		<button class="piano__key" data-key="F5"></button>
		<button class="piano__key" data-key="E5"></button>
		<button class="piano__key" data-key="D#5"></button>
		<button class="piano__key" data-key="D5"></button>
		<button class="piano__key" data-key="C#5"></button>
		<button class="piano__key" data-key="C5"></button>
		octave 4
		<button class="piano__key" data-key="B4"></button>
		<button class="piano__key" data-key="A#4"></button>
		<button class="piano__key" data-key="A4"></button>
		<button class="piano__key" data-key="G#4"></button>
		<button class="piano__key" data-key="G4"></button>
		<button class="piano__key" data-key="F#4"></button>
		<button class="piano__key" data-key="F4"></button>
		<button class="piano__key" data-key="E4"></button>
		<button class="piano__key" data-key="D#4"></button>
		<button class="piano__key" data-key="D4"></button>
		<button class="piano__key" data-key="C#4"></button>
		<button class="piano__key" data-key="C4"></button> -->
	</div>
</template>

<script>
import {Oscillator} from '../store/store';

export default {
	props : {
		notes: {
			type: Array
		},
	},
	state: {
		isClicked: false
	},
	methods: {
		pianoMousedown(e) {
			console.log(e.target.getAttribute("data-key"));
			// stop all oscillators
		},
		pianoMouseout() {
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
			Oscillator.noteFrequency(note);

			osc.oscillatorNode = this.$store.state.audioContext.createOscillator();
			osc.oscillatorNode.type = osc.waveform;
			osc.oscillatorNode.connect(this.$store.state.audioContext.destination);

			osc.oscillatorNode.frequency.setValueAtTime(261.63, this.$store.state.audioContext.currentTime);
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
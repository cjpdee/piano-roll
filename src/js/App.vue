<template>
	<div id="app">
		<TheSidebar></TheSidebar>
		<ThePianoKeys :notes="pianoKeys"></ThePianoKeys>
		<TheRoll :notes="pianoKeys"></TheRoll>
	</div>
</template>

<script>

import Vue from 'vue';
import Vuex from 'vuex';


import {store} from './store/store';
import {Oscillator} from './store/store';

// Sidebar components
import TheSidebar from './Components/Sidebar/TheSidebar.vue';
import TheControls from './Components/Sidebar/TheControls.vue';
import TheRack from './Components/Sidebar/TheRack.vue';
import OscillatorInterface from './Components/Sidebar/OscillatorInterface.vue';

import ThePianoKeys from './Components/ThePianoKeys.vue';

// Piano roll components
import TheRoll from './Components/Main/TheRoll.vue';
import PitchRow from './Components/Main/PitchRow.vue';
import Note from './Components/Main/Note.vue';

Vue.use(Vuex);
var lastOscillator;
export default {
	components: {
		TheSidebar,
		ThePianoKeys,
		TheRoll
	},
	store,
	data() {
		return {
			state: store.state,
			lastOscillator: null,
			currentNote: null,
			previousKeyCode: null
		}
	},

	mounted() {
		store.commit("createAudioContext");
		window.addEventListener("keydown", this.keydownHandler);
		window.addEventListener("keyup", this.keyupHandler);
	},

	computed: {
		pianoKeys() { // rename
			/*
				This function takes the note that the user
				wants at the bottom of the piano roll and
				creates a new notes array starting with the
				chosen root note, and then sets this
				as the new piano roll order for the whole app
			*/

			let chosenRootOctave = this.$store.state.project.baseOctave;
			let numOctaves = this.$store.state.project.numOctaves;
			let rootNote   = this.$store.state.project.rootNote;
			let notes = this.$store.state.data.notes;


			/*
			this property needs to be sorted out
			the aim is to increase the octave number
			in line with the actual note
			at the moment it's not increasing the octave at the right point
			so it might play C#3, A4 then suddenly A#5
			works with A as the rootnote for now though
			*/

			let offset = notes.indexOf(rootNote);

			let orderedNotes = [];
			for(let j=0; j < notes.length; j++) {
				var pointer = (j + offset) % notes.length;
				orderedNotes.push(notes[pointer]);
			}


			let notesInRoll = []; // rename this is terrible

			for (let i = chosenRootOctave; i < chosenRootOctave + numOctaves; i++) {
				orderedNotes.forEach(note => {
					notesInRoll.push(note + i);
				})
			}

			console.log(notesInRoll);
			return notesInRoll.reverse()







		}
	},

	methods: {
		keydownHandler(e) {
			console.log('triggered');
			if((store.state.activeOscillator) && (e.keyCode != this.previousKeyCode)) {
				this.previousKeyCode = e.keyCode;
				this.lastOscillator = store.state.activeOscillator;
				this.$store.state.keypressActive = true;
				this.$store.state.activeOscillator.oscillatorNode && Oscillator.stopNote(this.$store.state.activeOscillator);

				switch (e.keyCode) {
				case 81:
					console.log('registered');
					Oscillator.playNote(store.state.activeOscillator,"C" + this.$store.state.project.baseOctave);
					this.currentNote = "C" + this.$store.state.project.baseOctave;
					break;
				case 50:
				console.log('registered');
					Oscillator.playNote(store.state.activeOscillator,"C#" + this.$store.state.project.baseOctave);
					this.currentNote = "C#" + this.$store.state.project.baseOctave;
					break;
				case 87:
				console.log('registered');
					Oscillator.playNote(store.state.activeOscillator,"D" + this.$store.state.project.baseOctave);
					this.currentNote = "D" + this.$store.state.project.baseOctave;
					break;
				case 51:
				console.log('registered');
					Oscillator.playNote(store.state.activeOscillator,"D#" + this.$store.state.project.baseOctave);
					this.currentNote = "D#" + this.$store.state.project.baseOctave;
					break;
				case 69:
				console.log('registered');
					Oscillator.playNote(store.state.activeOscillator,"E" + this.$store.state.project.baseOctave);
					break;
				case 82:
				console.log('registered');
					Oscillator.playNote(store.state.activeOscillator,"F" + this.$store.state.project.baseOctave);
					break;
				case 53:
				console.log('registered');
					Oscillator.playNote(store.state.activeOscillator,"F#" + this.$store.state.project.baseOctave);
					break;
				case 84:
				console.log('registered');
					Oscillator.playNote(store.state.activeOscillator,"G" + this.$store.state.project.baseOctave);
					break;
				case 54:
				console.log('registered');
					Oscillator.playNote(store.state.activeOscillator,"G#" + this.$store.state.project.baseOctave);
					break;
				case 89:
				console.log('registered');
					Oscillator.playNote(store.state.activeOscillator,"A" + this.$store.state.project.baseOctave);
					break;
				case 55:
					Oscillator.playNote(store.state.activeOscillator,"A#" + this.$store.state.project.baseOctave);
					break;
				case 85:
					Oscillator.playNote(store.state.activeOscillator,"B" + this.$store.state.project.baseOctave);
					break;
				}
			}
		},
		keyupHandler(e) {
			if(this.$store.state.activeOscillator && (e.keyCode == this.previousKeyCode)) {
				
				Oscillator.stopNote(this.$store.state.activeOscillator);
				this.$store.state.keypressActive = false;
			}
		}
	}

};

</script>
<template>
	<div id="app">
		<TheSidebar></TheSidebar>
		<ThePianoKeys :notes="pianoKeys"></ThePianoKeys>
		<TheRoll :notes="pianoKeys"></TheRoll>
	</div>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";

import { store } from "./store/store";
import Oscillator from "./Objects/Oscillator";
import { getKeysArray } from "./util/helper";

// Sidebar components
import TheSidebar from "./Components/Sidebar/TheSidebar.vue";
import TheControls from "./Components/Sidebar/TheControls.vue";
import TheRack from "./Components/Sidebar/TheRack.vue";
import OscillatorUI from "./Components/Sidebar/OscillatorUI.vue";
import Filter from "./Components/Sidebar/Includes/Filter.vue";

import ThePianoKeys from "./Components/ThePianoKeys.vue";

// Piano roll components
import TheRoll from "./Components/Main/TheRoll.vue";
import PitchRow from "./Components/Main/PitchRow.vue";
import Note from "./Components/Main/Note.vue";

Vue.component("Note", Note);
Vue.component("FilterUI", Filter);

Vue.use(Vuex);
// var lastOscillator;
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
		};
	},

	mounted() {
		store.commit("createAudioContext");
		window.addEventListener("keydown", this.keydownHandler);
		window.addEventListener("keyup", this.keyupHandler);
		store.commit("addOscillator");
	},

	computed: {
		pianoKeys() {
			return getKeysArray();
		}
	},

	methods: {
		keydownHandler(e) {
			console.log("triggered");
			if (
				store.state.activeOscillator &&
				e.keyCode != this.previousKeyCode
			) {
				this.previousKeyCode = e.keyCode;
				this.lastOscillator = store.state.activeOscillator;
				this.$store.state.keypressActive = true;
				this.$store.state.activeOscillator.oscillatorNode &&
					Oscillator.stopNote(this.$store.state.activeOscillator);

				/**
				 * TODO: This whole section can be done with vue directives
				 * on the pianoKeys component
				 */
				switch (e.keyCode) {
					case 81:
						Oscillator.playNote(
							store.state.activeOscillator,
							"C" + this.$store.state.project.baseOctave
						);
						this.currentNote =
							"C" + this.$store.state.project.baseOctave;
						break;
					case 50:
						Oscillator.playNote(
							store.state.activeOscillator,
							"C#" + this.$store.state.project.baseOctave
						);
						this.currentNote =
							"C#" + this.$store.state.project.baseOctave;
						break;
					case 87:
						Oscillator.playNote(
							store.state.activeOscillator,
							"D" + this.$store.state.project.baseOctave
						);
						this.currentNote =
							"D" + this.$store.state.project.baseOctave;
						break;
					case 51:
						Oscillator.playNote(
							store.state.activeOscillator,
							"D#" + this.$store.state.project.baseOctave
						);
						this.currentNote =
							"D#" + this.$store.state.project.baseOctave;
						break;
					case 69:
						Oscillator.playNote(
							store.state.activeOscillator,
							"E" + this.$store.state.project.baseOctave
						);
						break;
					case 82:
						Oscillator.playNote(
							store.state.activeOscillator,
							"F" + this.$store.state.project.baseOctave
						);
						break;
					case 53:
						Oscillator.playNote(
							store.state.activeOscillator,
							"F#" + this.$store.state.project.baseOctave
						);
						break;
					case 84:
						Oscillator.playNote(
							store.state.activeOscillator,
							"G" + this.$store.state.project.baseOctave
						);
						break;
					case 54:
						Oscillator.playNote(
							store.state.activeOscillator,
							"G#" + this.$store.state.project.baseOctave
						);
						break;
					case 89:
						Oscillator.playNote(
							store.state.activeOscillator,
							"A" + this.$store.state.project.baseOctave
						);
						break;
					case 55:
						Oscillator.playNote(
							store.state.activeOscillator,
							"A#" + this.$store.state.project.baseOctave
						);
						break;
					case 85:
						Oscillator.playNote(
							store.state.activeOscillator,
							"B" + this.$store.state.project.baseOctave
						);
						break;
					case 32: //TODO: remove
						Oscillator.playForDuration(
							store.state.activeOscillator,
							"B" + this.$store.state.project.baseOctave,
							1
						);
				}
			}
		},
		keyupHandler(e) {
			if (
				this.$store.state.activeOscillator &&
				e.keyCode == this.previousKeyCode
			) {
				Oscillator.stopNote(this.$store.state.activeOscillator);
				this.$store.state.keypressActive = false;
			}
		}
	}
};
</script>
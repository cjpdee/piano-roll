<template>
	<div id="app">
		<TheSidebar></TheSidebar>
		<ThePianoKeys :notes="pianoKeys"></ThePianoKeys>
		<TheRoll></TheRoll>
	</div>
</template>

<script>

import Vue from 'vue';
import Vuex from 'vuex';


import {store} from './store/store';

// Sidebar components
import TheSidebar from './Components/Sidebar/TheSidebar.vue';
import TheControls from './Components/Sidebar/TheControls.vue';
import TheRack from './Components/Sidebar/TheRack.vue';
import Oscillator from './Components/Sidebar/Oscillator.vue';

import ThePianoKeys from './Components/ThePianoKeys.vue';

// Piano roll components
import TheRoll from './Components/Main/TheRoll.vue';
import PitchRow from './Components/Main/PitchRow.vue';
import Note from './Components/Main/Note.vue';

Vue.use(Vuex);

export default {
	components: {
		TheSidebar,
		ThePianoKeys,
		TheRoll
	},
	store,
	data() {
		return store.state
	},

	mounted() {
		store.commit("createAudioContext");
	},

	computed: {
		pianoKeys() {
			let baseOctave = this.$store.state.project.baseOctave;
			let numOctaves = this.$store.state.project.numOctaves;
			let notes = this.$store.state.data.notes;

			console.log(notes);
			let notesInRoll = []; // rename this is terrible

			for (let i = baseOctave; i < baseOctave + numOctaves; i++) {
				this.$store.state.data.notes.forEach(note => {
					notesInRoll.push(note + i);
				})
			}

			console.log(notesInRoll);
			return notesInRoll.reverse()
		}
	}

};

</script>
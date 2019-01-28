<template>
	<div id="app">
		<Sidebar></Sidebar>
		<PianoKeys :notes="pianoKeys"></PianoKeys>
		<Roll></Roll>
	</div>
</template>

<script>

import Vue from 'vue';
import Vuex from 'vuex';


import {store} from './store/store';

// Sidebar components
import Sidebar from './Components/Sidebar/Sidebar.vue';
import Controls from './Components/Sidebar/Controls.vue';
import Rack from './Components/Sidebar/Rack.vue';
import Oscillator from './Components/Sidebar/Oscillator.vue';

import PianoKeys from './Components/PianoKeys.vue';

// Piano roll components
import Roll from './Components/Main/Roll.vue';
import PitchRow from './Components/Main/PitchRow.vue';
import Note from './Components/Main/Note.vue';

Vue.use(Vuex);

export default {
	components: {
		Sidebar,
		PianoKeys,
		Roll
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
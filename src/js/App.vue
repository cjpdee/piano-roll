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
		store.commit("addOscillator");
	},

	computed: {
		pianoKeys() {
			return getKeysArray();
		}
	}
};
</script>
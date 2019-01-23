<template>

<div id="app">
	<Sidebar></Sidebar>
	<PianoKeys></PianoKeys>
	<Roll></Roll>
</div>

</template>

<script>

import Vue from 'vue';
import Vuex from 'vuex';


import store from './store/store';

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

	data() {
		return store.state
	},

	mounted() {
		store.commit("createAudioContext");
	}

};

</script>
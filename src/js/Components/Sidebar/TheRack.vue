<template>
	<div class="rack">
		<h2 class="rack__heading">Rack</h2>
		<button class="rack__button" @click="createOscillator">New Osc</button>
		<button class="rack__button" @click="createOscillator">New Sample</button>
		<OscillatorUI v-for="oscillator in oscillators" :key="oscillator.id" :id="oscillator.id"></OscillatorUI>
	</div>
</template>

<script>

import OscillatorUI from './OscillatorUI';
import {mapState} from 'vuex';

export default {
	name: "TheRack",
	components: { OscillatorUI },
	props: {

	},
	computed: mapState([
		'oscillators'
	]),

	watched: {
		'audioContext': function() {
			console.log('audio context created');
			this.createOscillator();
		}
	},

	methods: {
		createOscillator() {
			this.$store.commit('addOscillator');
		},
	}
}




</script>
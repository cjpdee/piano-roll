<template>
	<div class="rack">
		<h2 class="rack__heading">Rack</h2>
		<button class="rack__button" @click="createOscillator">New Osc</button>
		<OscillatorInterface v-for="oscillator in oscillators" :key="oscillator.id" :id="oscillator.id"></OscillatorInterface>
	</div>
</template>

<script>

import OscillatorInterface from './OscillatorInterface';
import {mapState} from 'vuex';

export default {
	name: "TheRack",
	components: { OscillatorInterface },
	props: {

	},
	computed: mapState([
		'oscillators'
	]),

	methods: {
		createOscillator() {
			this.$store.commit('addOscillator');
		},
	}
}




</script>
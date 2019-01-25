<template>
	<div class="rack">
		<h2 class="rack__heading">Rack</h2>
		<button class="rack__button" @click="createOscillator">New Osc</button>
		<Oscillator v-for="oscillator in oscillators" :key="oscillator.id" :id="oscillator.id"></Oscillator>
	</div>
</template>

<script>

import Oscillator from './Oscillator';
import {mapState} from 'vuex';

export default {
	name: "Rack",
	components: { Oscillator },
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
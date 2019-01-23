<template>
	<div class="rack">
		<h2 class="rack__heading">Rack</h2>
		<button class="rack__button">New Osc</button>
		<Oscillator></Oscillator>
	</div>
</template>

<script>
import store from '../../store/store.js';
import Oscillator from './Oscillator';

export default {
	name: "Rack",
	components: { Oscillator },
	props: {

	},
	computed: {
		oscillators() {
			return store.state.oscillators;
			console.log(store.state.oscillators);
		}
	}
}


</script>
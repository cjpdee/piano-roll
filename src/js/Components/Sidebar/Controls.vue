<template>

<div class="project-setup"> 
	<label for="bpm">BPM</label>
	<input data-js-project="bpm" type="number" :value=bpm name="bpm" step="1" id="bpm">
	<button data-js-project="new-oscillator" class="project-setup__new-oscillator">+</button>
	<span class="project-setup__controls">
		<button class="project-setup__control green">Play</button>
		<button class="project-setup__control red">Stop</button>
	</span>
</div>

</template>

<script>
import store from "../../store/store";

export default {
	name: 'Controls',
	computed : {
		bpm() {
			console.log(this);
			return store.state.project.bpm
		}
	}
}

</script>
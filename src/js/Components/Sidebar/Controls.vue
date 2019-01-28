<template>
	<div class="project-setup"> 
		<label for="bpm">BPM</label>
		<input data-js-project="bpm" type="number" v-model="bpm" name="bpm" step="5" id="bpm">
		<button data-js-project="new-oscillator" class="project-setup__new-oscillator">+</button>
		<span class="project-setup__controls">
			<button @click="startAudioContext" class="project-setup__control green">Play</button>
			<button class="project-setup__control red">Stop</button>
		</span>
	</div>
</template>

<script>

export default {
	name: 'Controls',
	computed : {
		bpm: {
			get() {
				return this.$store.state.project.bpm
			},
			set(value) {
				this.$store.commit("setBPM",{
					bpm: parseInt(value)
				})
			}
		}
	},
	methods: {
		startAudioContext() {
			this.$store.state.audioContext.resume();
		},
	}
}

</script>
<template>
	<div class="project-setup"> 
		<label for="bpm">BPM</label>
		<input data-js-project="bpm" type="number" v-model="bpm" name="bpm" step="5" id="bpm">

		<select v-model="baseOctave" name="octave" id="octave">
			<option value="4">A4</option>
			<option value="3">A3</option>
			<option value="2">A2</option>
			<option value="1">A1</option>
			<option value="0">A0</option>
		</select>

		<select v-model="numOctaves" name="octave" id="octave">
			<option value="1">1</option>
			<option value="2">2</option>
		</select>
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
		},
		baseOctave: {
			get() {
				return this.$store.state.project.baseOctave
			},
			set(value) {
				this.$store.commit("setBaseOctave",{
					baseOctave: parseInt(value)
				})
			}
		},
		numOctaves: {
			get() {
				return this.$store.state.project.numOctaves
			},
			set(value) {
				this.$store.commit("setNumOctaves",{
					numOctaves: parseInt(value)
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
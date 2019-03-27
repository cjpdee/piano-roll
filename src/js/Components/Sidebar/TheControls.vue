<template>
	<div class="project-setup">
		<label for="bpm">
			BPM
			<input data-js-project="bpm" type="number" v-model="bpm" name="bpm" step="5" id="bpm">
		</label>

		<label>
			# of bars
			<select v-model="numBars">
				<option :value="1">1</option>
				<option :value="2">2</option>
				<option :value="4">4</option>
				<option :value="8">8</option>
			</select>
		</label>

		<div>
			<label>
				Base Octave
				<select v-model="baseOctave" name="octave" id="octave">
					<option value="4">A4</option>
					<option value="3">A3</option>
					<option value="2">A2</option>
					<option value="1">A1</option>
					<option value="0">A0</option>
				</select>
			</label>

			<label>
				# of Octaves
				<select v-model="numOctaves" name="octave" id="octave">
					<option value="1">1</option>
					<option value="2">2</option>
				</select>
			</label>

			<label>
				Root note
				<select v-model="rootNote" name="rootNote" id="rootNote">
					<option value="B">B</option>
					<option value="A#">A#</option>
					<option value="A">A</option>
					<option value="G#">G#</option>
					<option value="G">G</option>
					<option value="F#">F#</option>
					<option value="F">F</option>
					<option value="E">E</option>
					<option value="D#">D#</option>
					<option value="D">D</option>
					<option value="C#">C#</option>
					<option value="C">C</option>
				</select>
			</label>
		</div>

		<div>
			<label>
				Size of notes in beats
				<select v-model="noteLengthInBeats">
					<option :value="0.5">0.5</option>
					<option :value="1">1</option>
					<option :value="2">2</option>
					<option :value="3">3</option>
					<option :value="4">4</option>
				</select>
			</label>
		</div>

		<span class="project-setup__controls">
			<button @click="startAudioContext" class="project-setup__control green">Play</button>
			<button class="project-setup__control red">Stop</button>
		</span>
	</div>
</template>

<style lang="scss" scoped>
// TODO: remove
label {
	display: block;
}
input[type="number"] {
	width: 50%;
	display: inline-block;
}
</style>


<script>
import Player from "../../store/Player";

export default {
	name: "TheControls",
	computed: {
		bpm: {
			get() {
				return this.$store.state.project.bpm;
			},
			set(value) {
				this.$store.commit("setBPM", {
					bpm: parseInt(value)
				});
			}
		},
		baseOctave: {
			get() {
				return this.$store.state.project.baseOctave;
			},
			set(value) {
				this.$store.commit("setBaseOctave", {
					baseOctave: parseInt(value)
				});
			}
		},
		numOctaves: {
			get() {
				return this.$store.state.project.numOctaves;
			},
			set(value) {
				this.$store.commit("setNumOctaves", {
					numOctaves: parseInt(value)
				});
			}
		},
		rootNote: {
			get() {
				return this.$store.state.project.rootNote;
			},
			set(value) {
				this.$store.commit("setRootNote", {
					rootNote: value
				});
				/*
					TODO: this is the new source of truth for the project's key system.
					Remember to implement this into the store properly and have it not
					affect notes already in the project if you change the root note etc.
				*/
				let notes = this.$store.state.data.notes;
				let rootNote = this.$store.state.project.rootNote;
				// console.log('aav',notes.slice(notes.indexOf(rootNote)),notes.slice(0,notes.indexOf(rootNote)));
			}
		},
		numBars: {
			get() {
				return this.$store.state.project.numBars;
			},
			set(value) {
				this.$store.commit("setNumBars", {
					numBars: value
				});
			}
		},
		noteLengthInBeats: {
			get() {
				return this.$store.state.project.currentNoteLengthInBeats;
			},
			set(value) {
				this.$store.commit("setNoteLengthInBeats", {
					length: value
				});
			}
		}
	},
	methods: {
		startAudioContext() {
			this.$store.state.audioContext.resume();
		}
	}
};
</script>
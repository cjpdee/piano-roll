<template>
	<div class="project-setup">
		<label for="bpm">
			BPM
			<input data-js-project="bpm" type="number" v-model="bpm" name="bpm" step="5" id="bpm">
		</label>

		<label>
			Master
			<input type="range" v-model="masterGain" min="0" max="1" step="0.1">
		</label>

		<div>
			<h4>Piano Roll Setup</h4>
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
			<h4>Grid Settings</h4>
			<label>
				Grid Time Signature
				<select v-model="timeSignature">
					<option :value="1">1</option>
					<option :value="2">1/2</option>
					<option :value="3">1/3</option>
					<option :value="4">1/4</option>
					<option :value="6">1/6</option>
					<option :value="8">1/8</option>
					<option :value="16">1/16</option>
				</select>
			</label>

			<label>
				Note Length
				<select v-model="noteSize">
					<option :value="1">1</option>
					<option :value="2">1/2</option>
					<option :value="3">1/3</option>
					<option :value="4">1/4</option>
					<option :value="6">1/6</option>
					<option :value="8">1/8</option>
					<option :value="16">1/16</option>
				</select>
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
		</div>

		<span class="project-setup__controls">
			<button @click="play()" class="project-setup__control green">Play</button>
			<button @click="stop()" class="project-setup__control red">Stop</button>
			<button @click="save()" class="project-setup__control red">Save</button>
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
import { durationFromPercentage } from "../../store/helper";

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
				let notes = this.$store.state.data.notes;
				let rootNote = this.$store.state.project.rootNote;
			}
		},
		timeSignature: {
			get() {
				return this.$store.state.project.timeSignature;
			},
			set(value) {
				this.$store.commit("setTimeSignature", {
					timeSignature: value
				});
			}
		},
		noteSize: {
			get() {
				return this.$store.state.project.noteSize;
			},
			set(value) {
				this.$store.commit("setNoteSize", {
					noteSize: value
				});
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
		masterGain: {
			get() {
				if (this.$store.state.masterGain) {
					return this.$store.state.masterGain.gain.value;
				}
			},
			set(value) {
				if (this.$store.state.masterGain) {
					this.$store.commit("setMasterGain", {
						masterGain: parseFloat(value)
					});
				}
			}
		}
	},
	methods: {
		play() {
			Player.play();
			this.animatePositionMarker();
		},

		stop() {
			Player.stop();

			let posMarker = document.querySelector("[data-js=position-marker]");
			posMarker.setAttribute("style", "");
		},
		save() {
			const data = JSON.stringify(this.$store.state);
			window.localStorage.setItem("project", data);
			console.log(JSON.parse(window.localStorage.getItem("project")));
		}
	}
};
</script>
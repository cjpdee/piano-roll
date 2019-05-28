<template>
    <div class="topbar__item">
        <label for="bpm">
            BPM
            <input data-js-project="bpm" type="number" v-model="bpm" name="bpm" step="5" id="bpm">
        </label>
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

        <label>
			Master Volume
			<input type="range" v-model="masterGain" min="0" max="1" step="0.1">
		</label>
    </div>
</template>

<script>
export default {
    name: "TheProjectSetup",
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
    }
}
</script>
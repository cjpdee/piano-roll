import Vue from "vue";
import Vuex from "vuex";

// Mutations separated by concern
import projectMutations from "./projectMutations";
import oscillatorMutations from "./oscillatorMutations";
import rollMutations from "./rollMutations";

Vue.use(Vuex);

const store = new Vuex.Store({

	modules: {
		projectMutations,
		rollMutations,
		oscillatorMutations
	},

	state: {
		project: { // TODO: rename some of these for clarity
			name: "myProject",
			bpm: 120,
			timeSignature: 4,
			noteSize: 4,
			numBars: 4,
			baseOctave: 2,
			numOctaves: 4,
			rootNote: "C",
			noteLength: 1
		},
		oscillators: [],
		activeOscillator: null, // saves reference only
		mouseActive: false,
		keypressActive: false,

		data: {
			notes: ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"],
			waveforms: ["sine", "square", "sawtooth", "triangle"],
			filters: ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "peaking", "notch", "allpass"]
		},
		audioContext: null,
		masterGain: null
	},
});

export {
	store
};

import Vue from "vue";
import Vuex from "vuex";

import Oscillator from "./Oscillator";

Vue.use(Vuex);

// TODO: Think about storing this data in localhost in case
// the user accidentally exits?
const store = new Vuex.Store({
	state: {
		project: {
			name: "myProject",
			bpm: 100,
			numBars: 4,
			baseOctave: 2,
			numOctaves: 2,
			rootNote: "C",
			currentNoteLengthInBeats: 1
		},
		oscillators: [],
		activeOscillator: null,
		mouseActive: false,
		keypressActive: false,

		data: {
			notes: ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"],
			keys: {
				C: 81,
				Csh: 50,
				D: 87,
				Dsh: 51,
				E: 69,
				F: 82,
				Fsh: 53,
				G: 84,
				Gsh: 54,
				A: 89,
				Ash: 55,
				B: 85
			},
			waveforms: ["sine", "square", "sawtooth", "triangle"],
			filters: ["lowpass", "highpass", "bandpass"]
		},
		audioContext: null,
	},

	mutations: {

		/*
			General / Misc
		*/

		createAudioContext(state) {
			let audioCtx;
			audioCtx = window.AudioContext || window.webkitAudioContext;
			state.audioContext = new audioCtx;
		},

		setMouseActiveState(state, payload) {
			this.state.mouseActive = payload;
		},

		/*
			Project Mutations
		*/

		setName(name) {
			this.state.project.name = name;
		},
		setBPM(state, payload) {
			this.state.project.bpm = payload.bpm;
		},
		setNumBars(state, payload) {
			this.state.project.numBars = payload.numBars;
		},
		// Piano roll setup
		setBaseOctave(state, payload) {
			this.state.project.baseOctave = payload.baseOctave;
		},
		setNumOctaves(state, payload) {
			this.state.project.numOctaves = payload.numOctaves;
		},
		setRootNote(state, payload) {
			this.state.project.rootNote = payload.rootNote;
		},

		setNoteLengthInBeats(state, payload) {
			this.state.project.currentNoteLengthInBeats = payload.length;
		},

		/*
			Adding / removing oscillators
		*/

		addOscillator() {
			let osc = new Oscillator();
			this.state.oscillators.push(osc);
			this.state.activeOscillator = osc;
		},

		removeOscillator(oscillator_id) {
			let index = this.state.oscillators.indexOf(oscillator_id);
			index > -1 && this.state.oscillators.splice(index, 1);
		},

		setCurrentOscillator(state, payload) {
			let oscIndex = this.state.oscillators.findIndex(oscillator => oscillator.id == payload.oscillator_id);
			let osc = this.state.oscillators[oscIndex];
			this.state.activeOscillator = osc;
		},

		/*
			Oscillator Mutations
		*/

		waveform(state, payload) {
			let oscIndex = this.state.oscillators.findIndex(oscillator => oscillator.id == payload.oscillator_id);
			let osc = this.state.oscillators[oscIndex];
			osc.waveform = payload.waveform;
		},

		volume(state, payload) {
			let oscIndex = this.state.oscillators.findIndex(oscillator => oscillator.id == payload.oscillator_id);
			let property = this.state.oscillators[oscIndex].volume;
			switch (payload.property) {
				case "amplitude":
					property.amplitude = payload.value;
					break;
				case "attack":
					property.attack = payload.value;
					break;
				case "decay":
					property.decay = payload.value;
					break;
			}
		},

		biquadFilter(state, payload) {
			let oscIndex = this.state.oscillators.findIndex(oscillator => oscillator.id == payload.oscillator_id);
			let property = this.state.oscillators[oscIndex].filter;
			switch (payload.property) {
				case "type":
					property.type = payload.value;
					break;
				case "cutoff":
					property.cutoff = payload.value;
					break;
				case "attack":
					property.attack = payload.value;
					break;
				case "decay":
					property.decay = payload.value;
					break;
			}
		},

		lpHpFilter(state, payload) {
			let oscIndex = this.state.oscillators.findIndex(oscillator => oscillator.id == payload.oscillator_id);
			let property;

			if (payload.filter) {
				property = this.state.oscillators[oscIndex].lowpass;
			} else {
				property = this.state.oscillators[oscIndex].highpass;
			}

			switch (payload.property) {
				case "cutoff":
					property.cutoff = payload.value;
					break;
				case "attack":
					property.attack = payload.value;
					break;
				case "decay":
					property.decay = payload.value;
					break;
				case "resonance":
					property.resonance = payload.value;
					break;
			}
		},

		addNoteForActiveOsc(state, note) {
			if (this.state.activeOscillator.notes.length < 10) {
				this.state.activeOscillator.notes.push(note);
			}
		}
	},
});

export {
	Oscillator,
	store
};

import Vue from "vue";
import Vuex from "vuex";

import Oscillator from "./Oscillator";
import {
	getOscillator,
	getNote
} from "./helper";

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		project: {
			name: "myProject",
			bpm: 120,
			timeSignature: 4,
			noteSize: 4,
			numBars: 4,
			baseOctave: 2,
			numOctaves: 2,
			rootNote: "C",
			noteLength: 1
		},
		oscillators: [],
		activeOscillator: null, // saves reference only
		mouseActive: false,
		keypressActive: false,

		data: {
			notes: ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"],
			keys: { // TODO: unnecessary
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
		masterGain: null
	},

	mutations: {

		/*
			General / Misc
		*/

		createAudioContext(state) {
			let audioCtx;
			audioCtx = window.AudioContext || window.webkitAudioContext;
			state.audioContext = new audioCtx;

			// Create the master volume control
			state.masterGain = state.audioContext.createGain();
			state.masterGain.gain.value = 0.6;
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
		setTimeSignature(state, payload) {
			this.state.project.timeSignature = payload.timeSignature
		},
		setNoteSize(state, payload) {
			this.state.project.noteSize = payload.noteSize
		},
		setNumOctaves(state, payload) {
			this.state.project.numOctaves = payload.numOctaves;
		},
		setRootNote(state, payload) {
			this.state.project.rootNote = payload.rootNote;
		},

		setNoteLengthInBeats(state, payload) {
			this.state.project.noteLength = payload.length;
		},

		setMasterGain(state, payload) {
			if (this.state.masterGain) {
				this.state.masterGain.gain.value = payload.masterGain;
			}
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
			let osc = getOscillator(payload.oscillator_id);
			this.state.activeOscillator = osc;
		},

		/*
			Oscillator Mutations
		*/

		setOscillatorWaveform(state, payload) {
			let osc = getOscillator(payload.oscillator_id);
			osc.waveform = payload.waveform;
		},

		setOscillatorGain(state, payload) {
			getOscillator(payload.oscillator_id).gain = payload.gain
		},

		updateOscillatorFiltersList(state, payload) {
			getOscillator(payload.oscillator_id).filters = payload.filters
		},

		// TODO: should have a function for applying any kind of envelope
		volume(state, payload) {
			let osc = getOscillator(payload.oscillator_id);
			let property = osc.env;
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
			let osc = getOscillator(payload.oscillator_id);
			let property = osc.filter;
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
			let osc = getOscillator(payload.oscillator_id);
			let property;

			if (payload.filter) {
				property = osc.lowpass;
			} else {
				property = osc.highpass;
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

		addNote(state, note) {
			// add note object to notes array
			if (state.activeOscillator.notes.length < 32) {
				state.activeOscillator.notes.push(note);
			}
		},

		removeNote(state, id) {
			// splice the Note object out of the notes array
			if (state.activeOscillator.notes.length > -1) {
				state.activeOscillator.notes.splice(
					state.activeOscillator.notes.findIndex(note => note.id === id),
					1
				);
			}
		},

		updateNotePos(state, payload) {
			getNote(payload.note_id).position = payload.pos;
		}
	},
});

export {
	Oscillator,
	store
};

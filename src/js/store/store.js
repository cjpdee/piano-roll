import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

class Oscillator {
	static generateId() {
		let id = Math.floor((Math.random() * 10000000)).toString(16);
		if ( store.state.oscillators.filter(oscillator => oscillator.id == id) ) {
			return Math.floor((Math.random() * 10000000)).toString(16);
		} else {
			return id;
		}
	}

	static noteFrequency(note) {
		let key    = note.slice(0,note.length-1);
		let octave = note.slice(-1);
		console.log(key,octave);

		// (octave (4 is concert octave) * keys in octave) + index of note in the notes array
		let keyNumber = ((octave * 12) + (store.state.data.notes.indexOf(key) + 1)); // key is a pretty bad name
		
		// The algorithm to get the frequency of a note
		// from its key number (A0 - C8)
		// can adjust the tuning - 440 is A4 tuning
		let freq = 440*Math.pow(2,( (keyNumber / 12) - 49 / 12));

		console.log("frequency",freq);
		return freq;
	}

	constructor(){
		this.id = Oscillator.generateId();
		this.volume = {
			amplitude: 50,
			attack:    0,
			decay:     0
		};
		this.waveform = "sine";
		this.lowpass = {
			cutoff:    0,
			attack:    0,
			decay:     0,
			resonance: 0
		};
		this.highpass = {
			cutoff:    0,
			attack:    0,
			decay:     0,
			resonance: 0
		};
	}
}


const store = new Vuex.Store({
	state: {
		project : {
			name: "myProject",
			bpm : 130,
			baseOctave: 2,
			numOctaves: 2
		},
		oscillators: [
			
		],
		activeOscillator: null,
		mouseActive: false,

		data : {
			notes:   ["A" ,"A#","B" ,"C" ,"C#","D" ,"D#" ,"E","F" ,"F#","G" ,"G#"],
			waveforms: ["sine","square","sawtooth","triangle"]
		},
		audioContext: null,
		filter: null
	},

	mutations: {

		/*
			General / Misc
		*/

		createAudioContext(state) {
			let audioCtx;
			audioCtx = window.AudioContext || window.webkitAudioContext;
			state.audioContext = new audioCtx;
			let x = this.state.audioContext.createBiquadFilter();
			x.type="lowpass";
			state.filter = x;
		},

		setMouseActiveState(state,payload) {
			console.log(payload);
			this.state.mouseActive = payload;
		},

		/*
			Project Mutations
		*/

		setName(name) {
			this.state.project.name = name;
		},
		setBPM(state,payload) {
			this.state.project.bpm = payload.bpm;
		},
		setBaseOctave(state,payload) {
			this.state.project.baseOctave = payload.baseOctave;
		},
		setNumOctaves(state,payload) {
			this.state.project.numOctaves = payload.numOctaves;
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
			index > -1 && this.state.oscillators.splice(index,1);
		},

		setCurrentOscillator(state,payload) {
			let oscIndex = this.state.oscillators.findIndex(oscillator => oscillator.id == payload.oscillator_id);
			let osc = this.state.oscillators[oscIndex];
			this.state.activeOscillator = osc;
		},

		/*
			Oscillator Mutations
		*/

		waveform(state,payload) {
			let oscIndex = this.state.oscillators.findIndex(oscillator => oscillator.id == payload.oscillator_id);
			let osc = this.state.oscillators[oscIndex];
			osc.waveform = payload.waveform;
		},

		volume(state,payload) {
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

		lpHpFilter(state,payload) {
			let oscIndex = this.state.oscillators.findIndex(oscillator => oscillator.id == payload.oscillator_id);
			let property;

			if(payload.filter) {
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
	},
});

export {Oscillator, store};

/*

Todo:

- on oscillator - if user clicks osc name + id, allow to give the osc a name
- allow user to select active oscillator
- link up PianoKeys to the oscillators

In piano roll:
- 'onion skin' effect for scales
- the scale + key will be controlled from the Controls component

*/

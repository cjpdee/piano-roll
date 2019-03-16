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
		let tone    = note.slice(0,note.length-1);
		let octave = note.slice(-1);
		console.log(tone,octave);

		// (octave num * keys in octave) + index of note in the notes array
		let keyNumber = ((octave * 12) + (store.state.data.notes.indexOf(tone) + 1)); // key is a pretty bad name
		// The algorithm to get the frequency of a note
		// from its key number (A0 - C8)
		// can adjust the tuning - 440 is A4 tuning
		let freq = 440*Math.pow(2,( (keyNumber / 12) - 49 / 12));

		console.log("frequency",freq);
		return freq;
	}

	static playNote(oscillator,note) { // new 1
		
		oscillator.oscillatorNode && oscillator.oscillatorNode.stop(store.state.audioContext.currentTime);

		let frequency = Oscillator.noteFrequency(note);

		// create & setup oscillatorNode to play the note
		oscillator.oscillatorNode = store.state.audioContext.createOscillator();
		oscillator.oscillatorNode.type = oscillator.waveform;
		
		// Setup filter
		oscillator.filter.filterNode.frequency.value = oscillator.filter.cutoff;
		oscillator.oscillatorNode.connect(oscillator.filter.filterNode);

		// Connect filter to audio output
		oscillator.filter.filterNode.connect(store.state.audioContext.destination);

		// Start the oscillator
		oscillator.oscillatorNode.frequency.setValueAtTime(frequency, store.state.audioContext.currentTime);
		oscillator.oscillatorNode.start();
	}


	static stopNote(oscillator) {
		oscillator.oscillatorNode && oscillator.oscillatorNode.stop(store.state.audioContext.currentTime);
	}

	constructor(){
		this.id = Oscillator.generateId();
		this.volume = {
			amplitude: 50,
			attack:    0,
			decay:     0
		};
		this.waveform = "sine";
		this.filter = {
			type:	   "lowpass",
			cutoff:    2000,
			attack:    0,
			decay:     0,
			resonance: 0,
			filterNode: store.state.audioContext.createBiquadFilter()
		};
		this.filter.filterNode.type=this.filter.type;
	}
}


const store = new Vuex.Store({
	state: {
		project : {
			name: "myProject",
			bpm : 130,
			baseOctave: 2,
			numOctaves: 2,
			rootNote: "A",
			numBars: 4,
			currentNoteLengthInBars: 0.5
		},
		oscillators: [
			
		],
		activeOscillator: null,
		mouseActive: false,
		keypressActive: false,

		data : {
			notes:  ["A" ,"A#","B" ,"C" ,"C#","D" ,"D#" ,"E","F" ,"F#","G" ,"G#"],
			keys : {
				C   : 81,
				Csh : 50,
				D   : 87,
				Dsh : 51,
				E   : 69,
				F   : 82,
				Fsh : 53,
				G   : 84,
				Gsh : 54,
				A   : 89,
				Ash : 55,
				B   : 85
			},
			waveforms: ["sine","square","sawtooth","triangle"],
			filters: ["lowpass","highpass","bandpass"]
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

		setMouseActiveState(state,payload) {
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
		// Piano roll setup
		setBaseOctave(state,payload) {
			this.state.project.baseOctave = payload.baseOctave;
		},
		setNumOctaves(state,payload) {
			this.state.project.numOctaves = payload.numOctaves;
		},
		setRootNote(state,payload) {
			this.state.project.rootNote = payload.rootNote;
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

		biquadFilter(state,payload) {
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

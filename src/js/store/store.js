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
		this.oscillatorNode = store.state.audioContext.createOscillator();
		this.oscillatorNode.type = this.waveform;
		this.oscillatorNode.frequency.setValueAtTime(261.63, store.state.audioContext.currentTime); // value in hertz
		this.oscillatorNode.connect(store.state.audioContext.destination);
		this.oscillatorNode.start();
	}
}

const store = new Vuex.Store({
	state: {
		project : {
			name: "myProject",
			bpm : 130
		},
		oscillators: [
			
		],

		data : {
			notes:   ["C" ,"C#","D" ,"E" ,"E#","F" ,"F#","G" ,"G#","A" ,"A#","B"],
			pitches: [],
			waveforms: ["sine","square","saw"]
		},
		audioContext: null
	},

	mutations: {

		createAudioContext(state) {
			let audioCtx;
			audioCtx = window.AudioContext || window.webkitAudioContext;
			state.audioContext = new audioCtx;
			state.audioContext.resume();
			console.log(state.audioContext);
		},


		/*
			Project / Global Mutations
		*/

		setName(name) {
			this.state.project.name = name;
		},
		setBPM(bpm) {
			this.state.project.bpm = bpm;
		},

		/*
			Adding / removing oscillators
		*/

		addOscillator() {
			this.state.oscillators.push(new Oscillator());
		},

		removeOscillator(oscillator_id) {
			let index = this.state.oscillators.indexOf(oscillator_id);
			index > -1 && this.state.oscillators.splice(index,1);
		},

		/*
			Oscillator Mutations
		*/

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

		// lowpass(state,payload) {
		// 	let oscIndex = this.state.oscillators.findIndex(oscillator => oscillator.id == payload.oscillator_id);
		// 	let property = this.state.oscillators[oscIndex].lowpass;
			
		// },

		// highpass(state,payload) {
		// 	let oscIndex = this.state.oscillators.findIndex(oscillator => oscillator.id == payload.oscillator_id);
		// 	let property = this.state.oscillators[oscIndex].lowpass;
		// 	switch (payload.property) {
		// 	case "cutoff":
		// 		property.cutoff = payload.value;
		// 		break;
		// 	case "attack":
		// 		property.attack = payload.value;
		// 		break;
		// 	case "decay":
		// 		property.decay = payload.value;
		// 		break;
		// 	case "resonance":
		// 		property.resonance = payload.value;
		// 		break;
		// 	}
		// },
	},
});

export default store;


/*

Todo:

- create an id-generating helper function using Math.random, possibly some numbers=letters thing
- give store loads of mutations, that are flexible (can specify which properties for which filter etc


- on oscillator - if user clicks osc name + id, allow to give the osc a name


*/

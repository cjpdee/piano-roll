import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

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
		},
		audioContext: null
	},

	mutations: {

		createAudioContext(state) {
			let audioCtx;
			audioCtx = window.AudioContext || window.webkitAudioContext;
			state.audioContext = new audioCtx;
			state.audioContext.resume();
		},


		// project setup
		setName(name) {
			this.state.project.name = name;
		},
		setBPM(bpm) {
			this.state.project.bpm = bpm;
		},




		// oscillators
		addOscillator(oscillator) {
			this.state.oscillators.push(oscillator);
		},

		removeOscillator(oscillator_id) {
			let index = this.state.oscillators.indexOf(oscillator_id);
			index > -1 && this.state.oscillators.splice(index,1);
		}
	}
});

export default store;
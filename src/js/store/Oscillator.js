import {
	store
} from "./store";

export default class Oscillator {
	static generateId() {
		let id = Math.floor((Math.random() * 10000000)).toString(16);
		if (store.state.oscillators.filter(oscillator => oscillator.id == id)) {
			return Math.floor((Math.random() * 10000000)).toString(16);
		} else {
			return id;
		}
	}

	static noteFrequency(note) {
		let tone = note.slice(0, note.length - 1);
		let octave = note.slice(-1);
		console.log(tone, octave);

		// (octave num * keys in octave) + index of note in the notes array
		let keyNumber = ((octave * 12) + (store.state.data.notes.indexOf(tone) + 1)); // key is a pretty bad name
		// The algorithm to get the frequency of a note
		// from its key number (A0 - C8)
		// can adjust the tuning - 440 is A4 tuning
		let freq = 440 * Math.pow(2, ((keyNumber / 12) - 49 / 12));

		console.log("frequency", freq);
		return freq;
	}

	static playNote(oscillator, note) { // new 1

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

	static playForDuration(oscillator, note, duration) {
		Oscillator.playNote(oscillator, note);
		console.log(store.state.audioContext.currentTime);
		oscillator.oscillatorNode.stop(store.state.audioContext.currentTime + duration);
	}

	constructor() {
		this.id = Oscillator.generateId();
		this.volume = {
			amplitude: 50,
			attack: 0,
			decay: 0
		};
		this.waveform = "sine";
		this.filter = {
			type: "lowpass",
			cutoff: 2000,
			attack: 0,
			decay: 0,
			resonance: 0,
			filterNode: store.state.audioContext.createBiquadFilter()
		};
		this.notes = [];
		this.filter.filterNode.type = this.filter.type;
	}
}

import {
	store
} from "../store/store";
import {
	durationFromPercentage,
	animatePositionMarker,
} from "../util/helper";
import {
	generateOscId,
	generateFilterId
} from "../util/generateId";

export default class Oscillator {

	// TODO: move to new helper file
	static noteFrequency(note) {
		const tone = note.slice(0, note.length - 1);
		const octave = note.slice(-1);

		// (octave num * keys in octave) + index of note in the notes array
		const keyNumber = ((octave * 12) + (store.state.data.notes.indexOf(tone) + 1)); // key is a pretty bad name

		return 440 * Math.pow(2, ((keyNumber / 12) - 49 / 12));
		// The algorithm to get the frequency of a note
		// from its key number (A0 - C8)
		// can adjust the tuning - 440 is A4 tuning
		// So maybe this 440 is controlled from the store
	}

	static playNote(oscillator, note, startTime) { // TODO: obsolete, ensure this isn't used
		const frequency = Oscillator.noteFrequency(note);

		// create & setup oscillatorNode to play the note
		oscillator.oscillatorNode = store.state.audioContext.createOscillator();
		oscillator.oscillatorNode.type = oscillator.waveform;

		// Setup filter
		oscillator.filter.filterNode.frequency.value = oscillator.filter.cutoff;
		oscillator.oscillatorNode.connect(oscillator.filter.filterNode);

		// Connect filter to audio output
		oscillator.filter.filterNode.connect(store.state.masterGain);

		store.state.masterGain.connect(store.state.audioContext.destination);

		// Start the oscillator
		oscillator.oscillatorNode.frequency.setValueAtTime(frequency, store.state.audioContext.currentTime);
		oscillator.oscillatorNode.start(startTime);
	}

	// Used for notes playback
	static playForDuration(oscillator, note, startTime, duration) {
		let frequency = Oscillator.noteFrequency(note);

		// Create & setup oscillatorNode to play the note
		oscillator.oscillatorNode = store.state.audioContext.createOscillator();
		oscillator.oscillatorNode.type = oscillator.waveform;

		// Setup filter
		oscillator.filter.filterNode.frequency.value = oscillator.filter.cutoff;

		// Chain it all together
		oscillator.oscillatorNode.connect(oscillator.gainNode);
		oscillator.gainNode.connect(oscillator.filter.filterNode);

		// Connect filter to audio output
		// TODO: function which loops through set filters goes here
		// Make it reusable
		oscillator.filter.filterNode.connect(store.state.masterGain);

		store.state.masterGain.connect(store.state.audioContext.destination);

		// Start the oscillator
		oscillator.oscillatorNode.frequency.setValueAtTime(frequency, store.state.audioContext.currentTime);
		oscillator.oscillatorNode.start(startTime);

		// TODO: change how the position marker works
		// resetPositionMarker() needs to exist also
		animatePositionMarker();

		oscillator.oscillatorNode.stop(startTime + duration);
	}

	static stopNote(oscillator) {
		oscillator.oscillatorNode && oscillator.oscillatorNode.stop(store.state.audioContext.currentTime);
	}

	constructor() {
		this.id = generateOscId();
		this.env = {
			amplitude: 0.6,
			attack: 0,
			hold: 0,
			decay: 0,
			release: 0
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
		this.filters = [];
		this.gainNode = store.state.audioContext.createGain();
	}
}
// TODO: worry about the processing stack
export class Filter {
	constructor() {
		this.id = generateFilterId();
		this.modulationType = "env";
		this.env = {
			amplitude: 50,
			attack: 0,
			hold: 0,
			decay: 0,
			release: 0
		};
		this.type = 'lowpass';
		this.cutoff = 2000;
		this.filterNode = store.state.audioContext.createBiquadFilter();
	}
}

/**
 * types
 * 
 * biquad filter
 * convolver (reverb)
 * dynamicsCompressor
 * WaveShaper
 * 
 */

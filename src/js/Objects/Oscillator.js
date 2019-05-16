import {
	store
} from "../store/store";
import {
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

	static initPlaybackChain(oscillator, frequency) {
		oscillator.oscillatorNode = store.state.audioContext.createOscillator();
		// Create & setup oscillatorNode to play the note
		const OscNode = oscillator.oscillatorNode;
		const GainNode = oscillator.gainNode;
		OscNode.type = oscillator.waveform;


		// Setup filter
		const filters = oscillator.filters;

		// Reset the filter connections so they don't get routed weirdly
		filters.forEach(filter => {
			filter.filterNode.disconnect()
		})

		if (!filters.length) {
			console.log('no filters')
			OscNode.connect(GainNode);
			GainNode.connect(store.state.masterGain);
		} else {
			filters.forEach((filter, index) => {
				filter.filterNode.frequency.value = filter.cutoff;
				filter.filterNode.type = filter.type;
				filter.filterNode.Q.value = filter.quality;
				filter.filterNode.gain.value = 1;

				if (index === 0) {
					OscNode.connect(filter.filterNode);
				} else if (index > 0) {
					filters[index - 1].filterNode.connect(filter.filterNode);
				}
			})
			filters[filters.length - 1].filterNode.connect(GainNode);
			GainNode.connect(store.state.masterGain)
		}

		store.state.masterGain.connect(store.state.audioContext.destination);

		// Start the oscillator
		oscillator.oscillatorNode.frequency.setValueAtTime(frequency, store.state.audioContext.currentTime);
	}

	static playNote(oscillator, note, startTime) { // TODO: obsolete, ensure this isn't used
		const frequency = Oscillator.noteFrequency(note);
		this.initPlaybackChain(oscillator, frequency);
		oscillator.oscillatorNode.start(startTime);
	}

	// Used for notes playback
	static playForDuration(oscillator, note, startTime, duration) {
		const frequency = Oscillator.noteFrequency(note);
		this.initPlaybackChain(oscillator, frequency);
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
		this.notes = [];
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
		this.quality = 0;
		this.filterNode = store.state.audioContext.createBiquadFilter();
	}
}

/**
 * types
 * 
 * biquad filter
 * convolver (reverb)
 * delay
 * dynamicsCompressor
 * WaveShaper
 * 
 */

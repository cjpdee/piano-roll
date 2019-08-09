import store from "../store/store";
import {
	animatePositionMarker,
} from "../util/helper";
import {
	generateOscId
} from "../util/generateId";
export default class Oscillator {

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

	// TODO: move to new helper file
	static noteFrequency(note) {
		const tone = note.slice(0, note.length - 1);
		const octave = note.slice(-1);

		// (octave num * keys in octave) + index of note in the notes array
		const keyNumber = ((octave * 12) + (store.state.data.notes.indexOf(tone) + 1)); // key is a pretty bad name

		return 440 * Math.pow(2, ((keyNumber / 12) - 49 / 12));
	}

	static resetFilters(filters) {
		filters.forEach(filter => {
			filter.filterNode.disconnect();
		})
	}

	static getFilterCutoffRange(filter, playbackFreq) {
		let freq = filter.filterNode.frequency.value;
		switch (filter.type) {
			case "highpass": freq = playbackFreq / 100 * (filter.cutoff * 3); break;
			default: freq = playbackFreq / 100 * filter.cutoff; break;
		}
	}

	static connectFilters(filters, OscillatorNode, GainNode, frequency) {
		filters.forEach((filter, index) => {
			this.getFilterCutoffRange(filter, frequency);
			console.log(filter);
			console.log(filter.modulation.getEnvPercentages());
			filter.filterNode.type = filter.type;
			filter.filterNode.Q.value = filter.quality;
			filter.filterNode.gain.value = 1;
			filter.modulation.createEnvelope(filter, store.state.audioContext.currentTime);

			if (index === 0) {
				OscillatorNode.connect(filter.filterNode);
			} else if (index > 0) {
				filters[index - 1].filterNode.connect(filter.filterNode);
			}
		})
		filters[filters.length - 1].filterNode.connect(GainNode);

	}

	static initialiseOscillator(oscillator, frequency) {

		oscillator.oscillatorNode = store.state.audioContext.createOscillator();

		const GainNode = oscillator.gainNode;
		const filters = oscillator.filters;

		var OscNode = oscillator.oscillatorNode;

		OscNode.type = oscillator.waveform;
		this.resetFilters(filters);

		if (!filters.length) {
			OscNode.connect(GainNode);
			GainNode.connect(store.state.masterGain);
		} else {
			this.connectFilters(filters, OscNode, GainNode, frequency);
			GainNode.connect(store.state.masterGain)
		}

		store.state.masterGain.connect(store.state.audioContext.destination);

		// Start the oscillator
		OscNode.frequency.setValueAtTime(frequency, store.state.audioContext.currentTime);
	}

	static playNote(oscillator, note, startTime) { // TODO: obsolete, ensure this isn't used
		const frequency = Oscillator.noteFrequency(note);
		this.initialiseOscillator(oscillator, frequency);
		oscillator.oscillatorNode.start(startTime);
	}

	// Used for notes playback
	static playForDuration(oscillator, note, startTime, duration) {
		const frequency = Oscillator.noteFrequency(note);
		this.initialiseOscillator(oscillator, frequency);
		oscillator.oscillatorNode.start(startTime);

		// TODO: change how the position marker works
		// resetPositionMarker() needs to exist also
		animatePositionMarker();

		oscillator.oscillatorNode.stop(startTime + duration);
	}

	static stopNote(oscillator) {
		oscillator.oscillatorNode && oscillator.oscillatorNode.stop(store.state.audioContext.currentTime);
	}
}
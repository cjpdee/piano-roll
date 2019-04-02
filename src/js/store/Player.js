// a class with all the play + timing methods inside.
// neccessary? I'm not sure

import Oscillator from './Oscillator';
import {
	store
} from './store';
import {
	secondsPerBeat,
	loopTimeFrame,
	noteLength
} from "./helper";

export default {
	/**
	 * Get all the notes from each oscillator
	 * and order it by time
	 */
	createQueue() {
		// create an array which contains all notes from the project
		let notes = [];
		store.state.oscillators.forEach((item) => {
			notes = notes.concat(item.notes);
		});

		// sort the notes by their position in the roll
		function compare(a, b) {
			const positionA = a.position;
			const positionB = b.position;

			let comparison = 0;
			if (positionA > positionB) {
				comparison = 1;
			} else if (positionA < positionB) {
				comparison = -1;
			}
			return comparison;
		}

		console.log('unsorted notes', notes.map((x) => x.position));

		notes.sort(compare);

		console.log('sorted notes', notes.map((x) => x.position));

		return notes;
	},

	play() {



		let notes = this.createQueue();

		notes.forEach((note) => {
			console.log(
				note.pitch,
				"length in secs",
				noteLength(note.lengthAsPercentage),
				"position in secs",
				noteLength(note.percentageFromLeft)
			);
		})
		// noteLength(50);

		// let lookahead = 25.0;
		// let scheduleAheadTime = 0.1;

		// let currentNote = 0;
		// let nextNoteDueTime = store.state.audioCtx.currentTime;

		// let noteCounter = 0;

		// function nextNote(note) {
		// 	// TODO: make a function which works out length in time from length as percentage
		// 	nextNoteDueTime += noteLength(note.lengthAsPercentage); // add the length of the note to the time
		// }

	}
};

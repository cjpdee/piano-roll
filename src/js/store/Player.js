// a class with all the play + timing methods inside.
// neccessary? I'm not sure

import Oscillator from './Oscillator';
import {
	store
} from './store';

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
		this.createQueue();
	}
};

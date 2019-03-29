// a class with all the play + timing methods inside.
// neccessary? I'm not sure

import Oscillator from "./Oscillator";
import {
	store
} from "./store";

export default {
	/**
	 * Get all the notes from each oscillator
	 * and order it by time
	 */
	createQueue() {
		let allNotes = [];
		store.state.oscillators.forEach(item => {
			allNotes = allNotes.concat(item.notes);
		})

		let sortedNotes = allNotes.sort(function(noteA, noteB) {
			console.log('note A', noteA.position);
			console.log('note B', noteB.position);
			return noteA.position > noteB.position;
		})

		console.log('all notes', allNotes);
		console.log('sorted notes', sortedNotes);
	},

	play() {
		this.createQueue();
	}
}

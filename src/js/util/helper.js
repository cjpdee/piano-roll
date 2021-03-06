import {
	store
} from '../store/store';
import {
	durationFromPercentage
} from "./time";

/**
 * TODO: this should be split into several parts
 */

// rounding function to snap notes to nearest bar
Number.prototype.floorTo = function(num) {
	var resto = this % num;
	return this - resto;
};


export function getKeysArray() {
	/**
	 * This function takes the note that the user
	 * wants at the bottom of the piano roll and
	 * creates a new notes array starting with the
	 * chosen root note, and then sets this
	 * as the new piano roll order for the whole app
	 */

	const chosenRootOctave = store.state.project.baseOctave;
	const numOctaves = store.state.project.numOctaves;
	const rootNote = store.state.project.rootNote;
	const notes = store.state.data.notes;

	let octaveNotes = (function() {
		let array = [];
		for (let j = 0; j < notes.length; j++) {
			let pointer = (j + notes.indexOf('A')) % notes.length;
			array.push(notes[pointer]);
		}
		return array
	})()

	// offset of rootNote in raw notes array
	let offset = notes.indexOf(rootNote);

	// temp array to store the order of notes
	// for this root note
	let orderedNotes = [];

	// gets the order of notes without the octave
	for (let j = 0; j < notes.length; j++) {
		let pointer = (j + offset) % notes.length;
		orderedNotes.push(notes[pointer]);
	}

	// final array to store the order as well as
	// the octave of each note
	// this must be consistent & start from C-A#
	let notesInRoll = []; // rename this is terrible

	/**
	 * This series of loops run through the number of octaves the user has chosen,
	 * iterating through orderedNotes which starts with the root note and creating
	 * the final array which will display on the piano roll and be used
	 * across the project
	 */
	for (let i = chosenRootOctave; i < chosenRootOctave + numOctaves; i++) {
		orderedNotes.forEach(note => {
			/**
			 * this conditional checks for when the current note gets
			 * to the octave boundary (A) which is the correct place to
			 * increment the octave
			 * 
			 * in this situation we are iterating through orderedNotes for
			 * the number of octaves chosen, so we just run through
			 * orderedNotes until we reach A (octave boundary) - then, we add 1
			 * to the note's octave value until we reach the root note.
			 */
			if (orderedNotes.indexOf(note) > octaveNotes.indexOf(note)) {
				notesInRoll.push(note + (i + 1));
			} else {
				notesInRoll.push(note + i);
			}
		})
	}

	return notesInRoll.reverse()
}

export function animatePositionMarker() {
	const time = durationFromPercentage(100);
	let posMarker = document.querySelector("[data-js=position-marker]");

	posMarker.setAttribute("style", "");

	posMarker.setAttribute(
		"style",
		`transition: left linear ${time}s; left: calc(100% - (5/18*1em));`
	);
}
// TODO: implement this function
export function resetPositionMarker() {}

export function getOscillator(id) {
	const oscIndex = store.state.oscillators.findIndex(oscillator => oscillator.id == id);
	return store.state.oscillators[oscIndex];
}

export function getNote(id) {
	return store.state.activeOscillator.notes.find(note => note.id == id)
}

export function getFilter(id) {
	var output;
	store.state.oscillators.find(oscillator => oscillator.filters.find(filter => {
		if (filter.id == id) {
			output = filter
			return
		}
	}))
	return output || null
}

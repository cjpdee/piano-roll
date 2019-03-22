import {
	store
} from './store';
export function getKeysArray() {
	/**
	 * This function takes the note that the user
	 * wants at the bottom of the piano roll and
	 * creates a new notes array starting with the
	 * chosen root note, and then sets this
	 * as the new piano roll order for the whole app
	 */

	let chosenRootOctave = store.state.project.baseOctave;
	let numOctaves = store.state.project.numOctaves;
	let rootNote = store.state.project.rootNote;
	let notes = store.state.data.notes;

	let octaveNotes = (function() {
		let array = [];
		for (let j = 0; j < notes.length; j++) {
			let pointer = (j + notes.indexOf('A')) % notes.length;
			array.push(notes[pointer]);
			// console.log(notes[pointer]);
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
		// console.log(notes[pointer]);
	}

	// final array to store the order as well as
	// the octave of each note
	// this must be consistent & start from C-A#
	let notesInRoll = []; // rename this is terrible


	// TODO: replace all instances of"A" with octaveNotes[0]


	/**
	 * All this is probably useless
	 */

	let doesFirstHalfOfOrderNotesContainC = orderedNotes.slice(0, Math.ceil(orderedNotes.length / 2)).includes("A")
	let computedRootOctave = chosenRootOctave;
	let computedNumOctaves = numOctaves;

	// if (doesFirstHalfOfOrderNotesContainC && rootNote != "A") {
	// 	computedRootOctave--;
	// 	computedNumOctaves--;
	// }

	/**
	 * This series of loops run through the number of octaves the user has chosen,
	 * iterating through orderedNotes which starts with the root note and creating
	 * the final array which will display on the piano roll and be used
	 * across the project
	 */
	for (let i = computedRootOctave; i < chosenRootOctave + computedNumOctaves; i++) {
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

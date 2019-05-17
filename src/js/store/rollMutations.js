import {
	getNote
} from "../util/helper";

const rollMutations = {
	mutations: {
		addNote(state, note) {
			// add note object to notes array
			if (state.activeOscillator.notes.length < 32) {
				state.activeOscillator.notes.push(note);
			}
		},

		removeNote(state, id) {
			// splice the Note object out of the notes array
			if (state.activeOscillator.notes.length > -1) {
				state.activeOscillator.notes.splice(
					state.activeOscillator.notes.findIndex(note => note.id === id),
					1
				);
			}
		},

		updateNotePos(state, payload) {
			getNote(payload.note_id).position = payload.pos;
		}
	}
}

export default rollMutations;

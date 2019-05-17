import {
	getNote
} from "../util/helper";

const rollMutations = {
	mutations: {
		addNote(state, note) {
			// add note object to notes array
			if (this.state.activeOscillator.notes.length < 128) {
				this.state.activeOscillator.notes.push(note);
			}
		},

		removeNote(state, id) {
			// splice the Note object out of the notes array
			if (this.state.activeOscillator.notes.length > -1) {
				this.state.activeOscillator.notes.splice(
					this.state.activeOscillator.notes.findIndex(note => note.id === id),
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

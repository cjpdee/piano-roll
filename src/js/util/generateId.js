import {
	store
} from '../store/store';
import {
	getFilter
} from './helper';

function generateId() {
	return Math.floor((Math.random() * 10000000)).toString(16);
}

export function generateOscId() {
	let id = generateId();
	if (store.state.oscillators.find(oscillator => oscillator.id == id)) {
		return generateOscId()
	} else {
		return id;
	}
}

export function generateFilterId() {
	let id = generateId();
	if (getFilter(id)) {
		return generateFilterId()
	} else {
		return id;
	}
}

export function generateNoteId() {
	let id = generateId();
	if (store.state.activeOscillator.notes.find(note => note.id == id)) {
		return generateNoteId()
	} else {
		return id;
	}
}

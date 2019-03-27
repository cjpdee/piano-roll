// a class with all the play + timing methods inside.
// neccessary? I'm not sure

import Oscillator from "./Oscillator";
import {
	store
} from "./store";

export default class Player {
	createQueue() {
		let allNotes = [];
		store.state.oscillators.forEach(item => {
			console.log(item.notes);
		})
	}
}

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
			let notesArrayWithOscId = [];

			// Add the oscillator id to each note
			item.notes.forEach((noteObj) => {
				noteObj.oscId = item.id;
				notesArrayWithOscId.push(noteObj);
			})

			notes = notes.concat(notesArrayWithOscId);
		});

		// console.log("HERE BOY", notes);

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

		// console.log('unsorted notes', notes.map((x) => x.position));

		notes.sort(compare);

		// console.log('sorted notes', notes.map((x) => x.position));

		return notes;
	},

	timeout: null,
	playing: false,

	play() {
		this.playing = true;
		console.log("PLAY START ------------------------------");

		let notes = this.createQueue();

		// just logging the notes, remove later
		// notes.forEach((note) => {
		// 	console.log(
		// 		note.pitch,
		// 		"length in secs",
		// 		noteLength(note.lengthAsPercentage),
		// 		"position in secs",
		// 		noteLength(note.percentageFromLeft)
		// 	);
		// })

		let lookahead = 25.0;
		let scheduleAheadTime = 0.1;

		let currentNote = 0;
		let nextNoteStartTime = store.state.audioContext.currentTime + noteLength(notes[currentNote].lengthAsPercentage);
		// let startTime = store.state.audioContext.currentTime;

		console.log('time', store.state.audioContext.currentTime);
		console.log('start', nextNoteStartTime);
		console.log('first note start:', noteLength(notes[currentNote].percentageFromLeft));
		let _this = this;
		console.log(this);

		function scheduler() {
			while (nextNoteStartTime < store.state.audioContext.currentTime + scheduleAheadTime && notes[currentNote]) {
				scheduleNote(notes[currentNote], nextNoteStartTime);
				nextNote();
			}
			_this.playing === true && (() => {
				_this.timeout = window.setTimeout(scheduler, 50.0)
			})();
		}

		// Scheduling basically
		var notesInQueue = [];

		function scheduleNote(note, nextNoteStartTime) {

			// console.log("scheduleNote() note:", note);
			// console.log("scheduleNote() nextNoteStartTime", nextNoteStartTime);
			if (note) {
				let oscillator = store.state.oscillators.find(item => {
					return item.id === note.oscId;
				});

				Oscillator.playForDuration(oscillator, note.pitch, nextNoteStartTime, noteLength(note.lengthAsPercentage));
			} else {
				_this.playing = false;
				console.log('playback finished');
			}
		}

		function nextNote() {
			if (notes[currentNote]) {
				let note = notes[currentNote]

				console.log("nextNote() - current Note: ", note);
				// TODO: make a function which works out length in time from length as percentage
				// nextNoteStartTime += noteLength(note.lengthAsPercentage); // add the length of the note to the time

				notes[currentNote + 1] ? nextNoteStartTime += (noteLength(notes[currentNote + 1].percentageFromLeft)) : () => {
					nextNoteStartTime = 0;
					currentNote = 0;
				}; // add the distance between the (next note - start time)

				currentNote++;
			}
		}
		scheduler();
	},

	stop() {
		window.clearTimeout(this.timeout);
		this.playing = false;
		console.log('playback was stopped');
	}
};

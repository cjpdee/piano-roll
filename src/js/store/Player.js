// a class with all the play + timing methods inside.
// neccessary? I'm not sure

import Oscillator from './Oscillator';
import {
	store
} from './store';
import {
	secondsPerBeat,
	loopTimeFrame,
	durationFromPercentage
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

		let notes = this.createQueue();

		let scheduleAheadTime = 0.1;

		let currentNote = 0;
		let nextNoteStartTime = store.state.audioContext.currentTime + durationFromPercentage(notes[currentNote].position);
		let startTime = store.state.audioContext.currentTime;
		let finishTime = store.state.audioContext.currentTime + durationFromPercentage(100);
		let _this = this;

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
			if (note) {
				let oscillator = store.state.oscillators.find(item => {
					return item.id === note.oscId;
				});

				Oscillator.playForDuration(oscillator, note.pitch, nextNoteStartTime, durationFromPercentage(note.lengthAsPercentage));
			} else { // TODO: this isn't getting used anymore
				_this.playing = false;
				console.log('playback finished');
			}
		}

		function nextNote() {
			if (notes[currentNote]) {

				notes[currentNote + 1] ? nextNoteStartTime = startTime + (durationFromPercentage(notes[currentNote + 1].position)) : () => {
					nextNoteStartTime = 0;
					currentNote = 0;
				}; // add the distance between the (next note - start time)

				currentNote++;
			}
		}
		scheduler();

		let time = durationFromPercentage(100);
		let posMarker = document.querySelector("[data-js=position-marker]");

		posMarker.setAttribute("style", "");

		posMarker.setAttribute(
			"style",
			`transition: left linear ${time}s; left: 99.9%;`
		);
	},

	stop() {
		window.clearTimeout(this.timeout);
		this.playing = false;
		console.log('playback was stopped');
	}
};

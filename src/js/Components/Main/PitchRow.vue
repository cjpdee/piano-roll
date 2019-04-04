<template>
	<div :class="rowClass" @click="addNote" @contextmenu.prevent :data-note="musicKey">
		<Note
			v-for="(note,index) in notes"
			@contextmenu="removeNote(index)"
			:key="note.id"
			:data="note"
			:musicKey="musicKey"
		></Note>
	</div>
</template>

<script>
export default {
	props: {
		musicKey: {
			type: String
		},
		thisRowsKey: {
			type: String
		},
		index: {
			type: Number
		}
	},

	// TODO: Send all this data to the store,
	// organised by the oscillator the note
	// belongs to, perhaps ordered by position
	data() {
		return {
			// notes: []
		};
	},

	computed: {
		rowClass() {
			return "row row-" + (this.index + 1);
		},
		notes() {
			if (this.$store.state.activeOscillator) {
				let thisRowsNotes = this.$store.state.activeOscillator.notes.filter(
					note => note.pitch == this.musicKey
				);
				// console.log(thisRowsNotes);
				return thisRowsNotes;
			}
		}
	},

	methods: {
		generateId() {
			let id = Math.floor(Math.random() * 10000000).toString(16);
			// TODO: Make a check for other existing note ids
			// if ( store.state.oscillators.filter(oscillator => oscillator.id == id) ) {
			// 	return Math.floor((Math.random() * 10000000)).toString(16);
			// } else {
			// 	return id;
			// }
			return id;
		},
		addNote(e) {
			/*
				TODO: add the note in slightly left of the cursor,
				and make a check in case the length of the note
				overlaps the left or right side
			*/

			if (this.$store.state.activeOscillator) {
				let pos =
					(e.offsetX / e.target.parentElement.clientWidth) * 100;

				let lengthPercentage =
					(100 / this.$store.state.project.numBars / 4) *
					this.$store.state.project.currentNoteLengthInBeats;

				// console.log(this.$store.state.project.currentNoteLengthInBeats);
				// console.log(
				// 	(100 / this.$store.state.project.numBars) *
				// 		this.$store.state.project.currentNoteLengthInBeats
				// );
				let note = {
					pitch: this.musicKey,
					position: pos,
					percentageFromLeft: pos,
					lengthAsPercentage: lengthPercentage,
					id: this.generateId()
				};
				// this.notes.push(note);
				// let index = this.$store.state.oscillators.findIndex(
				// 	// TODO: make helper function
				// 	oscillator => oscillator.id == this.id
				// );
				// console.log(this.$store.state.oscillators[index]);
				// this.$store.state.activeOscillator.notes.push(note);
				this.$store.commit("addNoteForActiveOsc", note);
			} else {
				console.error("There is no oscillator to create notes for");
			}
		},

		removeNote(index) {
			this.notes.pop(this.notes[index]);
		}
	}
};
</script>
<template>
	<div :class="rowClass" @click="addNote" @contextmenu.prevent :data-note="musicKey">
		<Note v-for="note in notes" :key="note.id" :data="note" :musicKey="musicKey"></Note>
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

	computed: {
		rowClass() {
			return "row row-" + (this.index + 1);
		},
		notes() {
			if (this.$store.state.activeOscillator) {
				let thisRowsNotes = this.$store.state.activeOscillator.notes.filter(
					note => note.pitch == this.musicKey
				);
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
				TODO: change this system a bit so the user can choose
				their settings for grid snapping / time signature.
				By default is 4, but they should be able to place
				1/3 and 1/6 notes also

				default 4,
				8, 16

				default 3,
				6, 12

				The note size also needs to reflect this

				And for the number keys to work nicely, change the placement
				settings to also make use of this system
				e.g 1 = 1 beat, a 1/3rd note in 4:3 and a 1/4th note in 4:4
			*/

			if (this.$store.state.activeOscillator) {
				let pos =
					(e.offsetX / e.target.parentElement.clientWidth) * 100;

				let division =
					100 /
					(this.$store.state.project.numBars *
						this.$store.state.project.timeSignature);
				let snappedPos = pos.floorTo(division);

				let lengthPercentage =
					100 /
					this.$store.state.project.numBars /
					this.$store.state.project.noteSize;

				let note = {
					pitch: this.musicKey,
					position: snappedPos,
					position: snappedPos,
					lengthAsPercentage: lengthPercentage,
					id: this.generateId()
				};

				this.$store.commit("addNoteForActiveOsc", note);
			} else {
				console.error("There is no oscillator to create notes for");
			}
		}
	}
};
</script>
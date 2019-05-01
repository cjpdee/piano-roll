<template>
	<div :class="rowClass" @contextmenu.prevent :data-note="musicKey">
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
		// NOTE: Mouse event handling is done in theRoll, this method is called from there
		addNote(e) {
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
					lengthAsPercentage: lengthPercentage,
					id: this.generateId()
				};

				this.$store.commit("addNote", note);
			} else {
				console.error("There is no oscillator to create notes for");
			}
		}
	}
};
</script>
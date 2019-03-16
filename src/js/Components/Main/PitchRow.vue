<template>

	<div :class="rowClass" @click="addNote" @contextmenu="removeNote" :data-note=note>
		<div class="note" v-for="note in notes" :key="note.position" :style="note.noteCSS">
			<div class="note__handle">
				
			</div>
		</div>
	</div>

</template>

<script>

export default {
	props: {
		note: {
			type: String
		},
		thisRowsKey: {
			type: String
		},
		index: {
			type: Number
		}

	},

	data() {
		return {
			notes: []
		}
	},

	computed: {
		rowClass() {
			return "row row-" + (this.index+1)
		},
		notePosition() {

		}
	},

	methods : {
		generateId() {
			let id = Math.floor((Math.random() * 10000000)).toString(16);
			// if ( store.state.oscillators.filter(oscillator => oscillator.id == id) ) {
			// 	return Math.floor((Math.random() * 10000000)).toString(16);
			// } else {
			// 	return id;
			// }
			return id;
		},
		addNote(e) {
			console.log(e.offsetX,e.offsetY);
			console.log( (e.offsetX / e.target.parentElement.clientWidth) * 100 );
			let pos = (e.offsetX / e.target.parentElement.clientWidth) * 100;
			let lengthPercentage = (100 / (this.$store.state.project.numBars) * this.$store.state.project.currentNoteLengthInBars);
			console.log(window);
			let note = {
				position: pos,
				noteCSS: 'left: ' + pos + '%; width: ' + lengthPercentage + '%'
			}
			console.log(note);

			this.notes.push(note);

			if (this.$store.state.activeOscillator) {
				
			}
		},

		removeNote(e,pitch) {
			console.log(e);
			e.preventDefault();
		}
	}
}

</script>
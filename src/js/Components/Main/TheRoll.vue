<template>
	<div
		class="piano-roll"
		v-if="notes.length"
		@mousedown="mousedownHandler"
		@mousemove="mousemoveHandler"
		@mouseup="mouseupHandler"
		@contextmenu.prevent="contextmenuHandler"
	>
		<div class="flex-wrap">
			<div class="bar-marker" v-for="divider in numberOfBars" :key="divider">
				<div class="beat-marker"></div>
				<div class="beat-marker"></div>
				<div class="beat-marker"></div>
				<div class="beat-marker"></div>
			</div>
		</div>
		<PitchRow v-for="(note,index) in notes" :key="note" :index="index" :musicKey="note"></PitchRow>
	</div>
</template>

<script>
import PitchRow from "./PitchRow";
import { getKeysArray } from "../../store/helper";

export default {
	components: {
		PitchRow
	},
	data() {
		return {};
	},
	mounted() {},
	computed: {
		notes() {
			return getKeysArray();
		},
		numberOfBars() {
			return this.$store.state.project.numBars;
		},
		numBars() {
			return this.$store.state.project.numBars;
		},
		theNotes() {
			let notes = this.$store.state.data.notes;
			let rootNote = this.$store.state.project.rootNote;
			console.log("aav", notes.slice(notes.indexOf(rootNote)));
		}
	},
	methods: {
		mousedownHandler(e) {
			if (e.target.classList.contains("row")) {
				console.log("clicked pitch row");
			} else if (e.target.classList.contains("note")) {
				console.log("clicked note");
			}
		},
		mouseupHandler(e) {},
		mousemoveHandler(e) {},
		contextmenuHandler(e) {}
	}
};
</script>
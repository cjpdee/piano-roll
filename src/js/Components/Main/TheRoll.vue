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
			<div class="position-marker" data-js="position-marker"></div>
			<div class="bar-marker" v-for="divider in numberOfBars" :key="divider">
				<div class="beat-marker" v-for="division in divisionsPerBar" :key="division"></div>
			</div>
		</div>
		<PitchRow v-for="(note,index) in notes" :key="note" :index="index" :musicKey="note"></PitchRow>
	</div>
</template>

<script>
import PitchRow from "./PitchRow";
import { getKeysArray, durationFromPercentage } from "../../store/helper";

// Dragging / resizing variables
var isDragging = false;
var dragElement = null;
var isResizing = false;
let currentX;
let initialX;
let xOffset = 0;

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
		divisionsPerBar() {
			return this.$store.state.project.timeSignature;
		},
		theNotes() {
			let notes = this.$store.state.data.notes;
			let rootNote = this.$store.state.project.rootNote;
			console.log("aav", notes.slice(notes.indexOf(rootNote)));
		}
	},
	methods: {
		// create unique ids
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

		// Dragging methods
		dragStart(e) {
			// console.log(this.$el);
			// console.log(e.target);
			dragElement = e.target;
			initialX = e.clientX - xOffset;
			// if (this.$el === e.target) {
			isDragging = true;
			console.log("isDragging = ", isDragging);
			// }
		},

		dragEnd(e) {
			initialX = currentX;

			isDragging = false;
			dragElement = null;

			// set the note's new position in the store

			console.error("dragging stopped");
		},

		drag(e) {
			// this.resize(e);
			if (isDragging) {
				currentX = e.clientX - initialX;

				xOffset = currentX;

				this.setTranslate(currentX, dragElement);
			}
		},

		setTranslate(xPos, el) {
			console.log("xpos: ", xPos);
			let style = el.getAttribute("style");
			let xPosPercentage = durationFromPercentage(xPos);
			console.log(style.split(";"));

			let attributes = style.split(";").filter(el => {
				// get rid of the position attribute
				if (el.includes("left")) {
					return;
				}
				return el;
			});

			el.setAttribute(
				"style",
				attributes.join(";") + "; left:" + xPosPercentage + "%"
			);

			console.log(attributes);
		},

		// Handlers
		mousedownHandler(e) {
			if (e.target.classList.contains("row")) {
				// Add Note
				console.log("clicked pitch row");
			} else if (e.target.classList.contains("note")) {
				// Drag Notes
				console.log("clicked note");
				this.dragStart(e);
			}
		},
		mouseupHandler(e) {
			if (isDragging) {
				isDragging = false;
			}
		},
		mousemoveHandler(e) {
			if (isDragging) {
				this.drag(e);
			}
		},
		contextmenuHandler(e) {},
	}
};
</script>
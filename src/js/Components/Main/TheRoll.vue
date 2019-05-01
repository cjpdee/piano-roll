<template>
	<div
		class="piano-roll"
		data-js="piano-roll"
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
		<PitchRow v-for="(note,index) in notes" :key="note" :index="index" :musicKey="note" :ref="note"></PitchRow>
	</div>
</template>

<script>
import PitchRow from "./PitchRow";
import {
	getKeysArray,
	durationFromPercentage,
	percentageFromPixels,
	getNote,
	pixelsFromPercentage
} from "../../store/helper";

// Dragging / resizing variables
var isDragging = false;
var dragElement = null;
var dragElMousePos;
var newDragElPos;
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
			dragElement = e.target;
			dragElMousePos = e.offsetX;
			initialX = e.clientX - xOffset;

			isDragging = true;
		},

		dragEnd(e) {
			isDragging = false;
			this.$store.commit("updateNotePos", {
				pos: percentageFromPixels(newDragElPos),
				note_id: dragElement.getAttribute("id")
			});
		},

		drag(e) {
			if (isDragging) {
				const rollWidth = this.$el.getBoundingClientRect().width;
				const rollPosInPage = this.$el.getBoundingClientRect().left;
				var mousePosInPage = e.clientX;
				var mousePosInRoll = mousePosInPage - rollPosInPage;
				const noteLength = pixelsFromPercentage(
					getNote(dragElement.getAttribute("id")).lengthAsPercentage
				);

				newDragElPos = mousePosInRoll - dragElMousePos;
				if (newDragElPos < 0) newDragElPos = 0;
				if (newDragElPos > rollWidth - noteLength)
					newDragElPos = rollWidth - noteLength;
				this.setTranslate(newDragElPos, dragElement);
			}
		},

		// TODO: stop dragging process if mouse leaves the piano roll
		mouseExit(e) {},

		setTranslate(xPos, el) {
			const style = el.getAttribute("style");
			const xPosPercentage = percentageFromPixels(xPos);

			var attributes = style.split(";").filter(el => {
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
		},

		// Handlers
		mousedownHandler(e) {
			if (e.target.classList.contains("row")) {
				// Add Note
				this.$refs[e.target.getAttribute("data-note")][0].addNote(e);
			} else if (e.target.classList.contains("note")) {
				// Drag Notes
				this.dragStart(e);
			}
		},
		mouseupHandler(e) {
			if (isDragging) {
				this.dragEnd();
			}
		},
		mousemoveHandler(e) {
			if (isDragging) {
				this.drag(e);
			}
		},
		contextmenuHandler(e) {}
	}
};
</script>
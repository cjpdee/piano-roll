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
import { getKeysArray, getNote } from "../../util/helper";
import {
	durationFromPercentage,
	percentageFromPixels,
	pixelsFromPercentage
} from "../../util/time";

// Dragging / resizing variables
var isDragging = false;
var dragElement = null;
var dragElMousePos;
var newDragElPos;
var isResizing = false;
let currentX;
let initialX;
let xOffset = 0;
var rightMouseDown = false;

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
		}
	},
	methods: {
		// Handlers
		mousedownHandler(e) {
			// TODO: use data attrs instead of class
			if (e.button === 0 && e.target.classList.contains("row")) {
				// Add Note
				this.$refs[e.target.getAttribute("data-note")][0].addNote(e);
			} else if (e.button === 0 && e.target.classList.contains("note")) {
				// set the note size
				const newNoteSize = (100 / getNote(e.target.getAttribute("id")).lengthAsPercentage / 16 / this.$store.state.project.numBars) * 16;

				this.$store.commit("setNoteSize", {
					noteSize: newNoteSize
				});

				// Drag Notes
				this.dragStart(e);
			} else if (e.button === 0 && e.target.classList.contains("handle")) {
				this.resize(e);
			} else if (e.button === 2) {
				rightMouseDown = true;
			}
		},
		mouseupHandler(e) {
			if (isDragging) {
				this.dragEnd();
			}
			if (rightMouseDown === true) rightMouseDown = false;
		},
		mousemoveHandler(e) {
			if (isDragging) {
				this.drag(e);
			}
			if (rightMouseDown === true) {
				if (e.target.classList.contains("note")) this.$store.commit("removeNote", e.target.id);
			}
		},
		contextmenuHandler(e) {
			// console.log('context menu triggered', e.target)
			// if (e.target.classList.contains("note")) this.$store.commit("removeNote", e.target.id);
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
				this.setDraggingStyle(newDragElPos, dragElement);
			}
		},

		// TODO: stop dragging process if mouse leaves the piano roll
		mouseExit(e) {},

		setDraggingStyle(xPos, el) {
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

		resize(e) {
			console.log("resizing");
		},

		setResizeStyle() {}
	}
};

/*
Resize script I made before :

if (isResizing) {
	let $object = $(e.target);
	if ($object.is($resizeHandle)) {
		$object = $(e.target).parent($handle);
	}

	console.log("w", $object);

	let currentPosX = e.pageX - parseInt($object.offset().left);
	console.log("currentPosX", currentPosX);
	let currentSize = parseInt($object.css("width"));
	console.log("currentSize", currentSize);
	let resizeStartPosXInsideDiv = currentSize - resizeStartPosX;
	let spaceRightOfMouse =
		startSize - (e.pageX - $object.offset().left);
	let spaceLeftOfMouse = e.pageX - $object.offset().left;
	console.log("space left of mouse", spaceLeftOfMouse);
	console.log("space right of mouse", spaceRightOfMouse);

	console.log(
		"resizeStartPosXInsideDiv",
		resizeStartPosXInsideDiv
	);

	let mousePosXDifference = resizeStartPosX - currentPosX;

	console.log(
		"new size calc",
		`${startSize} - ${mousePosXDifference}px`
	);

	console.log(
		"new size: ",
		startSize - mousePosXDifference + "px"
	);
	$object.css(
		"width",
		startSize - mousePosXDifference - startSize / 1.3 + "px"
	);

	console.log(
		"Different between start/current pos",
		mousePosXDifference
	);

	// $object.css('width') =
}




*/
</script>
<template>
	<div :style="style" class="note" :id="data.id" @contextmenu.prevent="removeNote">
		<div class="note__handle" @click="resize"></div>
	</div>
</template>



<script>
/*
	@contextmenu.prevent="removeNote"
	@mousedown.stop="dragStart"
	@mousemove="drag"
	@mouseup.stop="dragEnd"
 */

import { durationFromPercentage } from "../../store/helper";
var isDragging = false;
var isResizing = false;
let currentX;
let initialX;
let xOffset = 0;
export default {
	props: {
		data: Object,
		musicKey: String
	},
	computed: {
		style() {
			return (
				"left: " +
				this.data.position +
				"%; width: " +
				this.data.lengthAsPercentage +
				"%"
			);
		}
	},
	mounted() {
		// console.log(this.$el);
		let activeOscillator = this.$store.state.oscillators.find(item => {
			return item.id === this.$store.state.activeOscillator.id;
		});
		// console.log(activeOscillator);
		// activeOscillator.notes.push(this.data);

		// this.$store.commit("addNoteForActiveOsc", note);
	},
	methods: {
		removeNote(e) {
			this.$store.commit("removeNoteFromActiveOsc", e.currentTarget.id);
		},

		// Moving

		// dragStart(e) {
		// 	console.log(this.$el);
		// 	initialX = e.clientX - xOffset;
		// 	if (this.$el === e.target) {
		// 		isDragging = true;
		// 		console.log("isDragging = ", isDragging);
		// 	}
		// },

		// dragEnd(e) {
		// 	initialX = currentX;

		// 	isDragging = false;

		// 	console.error("dragging stopped");
		// },

		// drag(e) {
		// 	this.resize(e);
		// 	if (isDragging) {
		// 		currentX = e.clientX - initialX;

		// 		xOffset = currentX;

		// 		this.setTranslate(currentX, this.$el);
		// 	}
		// },

		// setTranslate(xPos, el) {
		// 	console.log("xpos: ", xPos);
		// 	let style = el.getAttribute("style");
		// 	let xPosPercentage = durationFromPercentage(xPos);
		// 	console.log(style.split(";"));

		// 	let attributes = style.split(";").filter(el => {
		// 		// get rid of the position attribute
		// 		if (el.includes("left")) {
		// 			return;
		// 		}
		// 		return el;
		// 	});

		// 	el.setAttribute(
		// 		"style",
		// 		attributes.join(";") + "; left:" + xPosPercentage + "%"
		// 	);

		// 	console.log(attributes);
		// },

		// resizing
		resize(e) {
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
		}
	}
};
</script>

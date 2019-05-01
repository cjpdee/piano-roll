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
		let activeOscillator = this.$store.state.oscillators.find(item => {
			return item.id === this.$store.state.activeOscillator.id;
		});
	},
	methods: {
		removeNote(e) {
			this.$store.commit("removeNote", e.currentTarget.id);
		},

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

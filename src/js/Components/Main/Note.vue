<template>
	<div :style="style" class="note" :id="data.id" @contextmenu.prevent="removeNote">
		<div class="note__handle"></div>
	</div>
</template>



<script>
/*
	@contextmenu.prevent="removeNote"
	@mousedown.stop="dragStart"
	@mousemove="drag"
	@mouseup.stop="dragEnd"
 */

import { durationFromPercentage } from "../../util/helper";
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
		}
	}
};
</script>

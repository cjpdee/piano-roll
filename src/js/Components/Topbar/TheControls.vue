<template>
	<div class="topbar__item">
		<span class="project-setup__controls">
			<button @click="play()" class="project-setup__control green">Play</button>
			<button @click="stop()" class="project-setup__control red">Stop</button>
		</span>
	</div>
</template>

<style lang="scss" scoped>
// TODO: move
label {
	display: block;
}
input[type="number"] {
	width: 50%;
	display: inline-block;
}
</style>


<script>
import Player from "../../Objects/Player";

export default {
	name: "TheControls",
	methods: {
		play() {
			Player.play();
		},

		stop() {
			Player.stop();

			let posMarker = document.querySelector("[data-js=position-marker]");
			posMarker.setAttribute("style", "");
		},
		
	}
};
</script>
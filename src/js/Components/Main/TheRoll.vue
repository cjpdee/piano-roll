<template>
	<div class="piano-roll">
		<!-- 
			absolute positioned grid system
				height of each row: ( 100vh / 24 )
				top: 0;
					then: ( ( 100vh / 24 ) * number of items - 1 )
					calc(100vh / 24 * x)
				for smaller viewport heights: divide everything by 12 instead

				using absolute positioning to prevent heavy reflows when
				the user is interacting with the piano roll

			each bar length: fixed or responsive depending on viewport width
			-->
		<PitchRow
			v-for="(note,index) in notes"
			:key=note
			:note=note
			:index="index"
		></PitchRow>
		<!-- <div  class="row row-1" data-note="A#5"></div>
		<div  class="row row-2" data-note="A5"></div>
		<div  class="row row-3" data-note="G#5"></div>
		<div  class="row row-4" data-note="G5"></div>
		<div  class="row row-5" data-note="F#5"></div>
		<div  class="row row-6" data-note="F5"></div>
		<div  class="row row-7" data-note="E5"></div>
		<div  class="row row-8" data-note="D#5"></div>
		<div class="row row-9" data-note="D5"></div>
		<div class="row row-10" data-note="C#5"></div>
		<div class="row row-11" data-note="C5"></div>
		<div class="row row-12" data-note="B5"></div>
		<div class="row row-13" data-note="A#5"></div>
		<div class="row row-14" data-note="A5"></div>
		<div class="row row-15" data-note="G#5"></div>
		<div class="row row-16" data-note="G5"></div>
		<div class="row row-17" data-note="F#5"></div>
		<div class="row row-18" data-note="F5"></div>
		<div class="row row-19" data-note="E5"></div>
		<div class="row row-20" data-note="D#5"></div>
		<div class="row row-21" data-note="D5"></div>
		<div class="row row-22" data-note="C#5"></div>
		<div class="row row-23" data-note="C5"></div> -->
	</div>

</template>

<script>
import PitchRow from './PitchRow';

export default {
	components: {
		PitchRow
	},
	props: {
		notes: {
			type: Array
		}
	},
}

</script>
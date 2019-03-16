<template>
	<div class="piano-roll" v-if="notes.length">
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
			:index=index
			:note=note
		></PitchRow>
	</div>

</template>

<script>
import PitchRow from './PitchRow';
import {getKeysArray} from '../../store/helper';

export default {
	components: {
		PitchRow
	},
	props: {
		// notes: {
		// 	type: Array
		// }
	},
	data() {
		return {

		}
	},
	computed: {
		notes() {
			console.log('keys',getKeysArray());
			return getKeysArray();
		},
	},
	methods: {
	}
}

</script>
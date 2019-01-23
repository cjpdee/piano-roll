<template>
	<div class="oscillator">
		<h2>Osc 1</h2>
		<select class="oscillator__select">
			<option value="sine/sqr">sine</option>
			<option value="sine/saw">square</option>
			<option value="sine/saw">saw</option>
		</select>
		<select name="octave" id="octave">
			<option value="A3">A3</option>
			<option value="A4">A4</option>
		</select>
		<span class="oscillator__property-wrap">
			<label class="oscillator__property-label" for="volume">Vol</label>
			<input class="oscillator__property" type="range" id="volume" />
		</span>
		<span class="oscillator__property-wrap">
			<label class="oscillator__property-label" for="lowpass">LP</label>
			<input class="oscillator__property" type="range" id="lowpass" />
		</span>
		<ul>
			<li class="oscillator__property-wrap">
				<label class="oscillator__property-label" for="lowpass-attack">Att</label>
				<input class="oscillator__property" type="range" id="lowpass-attack" />
			</li>
			<li class="oscillator__property-wrap">
				<label class="oscillator__property-label" for="lowpass-decay">Dec</label>
				<input class="oscillator__property" type="range" id="lowpass-decay" />
			</li>
		</ul>
		<span class="oscillator__property-wrap">
			<label class="oscillator__property-label" for="resonance">Res</label>
			<input class="oscillator__property" type="range" id="resonance" />
		</span>
	</div>
</template>

<script>

export default {
	name: "Oscillator",
	props : {
		oscillator: {
			type: Object,
			id: {
				type: Number
			},
			amplitude: {
				amount: {
					type: Number
				},
				attack: {
					type: Number
				},
				decay: {
					type: Number
				}
			},
			waveform: {
				type: String
			},
			lowpass: {
				amount: {
					type: Number
				},
				attack: {
					type: Number
				},
				decay: {
					type: Number
				},
				resonance: {
					type: Number
				}
			}
		},

		
	},
	methods : {
		
	}
}

</script>
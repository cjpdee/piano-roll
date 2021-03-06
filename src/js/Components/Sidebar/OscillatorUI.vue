<template>
	<label :for="id" class="oscillator">
		<h2>Osc {{ id }}</h2>
		<input
			type="radio"
			name="current_oscillator"
			:checked="isOscillatorActive"
			:id="id"
			@click="setCurrentOscillator"
		>
		<!-- WAVEFORM SETUP -->
		<div class="oscillator__setup-wrap">
			<select v-model="waveform" class="oscillator__select">
				<option v-for="wave in this.$store.state.data.waveforms" :key="wave" :value="wave">{{ wave }}</option>
			</select>
		</div>

		<!-- OSCILLATOR VOLUME -->
		<span class="oscillator__property-wrap">
			<label class="oscillator__property-label" for="volume_amplitude">Vol</label>
			<input
				v-model="volume_amplitude"
				type="range"
				class="oscillator__property"
				id="volume_amplitude"
				min="0"
				max="1"
				step="0.1"
			>

			<input
				type="checkbox"
				class="oscillator__property__dropdown-toggle"
				name="volume_properties"
				id="volume_properties_toggle"
			>
			<div class="oscillator__property__dropdown">
				<!-- attack -->
				<label class="oscillator__property-label" for="volume_attack">Att</label>
				<input v-model="volume_attack" class="oscillator__property" type="range" id="volume_attack">
				<!-- decay -->
				<label class="oscillator__property-label" for="volume_decay">Dec</label>
				<input v-model="volume_decay" class="oscillator__property" type="range" id="volume_decay">
			</div>
		</span>

		<button @click="createFilter()">Add Filter</button>
		<!-- FILTERS -->
		<FilterUI v-for="filter in filters" :key="filter.id" :filterId="filter.id" :oscillatorId="id"></FilterUI>

		<!-- Effects (probably this should have it's own panel though) -->
		<button>Add Effect</button>
	</label>
</template>

<script>
// Custom wavetables : OscillatorNode.setPeriodicWave()
// Make filter values relative to the base octave
import { getOscillator, getFilter } from "../../util/helper";
import FilterUI from "./Includes/Filter";

export default {
	name: "Oscillator",
	components: {
		FilterUI
	},
	props: {
		id: {
			type: String,
			required: true
		}
	},
	computed: {
		isOscillatorActive() {
			return getOscillator(this.id) == this.$store.state.activeOscillator;
		},
		/*
			Osc Mutations
		*/
		waveform: {
			get() {
				return getOscillator(this.id).waveform;
			},
			set(value) {
				this.$store.commit("setOscillatorWaveform", {
					oscillator_id: this.id,
					waveform: value
				});
			}
		},

		gain: {
			get() {
				return getOscillator(this.id).gain;
			},
			set(value) {
				this.$store.commit("setOscillatorGain", {
					value: parseInt(value),
					oscillator_id: this.id
				});
			}
		},

		filters: {
			get() {
				return getOscillator(this.id).filters;
			},
			set(value) {
				this.$store.commit("updateFilter", {
					value: value,
					filter_id: this.id
				});
			}
		},

		volume_amplitude: {
			get() {
				return getOscillator(this.id).env.amplitude;
			},
			set(value) {
				this.$store.commit("volume", {
					property: "amplitude",
					value: parseFloat(value),
					oscillator_id: this.id
				});
				getOscillator(this.id).gainNode.gain.value = parseFloat(value);
			}
		},
		volume_attack: {
			get() {
				return getOscillator(this.id).env.attack;
			},
			set(value) {
				this.$store.commit("volume", {
					property: "attack",
					value: parseFloat(value),
					oscillator_id: this.id
				});
			}
		},
		volume_decay: {
			get() {
				return getOscillator(this.id).env.decay;
			},
			set(value) {
				this.$store.commit("volume", {
					property: "decay",
					value: parseFloat(value),
					oscillator_id: this.id
				});
			}
		}
	},
	methods: {
		setCurrentOscillator() {
			this.$store.commit("setCurrentOscillator", {
				oscillator_id: this.id
			});
		},
		createFilter() {
			this.$store.commit("createFilter", {
				oscillator_id: this.id
			});
		}
	}
};
</script>
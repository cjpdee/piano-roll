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
		<!-- SETUP -->
		<div class="oscillator__setup-wrap">
			<select v-model="waveform" class="oscillator__select">
				<option v-for="wave in this.$store.state.data.waveforms" :key="wave" :value="wave">{{ wave }}</option>
			</select>
		</div>
		<div class="oscillator__filter-wrap" v-for="filter in filters" :key="filter">
			Filters &amp; Shapers
			<br>
			<label>
				<select>
					<option value="lowpass">Lowpass</option>
					<option value="highpass">Highpass</option>
					<option value>Waveshaper</option>
				</select>

				<select>
					<option value="env">Envelope</option>
					<option value="lfo">LFO</option>
				</select>
			</label>
		</div>
		<!-- VOLUME -->
		<span class="oscillator__property-wrap">
			<label class="oscillator__property-label" for="volume_amplitude">Vol</label>
			<input
				v-model="volume_amplitude"
				type="range"
				class="oscillator__property"
				id="volume_amplitude"
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
		<!-- FILTER -->
		<span class="oscillator__property-wrap">
			<label class="oscillator__property-label" for="filter_cutoff">Flt</label>
			<input
				v-model="filter_cutoff"
				class="oscillator__property"
				type="range"
				id="filter_cutoff"
				min="0"
				max="4000"
			>

			<input
				type="checkbox"
				class="oscillator__property__dropdown-toggle"
				name="volume_properties"
				id="volume_properties_toggle"
			>
			<div class="oscillator__property__dropdown">
				<!-- attack -->
				<label class="oscillator__property-label" for="filter_attack">Att</label>
				<input v-model="filter_attack" class="oscillator__property" type="range" id="filter_attack">
				<!-- decay -->
				<label class="oscillator__property-label" for="filter_decay">Dec</label>
				<input v-model="filter_decay" class="oscillator__property" type="range" id="filter_decay">
				<!-- resonance -->
				<!-- <label class="oscillator__property-label" for="filter_resonance">Res</label>
				<input v-model="filter_resonance" class="oscillator__property" type="range" id="filter_resonance" />-->
			</div>
		</span>
	</label>
</template>

<script>
// Custom wavetables : OscillatorNode.setPeriodicWave()
// Make filter values relative to the base octave
import { getOscillator } from "../../store/helper";

export default {
	name: "Oscillator",
	props: {
		id: {
			type: String,
			required: true
		}
	},
	computed: {
		isOscillatorActive() {
			// TODO: refactor into a modular function
			let index = this.$store.state.oscillators.findIndex(
				oscillator => oscillator.id == this.id
			);
			return (
				this.$store.state.oscillators[index] ==
				this.$store.state.activeOscillator
			);
		},

		/*
			Waveform
		*/
		waveform: {
			get() {
				let index = this.$store.state.oscillators.findIndex(
					oscillator => oscillator.id == this.id
				);
				return this.$store.state.oscillators[index].waveform;
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
				this.$store.commit("updateOscillatorFiltersList", {
					value: value,
					oscillator_id: this.id
				});
			}
		},

		/*
			Volume
		*/

		// TODO: this is long. instead, just update the volume_env object in the store.

		volume_amplitude: {
			get() {
				let index = this.$store.state.oscillators.findIndex(
					oscillator => oscillator.id == this.id
				);
				return this.$store.state.oscillators[index].env.amplitude;
			},
			set(value) {
				this.$store.commit("volume", {
					property: "amplitude",
					value: parseInt(value),
					oscillator_id: this.id
				});
			}
		},
		volume_attack: {
			get() {
				let index = this.$store.state.oscillators.findIndex(
					oscillator => oscillator.id == this.id
				);
				return this.$store.state.oscillators[index].env.attack;
			},
			set(value) {
				this.$store.commit("volume", {
					property: "attack",
					value: parseInt(value),
					oscillator_id: this.id
				});
			}
		},
		volume_decay: {
			get() {
				let index = this.$store.state.oscillators.findIndex(
					oscillator => oscillator.id == this.id
				);
				return this.$store.state.oscillators[index].env.decay;
			},
			set(value) {
				this.$store.commit("volume", {
					property: "decay",
					value: parseInt(value),
					oscillator_id: this.id
				});
			}
		},

		/*
			Lowpass
		*/
		filter_type: {
			get() {
				let index = this.$store.state.oscillators.findIndex(
					oscillator => oscillator.id == this.id
				);
				return this.$store.state.oscillators[index].filter.type;
			},
			set(value) {
				this.$store.commit("biquadFilter", {
					oscillator_id: this.id,
					property: "type",
					value: value
				});
			}
		},

		filter_cutoff: {
			get() {
				let index = this.$store.state.oscillators.findIndex(
					oscillator => oscillator.id == this.id
				);
				return this.$store.state.oscillators[index].filter.cutoff;
			},
			set(value) {
				this.$store.commit("biquadFilter", {
					property: "cutoff",
					value: parseInt(value),
					oscillator_id: this.id
				});
			}
		},
		filter_attack: {
			get() {
				let index = this.$store.state.oscillators.findIndex(
					oscillator => oscillator.id == this.id
				);
				return this.$store.state.oscillators[index].filter.attack;
			},
			set(value) {
				this.$store.commit("biquadFilter", {
					property: "attack",
					value: parseInt(value),
					oscillator_id: this.id
				});
			}
		},
		filter_decay: {
			get() {
				let index = this.$store.state.oscillators.findIndex(
					oscillator => oscillator.id == this.id
				);
				return this.$store.state.oscillators[index].filter.decay;
			},
			set(value) {
				this.$store.commit("biquadFilter", {
					property: "decay",
					value: parseInt(value),
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
		}
	}
};
</script>
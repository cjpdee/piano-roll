<template>
	<div class="oscillator">
		<h2>Osc {{ id }}</h2>
		<input type="radio" name="current_oscillator" />
		<div class="oscillator__setup-wrap">
			<select v-model="waveform" class="oscillator__select">
				<option v-for="wave in this.$store.state.data.waveforms" :key="wave" :value=wave>{{ wave }}</option>
			</select>
			<select name="octave" id="octave">
				<option value="A3">A3</option>
				<option value="A4">A4</option>
			</select>
			<button @mousedown="playOsc" @mouseup="stopOsc">DO THING</button>
		</div>
		<span class="oscillator__property-wrap">
			<label class="oscillator__property-label" for="volume_amplitude">Vol</label>
			<input v-model="volume_amplitude" type="range" class="oscillator__property" id="volume_amplitude" />
			
			<input type="checkbox" class="oscillator__property__dropdown-toggle" name="volume_properties" id="volume_properties_toggle" />
			<div class="oscillator__property__dropdown">
				<!-- attack -->
				<label class="oscillator__property-label" for="volume_attack">Att</label>
				<input v-model="volume_attack" class="oscillator__property" type="range" id="volume_attack" />
				<!-- decay -->
				<label class="oscillator__property-label" for="volume_decay">Dec</label>
				<input v-model="volume_decay" class="oscillator__property" type="range" id="volume_decay" />
			</div>
		</span>
		<span class="oscillator__property-wrap">
			<label class="oscillator__property-label" for="lowpass_cutoff">LP</label>
			<input v-model="lowpass_cutoff" class="oscillator__property" type="range" id="lowpass_cutoff" />

			<input type="checkbox" class="oscillator__property__dropdown-toggle" name="volume_properties" id="volume_properties_toggle" />
			<div class="oscillator__property__dropdown">
				<!-- attack -->
				<label class="oscillator__property-label" for="volume_attack">Att</label>
				<input v-model="lowpass_attack" class="oscillator__property" type="range" id="lowpass_attack" />
				<!-- decay -->
				<label class="oscillator__property-label" for="volume_decay">Dec</label>
				<input v-model="lowpass_decay" class="oscillator__property" type="range" id="lowpass_decay" />
				<!-- resonance -->
				<label class="oscillator__property-label" for="lowpass_resonance">Res</label>
				<input v-model="lowpass_resonance" class="oscillator__property" type="range" id="lowpass_resonance" />
			</div>
		</span>
		<span class="oscillator__property-wrap">
			<label class="oscillator__property-label" for="highpass">HP</label>
			<input v-model="highpass_cutoff" class="oscillator__property" type="range" id="highpass" />

			<input type="checkbox" class="oscillator__property__dropdown-toggle" name="highpass_properties" id="highpass_properties_toggle" />
			<div class="oscillator__property__dropdown">
				<!-- attack -->
				<label class="oscillator__property-label" for="highpass_attack">Att</label>
				<input v-model="highpass_attack" class="oscillator__property" type="range" id="highpass_attack" />
				<!-- decay -->
				<label class="oscillator__property-label" for="volume_decay">Dec</label>
				<input v-model="highpass_decay" class="oscillator__property" type="range" id="highpass_decay" />
				<!-- resonance -->
				<label class="oscillator__property-label" for="highpass_resonance">Res</label>
				<input v-model="highpass_resonance" class="oscillator__property" type="range" id="highpass_resonance" />
			</div>
		</span>
	</div>
</template>

<script>

export default {
	name: "Oscillator",
	props: {
		id: {
			type: String,
			required: true
		}
	},
	computed: {

		/*
			Waveform
		*/
		waveform: {
			get() {
				let index = this.$store.state.oscillators.findIndex(oscillator => oscillator.id == this.id);
				return this.$store.state.oscillators[index].waveform;
			},
			set(value) {
				this.$store.commit("waveform",{
					oscillator_id: this.id,
					waveform: value
				})
			}
		},

		/*
			Volume
		*/
		volume_amplitude: {
			get() {
				let index = this.$store.state.oscillators.findIndex(oscillator => oscillator.id == this.id);
				return this.$store.state.oscillators[index].volume.amplitude;
			},
			set(value) {
				this.$store.commit('volume',{
					property: 'amplitude',
					value: parseInt(value),
					oscillator_id: this.id
				});
			}
		},
		volume_attack: {
			get() {
				let index = this.$store.state.oscillators.findIndex(oscillator => oscillator.id == this.id);
				return this.$store.state.oscillators[index].volume.attack;
			},
			set(value) {
				this.$store.commit('volume',{
					property: 'attack',
					value: parseInt(value),
					oscillator_id: this.id
				});
			}
		},
		volume_decay: {
			get() {
				let index = this.$store.state.oscillators.findIndex(oscillator => oscillator.id == this.id);
				return this.$store.state.oscillators[index].volume.decay;
			},
			set(value) {
				this.$store.commit('volume',{
					property: 'decay',
					value: parseInt(value),
					oscillator_id: this.id
				});
			}
		},

		/*
			Lowpass
		*/
		lowpass_cutoff: {
			get() {
				let index = this.$store.state.oscillators.findIndex(oscillator => oscillator.id == this.id);
				return this.$store.state.oscillators[index].lowpass.cutoff;
			},
			set(value) {
				this.$store.commit('lpHpFilter',{
					filter: "lowpass",
					property: 'cutoff',
					value: parseInt(value),
					oscillator_id: this.id
				});
			}
		},
		lowpass_attack: {
			get() {
				let index = this.$store.state.oscillators.findIndex(oscillator => oscillator.id == this.id);
				return this.$store.state.oscillators[index].lowpass.attack;
			},
			set(value) {
				this.$store.commit('lpHpFilter',{
					filter: "lowpass",
					property: 'attack',
					value: parseInt(value),
					oscillator_id: this.id
				});
			}
		},
		lowpass_decay: {
			get() {
				let index = this.$store.state.oscillators.findIndex(oscillator => oscillator.id == this.id);
				return this.$store.state.oscillators[index].lowpass.decay;
			},
			set(value) {
				this.$store.commit('lpHpFilter',{
					filter: "lowpass",
					property: 'decay',
					value: parseInt(value),
					oscillator_id: this.id
				});
			}
		},
		lowpass_resonance: {
			get() {
				let index = this.$store.state.oscillators.findIndex(oscillator => oscillator.id == this.id);
				return this.$store.state.oscillators[index].lowpass.resonance;
			},
			set(value) {
				this.$store.commit('lpHpFilter',{
					filter: "lowpass",
					property: 'resonance',
					value: parseInt(value),
					oscillator_id: this.id
				});
			}
		},

		/*
			Highpass - passing 'null' as the filter
		*/
		highpass_cutoff: {
			get() {
				let index = this.$store.state.oscillators.findIndex(oscillator => oscillator.id == this.id);
				return this.$store.state.oscillators[index].highpass.cutoff;
			},
			set(value) {
				this.$store.commit('lpHpFilter',{
					filter: null,
					property: 'cutoff',
					value: parseInt(value),
					oscillator_id: this.id
				});
			}
		},
		highpass_attack: {
			get() {
				let index = this.$store.state.oscillators.findIndex(oscillator => oscillator.id == this.id);
				return this.$store.state.oscillators[index].highpass.attack;
			},
			set(value) {
				this.$store.commit('lpHpFilter',{
					filter: null,
					property: 'attack',
					value: parseInt(value),
					oscillator_id: this.id
				});
			}
		},
		highpass_decay: {
			get() {
				let index = this.$store.state.oscillators.findIndex(oscillator => oscillator.id == this.id);
				return this.$store.state.oscillators[index].highpass.decay;
			},
			set(value) {
				this.$store.commit('lpHpFilter',{
					filter: null,
					property: 'decay',
					value: parseInt(value),
					oscillator_id: this.id
				});
			}
		},
		highpass_resonance: {
			get() {
				let index = this.$store.state.oscillators.findIndex(oscillator => oscillator.id == this.id);
				return this.$store.state.oscillators[index].highpass.resonance;
			},
			set(value) {
				this.$store.commit('lpHpFilter',{
					filter: null,
					property: 'resonance',
					value: parseInt(value),
					oscillator_id: this.id
				});
			}
		},
	},
	methods: {
		playOsc() {
			console.log('starting');
			let index = this.$store.state.oscillators.findIndex(oscillator => oscillator.id == this.id);
			let osc = this.$store.state.oscillators[index];

			osc.oscillatorNode = this.$store.state.audioContext.createOscillator();
			osc.oscillatorNode.type = osc.waveform;
			osc.oscillatorNode.connect(this.$store.state.audioContext.destination);

			osc.oscillatorNode.frequency.setValueAtTime(261.63, this.$store.state.audioContext.currentTime);
			osc.oscillatorNode.start();
		},
		stopOsc() {
			console.log('stopping');
			let index = this.$store.state.oscillators.findIndex(oscillator => oscillator.id == this.id);
			let osc = this.$store.state.oscillators[index];
			osc.oscillatorNode.stop(this.$store.state.audioContext.currentTime);
		}
	}
}

</script>
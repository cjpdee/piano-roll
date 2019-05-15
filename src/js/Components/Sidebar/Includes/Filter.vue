<template>
	<div>
		<button @click="deleteThisFilter()">X</button>
		<div class="oscillator__filter-wrap">
			Filters &amp; Shapers
			<br>
			<label>
				<select v-model="filterType">
					<option
						v-for="(type,index) in this.$store.state.data.filters"
						:key="index"
						:value="type"
					>{{type}}</option>
				</select>

				<select v-model="modulationType">
					<option value="env">Envelope</option>
					<option value="lfo">LFO</option>
				</select>
			</label>
		</div>
		<!-- Envelope settings -->
		<div class="oscillator__property-wrap" v-if="modulationType=='env'">
			<label class="oscillator__property-label" for="filter_amplitude">Amt</label>
			<input
				v-model="filterAmplitude"
				class="oscillator__property"
				type="range"
				id="filter_amplitude"
				min="0"
				max="4000"
			>
			<label class="oscillator__property-label" for="filter_cutoff">Cut</label>
			<input
				v-model="filterCutoff"
				class="oscillator__property"
				type="range"
				id="filter_cutoff"
				min="0"
				max="4000"
			>

			<!-- <input
				type="checkbox"
				class="oscillator__property__dropdown-toggle"
				name="volume_properties"
				id="volume_properties_toggle"
			>
			<div class="oscillator__property__dropdown">
				<label class="oscillator__property-label" for="filter_attack">Att</label>
				<input class="oscillator__property" type="range" id="filter_attack">
				<label class="oscillator__property-label" for="filter_decay">Dec</label>
				<input class="oscillator__property" type="range" id="filter_decay">
			</div>-->
		</div>
		<!-- LFO settings -->
		<div class="oscillator__property-wrap" v-else>
			<label class="oscillator__property-label" for="filter_cutoff">Amt</label>
			<input class="oscillator__property" type="range" id="filter_cutoff" min="0" max="4000">

			<input
				type="checkbox"
				class="oscillator__property__dropdown-toggle"
				id="volume_properties_toggle"
			>
			<div class="oscillator__property__dropdown">
				<!-- lfo speed -->
				<label class="oscillator__property-label" for="filter_attack">Speed</label>
				<input class="oscillator__property" type="range" id="filter_attack">
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import { getOscillator } from "../../../util/helper";

export default {
	name: "FilterUI",
	props: {
		oscillatorId: {},
		filterId: {
			type: String,
			required: true
		}
	},

	data() {
		return {};
	},

	computed: {
		filterType: {
			get() {
				return this.getThisFilter().type;
			},
			set(value) {
				this.$store.commit("setFilterType", {
					oscillatorId: this.oscillatorId,
					filterId: this.filterId,
					type: value
				});
			}
		},
		modulationType: {
			get() {
				return this.getThisFilter().modulationType;
			},
			set(value) {
				this.$store.commit("setFilterModType", {
					filterId: this.filterId,
					modType: value
				});
			}
		},
		filterAmplitude: {
			get() {
				return this.getThisFilter().env.amplitude;
			},
			set(value) {
				this.$store.commit("setFilterAmplitude", {
					filterId: this.filterId,
					amount: value
				});
			}
		},
		filterCutoff: {
			get() {
				return this.getThisFilter().cutoff;
			},
			set(value) {
				this.$store.commit("setFilterCutoff", {
					filterId: this.filterId,
					cutoff: value
				});
			}
		}
	},

	methods: {
		getThisFilter() {
			return getOscillator(this.oscillatorId).filters.find(
				filter => filter.id == this.filterId
			);
		},
		deleteThisFilter() {
			this.$store.commit("deleteFilter", {
				oscillatorId: this.oscillatorId,
				filterId: this.filterId
			});
		}
	}
};
</script>

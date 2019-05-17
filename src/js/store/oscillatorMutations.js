import {
	getOscillator,
	getFilter
} from "../util/helper";

import {
	Filter
} from "../Objects/Oscillator";
import Oscillator from "../Objects/Oscillator";

const oscillatorMutations = {
	mutations: {
		/*
			Adding / removing oscillators
		*/

		addOscillator() {
			let osc = new Oscillator();
			this.state.oscillators.push(osc);
			this.state.activeOscillator = osc;
		},

		removeOscillator(oscillator_id) {
			let index = this.state.oscillators.indexOf(oscillator_id);
			index > -1 && this.state.oscillators.splice(index, 1);
		},

		setCurrentOscillator(state, payload) {
			let osc = getOscillator(payload.oscillator_id);
			this.state.activeOscillator = osc;
		},

		/*
			Oscillator Mutations
		*/

		setOscillatorWaveform(state, payload) {
			let osc = getOscillator(payload.oscillator_id);
			osc.waveform = payload.waveform;
		},

		setOscillatorGain(state, payload) {
			getOscillator(payload.oscillator_id).gain = payload.gain
		},

		/*
			Filters
		 */

		createFilter(state, payload) {
			getOscillator(payload.oscillator_id).filters.push(new Filter())
		},

		deleteFilter(state, payload) {
			const index = getOscillator(payload.oscillatorId).filters.findIndex(filter => filter.id == payload.filterId);
			getOscillator(payload.oscillatorId).filters.splice(index, 1);
		},

		setFilterType(state, payload) {
			getFilter(payload.filterId).type = payload.type
		},

		setFilterModType(state, payload) {
			getFilter(payload.filterId).modulationType = payload.modType
		},

		setFilterCutoff(state, payload) {
			getFilter(payload.filterId).cutoff = payload.cutoff
		},
		setFilterQuality(state, payload) {
			getFilter(payload.filterId).quality = payload.quality
		},

		// TODO: should have a function for applying any kind of envelope
		// TODO: also there are 2 mutations for gain. This one is used currently
		volume(state, payload) {
			let osc = getOscillator(payload.oscillator_id);
			let property = osc.env;
			switch (payload.property) {
				case "amplitude":
					property.amplitude = payload.value;
					break;
				case "attack":
					property.attack = payload.value;
					break;
				case "decay":
					property.decay = payload.value;
					break;
			}
		},
	}
}

export default oscillatorMutations;

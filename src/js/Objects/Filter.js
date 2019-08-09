import store from "../store/store";

import { generateFilterId } from "../util/generateId";
import Envelope from "./Envelope";

export default class Filter {
    constructor() {
        this.id = generateFilterId();
        this.modulationType = 'env';
        this.modulation = new Envelope();
        this.type = 'lowpass';
        this.cutoff = 100;
        this.quality = 0;
        this.filterNode = store.state.audioContext.createBiquadFilter();
    }
}

/**
 * types
 *
 * biquad filter
 * convolver (reverb)
 * delay
 * dynamicsCompressor
 * WaveShaper
 *
 */

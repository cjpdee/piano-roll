<template>
  <div class="oscillator__filter">
    <button @click="deleteThisFilter()">X</button>
    <div class="oscillator__filter-wrap">
      Filter
      <br />
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
    <div class="oscillator__properties" v-if="modulationType=='env'">
      <div class="oscillator__property-wrap">
        <label class="oscillator__property-label" for="filter_cutoff">Cut</label>
        <input
          v-model="filterCutoff"
          class="oscillator__property"
          type="range"
          orient="vertical"
          id="filter_cutoff"
          min="0"
          max="100"
        />
      </div>
      <div class="oscillator__property-wrap">
        <label class="oscillator__property-label" for="filter_quality">Qul</label>
        <input
          v-model="filterQuality"
          class="oscillator__property"
          type="range"
          orient="vertical"
          id="filter_quality"
          min="0"
          max="4000"
        />
      </div>
      <!-- attack -->
      <div class="oscillator__property-wrap">
        <label class="oscillator__property-label" for="filter_attack">Att</label>
        <input v-model="filterAttack" class="oscillator__property" type="range" id="filter_attack" />
      </div>
      <!-- hold -->
      <div class="oscillator__property-wrap">
        <label class="oscillator__property-label" for="filter_hold">Hold</label>
        <input v-model="filterHold" class="oscillator__property" type="range" id="filter_hold" />
      </div>
      <!-- decay -->
      <div class="oscillator__property-wrap">
        <label class="oscillator__property-label" for="filter_decay">Dec</label>
        <input v-model="filterDecay" class="oscillator__property" type="range" id="filter_decay" />
      </div>
    </div>
    <!-- LFO settings -->
    <div class="oscillator__properties" v-else>
      <!-- amount -->
      <div class="oscillator__property-wrap">
        <label class="oscillator__property-label" for="filter_lfo-amt">Amt</label>
        <input v-model="filterDecay" class="oscillator__property" type="range" id="filter_lfo-amt" />
      </div>
      <!-- speed -->
      <div class="oscillator__property-wrap">
        <label class="oscillator__property-label" for="filter_lfo-speed">Speed</label>
        <input
          v-model="filterDecay"
          class="oscillator__property"
          type="range"
          id="filter_lfo-speed"
        />
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
    return {
      // TODO: put the filter object here
    };
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
    filterCutoff: {
      get() {
        return this.getThisFilter().cutoff;
      },
      set(value) {
        this.$store.commit("setFilterCutoff", {
          filterId: this.filterId,
          cutoff: parseFloat(value)
        });
      }
    },
    filterQuality: {
      get() {
        return this.getThisFilter().quality;
      },
      set(value) {
        this.$store.commit("setFilterQuality", {
          filterId: this.filterId,
          quality: parseFloat(value)
        });
      }
    },

    ////
    filterAttack: {
      get() {
        return this.getThisFilter().modulation.attack;
      },
      set(value) {
        this.$store.commit("setFilterAttack", {
          filterId: this.filterId,
          attack: parseFloat(value)
        });
      }
    },
    filterHold: {
      get() {
        return this.getThisFilter().modulation.hold;
      },
      set(value) {
        this.$store.commit("setFilterHold", {
          filterId: this.filterId,
          hold: parseFloat(value)
        });
      }
    },
    filterDecay: {
      get() {
        return this.getThisFilter().modulation.decay;
      },
      set(value) {
        this.$store.commit("setFilterDecay", {
          filterId: this.filterId,
          decay: parseFloat(value)
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

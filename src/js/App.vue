<template>
  <!-- TODO: finish scheme switching mechanic -->
  <div id="app" class="scheme1">
    <TheTopBar></TheTopBar>
    <div class="bottom">
      <TheSidebar></TheSidebar>
      <div class="piano__section">
        <ThePianoKeys :notes="pianoKeys"></ThePianoKeys>
        <TheRoll :notes="pianoKeys"></TheRoll>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";

import { store } from "./store/store";
import Oscillator from "./Objects/Oscillator";
import { getKeysArray } from "./util/helper";

// Topbar components
import TheTopBar from "./Components/Topbar/TheTopbar.vue";
import TheControls from "./Components/Topbar/TheControls.vue";

// Sidebar components
import TheSidebar from "./Components/Sidebar/TheSidebar.vue";
import TheRack from "./Components/Sidebar/TheRack.vue";
import OscillatorUI from "./Components/Sidebar/OscillatorUI.vue";
import Filter from "./Components/Sidebar/Includes/Filter.vue";

// Piano keyboard
import ThePianoKeys from "./Components/ThePianoKeys.vue";

// Piano roll components
import TheRoll from "./Components/Main/TheRoll.vue";
import PitchRow from "./Components/Main/PitchRow.vue";
import Note from "./Components/Main/Note.vue";

// TODO: register these properly
Vue.component("Note", Note);
Vue.component("FilterUI", Filter);

Vue.use(Vuex);
export default {
  components: {
    TheTopBar,
    TheSidebar,
    ThePianoKeys,
    TheRoll
  },
  store,
  data() {
    return {
      state: store.state,
      lastOscillator: null,
      currentNote: null,
      previousKeyCode: null
    };
  },

  mounted() {
    store.commit("createAudioContext");
    store.commit("addOscillator");
  },

  computed: {
    pianoKeys() {
      return getKeysArray();
    }
  }
};
</script>
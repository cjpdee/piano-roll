<template>
  <div class="topbar__item">
    <div class="topbar__segment">
      <div>
        <label>
          <i class="fas fa-magnet"></i>
          <span class="tooltip">Grid Divisions</span>
        </label>
        <select v-model="timeSignature">
          <option :value="1">1</option>
          <option :value="2">1/2</option>
          <option :value="3">1/3</option>
          <option :value="4">1/4</option>
          <option :value="6">1/6</option>
          <option :value="8">1/8</option>
          <option :value="16">1/16</option>
        </select>
      </div>
      <div>
        <label>
          <i class="fas fa-arrows-alt-h"></i>
          <span class="tooltip">Note Length</span>
        </label>
        <select v-model="noteSize">
          <option :value="1">1</option>
          <option :value="2">1/2</option>
          <option :value="3">1/3</option>
          <option :value="4">1/4</option>
          <option :value="6">1/6</option>
          <option :value="8">1/8</option>
          <option :value="16">1/16</option>
        </select>
      </div>
    </div>

    <div class="topbar__segment">
      <div>
        <label>
          <!-- 
                      Note:
                      When changing this, all the notes in the store must also change
                      Their position and length must be divided or multiplied by 
          -->
          #
          <span class="tooltip">Loop length in bars</span>
        </label>
        <select v-model="numBars">
          <option :value="1">1</option>
          <option :value="2">2</option>
          <option :value="4">4</option>
          <option :value="8">8</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheGridSetup",
  computed: {
    timeSignature: {
      get() {
        return this.$store.state.project.timeSignature;
      },
      set(value) {
        this.$store.commit("setTimeSignature", {
          timeSignature: value
        });
      }
    },
    noteSize: {
      get() {
        return this.$store.state.project.noteSize;
      },
      set(value) {
        this.$store.commit("setNoteSize", {
          noteSize: value
        });
      }
    },
    numBars: {
      get() {
        return this.$store.state.project.numBars;
      },
      set(value) {
        this.$store.commit("setNumBars", {
          numBars: value
        });
      }
    }
  }
};
</script>

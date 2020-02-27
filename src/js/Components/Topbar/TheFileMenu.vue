<template>
  <div>
    <div class="topbar__item">
      <button @click="save">Save</button>
    </div>
    <div class="topbar__item">
      <button @click="load">Load</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheFileMenu",
  methods: {
    save() {
      const data = JSON.stringify(this.$store.state);
      window.localStorage.setItem("project", data);
      console.log(JSON.parse(window.localStorage.getItem("project")));
    },
    load() {
      const data = JSON.parse(window.localStorage.getItem("project"));
      console.log(data);
      this.$store.replaceState(data);
      /**
       * Things to do here:
       * Create new audioContext
       */
    }
  }
};
</script>
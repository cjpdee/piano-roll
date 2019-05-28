<template>
    <div class="topbar__item">
        <button @click="save">Save</button>
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
		}
    }
}
</script>
<template>
    <div class="topbar__item">
        <h4>Grid Settings</h4>
        <label>
            Grid Time Signature
            <select v-model="timeSignature">
                <option :value="1">1</option>
                <option :value="2">1/2</option>
                <option :value="3">1/3</option>
                <option :value="4">1/4</option>
                <option :value="6">1/6</option>
                <option :value="8">1/8</option>
                <option :value="16">1/16</option>
            </select>
        </label>

        <label>
            Note Length
            <select v-model="noteSize">
                <option :value="1">1</option>
                <option :value="2">1/2</option>
                <option :value="3">1/3</option>
                <option :value="4">1/4</option>
                <option :value="6">1/6</option>
                <option :value="8">1/8</option>
                <option :value="16">1/16</option>
            </select>
        </label>

        <label>
            <!-- 
                Note:
                When changing this, all the notes in the store must also change
                Their position and length must be divided or multiplied by 
             -->
            # of bars
            <select v-model="numBars">
                <option :value="1">1</option>
                <option :value="2">2</option>
                <option :value="4">4</option>
                <option :value="8">8</option>
            </select>
        </label>
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
		},
    }
}
</script>

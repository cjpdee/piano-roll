window.Vue = require('Vue');

// Sidebar components
Vue.component('Sidebar',require('./Components/Sidebar/Sidebar.vue'));
Vue.component('Controls',require('./Components/Sidebar/Controls.vue'));
Vue.component('Rack',require('./Components/Sidebar/Rack.vue'));
Vue.component('Oscillator',require('./Components/Sidebar/Oscillator.vue'));

Vue.component('PianoKeys',require('./Components/PianoKeys.vue'));

// Piano roll components
Vue.component('Roll',require('./Components/Main/Roll.vue'));
Vue.component('PitchRow',require('./Components/Main/PitchRow.vue'));
Vue.component('Note',require('./Components/Main/Note.vue'));


const app = new Vue({
    el: '#app',

    template: `
        <div id="app">
            <Sidebar></Sidebar>
            <PianoKeys></PianoKeys>
            <Roll></Roll>
        </div>
    `,
    data() {},

    mounted() {}
});

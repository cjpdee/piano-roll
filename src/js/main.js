import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import App from "./App";

new Vue({
	el: "#app",
	components: { App },
	template: "<App/>"
});
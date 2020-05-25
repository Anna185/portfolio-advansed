import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import login from "./login.js"
//import works from "./works.js"
//import about from "./about.js"
//import skills from "./skills.js"
//import review from "./reviews.js"

export const store = new Vuex.Store({
	modules: {
		login, 
		
	}
});
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import login from "./login.js"
import toast from './modules/toast';
//import about from "./about.js"
//import skills from "./skills.js"
import reviews from ".//modules/reviews";
import categories from "./modules/categories";
//import skills from "./modules/skills";
//import user from "./modules/user";

export const store = new Vuex.Store({
	modules: {
		login,
		toast,
		categories,
		//skills,
		reviews, 
		
	}
});
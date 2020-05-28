import Vue from "vue";
import Vuex from "vuex";



import login from "./login.js"
import toast from './modules/toast';
import reviews from ".//modules/reviews";
import categories from "./modules/categories";
import works from './modules/works'


Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		login,
		toast,
		categories,
		works,
		reviews, 
		
	}
});
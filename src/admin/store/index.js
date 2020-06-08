import Vue from "vue";
import Vuex from "vuex";



import login from './modules/login';
import toast from './modules/toast';
import rew from "./modules/rew";
import categories from "./modules/categories";
import works from './modules/works';
import about from './modules/about';
import skills from './modules/skills';


Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		login,
		toast,
		categories,
		works,
		rew, 
		about,
		skills,
		
		
		
	}
});
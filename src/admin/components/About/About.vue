<template lang="pug">
   .about
     .about__header
       .container.about__header-container
         h1.page-title.about__title Блок «Обо мне»
         button(type="button" @click.prevent="toggleAddForm" v-if="!isShowNewBlock").about__header-btn Добавить группу
          
     .about__content
       .container.about__content-container
         ul.skill-group__list
           li.skill-group__item(v-if="isShowNewBlock")
             AddBtn(@toggleAddForm="toggleAddForm")
           li.skill-group__item(v-for="category in categories" :key="category.id")
             SkillGroup(
               :category="category"
               
               :skills="filterCategorySkills(category.id)"
             )
 </template>

<script>
import { mapState, mapActions } from 'vuex'
import AddBtn from "../AddBtn"
import SkillGroup from "./SkillGroup"
export default {
   components: {
     SkillGroup,
		  AddBtn
   },

   data() {
			return{
			isShowNewBlock:false,
						
			}
		}, 
		
		computed: {
			 ...mapState('about', {
			categories: state => state.categories
			}),
    		...mapState('skills', {
      		skills: state => state.skills
			})
		
			
		} ,
		
		methods: {
			...mapActions('about', ['getCategories']),
			...mapActions('skills', ['getSkills']),			
			
			filterCategorySkills(catid) {
		  		return this.skills.filter(skill => skill.category === catid);
		},
		toggleAddForm() {
				this.isShowNewBlock = !this.isShowNewBlock
			}		
			
		}, 
		async created() {
			
			try {
			await this.getCategories();
    		} catch (e) {
			}
			
			try {
      			await this.getSkills();
    		} catch (e) {
      
				}
    		}
		}
	
</script>
<style lang="postcss" scoped>
  @import "../../../styles/mixins.pcss";

  .about__header {
    margin-bottom: 60px;
  }

  

  .about__header-container {
    display: flex;
  }

   

  .about__title {
    margin-right: 60px;
    margin-bottom: 0;

   
  }

  .about__header-btn {
    display: flex;
  }

 

  .skill-group__list {
    display: flex;
    margin-left: -30px;
    flex-wrap: wrap;
  }

  .skill-group__item {
    width: calc(100% / 2 - 30px);
    margin-left: 30px;
    margin-bottom: 30px;
    display: flex;
  }

    
</style>
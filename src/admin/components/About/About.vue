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
             AddCategory(@toggleAddForm="toggleAddForm")
           li.skill-group__item(v-for="category in categories" :key="category.id")
             SkillGroup(
               :value="category"
               
               :skills="filterCategorySkills(category.id)"
             )
 </template>

<script>
import { mapState, mapActions } from 'vuex'
import  AddCategory from "./AddCategory"
import SkillGroup from "./SkillGroup"
export default {
   components: {
     SkillGroup,
      AddCategory
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
    background-color: transparent;
		color: #383bcf;
		border: none;
		font-size: 18px;
		&:before {
			content: '+';
			color: #fff;
			width: 21px;
			height: 21px;
			border-radius: 50%;
			background: linear-gradient(to right, #1d51dd, #3f35cb);
			display: flex;
			justify-content: center;
			
			margin-right: 10px;
		}
		
		
	
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
   .add-new-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: $links-color;
    font-weight: 600;
    padding: 0;
    border: none;
    font-size: 16px;
    @include tablets {
      font-size: 14px;
    }
    &:before {
      content: "";
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: svg-load('cross.svg', fill=$white, width=15px, height=15px, transform='rotate(45deg)') center center no-repeat, linear-gradient(to right, #006aed, #3f35cb);
      color: $white;
      flex-shrink: 0;
      flex-basis: 40px;
      font-size: 30px;
      line-height: 40px;
    } 
    &--small {
      &:before {
        content: "";
        background:svg-load('cross.svg', fill=$white, width=8px, height=8px, transform='rotate(45deg)') center center no-repeat, linear-gradient(to right, #006aed, #3f35cb);
        width: 20px;
        height: 20px;
        flex-basis: 20px;
        font-size: 18px;
        margin-right: 13px;
        line-height: 1;
      }
    }
    &--plain {
      flex: 1;
      background-image: linear-gradient(to right, #006aed 0%, #3f35cb 100%);
    }
      &:before {
        display: none;
      }
    
  }
  .add-new-btn__text {
    color: $white;
    font-size: 18px;
    font-weight: 700;
    line-height: 25px;
    white-space: break-spaces;
    @include phones {
      font-size: 16px;
    }
    
    &:before {
      display: flex;
      content: '+';
      font-weight: 300;
      font-size: 72px;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 2px solid currentColor;
      margin-bottom: 30px;
    
    }
  } 
</style>
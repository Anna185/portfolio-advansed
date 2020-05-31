<template lang="pug">
   .about
     .about__header
       .container.about__header-container
         h1.page-title.about__title Блок «Обо мне»
         .about__header-btn
           AddBtn(text="Добавить группу" type="small")
     .about__content
       .container.about__content-container
         ul.skill-group__list
           li(
             v-for="skillGroup in skillGroups"
             :key="skillGroup.id"
           ).skill-group__item
             SkillGroup(
               :value="skillGroup"
             )
 </template>

<script>
//import { mapState, mapActions } from 'vuex'
import AddBtn from "../AddBtn"
import SkillGroup from "./SkillGroup"
export default {
   components: {
     AddBtn,
     SkillGroup
   },

   data () {
     return {
       skillGroups: [
         {
           "id": 1,
           "title": "Frontend",
           "skills": [
             {
               "id": 1,
               "title": "HTML5",
               "percent": 100
             },
             {
               "id": 2,
               "title": "CSS3",
               "percent": 50
             },
             {
               "id": 3,
               "title": "JavaScript",
               "percent": 25
             },
             {
               "id": 4,
               "title": "VueJs",
               "percent": 30
             }
       
           ]
         },
         {
           "id": 2,
           "title": "Workflow",
           "skills": [
             {
               "id": 1,
               "title": "GIT",
               "percent": 45
             },
             {
               "id": 2,
               "title": "Terminal",
               "percent": 60
             },
             {
               "id": 3,
               "title": "Gulp",
               "percent": 30
             },
             {
               "id": 4,
               "title": "Webpack",
               "percent": 75
             }
           ]
         }
       ]
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
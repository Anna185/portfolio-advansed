<template lang="pug">
   .skill-group.card
     .skill-group__header
       .skill-group__header-value(v-if="!editMode")
         .skill-group__header-title {{value.title}}
         button(type="button" @click="switchEdit").btn.btn-edit
         button(type="button" @click.prevent="removeSkillCategory").btn.btn-trash
       .skill-group__header-form(v-else)
         form.add__form.add__form--group
           .add__form-wrap
             .add__form-field 
               input(v-model="value.title" placeholder="Название новой группы").add__form-input
             .add__form-btns.add__form-btns--colored
               CardBtn(icon="confirm").btn
               CardBtn(icon="delete" @click.prevent="removeSkillCategory").btn 
       hr.divider
     .skill-group__content
       ul.skill-group__list
         li(
           v-for="skill in value.skills"
           :key="skill.id"
         ).skill-group__item
           Skill(
             :skill="skill"
           )
     .skill-group__add-item
       form.add__form.add__form--skill
         .add__form-wrap
           .add__form-field 
             input(placeholder="Новый навык").add__form-input
           .add__form-field 
             input(placeholder="100 %").add__form-input
           AddBtn(type="button")
 </template>
 <script>
 import Skill from "./Skill"
 import AddBtn from "../AddBtn"
 import CardBtn from "../CardBtn"
 import CustomInput from "../CustomInput"
 import { mapActions } from 'vuex';
 export default {
   components: {
     Skill,
     AddBtn,
     CardBtn,
     CustomInput
   },

   props: {
     value: Object,
    //skills: Array
   },

   data () {
     return {
       editMode: false,
       //addSkill: true,
     // skill: {
		//	value: this.value.id,
		//	title: "",
		//	percent: ""
		//}
     }
   },

   methods: {
     switchEdit () {
       this.editMode = !this.editMode
     },
    ...mapActions('about', ['removeCategory']),
    
    async removeSkillCategory() {
	
			const { response} = await this.removeCategory(this.value.id);
   
   }}};
    
 

 </script>
<style lang="postcss" scoped>
  @import "../../../styles/mixins.pcss";

  .skill-group {
    width: 100%;
    min-height: 390px;
    padding: 20px;
    display: flex;
    flex-direction: column;

    
  }

  .skill-group__header-value {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    padding: 10px 10px 0 10px;
    justify-content: flex-end;

    
  }

  .skill-group__header-form {
    padding: 0 10px;
    margin-bottom: 15px;

    
  }

  .skill-group__header-title {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.2;

    @include phones {
      font-size: 16px;
    }
  }

  .skill-group__header-btns {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .skill-group__content {
    padding: 30px 10px 10px 10px;

    
  }

  .skill-group__list {
    display: flex;
    flex-direction: column;
  }

  .skill-group__item {
    display: flex;
    margin-bottom: 25px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .skill-group__add-item {
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
    margin-bottom: 10px;
    padding-right: 10px;

    @include tablets {
      padding-left: 10px;
    }

   
  }

  //-.add__form {
   // &--skill {
     // width: 79%;

     // @include tablets {
        //width: 100%;
      //}

.add__form {
    &--group {
      .add__form-field {
        flex-basis: 60%;
        @include tablets {
          flex-basis: 70%;
        }
      }
    }
    &--skill {
     // width: 79%;
      @include tablets {
        width: 100%;
      }
      .add__form-wrap {
        align-items: initial;
        justify-content: initial;
        
        .add__form-field {
          &:nth-child(1) {
            margin-right: 10px;
            flex-basis: 58%;
          }
          &:nth-child(2) {
            flex-basis: 20%;
            margin-right: 30px;
            @include tablets {
              margin-right: 25px;
            }
          }
        }
      }
    }
  }
  .add__form-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .add__form-btns {
    display: flex;
    &--colored {
      .btn {
        filter: none;
      }
    }
  }
  .btn {
    filter: grayscale(1) brightness(2.5);
    transition: filter .3s ease-in;
    &:hover {
      filter: none;
    }
    &:first-child  {
      margin-right: 15px;
    }
  }

  .btn-trash {
    color: rgba(#414c63, .7);
    border: none;
    background: transparent;
    font-weight: 600;
    padding: 0;
    display: flex;
    align-items: center;
    width: 0.9375rem;
    height: 0.9375rem;
    background: svg-load('trash.svg', fill=#bf2929, width=100%, height=100%) center center no-repeat;
    margin-left: 1rem;
  }

  .btn-edit {
    color: rgba(#414c63, .7);
    border: none;
    background: transparent;
    font-weight: 600;
    padding: 0;
    display: flex;
    align-items: center;
    width: 0.9375rem;
    height: 0.9375rem;
    background: svg-load('pencil.svg', fill=$links-color, width=100%, height=100%) center center no-repeat;
  }
</style>
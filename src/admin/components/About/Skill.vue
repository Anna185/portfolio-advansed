<template lang="pug">
   .skill
     .skill__data(v-if="!editMode")
       .skill__title {{skill.title}}
       .skill__percent
         .skill__percent-value {{skill.percent}}
       .skill__btns
         CardBtn(icon="edit" @click="switchEdit").skill__btn
         button(type="button" @click.prevent="removeThisSkill").skill__btn.btn-trash
     .skill__data.skill__data--underline(v-else)
       .skill__title
         .skill__field 
           input(type="text" v-model="skill.title").skill__field-input
       .skill__percent
         .skill__field 
           input(type="text" v-model="skill.percent").skill__field-input
       .skill__btns.skill__btns--colored
         CardBtn(icon="confirm").skill__btn
         CardBtn(icon="delete" @click="switchEdit").skill__btn
 </template>
 <script>
 import CardBtn from "../CardBtn"
 import {mapActions} from 'vuex';
 export default {
   components: {
     CardBtn
   },
   
   props: {
     skill: Object
   },

   data () {
     return {
       editMode: false
     }
   },

   methods: {
     switchEdit () {
       this.editMode = !this.editMode
     },
     ...mapActions('skills', ['removeSkill']),
     async removeThisSkill() {
       try {
          await this.removeSkill(this.skill.id);
         } catch (e) {
        }
         


     },
   }}
 </script>
<style lang="postcss" scoped>
  @import "../../../styles/mixins.pcss";

  .skill {
    width: 100%;
  }

  .skill__data {
    display: flex;
    justify-content: space-between;
  

    &--underline {
      .skill__title,
      .skill__percent {
        border-bottom: 1px solid currentColor;
      }
    }

    @include phones {
      font-size: 14px;
    }
  }

  .skill__title {
    width: 56%;
    margin-right: 10%;

    /* @include tablets {
      width: 40%;
    }

    @include phonesLg {
      width: 60%;
    }

    @include phones {
      width: 40%;
    } */
  }
  
  .skill__percent {
    display: flex;
    width: 60px;
    margin-right: 30px;
    
    &:after {
      content: "%";
      display: inline-block;
      opacity: .7;
    }

    .skill__field-input {
      margin-left: 10px;
    }
  }

  .skill__percent-value {
    margin-right: auto;
  }
  
  .skill__btns {
    width: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    &--colored {
      .skill__btn {
        filter: none;
      }
    }
  }

  .skill__btn {
    filter: grayscale(1) brightness(2.5);

    &:hover {
      filter: none;
    }

    &:first-child {
      margin-right: 25%;
    }
  }

  .skill__field {
    display: flex;

    &:focus-within {
      outline: rgb(77, 144, 254) auto 0.0625em;
    }
  }

  .skill__field-input {
    background: transparent;
    border: none;
    outline: none;
    width: 100%;
    font-size: 16px;
    font-weight: 600;
    padding-bottom: 10px;
    line-height: 1.2;

    @include phones {
      font-size: 14px;
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
</style>
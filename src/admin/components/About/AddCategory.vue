<template lang="pug">
.skill-group__add-item
  form.add__form.add__form--skill
    .add__form-wrap
      .add__form-field 
        input(type="text" placeholder="Новый навык" v-model='category').add__form-input
      .add__form-field 
        input(type="text" placeholder="100 %").add__form-input
      AddBtn(type="submit" @click.prevent='addCat').add__form-btn +
</template>
 <script>
 import Skill from "./Skill"
 import CustomInput from "../CustomInput"
 import AddBtn from "../AddBtn"
 import CardBtn from "../CardBtn"
 

 import {mapActions} from "vuex"

 export default {

    data() {
      return {
        category: ''
      }
    },
   props: {
     inheritAttrs: false,
     text: {
       type: String,
       default: ''
     },
     type: {
       type: String,
       default: ''
     }
   },
  
   methods: {
     ...mapActions('categories', ['saveCategory']),
    async addCat() {
      await this.saveCategory(this.category)
    }
   }
 }
</script>
<style lang="postcss" scoped>
  @import "../../../styles/mixins.pcss";
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
      width: 79%;
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

  //.add__form-btn {
   // color: #fff;
		//	width: 21px;
		//	height: 21px;
		//	border-radius: 50%;
		//	background: linear-gradient(to right, #1d51dd, #3f35cb);
		//	display: flex;
		//	justify-content: center;
  //}
</style>


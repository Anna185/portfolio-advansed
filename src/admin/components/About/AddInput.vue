<template lang="pug">
  form.add__form.add__form--skill(@submit.prevent="addNewSkill")
    .add__form-wrap
      .add__form-field 
        input(placeholder="Новый навык" type="text" required v-model="skill.title").add__form-input
      .add__form-field 
        input(type="text"  required placeholder="100 %" v-model="skill.percent").add__form-input
      AddBtn(type="submit")
  
</template>
<script>
import AddBtn from "../AddBtn"
import { mapActions } from "vuex";
export default {
  props: {
    value: Object
  },
  data() {
    return {
      skill: {
        title: "",
        percent: ""
      }
    };
  },
  components: {
    AddBtn,
  },
  methods: {
    ...mapActions("skills", ["addSkill"]),
    async addNewSkill() {
        const skillData = {
          ...this.skill,
          category: this.category.id
        };
        try {
          await this.addSkill(skillData);
          this.category.title = "";
          this.category.percent = "";
        } catch (error) {
          console.log(error);
        }
      
    }
  }
};
</script>
<style lang="postcss" scoped>
  @import "../../../styles/mixins.pcss";
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

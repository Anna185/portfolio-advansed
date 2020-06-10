<template lang="pug">
   .works
     .works__header
       .container
         h1.page-title.works__title Блок «Работы»
     .works__content
       .container.works__container
          WorkAdd(
           v-if="addMode"
           @toggleAddMode="toggleAddMode"
          )
          WorkEdit(v-if="getEditModeState" :workToEdit="workToEdit")
          ul.works__list
            li.works__item(v-if="!addMode")
              addItemComp(@toggleAddMode='toggleAddMode')
            li.works__item(
              v-for="work in works"
              :key="work.id"
            )
              worksItemComp(:addMode="addMode" :work="work" @getCurrentWork="getCurrentWork")
 </template>
 <script>
 
 import AddBtn from "../AddBtn"
 import WorkAdd from "./WorkAdd"
 import  WorkEdit from "./WorkEdit"
 import worksItemComp from "./Work"
 import addItemComp from './WorksItemAdd'
 import { mapState, mapActions, mapGetters } from 'vuex'
 export default {
   components: {
     
     AddBtn,
     WorkAdd,
     worksItemComp,
     addItemComp,
     WorkEdit
   },

   data () {
    return {
      addMode: false,
      workToEdit: {}
    }
  },
  computed: {
    ...mapGetters('works', ['getEditModeState']),
		...mapState('works', {works: state => state.works})
  },
  
  methods: {
    ...mapActions('works', ['getWork']),
    toggleAddMode() {
			this.addMode = !this.addMode
		},
    
   getCurrentWork(work) {
			this.workToEdit = this.works.find(item => item.id === work.id)
		},
  },
  async created() {
			await this.getWork();
		},

  
}
</script>
<style lang="postcss" scoped>
  @import "../../../styles/mixins.pcss";

  .works__container {
    display: flex;
    flex-direction: column;

    
  }

  .works__list {
    display: flex;
    margin-left: -30px;
    flex-wrap: wrap;
  }

  .works__item {
    width: calc(100% / 3 - 30px);
    margin-left: 30px;
    margin-bottom: 30px;
    display: flex;

    @include tablets {
      width: calc(100% / 2 - 30px);
    }

    

    @include phones {
      margin-bottom: 10px;
      
      &:last-child {
        margin-bottom: 25px;
      }
    }
  }
</style>
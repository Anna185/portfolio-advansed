<template lang="pug">
   .works
     .works__header
       .container
         h1.page-title.works__title Блок «Работы»
     .works__content
       .container.works__container
         WorkEdit()

         ul.works__list
           li.works__item
             AddBtn(
               text="Добавить работу"
               type="plain")
           li.works__item(
             v-for="work in works"
             :key="work.id"
           )
             work(
             :value="work")
 </template>
 <script>
 import Work from "./Work"
 import AddBtn from "../AddBtn"
 import WorkEdit from "./WorkEdit"
 export default {
   components: {
     Work,
     AddBtn,
     WorkEdit
   },

   created() {
     this.works = this.makeArrWithRequireImages(this.works)
   },

   data () {
     return {
       works: [
         {
           "id": 1,
           "title": "Сайт школы образования",
           "skills": "Html, Css, JavaScript",
           "image": "slider-one.jpg",
           "link": "//google.com",
           "desc": "Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 2 месяца только самых тяжелых испытаний и бессонных ночей!"
         },
         {
           "id": 2,
           "title": "Сайт школы образованияа",
           "skills": "Html, Css, JavaScript",
           "image": "slider-two.jpg",
           "link": "//yandex.ru",
           "desc": "Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 2 месяца только самых тяжелых испытаний и бессонных ночей!"
         },
         {
           "id": 3,
           "title": "Сайт школы образования",
           "skills": "Html, Css, JavaScript",
           "image": "slider-three.jpg",
           "link": "//rambler.ru",
           "desc": "Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 2 месяца только самых тяжелых испытаний и бессонных ночей!"
         }
       ]
     }
   },

    methods: {
     makeArrWithRequireImages(array) {
       return array.map((item) => {
         const requirePic = require(`../../../images/content/works/${item.image}`);
         item.image = requirePic;
         return item;
       });
     }
   }
   
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
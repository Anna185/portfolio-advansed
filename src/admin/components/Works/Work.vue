<template lang="pug">
    .work.card
     .work__preview
       .work__image-wrap
         img(:src="baseURL+dataWork.photo").work__image
       .work__tags
         ul.work__tags-list
           li.work__tag(
             v-for="tag in tags"
             :key="tag"
           )
           
             .tag {{tag}}
     .work__info
       h3.work__title {{dataWork.title}}
       .work__decs
         p {{dataWork.description}}
       a(:href="dataWork.link").work__link {{dataWork.link}}
     .work__btns
       CardBtn(title="Править" icon="edit" @click.prevent='toggleEdit' :disabled="getEditModeState || addMode")
       CardBtn(title="Удалить" icon="delete" @click.prevent="removeThisWork")
 </template>
 
<script>
import CardBtn from "../CardBtn"
import { mapActions, mapGetters, mapState } from 'vuex';
export default {
  props: {
    addMode: Boolean,
		work: Object
    
  },
  components: {
   CardBtn,
    
  },
  data() {
			return {
				baseURL: "https://webdev-api.loftschool.com/",
				tags: [],
				dataWork: {}
				
			}
		},
		async created() {
			 this.tags = await this.work.techs.split(', ');
			 this.dataWork = await this.work
	}, 		
		 computed: {
			...mapGetters('works', ['getEditModeState']),
			 
      ...mapState('works', {works: state => state.works}),
     },

		methods: {
		...mapActions('works', ['toggleEditMode', 'removeWork']),
			toggleEdit() {
			this.toggleEditMode(this.getEditModeState);
			this.$emit(`getCurrentWork`, this.work)
			
		},
		
		async removeThisWork() {
			await this.removeWork(this.dataWork.id)
		},
			
		
	}
  }





</script>
<style lang="postcss" scoped>
  @import "../../../styles/mixins.pcss";

  .work {
    display: flex;
    flex-direction: column;
  }

  .work__preview {
    position: relative;
  }

  .work__image-wrap {
    height: 190px;
  }

  .work__image {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .work__tags {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  .work__tags-list {
    display: flex;
    flex-wrap: wrap;
  }

  .work__tag {
    font-size: 13px;
    color: #283340;
    margin-left: 8px;
    font-weight: 600;
    margin-top: 5px;
  }

  .tag {
    padding: 8px 18px;
    border-radius: 25px;
    background-color: $white;
  }

  .work__info {
    padding: 40px 30px 0 30px;
    margin-bottom: 20px;
    font-weight: 600;

   
  }

  .work__title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 25px;
  }

  .work__decs {
    opacity: .7;
    line-height: 30px;
    margin-bottom: 30px;
  }

  .work__link {
    color: #383bcf;
  }

  .work__btns {
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    margin-top: auto;
    font-weight: 600;
    margin-bottom: 40px;

    
  }
</style>
<template lang="pug">
  .reviews
    .reviews__header
      .container
        h1.page-title.reviews__title Блок «Отзывы»
    .reviews__content
      .container.reviews__container
        rewEditComp(v-if="getEditModeState" :rewId="rewId")
        rewAddComp(v-if="addMode" @toggleAddMode='toggleAddMode')
        ul.reviews__list
          li.reviews__item(v-if="!addMode")
            rewItemAddComp(@toggleAddMode='toggleAddMode')
          li.reviews__item(v-for="rew in rews")
            
            rewItemComp(:addMode="addMode" :rew="rew" @rewIdGet="rewIdGet")
</template>
<script>
import rewItemComp from './Review'
import rewAddComp from './ReviewAdd'
import rewEditComp from './ReviewEdit'
import AddBtn from '../AddBtn'
import rewItemAddComp from './rewItemAdd'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  components: {
    AddBtn,
    rewItemComp,
    rewEditComp,
    rewItemAddComp,
    rewAddComp
  },

  data() {
			
			return{
				addMode: false,
				rewId: 1				
			}
		}, 
		methods: {
			...mapActions('rew', ['getRew']),
			toggleAddMode() {
				this.addMode = !this.addMode
			},
			
			toggleEditMode() {
				this.editMode = !this.editMode
			},
		rewIdGet(id) {
			this.rewId = id
		}
		}, 
		computed: {
			...mapGetters('rew', ['getEditModeState']),
			...mapState('rew', {
			rews: state => state.rews
			}),
		},
		async created() {
			await this.getRew();
		}
	}
</script>

<style lang="postcss" scoped>  
  @import "../../../styles/mixins.pcss";

  .reviews__container {
    display: flex;
    flex-direction: column;

    
  }

  .reviews__list {
    display: flex;
    margin-left: -30px;
    flex-wrap: wrap;
  }

  .reviews__item {
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
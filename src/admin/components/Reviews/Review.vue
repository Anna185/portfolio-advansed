<template lang="pug">
  .review.card
    .review__author
      .author
        .author__avatar
            img(:src="baseURL+rew.photo" alt ="").author__avatar-img
        .author__data
          h4.author__name {{rew.author}}
          h4.author__desc {{rew.occ}}
      hr.divider
    .review__content
      .review__text
        p {{rew.text}}
    .review__btns
      button(type="button" @click.prevent="toggleEditItem" :disabled="getEditModeState || addMode" ).btn__edit Править
      button(type="button" :disabled="getEditModeState" @click.prevent="deleteItem").btn-delete Удалить
</template>
<script>
import { mapActions,mapGetters, } from 'vuex'
import CardBtn from '../CardBtn'
import {pictures} from '../../helpers/pictures.js'
	
	
	export default {
		components: {
      CardBtn
		},
		
		props: {
			addMode: Boolean,
			rew: Object,
			rewId: Number
		},
		data() {
			return {
				baseURL: "https://webdev-api.loftschool.com/",
				imgUrl: ''
				
			}
		},
		methods: {
			...mapActions('rew', ['toggleEditMode', 'removeRew']),
			toggleEditItem() {
				
				this.toggleEditMode(this.getEditModeState);
				this.rewId = this.rew.id
				this.$emit('rewIdGet', this.rew.id);
			},
		async deleteItem() {
			try {
				await this.removeRew(this.rew.id);
			} catch (e) {
				alert('error')
			}
		}
		},
		
		computed: {
			...mapGetters('rew', ['getEditModeState']),
			photoWatch() {
			this.imgUrl = this.rew.photo
		}
		},
		async created() {
      				this.imgUrl = this.rew.photo
			}
	}
</script>
<style lang="postcss" scoped>
  @import "../../../styles/mixins.pcss";

  .review {
    display: flex;
    flex-direction: column;
    padding: 20px;
    min-height: 380px;

    @include phones {
      padding: 30px 0;
    }
  }

  .author {
    padding: 10px 10px 0 10px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;

    @include phones {
      padding: 0 20px;
    }
  }

  .author__avatar {
    overflow: hidden;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 20px;
    flex-shrink: 0;
  }

  .author__name {
    font-size: 18px;
    font-weight: 700;

    @include phones {
      font-size: 16px;
      margin-bottom: 5px;
    }

  }

  .author__desc {
    font-weight: 600;
    opacity: .5;

    @include phones {
      font-size: 14px;
    }
  }

  .review__content {
    padding: 30px 10px 20px 10px;
    font-weight: 600;

    @include phones {
      padding: 30px 20px 20px 20px;
    }
  }

  .review__text {
    opacity: .7;
    line-height: 30px;
  }

  .review__btns {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    margin-top: auto;
    font-weight: 600;
    margin-bottom: 10px;

    @include phones {
      padding: 0 20px;
    }
  }

  .btn__edit {
    color: rgba(#414c63, .7);
    border: none;
    background: transparent;
    font-weight: 600;
    padding: 0;
    display: flex;
    align-items: center;
    &:after {
      width: 15px;
      height: 15px;
      content: "";
      margin-left: 10px;
      display: inline-block;
      background: svg-load('pencil.svg', fill=$links-color, width=100%, height=100%) center center no-repeat;
  }
  }

  .btn-delete {
    color: rgba(#414c63, .7);
    border: none;
    background: transparent;
    font-weight: 600;
    padding: 0;
    display: flex;
    align-items: center;
    &:after {
      width: 15px;
      height: 15px;
      content: "";
      margin-left: 10px;
      display: inline-block;
      background: svg-load('cross.svg', fill=#bf2929, width=100%, height=100%) center center no-repeat;
  }
  }
</style>
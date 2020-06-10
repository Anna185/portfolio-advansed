<template lang="pug">
  .review-edit.card
    form(@submit.prevent="editRewSend")
      .form__container
        h3.form__header Редактировать отзыв
         
        
        hr.divider
        .form__content
          .form__content-wrap
            .form__avatar
              label.form__avatar-upload
                input(
                  type="file"
                  ref="imgFile"
                  @input="handleFile"
                ).form__avatar-file
                .form__avatar-wrap
                
                  .form__avatar-img
                  
                .form__load-text(ref="inputFileText") Изменить фото
            .form__review
              .form__row
                .form__block Имя автора
                  input(type="text" v-model="rew.author" ref="inputName").input__elem
                .form__block Титул автора
                  input(type="text" v-model="rew.occ").input__elem
              .form__row    
                .form__block Отзыв
                  input(
                    type="text"
                    title="Отзыв"
                    field-type="textarea"
                    v-model="rew.text"
                  ).textarea__elem
        .form__btns
          button(type="button" @click="CancelEditMode").form__btn.form__btn--plain Отмена          
          button(type="submit").form__btn.form__btn--big Сохранить          
</template>
<script>
import Icon from "../Icon"
import CustomInput from "../CustomInput"
import { mapGetters, mapActions, mapState } from 'vuex';
export default {
		components: {
      Icon,
      CustomInput

		},
		props: {
			rewId: Number
		},
		data() {
			return {
				rew: {
					
				}
			}
		},
		computed: {
			...mapGetters('rew', ['getEditModeState']),
			...mapState('rew', {
			rews: state => state.rews
			}),

		}, 
		methods: {
			...mapActions('rew', ['toggleEditMode']),
			...mapActions('rew', [ 'editRew']),
			CancelEditMode() {
				this.toggleEditMode(this.getEditModeState);
				const img = this.$refs.imgFile;
				

			},
			validForm() {
				for (let key in this.rew) {
					if (!this.rew[key]) {
						return false
					}
				}
				
				return true
			},
			handleFile(e) {
			  const file = e.target.files[0];
			  this.rew.photo = file;
			  const img = this.$refs.imgFile;
				const text = this.$refs.inputFileText;
				text.textContent = file.name;
				
			  const reader = new FileReader();
				return new Promise((resolve, reject) => {
					try {
						reader.readAsDataURL(file);
      					reader.onloadend = () => {
        					resolve(reader.result);
      				};
    				} catch (error) {
					      throw new Error("Ошибка при чтении файла");
    					}
  			})
			.then(result => img.style.background = `url(${result})`)			
				
				
			  
    		},
			async editRewSend() {	
			  
				
				const formData = new FormData();

				formData.set("author", this.rew.author);
				formData.set("occ", this.rew.occ);
				formData.set("text", this.rew.text);
				if(this.rew.photo) {
					formData.set("photo", this.rew.photo);
				}
				
				const sendData = {
					id: this.rew.id,
					data: formData
				}
				
				if (this.validForm()) {
						try {
					await this.editRew(sendData);
					this.$emit('toggleAddMode');
					this.toggleEditMode(this.getEditModeState);
						} catch (e) {
						alert(e.message)
						}
					} else { alert('Заполните все поля')}
				}
			
		}, 
			created() {
				this.rew = this.rews.find(item => item.id === this.rewId);
				this.rew.photo = {}
			}
		
	}

</script>

<style lang="postcss" scoped>
  @import url("../../../styles/mixins.pcss");

  .review-edit {
    width: 100%;
    margin-bottom: 30px;

    @include phones {
      margin-bottom: 10px;
    }
  }

  .form__container {
    width: 78%;
    padding: 30px 0 50px 20px;

    
  }

  .form__header {
    margin-bottom: 25px;
    font-size: 18px;
    font-weight: 700;
    padding-left: 10px;

    
  }

  .form__content {
    padding: 50px 0 30px 10px;
    
    

   
  }

  .form__content-wrap {
    display: flex;

    @include tablets {
      flex-direction: column;
    }
  }

  .form__avatar {
    margin-right: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @include tablets {
      margin-right: 0;
      margin-bottom: 45px;
    }
  }

  .form__avatar-upload {
    cursor: pointer;

    &:hover {
      .form__load-text {
        text-decoration: underline;
      }
    }
  }

  .form__avatar-file {
    display: none;
  }

  .form__avatar-wrap {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #dee4ed;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-bottom: 30px;
    overflow: hidden;
  }

  .form__avatar-img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .form__avatar-empty-icon {
    height: 113px;
    width: 113px;
    fill: $white;
  }

  .form__load-text {
    color: #383bcf;
    font-weight: 600;
    text-align: center;
  }

  .form__review {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .form__btns {
    display: flex;
    justify-content: flex-end;

    
  }

  .form__row {
    display: flex;
    margin-bottom: 40px;

    &:last-child {
      margin-bottom: 0;
    }

    @include tablets {
      flex-direction: column;
    }
  }

  .form__block {
    flex: 1;
    margin-right: 30px;
    
    &:last-child {
      margin-right: 0;
    }

    @include tablets {
      margin-right: 0;

      &:not(:last-child) {
        margin-bottom: 40px;
      }
    }
  }

  .form__avatar-img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    margin-bottom: 20px;
		font-size: 0;
		background-color: transparent;
		background: svg-load('user.svg', fill='#fff', width=50%, height=50%);
		background-position: center center;
		width: 150px;
		height: 150px;
		
		background-color: #dee4ed;
		background-size: contain;
  }

  .input__elem {
    width: 100%;
    padding: 10px 8%;
    border: none;
    outline: none;
    font-weight: 600;
    color: $admin-font;
    border-bottom: 1px solid #414c63;
  }

  .textarea__elem {
    height: 115px;
    padding: 20px;
    border: 1px solid rgba($text-color, 0.2);
    resize: none;
    font-weight: 600;
    margin-top: 10px;
    width: 100%;
    line-height: 30px;
  }
</style>
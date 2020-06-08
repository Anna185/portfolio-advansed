<template lang="pug">
  .review-edit.card
    form
      .form__container
        h3.form__header Добавить отзыв
         
        
        hr.divider
        .form__content
          .form__content-wrap
            .form__avatar
              label.form__avatar-upload
                input(
                  type="file"
                  @input="handleFile"
                  ref="inputFile"
                  
                ).form__avatar-file
                .form__avatar-wrap
                  
                    
                  .form__avatar-img
                   
                .form__load-text(ref='inputFileText') Добавить фото
            .form__review
              .form__row
                .form__block
                  CustomInput(type="text" title="Имя автора" v-model='rew.author')
                .form__block  
                  CustomInput(type="text" title="Титул автора" v-model='rew.occ')
              .form__row    
                .form__block
                  CustomInput(
                    title="Отзыв"
                    field-type="textarea"
                    type="text"
                    v-model='rew.text' 
                  )
        .form__btns
          button(type="button" @click="$emit('toggleAddMode')").form__btn.form__btn--plain Отмена          
          button(type="submit" @click.prevent="saveRew").form__btn.form__btn--big Загрузить          
</template>
<script>
import Icon from "../Icon"
import CustomInput from "../CustomInput"
import { mapActions } from 'vuex';
	export default {
		components: {
      Icon,
      CustomInput,
		},
		data() {
			return {
				rew: {
					photo: {},
					author: '',
					occ: '',
					text: '',

				}
			}
		},
		
		methods: {
			...mapActions('rew', ['addRew']),
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
			  const img = this.$refs.inputFile;
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
			async saveRew() {
			
			  const formData = new FormData();
			  formData.append("photo", this.rew.photo);
			  formData.append("author", this.rew.author);
			  formData.append("occ", this.rew.occ);
			  formData.append("text", this.rew.text);
			
				
				if (this.validForm()) {
					try {
						await this.addRew(formData);
						this.$emit('toggleAddMode');
					} catch (e) {
					alert('something wrong')
					}
        } else { alert('Заполните все поля')}
        
				
				
				
			}
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

  .input {
    display: block;
    position: relative;

   

    &.no-side-paddings {
      .input__elem {
        padding-right: 0;
        padding-left: 0;
      }
    }

    &_labeled {
      .input__elem {
        padding: 15px 0 18px;
      }
    }

    &_iconed {
      .input__title {
        margin-left: 45px;
        margin-bottom: 13px;
      }

      .input__elem {
        padding-left: 20px;
        font-size: 18px;
        font-weight: 700;
        padding-top: 17px;
        padding-bottom: 17px;
      }
    }
  }

  .input__title {
    color: rgba(65, 76, 99, 0.5);
    font-weight: 600;
    opacity: 0.5;
  }

  .input__elem {
    width: 100%;
    padding: 10px 8%;
    border: none;
    outline: none;
    font-weight: 600;
    color: $admin-font;

    &::placeholder {
      color: rgba(55, 62, 66, 0.25);
    }
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
  
  .textarea {
    position: relative;

   
  }

  .input__icon {
    width: 30px;
    height: 30px;
    fill: currentColor;
    opacity: .5;
    flex-shrink: 0;
  }

  .input__wrap {
    display: flex;
    align-items: center;
    border-bottom: 1px solid  #1f232d;
    
    &:focus-within {
      outline: rgb(77, 144, 254) auto 0.0625em;
    }
  }
</style>
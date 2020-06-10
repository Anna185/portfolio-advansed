<template lang="pug">
   .work-edit.card
     form(@submit.prevent="editCurrentWork")
       .form__container
         h3.form__header Редактирование работы
         hr.divider
         .form__content
           .form__content-wrap
             .form__col
               .form__image(v-if="image")
                 img(:src="image").form__image-pic(ref='inputFile')
                 .form__image-btn-wrap
                   button(@click="showInputFile").form__image-btn Изменить превью
               .form__load-area(v-else)
                 .form__load-text(ref="inputFileText") Перетащите либо загрузите изображение
                 .form__load-btn
                   button(@click="showInputFile").form__btn Загрузить
               input(
                 type="file"
                 @input='handleFile'
                 @change="appendFileAndRenderPhoto"
               )#upload-pic.form__load-file    
             .form__col
               .form__block Название
                 input(type="text" v-model="workCurrent.title").input__elem
               .form__block Ссылка
                 input(type="text" v-model="workCurrent.link").input__elem
               .form__block Описание
                 input(
                   type="text"
                   field-type="textarea"
                   v-model="workCurrent.description"
                 ).textarea__elem
               .form__block Добавление тэга
                 input(type="text" v-model="workCurrent.techs" @input="addTag").input__elem
    
               ul.tags__list
                 li.tags__item(
                   v-for="(tag, ndx) in tags"
                   :key="ndx")
                   .tag
                    span {{ tag }}
                    button(type="button" @click="removeTag(tag)").tag__remove-btn
                      Icon(
                        iconName="cross"
                        className="tag__remove-icon"
                      )
                   
         .form__btns
           button(type="button" @click.prevent="toggleEdit").form__btn.form__btn--plain Отмена          
           button(type="submit").form__btn.form__btn--big Сохранить          
 </template>
 <script>
 import Icon from "../Icon"
 import CustomInput from "../CustomInput"
 import {mapActions, mapGetters} from "vuex"
 export default {
 components: {
     Icon,
     CustomInput,
     
   },
   data() {
			return {
				workCurrent: {},
				tags: []
			}
		},
		
		props: {
			workToEdit: Object
		},
			computed: {
		...mapGetters('works', ['getEditModeState'])
	} , 
		methods: {
		...mapActions('works', ['toggleEditMode', 'editWork']),
			toggleEdit() {
			this.toggleEditMode(this.getEditModeState);
			
    },
    addTag() {
			this.tags = this.workCurrent.techs.split(', ')
		},
		removeTag(tag) {
				let index = parseInt(this.tags.indexOf(tag));
				
				this.tags.splice(index, 1);
				this.work.techs = this.tags.join(', ')
			},
		validForm() {
				for (let key in this.work) {
					if (!this.work[key])
						return false
				}		
							
				return true
			},
			
			handleFile(e) {
				const file = e.target.files[0];
			  	this.workCurrent.photo = file;
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
			async editCurrentWork() {
				
				
				if(this.validForm() ) {
					 const formData = new FormData();
					formData.set('title', this.workCurrent.title);
					formData.set('techs', this.workCurrent.techs);
					formData.set('link', this.workCurrent.link);
					formData.set('description', this.workCurrent.description);
					
					if (this.workCurrent.photo.name) {
						formData.set('photo', this.workCurrent.photo);
					}
					
					const sendData = {
						id: this.workCurrent.id,
						data: formData
					}
					
					await this.editWork(sendData);
					this.toggleEdit();
				} else {alert('empty form')}
			},
	},
		
		created() {
		this.workCurrent = this.workToEdit;
		this.tags = this.workCurrent.techs.split(', ');
		
	}
	}
</script>
<style lang="postcss" scoped>
   @import "../../../styles/mixins.pcss";

  .work-edit {
    width: 100%;
    margin-bottom: 30px;

    @include phones {
      margin-bottom: 10px;
    }
  }

  .form__container {
    padding: 30px 20px 30px 20px;

    
  }

  .form__header {
    margin-bottom: 25px;
    font-size: 18px;
    font-weight: 700;
    padding-left: 10px;

    
  }

  .form__content {
    padding: 50px 10px 40px 10px;

    @include tablets {
      padding-top: 25px;
    }

    @include tablets {
      padding-left: 20px;
      padding-right: 20px;
    }
  }

  .form__content-wrap {
    display: flex;
    justify-content: space-between;

    @include tablets {
      flex-direction: column;
    }
  }

  .form__col {
    width: 50%;
    margin-right: 30px;
    display: flex;
    flex-direction: column;

    &:last-child {
      margin-right: 0;
    }

    @include tablets {
      width: 100%;
      padding: 0 12%;
      margin-right: 0;

      &:first-child {
        padding: 0 15%;
      }
    }

   
    
  }

  .form__btns {
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;
  }

  .form__load-area {
    min-height: 276px;
    border: 1px dashed #a1a1a1;
    background-color: #dee4ed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    @include tablets {
      margin-bottom: 55px;
    }
  }

  .form__load-file {
    display: none;
  }

  .form__load-text {
    text-align: center;
    margin-bottom: 20px;
    padding: 0 20%;
    font-weight: 600;
    opacity: .5;
    line-height: 2;
  }

  .form__load-btn {
    display: flex;
    justify-content: center;
  }

  .form__image {
    display: flex;
    flex-direction: column;
    justify-content: center;

    @include tablets {
      margin-bottom: 55px;
    }
  }

  .form__image-pic {
    flex-shrink: 0;
    margin-bottom: 30px;
    max-height: 277px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  
  .form__image-btn-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form__image-btn {
    border: none;
    background: transparent;
    color: #383bcf;
    font-weight: 600;
    padding: 1px 0;

    &:hover {
      text-decoration: underline;
    }

    
  }

  .form__block {
    flex: 1;
    margin-bottom: 30px;
  }

  .tags__list {
    display: flex;
    flex-wrap: wrap;
  }

  .tags__item {
    margin-right: 10px;
  }

  .tag {
    font-size: 13px;
    font-weight: 600;
    padding: 8px 15px 8px 20px;
    border-radius: 20px;
    background-color: #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tag__remove-btn {
    border: none;
    background: transparent;
    padding: 0;
    margin-left: 10px;
    display: flex;
  }

  .tag__remove-icon {
    height: 11px;
    width: 11px;
    fill: #414c63;
  }

  .form__error-tooltip {
    display: none;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
  }
  .error {
    .form__error-tooltip {
      display: block;
    }
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
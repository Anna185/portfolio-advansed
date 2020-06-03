<template lang="pug">
   button(
     v-if="type === 'plain'"
     v-on="$listeners"
     type="button"
   ).add-new-btn.add-new-btn--plain
     .add-new-btn__text {{text.split(' ').join('\n') }}
   button(
     v-else
     v-on="$listeners"
     :class="smallClass"
     type="button"
     v-bind="$attrs"
   ).add-new-btn {{text ? text : ''}}
 </template>
 <script>
 export default {
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
   computed: {
     smallClass () {
        return this.type ? 'add-new-btn--small' : "";
     }
   }
 }
 </script>
 
<style lang="postcss" scoped>
  @import "../../styles/mixins.pcss";
  .add-new-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: $links-color;
    font-weight: 600;
    padding: 0;
    border: none;
    font-size: 16px;
    @include tablets {
      font-size: 14px;
    }
    &:before {
      
			content: '+';
			color: #fff;
			width: 21px;
			height: 21px;
			border-radius: 50%;
			background: linear-gradient(to right, #1d51dd, #3f35cb);
			display: flex;
			justify-content: center;
			
			margin-right: 10px;
		}
    
    &--small {
      &:before {
        content: "+";
        background: linear-gradient(to right, #1d51dd, #3f35cb);
        width: 20px;
        height: 20px;
        flex-basis: 20px;
        font-size: 18px;
        margin-right: 13px;
        line-height: 1;
      }
    }
    &--plain {
      flex: 1;
      background-image: linear-gradient(to right, #006aed 0%, #3f35cb 100%);
    }
      &:before {
        display: none;
      }
    
  }
  .add-new-btn__text {
    color: $white;
    font-size: 18px;
    font-weight: 700;
    line-height: 25px;
    white-space: break-spaces;
    @include phones {
      font-size: 16px;
    }
    
    &:before {
      display: flex;
      content: '+';
      font-weight: 300;
      font-size: 72px;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 2px solid currentColor;
      margin-bottom: 30px;
    
    }
  }
</style>
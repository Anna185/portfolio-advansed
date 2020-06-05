<template lang="pug">
.tag
  span {{ tag }}
  button(type="button" @click.prevent="$emit('deleteTag', tag)").tag__remove-btn
    Icon(
      iconName="cross"
      className="tag__remove-icon"
    )
<script>
export default {
  components: {

		},
		props: {
			tag: String
		},
		data() {
			return {

			}
		}
	}

</script>
<style lang="postcss" scoped>
   @import "../../../styles/mixins.pcss";

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
</style>
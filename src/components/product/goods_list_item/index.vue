<template lang="pug">
  .list-item(@click="onClick")
    p(:style="{...titleStyle}") {{title}}
    span(:style="{...subtitleStyle}") {{subtitle}}
</template>

<script>
/**
  GoodsListItem(v-for="(item, index) in listItem" :key="index",
    :item='item',
    :title='item.goods_name',
    :subtitle='item.goods_id',
    @click="itemClick")
*/
export default {
  props: ['item','title','subtitle','titleStyle','subtitleStyle'],
  methods: {
    onClick() {
      this.$emit('click',this.item)
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-item
  height 71px
  width 100%
  background-color white
  border-radius 8px
  margin-top  10px
  padding 15px 0px 15px 15px
  box-shadow 0px 0px 10px 0px rgba(35,121,191,0.2);
  display flex
  flex-direction column
  p
    font-size 14px
    color rgba(84,84,84,1)
  span
    font-size 12px
    color rgba(102,102,102,1)
    margin-top 8px 
</style>



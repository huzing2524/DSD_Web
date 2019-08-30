<template lang="pug">
  .list-item(@click="onClick")
    p(:style="{...titleStyle}") {{title || '佚名'}}
    .industry
      span(:style="{...subtitleStyle}" v-if="null != industry  && industry.length > 0") {{industry}}
    .product
      span(:style="{...subtitleStyle}" v-if="null != products && products.length > 0") {{products}}
    .divider_line
</template>

<script>
export default {
  props: ['item','title','industry','products','titleStyle','subtitleStyle'],
  methods: {
    onClick() {
      this.$emit('click',this.item)
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-item
  width 100%
  display flex
  flex-direction column
  margin-top 10px
  p
    height:22px;
    font-size:16px;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:22px;
    font-weight bold
  .industry
    span
      height:20px;
      font-size:14px;
      font-weight:400;
      line-height:20px;
      margin-top 4px
      color #333333
  .product
    span
      height:17px;
      font-size:12px;
      font-weight:400;
      line-height:17px;
      margin-top 2px
      color #666666
  .divider_line
    width 100%
    margin-top 10px
    height:1px;
    background:rgba(238,238,238,1);

</style>



<template lang="pug">
  .list-item(@click="onClick")
    p(:style="{...titleStyle}") {{title}}
    span(:style="{...subtitleStyle}" v-if="null != industry") {{industry}}
    span(:style="{...subtitleStyle}" v-if="null != products") {{products}}
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
    font-size 14px
    color rgba(84,84,84,1)
    font-weight 500
    line-height 22px
  span
    heigh 20px
    fsc 14px #545454
    margin-top 4px
    font-weight 400
    line-height 20px
  span
    heigh 20px
    fsc 12px #7A7A7A
    margin-top 4px
    font-weight 400
    line-height 17px
  .divider_line
    width 100%
    height:1px;
    margin-top 10px
    background:rgba(228,228,228,1);

</style>



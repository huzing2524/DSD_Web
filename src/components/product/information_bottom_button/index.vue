<template lang="pug">
  .sbb-content
    .sbb-button(@click="$emit('buttonClick')")
      span(class="sbb-btn-title") {{title}}
</template>

<script>
/**
 import BottomButton from '_components/product/information_bottom_button/'
 BottomButton(@buttonClick="testClcik")
 */
export default {
  props:['buttonClick', 'title']
}
</script>

<style lang="stylus" scoped>
  .sbb-content
    background-color #fff
    height 52px
    width 100vw
    display flex
    align-items center
    position fixed 
    bottom 0px
    .sbb-button
      height 28px
      padding 0px 15px 0px 15px
      // width 80px
      min-width 80px
      border-radius 14px
      background-color #1E9AFF
      position absolute
      display flex
      align-items center
      justify-content center
      right 10px
      .sbb-btn-title
        font-size 12px
        color #fff
</style>



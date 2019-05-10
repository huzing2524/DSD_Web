<template lang="pug">
  .null-page-main
    .null-icon-content
      .null-icon
        svg.ali_icon(aria-hidden="true")
          use(xlink:href='#iconair')
      span(class="null-title") {{title}}
</template>

<script>
export default {
  props: {
    title:{
      default: '暂无数据'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .null-page-main
    width 100%
    height 100%
    background-color #ffffff
    display flex
    justify-content center
    align-content center
    position fixed
    top 0px
    left 0px
    .null-icon-content
      display flex
      justify-content center
      align-items center
      .null-icon
        width 100px
        height 100px
      .null-title
        font-size 20px
        color #D8D6E5

</style>



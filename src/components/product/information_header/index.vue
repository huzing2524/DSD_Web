<template lang="pug">
  .ih-content
    .ih-icon
      svg.ali_icon(aria-hidden="true")
        use(xlink:href='#iconsuccess')
    p(class="ih-added") {{borderTitle}}
    p(class="ih-title") {{title}}
    p(class="ih-subtitle") {{subtitle}}
</template>

<script>
/**
 import Header from '_components/product/information_header'
 Header(borderTitle="已添加" title="一次性口罩" subtitle="单位：个")
 */
export default {
  props:['borderTitle','title','subtitle']
}
</script>

<style lang="stylus" scoped>
  .ih-content
    display flex
    flex-direction column
    align-items center
    background-color #fff
    padding 20px 0px 20px 0px
    width 100vw
    height 195px
    .ih-icon
      width 70px
      height 70px
    .ih-added
      margin-top 10px
      color #545454
      font-size 16px
      font-weight 500
    .ih-title
      margin-top 20px
      font-size 14px
      color #666666
    .ih-subtitle
      margin-top 10px
      font-size 12px
      color #999999
</style>



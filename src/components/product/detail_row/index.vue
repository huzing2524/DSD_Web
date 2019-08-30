<template lang="pug">
  .dr-content
      .dr-title-content
        .dr-icon
          svg.ali_icon(aria-hidden="true")
            use(:xlink:href="iconHref")
        span(class="dr-title") {{title}}
        span(class="dr-subtitle") {{subtitle}}
      .dr-line(v-show="showLine")
</template>

<script>
/**
    em:
        DetailRow(title="退料单号" :subtitle="orderData.id" iconHref="#iconicon_renwu1")
 */
export default {
  props: {
    title: {
      default: '标题'
    },
    subtitle: {
      default: ''
    },
    iconHref: {
      default: '#iconicon_renwu1'
    },
    showLine: {
      default: true
    }
  },
}
</script>

<style lang="stylus" scoped>
  .dr-content
    background-color #ffffff
    height 46px
    width 100vw
    display flex
    flex-direction column
    justify-content center
    padding 0px 10px 0px 10px
    .dr-title-content
      display flex
      flex-direction row
      align-items center
      width 100%
      height 45px
      position relative
      .dr-icon
        width 20px
        height 18px
        display flex
        align-items center
        justify-content center
      .dr-title
        font-size 16px
        font-weight 500
        color #333333
        margin-left 5px
      .dr-subtitle
        font-size 14px
        color #666666
        position absolute
        right 10px
        width 70%
        text-align right
        single-text()
    .dr-line
      height 1px
      flex 1
      background-color #EEEEEE
</style>



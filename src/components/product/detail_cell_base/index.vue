<template lang="pug">
  .dcb-content
    .dcb-title-content
      .dcb-icon
        svg.ali_icon(aria-hidden="true")
          use(:xlink:href='iconHref')
      span(class="dcb-title") {{title}}
    .dcb-item-content
      slot
    .dcb-line(v-show="showLine")
</template>

<script>
/**
   em: 
   CellBase(:iconHref="iconHref" 
            :title="title" 
            :showLine="showLine")
 */
export default {
  props:{
    iconHref:{
      default:''
    },
    title: {
      default: ''
    },
    showLine: {
      default: true
    }
  }
}
</script>

<style lang="stylus" scoped>
  .dcb-content
    background-color #ffffff
    padding 15px
    display flex
    flex-direction column
    position relative
    .dcb-title-content
      display flex
      flex-direction row
      align-items center
      width 100%
      position relative
      .dcb-icon
        width 20px
        height 18px
        display flex
        align-items center
        justify-content center
      .dcb-title
        color #333333
        font-size 16px
        font-weight 500
        margin-left 5px
    .dcb-item-content
      margin-top 10px
      background-color #E9F5FF
      padding 12px 10px 12px 10px
      display flex
      flex-direction column
      border-radius 6px
    .dcb-line
      background-color #eeeeee
      height 1px
      width calc(100% - 30px)
      position absolute
      bottom 0px
</style>


<template lang="pug">
  .materail-add-mask
    .material-mask-content
      .icon(@click="addClick")
        svg.ali_icon(aria-hidden="true")
          use(xlink:href='#iconicon_buliao')
      span(class="icon-title") 补料

      .icon(@click="returnClick")
        svg.ali_icon(aria-hidden="true")
          use(xlink:href='#iconicon_tuiliao')
      span(class="icon-title") 退料

    .close-btn(@click="closeClick")
      svg.ali_icon(aria-hidden="true")
        use(xlink:href='#iconguanbi')

</template>

<script>
/**
 *
 * em:
 *
  import MaterialAddMask from '_components/product/material_add_mask/'

   MaterialAddMask(@addClick="点击补料调用"
                  @returnClick="点击退料调用"
                  @closeClick="点击关闭按钮调用"
                  )
 */
export default {
  methods: {
    addClick() {
      this.$router.push('/product/supplement_list')
    },
    returnClick() {
      this.$router.push('/product/return_list')
    },
    closeClick() {
      this.$emit('closeClick')
    }
  },
}
</script>

<style lang="stylus" scoped>
  .materail-add-mask
    height 100%
    width 100%
    background-color rgba(0,0,0,0.5)
    display flex
    flex-direction column
    position fixed
    left 0
    top 0
    z-index 9
    justify-content center
    align-items center
    .material-mask-content
      display flex
      flex-direction column
      align-items center
      .icon
        width 80px
        height 80px
      .icon-title
        color #ffffff
        font-size 15px
        margin-top 20px
        margin-bottom 30px
    .close-btn
      width 28px
      height 28px
      position absolute
      bottom 10%

</style>



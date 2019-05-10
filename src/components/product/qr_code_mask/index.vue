<template lang="pug">
  .mask-main
    .qrcode
      slot(name='qrcode')
    span(class="tip-span") 让仓库管理员扫描此二维码确认退料
    .close-icon(@click="closeQrcode")
      svg.ali_icon(aria-hidden="true")
        use(xlink:href="#iconguanbi")
</template>

<script>
/**
 *  em:
      QrcodeMask(v-show="showQrcode"
                valut="hello world"
                options="{width:250}"
                title="让仓库管理员扫描此二维码确认退料"
                @closeClick="qrcodeClick")
 */
export default {
  props: {
    title: {
      default: '让仓库管理员扫描此二维码确认退料'
    },
    value: {
      default: ''
    },
    options: {
      default: 'hello world'
    }
  },
  methods: {
    closeQrcode() {
      this.$emit('closeClick')
    }
  },
}
</script>

<style lang="stylus" scoped>
  .mask-main
    width 100%
    height 100%
    display flex
    flex-direction column
    align-items center
    position fixed
    top 0px
    left 0px
    background-color rgba(0,0,0,0.5)
    .qrcode
      width 60vw
      height 60vw
      margin-top 30vh
      display flex
      align-items center
      justify-content center
    .tip-span
      font-size 15px
      color #ffffff
      margin-top 15px
    .close-icon
      width 28px
      height 28px
      display flex
      justify-content center
      align-items center
      margin-top 100px

</style>



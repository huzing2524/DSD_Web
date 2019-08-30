<template lang="pug">
  .new_icon
    .icon_box(@click="toNew")
      .icon
        svg.ali_icon(aria-hidden="true")
          use(xlink:href="#iconaadd")
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    props: ['to','iconStyle'],
    methods: {
      ...mapActions('order', [
        'updateOrderSub',
      ]),
      ...mapActions('rights', [
        'updateRightsDetail'
      ]),
      toNew() {
        this.updateOrderSub()
        this.updateRightsDetail()
        this.$router.push(this.to)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .new_icon
    .icon_box
      background-color #ffffff
      position fixed
      right 18px
      bottom 18px
      wh 64px 64px
      border-radius  50%
      fct()
      box-shadow 0px 0px 10px 0px rgba(35,121,191,0.2)
      .icon
        wh 26px 26px
</style>

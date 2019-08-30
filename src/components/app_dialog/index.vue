<template lang="pug">
  .app-dialog-main(v-show="isShow")
    .app-dialog-content
      span(class="app-dialog-content-title") {{content}}
      .app-dialog-btn-row
        .app-dialog-btn(@click="cancelHandle")
          span(class="app-dialog-cancel-title") {{cancelText}}
        .app-dialog-btn(@click="confirmHandle")
          span(class="app-dialog-confirm-title") {{confirmText}}
</template>

<script>
export default {
  name: 'app-dialog',
  props:['content','confirmText','cancelText'],
  data() {
    return {
      isShow:false,
    }
  },
  methods:{
    confirmHandle(){
      this.hide()
      this.$emit('confirm')
    },
    cancelHandle() {
      this.hide()
      this.$emit('cancel')
    },
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow=false
    }
  }
}
</script>

<style lang="stylus">
  .app-dialog-main
    width 100%
    height 100%
    background-color rgba(0,0,0,0.5)
    display flex
    justify-content center
    align-items center
    position fixed
    top 0px
    left 0px
    padding 0px 35px 0px 35px
    .app-dialog-content
      background-color #fff
      border-radius 4px
      display flex
      flex-direction column
      width 100%
      min-height 130px
      .app-dialog-content-title
        color #545454
        font-size 15px
        flex 1
        line-height 20px
        margin 20px 20px 0px 20px
      .app-dialog-btn-row
        height 60px
        background-color #fff
        display flex
        align-items center
        justify-content flex-end
        border-radius 4px
        .app-dialog-btn
          display flex
          align-items center
          justify-content center
          padding 20px
          .app-dialog-confirm-title
            color #1E9AFF
            font-size 15px
          .app-dialog-cancel-title
            color #999999
            font-size 15px
</style>



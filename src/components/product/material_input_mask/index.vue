<template lang="pug">
  .add-mask(:style="{visibility:show?'visible':'hidden'}"
            @click="maskClick")
    .add-edit-content
      .add-title-content
        .add-arrow-icon(@click="arrowClick")
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconicon_more_xia')
        .add-clear-btn(@click="clearClick")
          .delete-icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href='#iconicon_delete')
          span(class="clear-span") 清空
      span(class="item-title") {{title}}
      .edit-content
        span(class="item-tip") 数量
        input(class="input"
              placeholder="填写数量"
              type="number"
              v-model="value")
      .add-material-content
        .add-btn(@click="addClick")
          span(class="btn-title") 添加物料
</template>

<script>
export default {
  props:{
    title: {
      default: '棉布'
    },
    show: {
      default: false
    },
    inputValue: {
      default: 0
    }
  },
  data() {
    return {
      value:this.inputValue
    }
  },
  methods: {
    arrowClick() {
      this.$emit('arrowClick')
    },
    maskClick() {

    },
    clearClick() {
      this.$emit('clearClick')
    },
    addClick() {
      this.$emit('addClick',this.value)
    }

  },
  watch: {
    show(newValue) {
      this.value = this.inputValue
      this.show = newValue
    },
    inputValue(newValue) {
      this.value = newValue
    }
  },
}
</script>

<style lang="stylus" scoped>
  .add-mask
    height 100%
    width 100%
    position fixed
    top 0px
    left 0px
    background-color rgba(0,0,0,0.5)
    .add-edit-content
      position absolute
      width 100%
      height 188px
      background-color #ffffff
      bottom 0px
      display flex
      flex-direction column
      .add-title-content
        height 34px
        width 100%
        background-color #F0F8FF
        display flex
        justify-content center
        align-items center
        .add-arrow-icon
          height 14px
          width 14px
          display flex
          justify-content center
          align-items center
        .add-clear-btn
          position absolute
          top 0px
          right 0px
          display flex
          flex-direction row
          align-items center
          height 34px
          padding-right 15px
          .delete-icon
            width 16px
            height 16px
            display flex
            justify-content center
            align-items center
          .clear-span
            color #A1A1A1
            font-size 12px
            margin-left 5px
      .item-title
        font-size 15px
        color #545454
        font-weight 500
        margin-left 15px
        margin-top 15px
      .edit-content
        height 45px
        width 100%
        padding 0px 15px 0px 15px
        display flex
        align-items center
        justify-content space-between
      .item-tip
        font-size 14px
        color #545454
      .input
        width 80px
        height 100%
        font-size 14px
        text-align right
    .add-material-content
      width 100%
      height 72px
      display flex
      flex-direction row
      align-items center
      border-top 1px solid #EFEFEF
      .add-btn
        background-color #1E9AFF
        height 32px
        width 100px
        border-radius 16px
        display flex
        justify-content center
        position absolute
        right 15px
        align-items center
        .btn-title
          font-size 14px
          color #ffffff


</style>



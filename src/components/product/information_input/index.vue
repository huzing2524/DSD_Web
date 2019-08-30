<template lang="pug">
  .si-content
    .si-input-content
      span(class="si-title") {{title}}
      input(class="si-input" :placeholder="placeholder" :value="value" @input="$emit('input',$event.target.value)")
    .si-line(v-show="showLine")
</template>

<script>
/**
  import InformationInput from '_components/product/information_input/'
  InformationInput(title="安全库存" placeholder="请填写安全库存" :value="store" v-model="store")
 */
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    title: {
      default: ''
    },
    placeholder: {
      default: '请输入文本'
    },
    type: {
      default: 'text'
    },
    showLine: {
      default: true
    },
    value: {
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  .si-content
    background-color #ffffff
    display flex
    flex-direction column
    align-items center
    padding 0px 10px 0px 10px
    height 44px
    width 100vw
    position relative
    .si-input-content
      display flex
      flex-direction row
      align-items center
      height 43px
      width 100%
      .si-title
        color #333333
        font-size 14px
      .si-input
        flex 1
        text-align right
        height 100%
        font-size 14px
        margin-left 20px
    .si-line
      background-color #eeeeee
      height 1px
      width 100%
</style>



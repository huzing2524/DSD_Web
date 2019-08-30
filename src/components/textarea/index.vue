<template lang="pug">
  .textarea
    cube-textarea(
    v-model="listItem.remark"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :autofocus="autofocus"
    )
    .save
      button(@click="saveClick") 保存
</template>

<script>
export default {
data( ){
    return {
      listItem: {},
      placeholder: '备注（选填）',
      readonly: true,
      maxlength: 60,
      autofocus: true
    }
  },
  mounted() {

  },
  methods: {
    saveClick(){

    }
  },
}
</script>

<style lang="stylus" scoped>
  .textarea
    .save
      display flex
      justify-content center
      button
        wh 180px 48px
        line-height 48px
        background #1E9AFF
        fsc 16px #fff
        border-radius 24px
        border 0
        margin-top 30px
</style>
<style lang="stylus">
  .cube-textarea-wrapper::after
    border 0
  .cube-textarea
    border-radius 8px
</style>

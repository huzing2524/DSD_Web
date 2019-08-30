<template lang="pug">
  .remark.full_box
    cube-textarea(
      v-model="remark"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :autofocus="autofocus"
    )
    .save
      button(@click="saveClick") 保存
</template>

<script>
  import {OrderSub} from '_api/order/'

  export default {
    data() {
      return {
        remark: '',
        placeholder: '备注（选填）',
        maxlength: 60,
        autofocus: true
      }
    },
    mounted() {
    },
    methods: {
      saveClick() {
        OrderSub({
          state: this.$route.query.idx + '',// string 1: 通过审批， 2：作废订单, 3: 终止订单, 4: 暂停订单，5：启动订单
          remark: this.remark
        }, 'put', this.$route.query.id).then(res => {
          if (res.data.res === 0) {
            this.$toast('操作成功')
            this.$router.go(-1)
          }
        }).catch(() => {
          this.$toast('系统错误')
        })
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .remark
    padding 10px

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

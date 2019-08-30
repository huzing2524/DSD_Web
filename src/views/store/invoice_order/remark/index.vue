<template lang="pug">
  .remark.full_box
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
  import { StoreInvoiceDetail } from '_api/store/'
  export default {
    data(){
      return {
        id:'',
        listItem: {},
        placeholder: '备注（选填）',
        readonly: true,
        maxlength: 60,
        autofocus: true
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData(){
        this.id = this.$route.query.id
      },
      saveClick(){
        StoreInvoiceDetail({
          id:this.id,
          remark: this.listItem.remark
        },'post').then((res) => {
          if (parseInt(res.data.res) === 0) {
            this.$toast(`已发货`)
            this.$router.go(-2)
          } else {
            this.$toast(res.data.errmsg)
          }
        }).catch(() => {
          this.$toast('发货失败')
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

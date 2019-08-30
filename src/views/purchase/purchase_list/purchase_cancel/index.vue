<template lang="pug">
  .main.full_box
    textarea(class="wishContent" placeholder="备注（选填）" v-model="cancelRemark" maxlength=60)
    span {{cancelRemark.length}}/60
    .operator
      button(@click = "clickSubmit") 保存
</template>

<script>
  import {PurchaseOrder} from "../../../../api/purchase";
  import {mapState} from "vuex";

  export default {
    data() {
      return {
        cancelRemark: '',
      }
    },
    computed: {
      ...mapState('purchase',{
        purchaseDetail: state => state.purchaseDetail
      }),
    },
    mounted() {
      console.log(this.purchaseDetail);
    },
    methods: {
      clickSubmit() {// 取消审批
        let myId = this.$route.query.id
        let body = new Object()
        body.state = '2'
        body.remark = this.cancelRemark
        body.supplier_id = this.purchaseDetail.supplier_id
        console.log("取消参数的数据对象=" + body.state + "/" + body.remark)
        PurchaseOrder(body, 'put', myId).then(result => {
          console.log("res.result.res=" + result.data.res)
          if (parseInt(result.data.res) === 0) {
            this.$router.go(-2)
            this.$toast('已取消')
          } else {
            console.log(result.data.errmsg)
          }
        }).catch(() => {
          this.$toast('取消失败')
        })
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .main
    bg #E6EAED
    textarea
      fsc 14px #999999
      bgf()
      min-height 60px
      border-radius 6px
      border 0
      outline none
      align-items center
      margin 10px 10px 0
      padding 12px 10px
    span
      fsc 12px #999999
      text-align right
      margin-right 10px
      margin-top 4px
    .operator
      text-align center
      weight 48px
      margin-top 20px
      button
        border 0
        outline none
        border-radius 24px
        background rgba(30,154,255,1)
        fsc 14px white
        wh 180px 48px

</style>

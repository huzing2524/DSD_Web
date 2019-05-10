<template lang="pug">
  .main.full_box
    .remark
      .material_title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_remarks")
        span 备注
      textarea(placeholder="选填..." v-model="purchaseDetail.remark")
    .operator_bar
      button(@click = "clickSubmit") 提交
</template>

<script>
  import {PurchaseOrder} from "../../../../api/purchase";
  import {mapState} from "vuex";

  export default {
    data() {
      return {
        // remark: ''
      }
    },
    computed: {
      ...mapState('purchase',{
        purchaseDetail: state => state.purchaseDetail
      }),
    },
    mounted() {
      console.log(this.purchaseDetail);
      // this.remark = this.purchaseDetail.remark
    },
    methods: {
      clickSubmit() {// 取消审批
          let myId = this.$route.query.id
          let body = new Object()
          body.state = '2'
          body.remark = this.purchaseDetail.remark
          body.supplier_id = this.purchaseDetail.supplier_id
          console.log("取消参数的数据对象="+body.state+"/"+body.remark)
          PurchaseOrder(body, 'put', myId).then(result => {
            console.log("res.result.res="+result.data.res)
            if(parseInt(result.data.res) === 0) {
              this.$router.go(-2)
              this.$toast('已取消')
            } else {
              console.log(result.data.errmsg)
            }
          }).catch(() => {
            this.$toast('取消失败')
          })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .main
    bg #E6EAED
    position relative
    .remark
      display flex
      flex-direction column
      bgf()
      .material_title
        display flex
        flex-direction row
        align-items center
        margin  15px
        .icon
          display flex
          width 16px
          height 18px
          margin-right 7px
        span
          fsc 15px #545454
          align-items center
      textarea
        fsc 14px #999999
        background rgba(233,245,255,1)
        border-radius 6px
        border 0
        outline none
        align-items center
        margin 0 15px 15px
    .operator_bar
      width 100%
      position absolute
      bottom 0
      display flex
      align-items center
      flex-direction row
      justify-content flex-end
      bgf()
      button
        border 0
        outline none
        border-radius 16px
        border 1px solid rgba(77,168,238,1)
        fsc 14px #4DA8EE
        padding 6px 19px
        margin 15px
</style>

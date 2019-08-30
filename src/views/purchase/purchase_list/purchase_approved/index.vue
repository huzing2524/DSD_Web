<template lang="pug">
  .main.full_box
    .scheduled_time
      span 期望到货时间
      .right(@click="chooiceDate")
        span {{getYMDDateDecimalString(getData.plan_arrival_time)}}
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconarrow_")
    textarea(placeholder="给供应商留言（选填）" v-model="getData.remark" maxlength=60)
    span {{getData.remark.length}}/60
    .operator
      button(@click = "clickSubmit") 保存
</template>

<script>
  import Textarea from "cube-ui/src/components/textarea/textarea";
  import {mapActions, mapState} from "vuex";
  import {PurchaseOrder} from "../../../../api/purchase";
  import {getYMDDateDecimalString,getTimestampByDate } from '_common/util'
  export default {
    components: {Textarea},
    data() {
      return {
        dataTime: '',
      }
    },
    computed: {
      ...mapState('purchase',{
        getData: function (state) {
          return state.purchaseDetail
        },
      }),
    },
    mounted() {
      this.datePicker = this.$createDatePicker({
        title: '选择时间',
        min: new Date(2018, 7, 8),
        max: new Date(2030, 9, 20),
        value: new Date(this.getYMDDateDecimalString(this.getData.plan_arrival_time)),
        format: {
          year: 'YYYY',
          month: 'MM',
          date: 'DD'
        },
        onSelect: this.selectDate,
        onCancel: this.cancelHandle
      })
      this.dataTime = this.getData.state_time
    },
    methods: {
      ...mapActions('purchase', [
        'updatePurchase'
      ]),
      getYMDDateDecimalString,
      getTimestampByDate,
      clickSubmit() { // 保存并审批
        console.log(this.getData)
        let body = new Object()
        // body.state 1: 通过审批， 2：取消采购单
        body.state = '1'
        // body.supplier_id = this.getData.supplier.supplier_id
        body.plan_arrival_time = parseInt(this.getData.plan_arrival_time)
        body.remark = this.getData.remark
        console.log("body="+body.remark)
        let myId = this.$route.query.id || ''
        PurchaseOrder(body, 'put', myId).then(result => {
          if(parseInt(result.data.res) === 0) {
            // 通过审批后把状态改为2
            this.getData.state = "2"// 1: 待审批， 2: 已审核待确认 3：采购中, 4: 运输中, 5：已入库, 6:已取消
            this.updatePurchase({
              ...this.getData
            })
            this.$toast('审核成功')
            this.$router.go(-1)
          } else {
            console.log(result.data.errmsg)
          }
        }).catch(() => {
          this.$toast('修改失败')
        })
      },
      chooiceDate() { // 选择日期
        this.datePicker.show()
      },
      selectDate(date, selectedVal, selectedText) {
        // this.dateTime = selectedText.join('-')
        // this.getData.state_time = this.dateTime
        // console.log("选择的审核通过时间:"+selectedText.join('-'))
        // console.log("格式化后的时间:"+Date.parse(selectedText.join('-')))
        this.getData.plan_arrival_time = parseInt(this.getTimestampByDate(Date.parse(selectedText.join('-'))))
        console.log("转换为时间戳后的时间:"+parseInt(this.getData.plan_arrival_time))
      },
      cancelHandle() {
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .main
    bg #E6EAED
    position relative
    .scheduled_time
      display flex
      flex-direction row
      justify-content space-between
      background white
      margin 10px
      padding 12px 10px
      border-radius 6px
      span
        fsc 15px #333333
        text-align center
      .right
        display flex
        flex-direction row
        align-items center
        span
          fsc 15px #545454
          align-items center
          margin-right 6px
        .icon
          display flex
          width 6px
          height 12px
    textarea
      fsc 14px #999999
      bgf()
      min-height 60px
      border-radius 6px
      border 0
      outline none
      align-items center
      margin 0 10px
      padding 12px 10px
    span
      fsc 12px #999999
      text-align right
      margin-right 10px
      margin-top 4px
    .operator
      text-align center
      weight 48px
      margin-top 30px
      button
        border 0
        outline none
        border-radius 24px
        background rgba(30,154,255,1)
        fsc 14px white
        wh 180px 48px
</style>

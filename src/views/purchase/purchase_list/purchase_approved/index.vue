<template lang="pug">
  .main.full_box
    .scheduled_time
      .left
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_time")
        span 预计到货时间
      .right(@click="chooiceDate")
        span {{getYMDDateDecimalString(getData.plan_arrival_time)}}
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconarrow_")
    .divider_line
    .remark
      .material_title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_remarks")
        span 备注
      textarea(placeholder="选填..." v-model="getData.remark")
    .operator_bar
      span
      button(@click = "clickSubmit") 提交
</template>

<script>
  import Textarea from "cube-ui/src/components/textarea/textarea";
  import {mapActions, mapState} from "vuex";
  import {PurchaseOrder} from "../../../../api/purchase";
  import {getYMDDateDecimalString,getTimestampByDate } from '_common/util'

  // var date = new Date()
  // var dateTime = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()

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
      padding 15px
      bottom 15px
      .left
        display flex
        flex-direction row
        align-items center
        .icon
          display flex
          width 16px
          height 18px
          margin-right 7px
        span
          fsc 15px #545454
          align-items center
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
    .divider_line
      background #E6EAED
      height 10px
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

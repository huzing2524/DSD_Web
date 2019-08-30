<template lang="pug">
  .purchase_detail(v-if="isLoad")
    .customer
      .title
        .name
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_clien")
          span 供应商
        .change_customer(@click="clickChangeSupplier")
          span 切换
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconArrow")
      .info
        span {{getData.supplier.name}}
        .boss_info
          span {{getData.supplier.position + "(" + getData.supplier.contact + ")"}}
          span {{getData.supplier.phone}}
          .boss_phone
        .address {{getData.supplier.address}}
    .purchase_material()
      .material_title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_cailiao")
        span 采购物料
      .material_list
        .list_item(v-for="(item, index) in getData.materials" :key="index")
          .item-name
            p {{item.category_name + ':' + item.name}}
          input(placeholder="填写采购数量...",v-model="item.count")
    .scheduled_time
      .left
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_time")
        span 期望到货时间
      .right(@click="chooiceDate")
        span {{getYMDDateDecimalString(getData.plan_arrival_time)}}
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconarrow_")
    .remark
      .material_title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_remarks")
        span 给供应商留言
      textarea(placeholder="选填..." v-model="getData.remark")
    .operator_bar
      .save_and_approve(@click = "clickSaveAndApprove")
        .p 保存并通过审批

</template>

<script>
  import Textarea from "cube-ui/src/components/textarea/textarea";
  import {PurchaseOrder} from "../../../../api/purchase";
  import {mapState,mapActions} from "vuex";
  import {getYMDDateDecimalString,getTimestampByDate } from '_common/util'
  export default {
    components: {Textarea},
    data() {
      return {
        isLoad : false,
        // dateTime: '',
        // purchaseData: {},
        mData: {
          supplier_id: '',// 在需要用的时候再赋值进来
          state: "1",
          state_time: "2019-09-01",
          // TODO 这个参数需要服务器返回
          money: '498,520.98',
          flag:'0',
          remark: "重要客户，质量要求较高，须严格把控产品质量",// 这个参数目前没用上
          supplier: {
            // TODO，目前缺少这个id，在采购修改里面需要用这个id
            id: "001",
            name: "大数点",
            phone: "15625267876",
            contact: "波波",
            position: "Boss",
            address: "广东省深圳市宝安区福永街道五道口前海2区4巷滨海大厦608"
          },
          materials:[
            {
              id: '',
              category_name: '玻璃',
              name: '钢化玻璃',
              count: '9988',
              unit: '个',
              unit_price: '0.01'
            },
            {
              id: '',
              category_name: '电脑',
              name: '笔记本',
              count: '100',
              unit: '台',
              unit_price: '2500'
            },
            {
              id: '',
              category_name: '风扇',
              name: '台式风扇',
              count: '200',
              unit: '台',
              unit_price: '300'
            },
          ],
          approve: {
            "name": "黄东强",
            "phone": "16726576666",
            "time": 1555040053
          }
        },
      }
    },
    computed: {
      ...mapState('purchase',{
        getData: function (state) {
          this.isLoad = true;
          return state.purchaseDetail
        },
      })
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
      console.log("111="+this.getData.state)
    },
    methods: {
      ...mapActions('purchase', [
        'updatePurchase'
      ]),
      getYMDDateDecimalString,
      getTimestampByDate,
      clickSaveAndApprove() { // 保存并审批
        this.getData.state = "1"//1: 通过审批， 2：取消采购单
        console.log(this.getData)
        let body = new Object()
        body.state = this.getData.state
        body.supplier_id = this.getData.supplier.supplier_id
        body.materials = this.getData.materials
        body.plan_arrival_time = this.getData.plan_arrival_time
        body.remark = this.getData.remark
        let myId = this.$route.query.id || ''
        PurchaseOrder(body, 'put', myId).then(result => {
          if(parseInt(result.data.res) === 0) {
            this.updatePurchase({
              ...this.getData
            })
            this.$toast('已通过')
            this.$router.go(-1)
          } else {
            console.log(result.data.errmsg)
          }
        }).catch(() => {
          this.$toast('修改失败')
        })
      },
      clickChangeSupplier() { // 切换提供商
        this.updatePurchase({
          ...this.getData
        })
        this.$router.push('/purchase/supplier/supplier_chooice')
      },
      chooiceDate() { // 选择日期
        this.datePicker.show()
      },
      selectDate(date, selectedVal, selectedText) {
        // this.getData.plan_arrival_time = parseInt(this.getTimestampByDate(selectedText.join('-')))
        this.getData.plan_arrival_time = parseInt(this.getTimestampByDate(Date.parse(selectedText.join('-'))))
      },
      cancelHandle() {
      }
    }
  }
</script>


<style lang="stylus" scoped>
  .purchase_detail
    width 100%
    height 100%
    background #E6EAED
    overflow scroll
    -webkit-overflow-scrolling touch
    .customer
      display flex
      flex-direction column
      background white
      margin-bottom 10px
      padding 12px 10px
      .title
        display flex
        flex-direction row
        justify-content space-between
        background white
        .name
          display flex
          flex-direction row
          align-items center
          .icon
            display flex
            width 16px
            height 18px
            margin-right 7px
          span
            font-size 15px
            color #545454
            align-items center
            font-weight bold
        .change_customer
          display flex
          flex-direction row
          align-items center
          span
            font-size 15px
            color #F5FBFF
            align-items center
            margin-right 6px
          .icon
            display flex
            width 8px
            height 14px
      .info
        display flex
        flex-direction column
        background #F5FBFF
        border-radius 6px
        padding 15px 21px 15px 15px
        margin-top 15px
        span
          display flex
          margin-bottom 15px
          align-items center
          font-size 14px
          color #545454
        .boss_info
          display flex
          flex-direction row
          span
            padding 6px 12px
            background:rgba(222,242,255,1);
            border-radius 14px
            font-size 12px
            margin-right 10px
            color #999999
        .address
          color #545454
          font-size 14px
    .purchase_material
      display flex
      flex-direction column
      background white
      padding 12px 10px 0
      margin-bottom 10px
      .material_title
        display flex
        flex-direction row
        align-items center
        justify-content flex-start
        .icon
          display flex
          width 18px
          height 18px
          margin-right 8px
        span
          font-size 15px
          color #545454
          font-weight bold
      .material_list
        height 100%
        width 100%
        background-color white
        margin-top 15px
        overflow-y scroll
        .list_item
          display flex
          flex-direction column
          background #F5FBFF
          padding 12px 10px
          border-radius 6px
          margin-bottom 12px
          .item-name
            align-items center
            font-size 14px
            color #333333
            margin-bottom 16px
          input
            fsc(14px, #666666)
            flex 1
            background #F5FBFF
    .scheduled_time
      display flex
      flex-direction row
      justify-content space-between
      background white
      padding 12px 10px
      margin-bottom 10px
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
          font-weight bold
      .right
        display flex
        flex-direction row
        align-items center
        justify-content flex-end
        flex 1
        span
          fsc 15px #545454
          align-items center
          margin-right 6px
        .icon
          display flex
          width 6px
          height 12px
    .remark
      display flex
      flex-direction column
      padding 12px 10px
      bgf()
      .material_title
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
          font-weight bold
      textarea
        fsc 14px #999999

        background rgba(233,245,255,1)
        border-radius 6px
        border 0
        outline none
        align-items center
        margin-top 12px
        min-height 60px
    .operator_bar
      position fixed
      bottom 0
      left 0
      right 0
      bgf()
      padding 15px 15px 15px
      display flex
      align-items center
      justify-content flex-end
      .save_and_approve
        width 96px
        border 1px solid #1E9AFF
        color #4DA8EE
        border-radius 16px
        font-size 14px
        padding 6px 0






</style>

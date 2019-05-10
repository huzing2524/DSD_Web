<template lang="pug">
  .purchase_detail(v-if="isLoad").full_box
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
              use(xlink:href="#iconArrow_bule_")
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
            use(xlink:href="#iconicon_product")
        span 采购物料
      .material_list
        .list_item(v-for="(item, index) in getData.materials" :key="index")
          .item-name
            p {{item.category_name + ':' + item.name}}
          input(placeholder="填写采购数量...",v-model="item.count")
    .divider_line
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
    .divider_line
    .operator_bar
      button(@click = "clickSaveAndApprove") 保存并通过审批

</template>

<script>
  import Textarea from "cube-ui/src/components/textarea/textarea";
  import {PurchaseOrder} from "../../../../api/purchase";
  import {mapState,mapActions} from "vuex";
  import {getYMDDateDecimalString,getTimestampByDate } from '_common/util'
  // var date = new Date()
  // var dateTime = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()

  export default {
    components: {Textarea},
    data() {
      return {
        isLoad : false,
        // dateTime: '',
        // purchaseData: {},
        supplier: {
          name: "大数点",
          phone: "15625267876",
          contact: "波波",
          position: "Boss",
          address: "广东省深圳市宝安区福永街道五道口前海2区4巷滨海大厦608"
        },
        product: {
          category_name: '玻璃',
          name: '钢化玻璃',
          count: '9988',
          unit: '个',
          unit_price: '0.01'
        },
        products:[
          {
            category_name: '玻璃',
            name: '钢化玻璃',
            count: '9988',
            unit: '个',
            unit_price: '0.01'
          },
          {
            category_name: '电脑',
            name: '笔记本',
            count: '100',
            unit: '台',
            unit_price: '2500'
          },
          {
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
            console.log(res.errmsg)
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
    background white
    .customer
      display flex
      flex-direction column
      background white
      margin-bottom 1px
      padding 15px
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
        .change_customer
          display flex
          flex-direction row
          align-items center
          span
            font-size 15px
            color #1E9AFF
            align-items center
            margin-right 6px
          .icon
            display flex
            width 6px
            height 12px
      .info
        display flex
        flex-direction column
        background #E9F5FF
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
            padding 2px 12px
            border 1px solid #999999
            border-radius 11px
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
      padding 15px
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
      .material_list
        height 100%
        width 100%
        background-color white
        margin-top 15px
        margin-bottom 15px
        overflow-y scroll
        .list_item
          display flex
          flex-direction column
          background #E9F5FF
          padding 15px
          border-radius 6px
          .item-name
            align-items center
            font-size 14px
            color #464646
            margin-bottom 16px
          input
            fsc(14px, #545454)
            flex 1
            background #E9F5FF
    .divider_line
      background #E6EAED
      height 10px
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
        margin 0 15px
    .divider_line
      background #E6EAED
      height 0
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

<template lang="pug">
  .purchase_detail(v-if="isLoad" :class="isCanOperator ==='true' ? 'havepaddingbottom' : ''")
    .purchase_id
      .id_left
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_danhao")
        span 采购单号
      .id_right {{$route.query.id}}
    .customer
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_clien")
        span 供应商
      .info(v-if="getSupplierStatus()")
        .name
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_supplier")
          span {{mData.supplier.name}}
        .boss_info
          span {{mData.supplier.position + "(" + mData.supplier.contact + ")"}}
          span {{mData.supplier.phone}}
          .boss_phone
        .address {{mData.supplier.address}}
      .info_null(v-else)
        span 未匹配到供应商，请添加出售采购单中物料的供应商
    .status
      .status_left
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_zhaungtai")
        span 状态
      .status_right {{getStateString(mData.state)}}
    .scheduled_time
      .left
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_time")
        span 预计到货时间
      .right
        span {{getYMDDateDecimalString(mData.plan_arrival_time)}}
    .purchase_material
      .material_title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_product")
        span 采购物料
      .material_list
        .list_item(v-for="(item, index) in mData.materials" :key="index")
          .item-name
            p {{item.category_name + ':' + item.name}}
          .item-info
            .count
              p {{Math.ceil(item.count) + item.unit}}
            .point
              p
            .unit_price
              p ￥{{item.unit_price  | formatFloatNum}}
            .point
              p
            .total_price
              p ￥{{item.unit_price * item.count | formatFloatNum}}
      .material_money
        .money_tip  合计金额
        .money_num  ￥{{getMoney() | formatFloatNum}}
    .operator_bar(v-if="mData.state === '1' || mData.state === '2'")
      .cancel_purchase(v-if="mData.state === '1' || mData.state === '2'" @click = "clickCancel")
        .p 取消采购
      .modify(v-if="(mData.state === '1' || mData.state === '2') && getSupplierStatus()" @click = "clickModify(isCanModify)")
        .p 修改
      .pass_approve(v-if="mData.state === '1' && getSupplierStatus()" @click = "clickApprove")
        .p 通过审批
      .pass_approve(v-if="!getSupplierStatus()" @click = "addSupplier")
        .p 添加供应商
    .approver(v-if="mData.state != '1' && mData.state != '6' && getSupplierStatus()")
      .head
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_shenpi")
        span 审批人
      .info
        .name
          .p {{mData.approve.name}}
        .phone_and_date
          .p  {{mData.approve.phone}}
          .p  {{mData.approve.time}}

</template>

<script>
  import {PurchaseOrder} from "_api/purchase"
  import {mapState, mapActions} from "vuex";
  import {getYMDDateDecimalString} from '_common/util'

  export default {
    data() {
      return {
        isLoad: false,
        myId: '',
        purchaseData: {},
        isCanModify: 'true',
        isCanOperator: 'true',
        mData: {
          /*supplier_id: '',// 在需要用的时候再赋值进来
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
          }*/
        },
      }
    },
    computed: {
      ...mapState('purchase', {
        purchaseDetail: state => state.purchaseDetail
      }),
    },
    mounted() {
      this.initData()
    },
    methods: {
      ...mapActions('purchase', [
        'updatePurchase'
      ]),

    /*{
        "supplier_id": "",
        "state": "1",
        "creator_id": "",
        "creator": "",
        "remark": "测试2",
        "supplier": {
            "name": "",
            "contact": "",
            "phone": "",
            "position": "",
            "address": ""
      },
        "flag": "0",
        "materials": [{
          "id": "9dRw7i6xFntkcuvjt2",
          "count": 190.0,
          "unit_price": 12.5,
          "name": "电脑零配件",
          "unit": "个",
          "category_name": "其他"
      }]
      }*/
      initData() {
        this.myId = this.$route.query.id || ''
        PurchaseOrder({}, 'get', this.myId).then(res => {
          this.isLoad = true
          this.mData = res.data
          console.log(this.mData)
          this.updatePurchase({
            ...this.mData
          })
        })
      },
      // 如果供应商没有数据，则是没匹配到，样式不显示供应商数据样式，显示没匹配到，需要用户去添加供应商的提示语，而且按钮不是审批，而是添加供应商。
      getSupplierStatus() {
        if(null === this.mData || null === this.mData.supplier || null === this.mData.supplier.id || '' === this.mData.supplier.id) {
          return false
        } else {
          return true
        }
      },
      // 1: 待审批， 2: 已审核待确认 3：采购中, 4: 运输中, 5：已入库, 6:已取消
      getStateString(state) {
        switch (state) {
          case "1":
            return "待审批"
          case "2":
            return "已审核待确认"
          case "3":
            return "采购中"
          case "4":
            return "运输中"
          case "5":
            return "已入库"
          case "6":
            return "已取消"
        }
      },
      getYMDDateDecimalString,
      getMoney() {
        let money = 0;
        if(null != this.mData && null != this.mData.materials) {
          this.mData.materials.forEach((material) => {
            money += material.count * material.unit_price
          })
        }
        return money
      },
      clickCancel() {
        // this.$router.push(`/purchase/purchase_list/purchase_cancel/?id=${this.myId}`)
        this.$router.push(`/purchase/purchase_list/purchase_cancel/?id=${this.myId}`)
      },
      clickModify(isCanModify) {
        if (this.mData.state == '1' || this.mData.state === '2') {
          // this.updatePurchase({
          //   purchaseDetail: this.mData
          // })
          // this.$router.push(`/purchase/purchase_list/purchase_modify/?id=${this.myId}`)
          this.$router.push(`/purchase/purchase_list/purchase_modify/?id=${this.myId}`)
        } else { // TODO 目前缺少一个状态来判断
          this.$createDialog({
            type: 'confirm',
            title: '',
            content: '你暂无权限，若有需要请联系管理人员修改权限',
            confirmBtn: {
              text: '我知道了',
              active: true,
              disabled: false,
              href: 'javascript:;',
            },
            cancelBtn: {
              text: '',
              active: false,
              disabled: true,
              href: 'javascript:;'
            },
            onConfirm: () => {

            },
            onCancel: () => {

            }
          }).show()
        }
      },
      clickApprove() {
        this.$router.push(`/purchase/purchase_list/purchase_approved?id=${this.myId}`)
      },
      addSupplier() {
        this.$router.push(`/purchase/supplier/supplier_shop_management`)
      }
    }
  }
</script>


<style lang="stylus" scoped>
  .purchase_detail
    width 100%
    height 100%
    overflow scroll
    -webkit-overflow-scrolling touch
    background #E6EAED
    &.havepaddingbottom
      padding-bottom 62px
    .purchase_id
      display flex
      flex-direction row
      justify-content space-between
      align-items center
      background white
      padding 15px
      margin-bottom 10px
      .id_left
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
      .id_right
        font-size 14px
        color #999999
    .customer
      display flex
      flex-direction column
      background white
      margin-bottom 10px
      padding 15px
      .title
        display flex
        flex-direction row
        .icon
          display flex
          width 16px
          height 18px
          margin-right 7px
        span
          font-size 15px
          color #545454
      .info
        display flex
        flex-direction column
        background #E9F5FF
        border-radius 6px
        padding 15px 21px 15px 15px
        margin-top 15px
        .name
          display flex
          flex-direction row
          margin-bottom 15px
          align-items center
          .icon
            display flex
            width 20px
            height 20px
            margin-right 10px
          span
            font-size 14px
            color #545454
        .boss_info
          display flex
          flex-direction row
          margin-bottom 15px
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
      .info_null
        display flex
        flex-direction column
        background #E9F5FF
        border-radius 6px
        padding 15px 21px 15px 15px
        margin-top 15px
        span
          font-size 14px
          color #FF5F5F
    .status
      background white
      display flex
      flex-direction row
      align-items center
      padding 15px
      justify-content space-between
      .status_left
        display flex
        flex-direction row
        align-items center
        .icon
          display flex
          width 18px
          height 18px
          margin-right 8px
        span
          font-size 15px
          color #545454
      .status_right
        color #999999
        font-size 14px
        align-items center
    .scheduled_time
      display flex
      flex-direction row
      justify-content space-between
      background white
      padding 15px
      bottom 15px
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
          margin-bottom 10px
          border-radius 6px
          .item-name
            align-items center
            font-size 14px
            color #464646
            margin-bottom 16px
          .item-info
            display: flex
            flex-direction row
            justify-content space-between
            .count
              font-size 14px
              color #7A7A7A
            .point
              width 4px
              height 4px
              border-radius 4px
              background #BEBEBE
              align-items center
            .unit_price
              font-size 14px
              color #7A7A7A
            .point
              width 4px
              height 4px
              border-radius 4px
              background #BEBEBE
              align-items center
            .total_price
              font-size 14px
              color #7A7A7A
      .material_money
        display flex
        flex-direction row
        justify-content space-between
        align-items center
        .money_tip
          color #464646
          font-size 14px
        .money_num
          color #FF9235
          font-size 16px
    .operator_bar
      position fixed
      bottom 0
      left 0
      right 0
      bgf()
      margin-top 40px
      padding 15px 15px 15px
      display flex
      align-items center
      justify-content flex-end
    .cancel_purchase
      border 1px solid #F4616C
      color #F4616C
      font-size 14px
      padding 6px 18px
      margin-right 15px
      border-radius 16px
    .modify
      border 1px solid #545454
      color #545454
      border-radius 16px
      font-size 14px
      padding 6px 18px
      margin-right 15px
    .pass_approve
      border 1px solid #4DA8EE
      color #4DA8EE
      border-radius 16px
      font-size 14px
      padding 6px 18px
    .approver
      .title
        display flex
        flex-direction row
        .icon
          display flex
          width 16px
          height 18px
          margin-right 7px
        span
          font-size 15px
          color #545454
    .approver
      display flex
      flex-direction column
      background white
      padding 15px
      margin-top 10px
      margin-bottom 20px
      .head
        display flex
        flex-direction row
        align-items center
        margin-bottom 16px
        .icon
          display flex
          width 16px
          height 18px
          margin-right 7px
        span
          font-size 15px
          color #545454
          align-items center
      .info
        display flex
        flex-direction column
        background #E9F5FF
        border-radius: 6px;
        padding 15px
        .name
          color #545454
          font-size 14px
        .phone_and_date
          display flex
          flex-direction row
          justify-content space-between
          margin-top 10px
          .p
            color #545454
            font-size 14px
          .p
            color #999999
            font-size 13px


</style>

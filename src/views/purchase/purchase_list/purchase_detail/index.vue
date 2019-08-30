<template lang="pug">
  .purchase_detail(v-if="isLoad" :class="isCanOperator ==='true' ? 'havepaddingbottom' : ''")
    .purchase_id
      .id_left
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_danhao")
        span 采购单号
      .id_right {{$route.query.id}}
    .divider_line
      .divider_padding_line
    .status
      .status_left
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_zhaungtai")
        span 采购状态
      .status_right {{getStateString(mData.state)}}
    .divider_line
      .divider_padding_line
    .scheduled_time
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_time")
        span 时间
      .time-body
        .time(class="expected")
          span 期待送达时间
          span {{getYMDDateDecimalString(mData.plan_arrival_time)}}
        .time(class="actual")
          span 实际送达时间
          span {{'5' === mData.state && mData.arrival_time ? getYMDDateDecimalString(mData.arrival_time) : '—'}}
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
              use(xlink:href="#iconqi")
          span {{mData.supplier.name || '佚名'}}
        .boss_info
          span {{mData.supplier.position + "(" + mData.supplier.contact + ")"}}
          span(v-if="mData.supplier") {{getStringField(mData.supplier.phone)}}
          .boss_phone
        .address {{getStringField(mData.supplier.address)}}
      .info_null(v-else)
        span 未匹配到供应商，请添加出售采购单中物料的供应商
    .divider_line
      .divider_padding_line
    .purchase_material
      .material_title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_cailiao")
        span 采购物料
      .material_list
        .list_item(v-for="(item, index) in mData.materials" :key="index")
          .item-top
            .item-name
              p {{item.category_name + ':' + item.name}}
            .item-price
              p ￥{{item.unit_price  | formatFloatNum}}
          .item-count
            span x {{Math.ceil(item.count)}}
      .material_money
        .money_tip  合计金额
        .money_num  ￥{{getMoney() | formatFloatNum}}
    .divider_line
      .divider_padding_line
    .remark(v-if="mData.remark")
      .supplier_remark
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_remarks")
        span 给供应商留言
      .remark_content
        span  {{mData.remark}}
    .operator_bar(v-if="mData.state === '1' || mData.state === '2'")
      .cancel_purchase(v-if="mData.state === '1' || mData.state === '2'" @click = "clickCancel")
        .p 取消采购
      .modify(v-if="(mData.state === '1' || mData.state === '2') && getSupplierStatus()" @click = "clickModify()")
        .p 修改
      .pass_approve(v-if="mData.state === '1' && getSupplierStatus()" @click = "clickApprove")
        .p 通过审批
      .pass_approve(v-if="!getSupplierStatus()" @click = "addSupplier")
        .p 添加供应商
    .approver_or_cancel_persion(v-if='mData.approve' :class="mData.approve ? 'have_cancelpersion' : ''")
      .head
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_shenpi")
        span 审批人
      .info
        .base_message
          .left
            img(:src="mData.approve.image")
            .name_and_phone
              .p  {{mData.approve.name || '佚名'}}
              .p  {{getStringField(mData.approve.phone)}}
          .icon(@click="callPhone(getStringField(mData.approve.phone))")
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconphone")
    .divider_line(v-if="mData.cancel")
      .divider_padding_line
    .approver_or_cancel_persion(v-if="mData.cancel")
      .head
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_shenpi")
        span 取消人
      .info
        .base_message(class="cancel_persion")
          .left
            img(:src="mData.cancel.image")
            .name_and_phone(v-if='mData.cancel')
              .p  {{mData.cancel.name || '佚名'}}
              .p  {{mData.cancel.phone === null ? '' : mData.cancel.phone}}
          .icon(@click="callPhone(getStringField(mData.cancel.phone))")
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconphone")
        .cancel_remark
          span {{mData.cancel.remark}}
    .remark(class="from_supplier" v-if="isHaveApproveRemark")
      .supplier_remark
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_remarks")
        span 供应商留言
      .remark_content
        span  加紧单，希望能准时出货！
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
        isCanOperator: 'true',
        isHaveCancelPersion: false,
        isHaveActualArrivalTime: false,
        isHaveApproveRemark: false,//暂时不要供应商留言
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
      initData() {
        this.myId = this.$route.query.id || ''
        PurchaseOrder({}, 'get', this.myId).then(res => {
          this.isLoad = true
          this.mData = res.data
          // console.log(this.mData)
          this.updatePurchase({
            ...this.mData
          })
        }).catch((e)=>{
          console.log(e)
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
      getStringField(field) {
        if(field === null || field === undefined) {
          return ''
        } else {
          return field
        }
      },
      // phoneCall(phone) {
      //   window.location.href = `tel://${phone}`
      // },
      callPhone(phone) {
        let u = navigator.userAgent
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        if (isAndroid) {
          window.android.phoneCall(phone)
        }else if(isIOS){
          window.webkit && window.webkit.messageHandlers.phoneCall.postMessage(phone)
        }
        else{
          this.$router.go(-1)
        }
      },
      clickCancel() {
        // this.$router.push(`/purchase/purchase_list/purchase_cancel/?id=${this.myId}`)
        this.$router.push(`/purchase/purchase_list/purchase_cancel/?id=${this.myId}`)
      },
      clickModify() {
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
      padding 12px 10px
      .id_left
        display flex
        flex-direction row
        align-items center
        .icon
          display flex
          width 16px
          height 18px
          margin-right 4px
        span
          font-size 15px
          color #333333
          font-weight:bold
      .id_right
        font-size 14px
        color #999999
    .divider_line
      background white
      height 1px
      .divider_padding_line
        background #EEEEEE
        height 1px
        margin-left 10px
        margin-right 10px
    .status
      background white
      display flex
      flex-direction row
      align-items center
      padding 12px 10px
      justify-content space-between
      .status_left
        display flex
        flex-direction row
        align-items center
        .icon
          display flex
          width 18px
          height 18px
          margin-right 4px
        span
          font-size 15px
          color #333333
          font-weight bold
      .status_right
        color #999999
        font-size 14px
        align-items center
    .scheduled_time
      display flex
      flex-direction column
      justify-content space-between
      background white
      padding 12px 10px
      bottom 15px
      .title
        display flex
        flex-direction row
        align-items center
        .icon
          display flex
          width 16px
          height 18px
          margin-right 4px
        span
          fsc 15px #333333
          align-items center
          font-weight bold
      .time-body
        display flex
        flex-direction column
        background #F5FBFF
        border-radius 6px
        margin-top 10px
        .time
          display flex
          flex-direction row
          align-items center
          justify-content space-between
          flex 1
          padding-left 10px
          padding-right 10px
          padding-top 12px
          padding-bottom 10px
          &.expected
            padding-bottom  0
          span
            fsc 14px #333333
            align-items center
          span
            fsc 14px #666666
            align-items center
    .customer
      display flex
      flex-direction column
      background white
      margin-top 10px
      padding 12px 10px
      .title
        display flex
        flex-direction row
        align-items center
        .icon
          display flex
          width 16px
          height 18px
          margin-right 4px
        span
          font-size 15px
          color #333333
          font-weight bold
      .info
        display flex
        flex-direction column
        background #F5FBFF
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
            color #333333
        .boss_info
          display flex
          flex-direction row
          margin-bottom 17px
          span
            padding 6px 12px
            background #DEF2FF
            border-radius 14px
            font-size 12px
            margin-right 10px
            color #999999
        .address
          color #333333
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
    .purchase_material
      display flex
      flex-direction column
      background white
      padding 12px 10px
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
          color #333333
          font-weight bold
      .material_list
        height 100%
        width 100%
        background-color white
        margin-top 15px
        margin-bottom 12px
        overflow-y scroll
        .list_item
          display flex
          flex-direction column
          background #F5FBFF
          border-radius 6px
          margin-bottom 12px
          .item-top
            display flex
            flex-direction row
            height 20px
            line-height 20px
            justify-content space-between
            align-items center
            padding 12px 10px 0
            .item-name
              p
                align-items center
                font-size 14px
                color #333333
            p
              font-size 14px
              color #666666
          .item-count
            weight 17px
            font-size 12px
            color #999999
            text-align right
            padding 12px 10px
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
    .remark
      bgf()
      padding 12px 10px
      margin-bottom 10px
      &.from_supplier
        margin-bottom 0
      .supplier_remark
        background white
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
          color #333333
          font-weight bold
      .remark_content
        display flex
        background #F5FBFF
        border-radius 6px
        padding 12px 10px
        margin-top 10px
        span
          fsc 14px #333333
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
      .cancel_purchase
        width 96px
        border 1px solid #999999
        color #999999
        font-size 14px
        padding 6px 0
        margin-right 15px
        border-radius 16px
        text-align center
      .modify
        width 96px
        border 1px solid #999999
        color #999999
        border-radius 16px
        font-size 14px
        padding 6px 0
        margin-right 15px
        text-align center
      .pass_approve
        width 96px
        border 1px solid #1E9AFF
        color #4DA8EE
        border-radius 16px
        font-size 14px
        padding 6px 0
        text-align center
      .approver
        .title
          display flex
          flex-direction row
          .icon
            display flex
            width 16px
            height 18px
            margin-right 4px
          span
            font-size 15px
            color #333333
    .approver_or_cancel_persion
      display flex
      flex-direction column
      background white
      padding 12px 10px
      margin-bottom 10px
      &.have_cancelpersion
        margin-bottom 0
      .head
        display flex
        flex-direction row
        align-items center
        margin-bottom 10px
        .icon
          display flex
          width 16px
          height 18px
          margin-right 4px
        span
          font-size 15px
          color #333333
          align-items center
          font-weight bold
      .info
        display flex
        flex-direction column
        background #F5FBFF
        border-radius: 6px;
        padding 12px 10px
        .base_message
          display flex
          flex-direction row
          margin-bottom 0
          justify-content space-between
          align-items center
          &.cancel_persion
            margin-bottom 12px
          .left
            display flex
            flex-direction row
            img
              wh 48px 48px
              margin-right 10px
              border-radius 4px
            .name_and_phone
              display flex
              flex-direction column
              justify-content space-between
              margin-top 10px
              .p
                color #333333
                font-size 14px
              .p
                color #999999
                font-size 13px
          .icon
            display flex
            width 38px
            height 38px
            margin-right 10px
        .cancel_remark
          display flex
          flex-direction row
          background #DEF2FF
          border-radius: 6px;
          padding 12px 10px
          span
            fsc 12px #333333
</style>

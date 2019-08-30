<template lang="pug">
  .order_create.fbox(v-if="isLoad")
    div(v-doc-title="doctitle")
    .order_form_data.order_create_box
      .order_create_box_item
        .title
          p
            span.icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_clien")
            | 客户
        .content.client
          .c_name
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_supplier")
            p {{customer.name}}
          .u_name(v-if="customer.contact")
            p {{customer.contact}}
            p {{customer.phone}}
          .address(v-if="customer.address") {{customer.address}}

      .order_create_box_item
        .title
          p
            span.icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_time")
            | 时间
        .content.date
          .item
            p 期望送达时间
            p {{orderSub.deliveryTime | timePointFilter}}

      .order_create_box_item
        .title
          p
            span.icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_product")
            | 出售产品
        .content.product
          div(v-for="(item, idx) in orderSub.productBag.list" :key="idx")
            .info_price
              p {{item.name}}
              p ¥{{item.unit_price | formatFloatNum}}
            .info_num
              p x  {{item.dealInfo.num}}
        .product_price
          p 合计金额
          p ¥ {{orderSub.productBag.money | formatFloatNum}}

      .order_create_box_item(v-if="orderSub.remark")
        .title
          p
            span.icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_remarks")
            | 备注
        .content
          p {{orderSub.remark}}
    .sub_box
      .info.price
        p 共{{orderSub.productBag.num}}件，合计：
          span {{orderSub.productBag.money}}元
      .sub_btn(@click="subOrder") 保存订单
</template>
<script>
  import {getYMDHMDateString} from '_common/util/'
  import {OrderNew, OrderSub} from '_api/order'
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'order_create',
    data() {
      return {
        isLoad: false,
        getYMDHMDateString,
        doctitle: '',
        customer: {},
      }
    },
    computed: {
      ...mapState('order', {
        orderSub: state => state.orderSub
      }),
    },
    mounted() {
      this.initData()
    },
    methods: {
      ...mapActions('order', [
        'updateOrderSub',
      ]),
      initData() {
        if (!this.$route.query.from) {
          this.updateOrderSub({
            deliveryTime: this.orderSub.deliveryTime || Math.floor(new Date().getTime() / 1000)
          })
        }
        this.customer = {...this.customer, ...this.orderSub.customer}

        if (!this.orderSub.customer) {
          this.toCustomerSelect()
        } else if (!this.orderSub.productBag) {
          this.toProductSelect()
        } else {
          this.doctitle = this.orderSub.isModify?'修改订单':''
          this.isLoad = true
        }
      },
      toCustomerSelect() {
        this.$router.replace(`/order/order_new/select_customer?from=${this.$route.fullPath}`)
      },
      toProductSelect() {
        this.$router.replace(`/order/order_new/select_product?from=${this.$route.fullPath}`)
      },
      showDateTimePicker() {
        if (!this.dateTimePicker) {
          this.dateTimePicker = this.$createDatePicker({
            title: `选择发货时间`,
            min: new Date(2008, 7, 8, 8, 0, 0),
            max: new Date(2020, 9, 20, 20, 59, 59),
            value: new Date(),
            columnCount: 6,
            onSelect: this.selectHandle,
          })
        }
        this.dateTimePicker.show()
      },
      selectHandle(date) {
        this.updateOrderSub({
          deliveryTime: Math.floor(date.getTime() / 1000)
        })
      },
      subOrder() {
        let isModify = this.orderSub.isModify
        let arr = []
        for (let i = 0; i < this.orderSub.productBag.list.length; i++) {

          arr.push({
            id: this.orderSub.productBag.list[i].id,
            count: parseFloat(this.orderSub.productBag.list[i].dealInfo.num),
            // unit_price: parseFloat(this.orderSub.productBag.list[i].dealInfo.price)
          })
        }
        if (!this.customer.name) {
          this.$toast('请完善订单信息再提交')
          return
        }
        if (this.orderSub.remark && this.orderSub.remark.length > 60) {
          this.$toast('备注信息长度过长(限60字)')
          return
        }
        if (isModify) {
          OrderSub({
            state: '6',
            products: arr,
            // id: this.orderSub.id,
            plan_arrival_time: this.orderSub.deliveryTime,
            remark: this.orderSub.remark
          }, 'put', this.orderSub.id).then(res => {
            if (res.data.res === 0) {
              this.$toast(`${isModify ? `修改` : `保存`}成功`)
              this.$router.go(-3)
            }
          })
        } else {
          OrderNew({
            id: this.orderSub.id ? this.orderSub.id : '',
            products: arr,
            client_id: this.customer.id,
            plan_arrival_time: this.orderSub.deliveryTime,
            remark: this.orderSub.remark
          }, 'post', '').then((res) => {
            if (parseInt(res.data.res) === 0) {
              this.$toast(`${isModify ? `修改` : `保存`}成功`)
              this.leavePage()
            } else {
              this.$toast(res.data.errmsg)
            }
          })
        }
      },
      leavePage() {
        this.isLoad = false
        this.updateOrderSub()
        this.$router.replace('/order/order_list')
      },
      modifyOrder() {
      },
    }
  }
</script>

<style lang="stylus">
  .order_create
    width 100%
    height 100%
    background #F0EEF5
    color #333
    overflow scroll
    &_box
      fbox()
      padding 0 18px
      bg #FFF
      &_item
        padding 18px 0
        border-bottom 1px solid #EEEEEE
        bgf()
        .title
          display flex
          justify-content space-between
          font-size 15px
          p
            ftb()
            &.status
              color $mainc
              &:after
                font-family iconfont
                content '\e687'
                font-size 13px
                margin-left 10px
            .icon
              display block
              wh 18px 18px
              margin-right 7px
            &:nth-of-type(2)
              fsc 14px #999
        .content
          margin-top 15px
          padding 15px
          bg #F5FBFF
          border-radius 6px
          >p
            fsc 14px #545454
          &.client
            .c_name
              ftb()
              fsc 14px #545454
              .icon
                wh 20px 20px
                margin-right 10px
            .u_name
              ftb()
              fsc 14px #545454
              p
                fsc 12px #999
                padding 5px 12px
                border-radius 12px
                bg #DEF2FF
                margin-right 10px
                margin-top 15px
            .address
              fsc 14px #545454
              margin-top 15px
              line-height 20px
          &.date
            .item
              ftb()
              justify-content space-between
              font-size 14px
              margin-top 15px
              &:nth-of-type(1)
                margin 0
              p
                &:nth-of-type(1)
                  color: #000
          &.product
            .info_price
              fsc 14px #7A7A7A
              justify-content space-between
              margin-top 8px
              display flex
              justify-content space-between
            .info_num
              display flex
              justify-content flex-end
              fsc 14px #7A7A7A
              margin-top 8px
        .product_price
          display flex
          align-items center
          justify-content space-between
          margin-top 20px
          p
            &:nth-of-type(1)
              fsc 14px #545454
            &:nth-of-type(2)
              fsc 18px #FF9235
    .order_form_data
      flex 1
      overflow-x hidden
      overflow-y scroll
      padding-bottom 64px
      fbox()

    .sub_box
      width 100%
      height 64px
      position fixed
      bottom 0
      left 0
      display flex
      align-items center
      justify-content space-between
      padding 12px 16px
      box-sizing border-box
      background #FFF

      .sub_btn
        width 122px
        height 40px
        background #0099FF
        color #FFF
        display flex
        align-items center
        justify-content center
        border-radius 40px
        font-size 14px

    .flex_box
      display flex
      align-items center

    .padd_l_r
      width 100%
      padding 0 16px

    .item_box
      font-size 14px
      background #FFF
      padding 16px 0
      margin-bottom 10px

      .customer_box
        justify-content space-between
        margin-top 16px
        color #A1A1A1

      .customer_address_box
        color #A1A1A1
        margin-top 8px

      .left_icon
        width 20px
        height 20px

      .item_title
        margin-left 8px
        color #333333

      .item_value
        flex 1
        display flex
        text-align right
        flex-direction row-reverse
        color #A1A1A1

        &.selected
          color #333

        span
          flex 1
          text-align right

        .show_img
          /*display none*/
          width 76px
          height 76px

        input
          width 1px
          height 1px
          opacity 0

      .arrow_right_img
        width 6px
        height 12px
        margin-left 12px

      > .product_list
        margin-top 16px
        border-top 1px solid #EEEEEE

        .border_b
          border-bottom 1px solid #EEEEEE

        .product_item
          height 66px
          display flex
          flex-direction column
          /*align-items center*/
          justify-content center

          > p
            &:nth-of-type(2)
              font-size 12px
              color #A1A1A1
              margin-top 6px

    .price
      padding-top 12px
      display flex
      justify-content flex-end

      > p
        font-size 12px
        color #A1A1A1

        > span
          font-size 16px
          color #FF6602
</style>

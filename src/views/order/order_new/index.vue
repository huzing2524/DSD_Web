<template lang="pug">
  .order_create(v-if="isLoad")
    .order_form_data
      .item_box(@click="toCustomerClick")
        .padd_l_r.flex_box
          img.left_icon(src="./user_icon.png")
          p.item_title 客户
          p.item_value(:class="{selected:customer.name}") {{customer.name || '选择客户'}}
          img.arrow_right_img(src="./order_arrow_right.png")
        .padd_l_r.flex_box.customer_box(v-if="customer.contacts")
          p {{customer.contacts}}
          p {{customer.phone}}
        .padd_l_r.customer_address_box(v-if="customer.region") {{customer.region}}{{customer.address}}
      .item_box.flex_box(@click="showDateTimePicker")
        .padd_l_r.flex_box
          img.left_icon(src="./date_icon.png")
          p.item_title 预计发货时间
          p.item_value {{getYMDHMDateString(orderSub.deliveryTime)}}
          img.arrow_right_img(src="./order_arrow_right.png")
      .item_box
        .padd_l_r.flex_box
          img.left_icon(src="./product_icon.png")
          p.item_title 出售产品
        .product_list
          .product_item.padd_l_r.border_b.border_t(v-for="(item, index) in orderSub.productBag.list",:key="index")
            p {{item.name}}
            p 数量：{{item.dealInfo.num}} 总价：{{item.dealInfo.money}}元
        .price.padd_l_r
          p 共{{orderSub.productBag.num}}件，合计：
            span {{orderSub.productBag.money}}元
      .item_box
        input(class="padd_l_r", type="text", placeholder="备注", v-model="orderSub.remark")
    .sub_box
      .info.price
        p 共{{orderSub.productBag.num}}件，合计：
          span {{orderSub.productBag.money}}元
      .sub_btn(@click="subOrder") 保存订单
</template>
<script>
  import {getYMDHMDateString} from '_common/util/'
  import {OrderNew} from '_api/order'
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
        if (!this.orderSub.productBag) {
          this.toProductSelect()
        } else {
          this.isLoad = true
        }
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
      toCustomerClick() {
        this.$router.push(`/order/order_new/select_customer?from=${this.$route.fullPath}`)
      },
      subOrder() {
        let isModify = this.$route.query.from ? true : false
        let arr = []
        for (let i = 0; i < this.orderSub.productBag.list.length; i++) {

          arr.push({
            id: this.orderSub.productBag.list[i].id,
            count: parseFloat(this.orderSub.productBag.list[i].dealInfo.num),
            unit_price: parseFloat(this.orderSub.productBag.list[i].dealInfo.price)
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
        }).catch(() => {
          this.$toast('系统错误，请稍后再试')
        })
      },
      leavePage() {
        this.isLoad = false
        this.updateOrderSub()
        this.$router.replace('/txl/order')
      }
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

    .order_form_data
      flex 1
      overflow-x hidden
      overflow-y scroll
      padding 10px 10px 64px
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
      border-radius 10px
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

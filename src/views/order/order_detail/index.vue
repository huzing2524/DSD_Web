<template lang="pug">
  .order_detail.full_box(v-if="isLoad")
    .order_detail_box
      .order_detail_box_item
        .title
          p.status {{orderDetail.stats[orderDetail.stats.length - 1].time | timePointFilter}}：{{Number(orderDetail.state) | orderListState}}
      .order_detail_box_item
        .title
          p
            span.icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_danhao")
            | 订单单号
          p {{$route.query.id}}
      .order_detail_box_item
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
            p {{orderDetail.client.name}}
          .u_name
            p {{orderDetail.client.contact}}
            p {{orderDetail.client.phone}}
          .address {{orderDetail.client.address}}
      .order_detail_box_item
        .title
          p
            span.icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_time")
            | 时间
        .content.date
          .item
            p 预计到货
            p {{orderDetail.plan_arrival_time | timePointFilter}}
          .item
            p 实际到货
            p {{orderDetail.actual_arrival_time | timePointFilter}}
      .order_detail_box_item
        .title
          p
            span.icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_product")
            | 产品
        .content.product
          div(v-for="(item, idx) in orderDetail.products" :key="idx")
            .info_price
              p {{item.name}}
              p ¥{{item.unit_price | formatFloatNum}}
            .info_num
              p x  {{item.count}}
        .product_price
          p 合计金额
          p ¥ {{price | formatFloatNum}}
      .order_detail_box_item.box(v-for="(item, idx) in orderDetail.stats" :key="idx")
        div(v-if="!(item.state==1&&orderDetail.order_type==2)")
          .title
            p
              span.icon
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconicon_remarks")
              | {{item.state | orderStateUser}}人
          .content.stats
            .user_info
              .avatar
                img(:src="item.image")
              .contacts
                p {{item.name}}
                p {{item.phone}}
              .icon(@click="phoneCall(item.phone)")
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconphone")
            .remark(v-if="item.remark") {{item.remark}}
          .deliver_time {{item.time | timeFilter}}


    .btn_box
      div(v-if="Number(orderDetail.state) === 1")
        p.black(@click="putOrderState(2)") 作废订单
        p.black(@click="putOrderState(4)") 暂停订单
        p.black(@click="putOrderState(0)") 修改订单
        p.blue(@click="putOrderState(1)") 通过审批
      div(v-else-if="Number(orderDetail.state) === 2")
        p.black(@click="putOrderState(3)") 终止订单
        p.black(@click="putOrderState(4)") 暂停订单
      div(v-else-if="Number(orderDetail.state) === 3 || Number(orderDetail.state) === 4")
        p.black(@click="putOrderState(3)") 终止订单
        p.black(@click="putOrderState(4)") 暂停订单
      div(v-else-if="Number(orderDetail.state) === 5")
      div(v-else-if="Number(orderDetail.state) === 6")
        p.black(@click="putOrderState(2)") 作废订单
        p.blue(@click="putOrderState(5)") 启动订单
</template>

<script>
  import {OrderSub} from '_api/order/'
  import {mapState, mapActions} from 'vuex'
  import {toPhoneCall} from '_common/util/'

  export default {
    components: {},
    data() {
      return {
        isLoad: false,
        orderDetail: {},
        price: 0,
        state: 6
      }
    },
    filters: {
      orderListState(val) {
        let state = ''
        switch (parseInt(val)) {
          case 1:
            state = '待审批'
            break
          case 2:
            state = '待发货'
            break
          case 3:
            state = '运输中'
            break
          case 4:
            state = '已发送'
            break
          case 5:
            state = '已取消'
            break
          case 6:
            state = '已暂停'
            break
          default:
            state = ''
        }
        return state
      },
      orderStateUser(val) {
        let state = ''
        switch (parseInt(val)) {
          case 1:
            state = '创建'
            break
          case 2:
            state = '审批'
            break
          case 3:
            state = '内部取消'
            break
          case 4:
            state = '暂停'
            break
          case 5:
            state = '外部取消'
            break
          case 6:
            state = '启动'
            break
          default:
            state = ''
        }
        return state
      }
    },
    computed: {
      ...mapState('order', {
        orderSub: state => state.orderSub
      })
    },
    mounted() {
      this.getOrderDetail()
    },
    methods: {
      ...mapActions('order', [
        'updateOrderSub'
      ]),
      getOrderDetail(){
        OrderSub({}, 'get', this.$route.query.id).then(res => {
          this.orderDetail = res.data
          this.orderDetail.products.forEach(item => {
            this.price += item.unit_price * item.count
          })
          this.isLoad = true
        })
      },
      putOrderState(idx) {
        if (idx > 0) {
          this.$router.push(`/order/order_detail/ramark?id=${this.$route.query.id}&idx=${idx}`)
        } else {
          this.updateOrderSub({
            isModify: true,
            id:this.$route.query.id,
            order_type:this.orderDetail.order_type,
            customer: {...this.orderDetail.client},
            products: [...this.orderDetail.products]
          })
          this.$router.push('/order/order_new/select_product')
        }
      },
      phoneCall(phone) {
        toPhoneCall(phone)
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .order_detail
    &_box
      fbox()
      padding 0 18px
      bg #FFF
      &_item
        padding 18px 0
        border-bottom 1px solid #EEEEEE
        &.box
          padding 0
          border none
          >div
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
              justify-content space-between
              margin-top 8px
              display flex
              justify-content space-between
              p
                &:nth-of-type(1)
                  fsc 14px #333
                &:nth-of-type(2)
                  fsc 14px #666
            .info_num
              display flex
              justify-content flex-end
              fsc 12px #999
              margin-top 8px
          &.stats
            .user_info
              display flex
              height 48px
              justify-content space-between
              align-items center
              .avatar
                wh 48px 48px
                margin-right 10px
                bg #DBE5EE
                border-radius 4px
                overflow hidden
                img
                  wh 100% 100%
              .contacts
                flex 1
                height 100%
                padding 5px 0
                display flex
                flex-direction column
                justify-content space-between
                p
                  &:nth-of-type(1)
                    fsc 14px #333333
                  &:nth-of-type(2)
                    fsc 14px #666666
              .icon
                wh 38px 38px
            .remark
              display flex
              flex-direction row
              background #DEF2FF
              line-height 20px
              border-radius 8px
              padding 12px 10px
              margin-top 12px
              fsc 12px #333333
              position relative
              &:before
                content ''
                wh 0px 0px
                border-left 6px solid transparent
                border-right 6px solid transparent
                border-bottom 12px solid #DEF2FF
                position absolute
                top -12px
                left 17px
        .deliver_time
          display flex
          flex-direction row
          justify-content flex-end
          fsc 12px #999999
          margin-top 12px
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
    .btn_box
      bgf()
      wh 100% 52px
      font-size 12px
      div
        padding 10px
        display flex
        align-items center
        justify-content flex-end
        p
          padding 6px 14px
          border-radius 16px
          margin-left 10px
          &.blue
            border 1px solid #4DA8EE
            color #4DA8EE
          &.orange
            border 1px solid #F4616C
            color #F4616C
          &.black
            border 1px solid #999999
            color #999999
</style>

<template lang="pug">
  .order_detail.full_box(v-if="isLoad")
    .order_detail_box
      .order_detail_box_item
        .title
          p.status {{orderDetail.state_time | timePointFilter}}：{{Number(orderDetail.state) | orderListState}}
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
        .content.product(v-for="(item, idx) in orderDetail.products" :key="idx")
          .name {{item.category_name}}:{{item.name}}
          .info
            p {{item.count}}{{item.unit}}
            p ￥{{item.unit_price | formatFloatNum}}
            p ￥{{(item.unit_price * item.count) | formatFloatNum}}
        .product_price
          p 合计金额
          p ¥ {{price | formatFloatNum}}
      .order_detail_box_item
        .title
          p
            span.icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_remarks")
            | 客户备注
        .content
          p {{orderDetail.remark}}
    .btn_box
      div(v-if="Number(orderDetail.state) === 1")
        p.orange(@click="putOrderState(2)") 取消订单
        p.blue(@click="putOrderState(1)") 通过审批
      div(v-else-if="Number(orderDetail.state) === 2")
        p.orange(@click="putOrderState(3)") 终止订单
        p.black(@click="putOrderState(4)") 暂停订单
      div(v-else-if="Number(orderDetail.state) === 3 || Number(orderDetail.state) === 4")
        p.orange(@click="putOrderState(3)") 终止订单
      div(v-else-if="Number(orderDetail.state) === 5")
      div(v-else-if="Number(orderDetail.state) === 6")
        p.blue(@click="putOrderState(5)") 启动
</template>

<script>
  import {OrderSub} from '_api/order/'
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
      }
    },
    computed: {},
    mounted() {
      this.getOrderDetail()
    },
    methods: {
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
        OrderSub({
          state: idx + ''// string 1: 通过审批， 2：取消订单, 3: 终止订单, 4: 暂停订单，5：启动订单
      }, 'put', this.$route.query.id).then(res => {
          if (res.data.res === 0) {
            this.$toast('操作成功')
            this.getOrderDetail()
          }
        }).catch(() => {
          this.$toast('系统错误')
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .order_detail
    &_box
      fbox()
      &_item
        padding 18px
        margin-bottom 10px
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
          bg #E9F5FF
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
                border 1px solid #999
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
            .name
              fsc 14px #464646
            .info
              fsc 14px #7A7A7A
              display flex
              justify-content space-between
              padding-left 25px
              margin-top 8px
              p
                position relative
                &:after
                  content ''
                  bg #7A7A7A
                  wh 4px 4px
                  border-radius 4px
                  position absolute
                  right -28px
                  top 40%
                &:nth-last-of-type(1):after
                  content ''
                  display none
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
      wh 100% 62px
      font-size 14px
      div
        padding 15px
        display flex
        align-items center
        justify-content flex-end
        p
          padding 8px 17px
          border-radius 16px
          margin-left 15px
          &.blue
            border 1px solid #4DA8EE
            color #4DA8EE
          &.orange
            border 1px solid #F4616C
            color #F4616C
          &.black
            border 1px solid #545454
            color #545454
</style>

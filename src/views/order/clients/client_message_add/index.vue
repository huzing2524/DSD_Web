<!--创建客户-添加对应物料-最后展示详情用-->
<template lang="pug">
  .main(v-if="isLoad").full_box
    .company_name
      .qrcode
        .left
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_ke")
        .right
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="")
      p {{orderClientsMessage.name || "佚名"}}

    .company_address
      span(style="width: 60px;") 地址
      p(style="line-height: 20px;text-align: right;") {{getAddress(orderClientsMessage.region, orderClientsMessage.address)}}
    .company_boss_message
      .link_item
        span 联系人
        span {{getContact(orderClientsMessage.contact, orderClientsMessage.position)}}
      .link_item
        span 联系电话
        span {{orderClientsMessage.phone || '无'}}
      .link_item
        span 所属行业
        span {{orderClientsMessage.industry || ''}}
    .company_products(v-show="Object.getOwnPropertyNames(orderClientsMessage.products).length != 0")
      .title 客户购买的产品
      .product_list(v-for="(item,index) in orderClientsMessage.products" :key="index")
        span {{item.name || ''}}
        span {{(item.unit_price || '') | formatFloatNum }}元/{{item.unit || ''}}
    .add_operator
      button(@click="goNext()") 下一步
</template>

<script>
  import {mapActions} from "vuex";
  import { OrderClientsDetail } from '_api/order'

  export default {
    data() {
      return {
        id: '',
        type: '',
        queryType: '',
        isLoad: false,
        orderClientsMessage: {}
      }
    },
    mounted() {
      this.id = this.$route.query.id
      this.type = this.$route.query.type
      this.queryType = this.$route.query.queryType || '1'
      this.initData()
    },
    methods: {
      ...mapActions('order', [
        'updateOrderClientMessage'
      ]),
      initData() {
        this.myId = this.$route.query.id || ''
        OrderClientsDetail({type: this.queryType}, 'get', this.myId).then(res => {
          this.isLoad = true
          console.log(res.data)
          this.orderClientsMessage = res.data
          console.log(this.orderClientsMessage)
          this.updateOrderClientMessage({
            ...this.orderClientsMessage
          })
        })
      },
      goNext() {
        this.updateOrderClientMessage({
          ...this.mData
        })
        // this.$router.push(`/order/clients/client_message_base/?id=${this.id}&type=${this.type}`)
        // 因为搜到的都是已经加入的了，所以直接进入产品列表选产品，不需要编辑基本信息了。
        this.$router.push(`/order/clients/client_products/?id=${this.id}&type=${this.type}`)
      },
      getAddress(region, address) {
        if(!region && !address) {
          return '无'
        } else {
          return (region || '')+ (address || '')
        }
      },
      getContact(contact, position) {
        if(!contact) {
          return "无"
        } else {
          if(!position) {
            return contact
          } else {
            return contact + "(" + position + ")"
          }
        }
      },
    },
  }
</script>

<style lang="stylus" scoped>
  column()
    display flex
    flex-direction column
  row()
    display flex
    flex-direction row
    justify-content space-between

  .main
    bg(#E6EAED)
    column()
    .company_name
      bgf()
      column()
      padding 0 15px 0 15px
      margin 10px 0px
      .qrcode
        display flex
        flex-direction row
        justify-content space-between
        padding 12px 0 8px
        .left
          .icon
            wh(20px,20px)
        .right
          .icon
            wh(18px, 18px)
      p
        fsc 16px #333333
        display flex
        justify-content center
        margin-bottom 40px
        font-weight 600
    .company_address
      bgf()
      row()
      margin-bottom 10px
      padding 15px
      span
        display flex
        width 50px
        fsc 14px #545454
        margin-right 20px
        line-height 18px
      p
        display flex
        text-align right
        fsc 14px #999999
        line-height 18px
    .company_boss_message
      column()
      background #fff
      padding 15px 15px 0
      margin-bottom 10px
      justify-content space-between
      .link_item
        row()
        margin-bottom 15px
        span
          fsc 14px #545454
          font-family PingFangSC-Medium
          font-weight 500
          &:nth-of-type(2)
            fsc 14px #999999
            font-family PingFangSC-Medium
            font-weight 500
    .company_products
      column()
      margin-bottom 21px
      bgf()
      .title
        fsc 14px #545454
        padding 15px
      .product_list
        row()
        padding  0 15px 15px 15px
        span
          fsc 14px #999999
        span
          fsc 14px #999999
    .add_operator
      bgf()
      position fixed
      bottom 0
      left 0
      right 0
      bgf()
      margin-top 40px
      padding 12px
      display flex
      align-items center
      justify-content flex-end
      button
        wh(120px,32px)
        line-height 32px
        display flex
        justify-content center
        fsc 14px white
        border 0
        outline none
        border-radius 16px
        background #1E9AFF


</style>



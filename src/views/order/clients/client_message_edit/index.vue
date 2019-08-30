<!--创建客户-添加对应物料-最后展示详情用-->
<template lang="pug">
  .main.full_box(v-doc-title="title")
    .body
      .ten_padding
      .company_name
        .qrcode
          .left
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_ke")
        p {{orderClientsMessage.name || '佚名'}}
      .ten_padding
      .company_item
        span 所属行业
        p {{orderClientsMessage.industry || ''}}
      .one_padding
      .company_item
        span(style="width: 60px;") 地址
        p(style="line-height: 20px;text-align: right;") {{(getAddress(orderClientsMessage.region, orderClientsMessage.address))}}
      .company_item
        span 送达天数
        p {{orderClientsMessage.deliver_days}}天
      .one_padding
      .company_item
        span 联系人
        p {{getContact(orderClientsMessage.contact, orderClientsMessage.position)}}
      .company_item
        span 联系电话
        p {{orderClientsMessage.phone || '无'}}
      .ten_padding
      .company_products(v-if="orderClientsMessage != undefined && undefined != orderClientsMessage.products && orderClientsMessage.products.length > 0")
        .title 客户购买的产品
        .one_padding
        .product_list(v-for="(item,index) in orderClientsMessage.products" :key="index")
          span {{item.name || ''}}
          .item
            span {{(item.unit_price || '') | formatFloatNum }}元/{{item.unit || ''}}
          .item
            span 最小起订量：{{(item.lowest_count || 0)}}{{item.unit || ''}} | 最小包装量：{{item.lowest_package || 0}}{{item.unit || ''}}
          .divider_line
    .add_operator
      p(@click="modifyClient") {{getButtonName()}}
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
        title: '',
        isLoad: false,
        orderClientsMessage: {}
      }
    },
    mounted() {
      this.id = this.$route.query.id
      this.type = this.$route.query.type
      this.queryType = this.$route.query.queryType || '1'
      if(this.type === 'edit') {
        this.initData()
      }
    },
    methods: {
      ...mapActions('order', [
        'updateOrderClientMessage'
      ]),
      initData() {
        this.myId = this.$route.query.id || ''
        OrderClientsDetail({type: this.queryType}, 'get', this.myId).then(res => {
          this.isLoad = true
          this.orderClientsMessage = res.data
          this.updateOrderClientMessage({
            ...this.orderClientsMessage
          })
        })
      },
      modifyClient() {
        this.$router.push(`/order/clients/client_message_base/?id=${this.id}&type=${this.type}`)
      },
      getButtonName() {
        switch (this.type) {
          case "edit":
            this.title = "编辑客户"
            return '编辑'
          case "create":
            this.title = "创建客户"
            return '创建'
          case "add":
            this.title = "添加客户"
            return '添加'
        }
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
            return contact + " (" + position + ")"
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
    bgf()
    .body
      fbox()
      flex-direction column
      .one_padding
        background #EEEEEE
        width 100%
        height 1px
      .ten_padding
        background #EEEEEE
        width 100%
        height 10px
      .company_name
        bgf()
        column()
        margin 0 10px
        .qrcode
          display flex
          flex-direction row
          justify-content space-between
          padding 12px 0 8px
          .left
            .icon
              wh(20px,20px)
        p
          fsc 16px #333333
          display flex
          justify-content center
          margin-bottom 40px
          font-weight 600
          line-height 22px
      .company_item
        bgf()
        row()
        padding 12px 0
        margin 0 10px
        span
          display flex
          fsc 14px #333333
          margin-right 20px
          line-height 18px
          font-weight bold
        p
          display flex
          justify-content flex-end
          fsc 14px #666666
          line-height 18px
      .company_products
        column()
        margin-bottom 21px
        bgf()
        .title
          fsc 14px #333333
          padding 12px 0
          font-weight bold
          margin 0 10px
        .one_padding
          background #EEEEEE
          width 100%
          height 1px
        .product_list
          column()
          margin-top 12px
          span
            height:20px;
            font-size:14px;
            font-weight:400;
            line-height:20px;
            padding-bottom 12px
            margin 0 10px
            color #333333
          .item
            span
              height:17px;
              font-size:12px;
              font-weight:400;
              color:rgba(102,102,102,1);
              line-height:17px;
          .divider_line
            background #EEEEEE
            width 100%
            height 1px
            margin-top 12px
    .divider_line
      background #CCCCCC
      width 100%
      height 1px
    .add_operator
      bgf()
      wh 100% 52px
      font-size 14px
      padding 15px
      display flex
      align-items center
      justify-content flex-end
      border-top 1px solid #CCCCCC
      p
        display flex
        wh 80px 28px
        align-items center
        justify-content center
        border-radius 16px
        margin-left 15px
        background #1E9AFF
        color #fff
</style>



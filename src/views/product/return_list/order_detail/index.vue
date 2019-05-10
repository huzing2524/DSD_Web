<template lang="pug">
  .main
    .product-content
      .product-title-content
        .product-icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconicon_renwu1')
        span(class="product-title") 退料单号
        span(class="product-subtitle") {{orderData.id}}

    .product-content
      .product-title-content
        .product-icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconicon_lianjie_')
        span(class="product-title") 关联订单
        span(class="product-subtitle") {{orderData.order_id}}
    
    .product-content
      .product-title-content
        .product-icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconicon_renwu1')
        span(class="product-title") 状态
        span(class="product-subtitle") {{orderState}}

    .product-content
      .product-title-content
        .product-icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconicon_remarks')
        span(class="product-title") 退料原因
      .product-item-content
        span(class="item-title") {{orderData.remark}}
      
    .product-content
      .product-title-content
        .product-icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconicon_renwu1')
        span(class="product-title") 创建人
      .product-item-content
        span(class="item-title") {{orderData.creator_name}}
        .row-content
          span(class="item-title") {{orderData.creator_phone}}
          span(class="item-subtitle") {{getYMDDateDecimalString(orderData.time)}}

    .product-content(v-show="orderData.receiver_name")
      .product-title-content
        .product-icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconicon_renwu1')
        span(class="product-title") 交接人
      .product-item-content
        span(class="item-title") {{orderData.receiver_name}}
        .row-content
          span(class="item-title") {{orderData.receiver_phone}}
          span(class="item-subtitle") {{getYMDDateDecimalString(orderData.time)}}

    .product-content
      .product-title-content
        .product-icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconicon_cailiao')
        span(class="product-title") 退料清单
      .product-item-content(v-for="(item,index) in orderData.material" :key="index")
        .row-content(:style="{marginTop:'0px'}")
          span(class="item-title") {{item.name}}
          span(class="item-subtitle") {{`${item.count}`}}
        
    .add-content(v-if="queryState!=2" v-show="queryState!=1")
      .add-process(@click="orderConfirm")
        .confirm-icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconicon_erweima_1')
        span 确认退料
    .add-content(v-else v-show="queryState!=1")
      .add-process(@click="orderConfirm")
        span 确认退料

    QrcodeMask(v-show="showQrcode"
              title="让仓库管理员扫描此二维码确认退料"
              @closeClick="qrcodeClick")
      template(v-slot:qrcode)
        qrcode(:value="qrcodeValue" :options="{ width: 250}")
</template>

<script>
import QrcodeMask from '_components/product/qr_code_mask'
import { ReturnDetail, ReturnQrcodeConfirm } from '_api/product'
import { getYMDDateDecimalString } from '_common/util'
export default {
  components: {
    QrcodeMask
  },
  data() {
    return {
      qrcodeValue:'helloworld',
      showQrcode: false,
      orderData: {}
    }
  },
  computed: {
    queryId() {
      return this.$route.query.id
    },
    queryState() {  // 0：未退料 1:已退料 2： 扫描二维码进入
      return this.$route.query.state
    },
    queryShare() {
      return this.$route.query.share
    },
    orderState(){
      const stateArr = ['未退料', '已退料']
      return stateArr[this.orderData.state] || ''
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    getYMDDateDecimalString,
    async initData() {
      try {
        const {data} = await ReturnDetail(this.queryId)
        if (data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.orderData = data || {}
        }
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
    async orderConfirm() {
      // 二维码字符串
      if(this.queryState!=2) {
        this.orderData.content['state'] = '2'
        this.qrcodeValue = JSON.stringify(this.orderData.content)
        this.showQrcode = true
      } else {
        // 扫描二维码进来
        try {
          const body = {share: this.queryShare}
          const { data } = await ReturnQrcodeConfirm(body,this.queryId)
          if(data.errmsg) {
            this.$toast(data.errmsg)
          } else {
            // 跳转
            this.$router.push(`/product/return_list/return_success?id=${this.queryId}`)
          }
        } catch (error) {
          this.$toast('获取数据失败')
        }
      }
    },
    qrcodeClick() {
      this.showQrcode = false
    }
  },
}
</script>

<style lang="stylus" scoped>
  .main
    width 100%
    // height 100%
    padding-bottom 72px
    background-color #E6EAED
    overflow-y scroll
    .product-content
      background-color #ffffff
      padding 15px
      margin-top 10px
      .product-title-content
        display flex
        flex-direction row
        align-items center
        width 100%
        position relative
        .product-icon
          width 20px
          height 18px
          display flex
          align-items center
          justify-content center
        .product-title
          title()
          margin-left 5px
        .product-subtitle
          subtitle()
          position absolute
          right 10px
          width 70%
          text-align right
          single-text()
      .product-item-content
        margin-top 15px
        background-color #E9F5FF
        padding 15px
        display flex
        flex-direction column
        border-radius 6px
        .row-content
          display flex
          flex-direction row
          justify-content space-between
          align-items center
          margin-top 15px
        .item-title
          title()
          margin-top 5px
        .item-subtitle
          subtitle()
          margin-top 5px
        .item-minititle
          minititle()
          margin-top 5px
    .add-content
      height 62px
      width 100%
      background-color #ffffff
      position fixed
      bottom 0px
      border-top 1px solid #EFEFEF
      .add-process
        position absolute
        right 15px
        top 15px
        display flex
        justify-content center
        align-items center
        background-color #1E9AFF
        border-radius 16px
        height 32px
        width 100px
        span 
          color #ffffff
          font-size 14px
    .add-content
      height 62px
      width 100%
      background-color #ffffff
      position fixed
      bottom 0px
      border-top 1px solid #EFEFEF
      .add-process
        position absolute
        right 15px
        top 15px
        display flex
        justify-content center
        align-items center
        background-color #1E9AFF
        border-radius 16px
        height 32px
        width 120px
        .confirm-icon
          width 16px
          height 16px
          display flex
          align-items center
          justify-content center
          color #ffffff
        span 
          color #ffffff
          margin-top 2px
          font-size 14px
          margin-left 5px
    
</style>



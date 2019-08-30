<template lang="pug">
  .invoice_detail(v-if="isLoad" :class="state==='waited' || state==='deliver' ? '' : 'active'")
    .order_number
      .number_left
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_danhao")
        span 订单发货单号
      .number_right {{listItem.id}}
    .state
      .item
        .left
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_zhaungtai")
          span 发货状态
        .right {{listItem.time.state | stateDeliver}}
    .time
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_time")
        span 时间
      .content
        .item
          span 预计发货时间
          p {{listItem.plan_deliver_time | timePointFilter}}
        .item
          span 实际发货时间
          p(v-if="listItem.deliver_time") {{listItem.deliver_time | timePointFilter}}
          p(v-else) —
    .customer
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_clien")
        span 客户
      .info
        .name
          .icon(v-if="listItem.clients.style==='1'")
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_own")
          .icon(v-else)
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_supplier")
          span {{listItem.clients.company_name}}
        .boss
          span {{listItem.clients.client_name}}
          span {{listItem.clients.phone}}
        .address {{listItem.clients.address}}
    .product
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_product")
        span 出售产品
      .product_content
        .item(v-for="(item,index) in listItem.products.products_list" :key="index")
          .item_name
            span {{item.category}}：{{item.name}}
            p ￥{{item.price | formatFloatNum}}
          .item_num ×{{item.count}}
      .total(:class="state!=='waited' ? 'border' : ''")
        span 合计金额
        .num ￥
          p {{listItem.products.total_money | formatFloatNum}}
    .deliver(v-show="state!=='waited'" :class="state==='waited' || state==='deliver' ? '' : 'bottom'")
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_shenpi")
        span 发货人
      .info
        .name
          .left
            img(:src="listItem.deliver_image")
            .phone
              span {{listItem.deliver_person}}
              p {{listItem.deliver_phone}}
          .icon(@click="phoneCall(listItem.deliver_phone)")
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconphone")
        .remark(v-if="listItem.products.remark") {{listItem.products.remark}}
      .deliver_time {{listItem.deliver_time | timeYMDHMFilter}}
    .options(v-show="state==='waited' || state==='deliver'")
      button(v-show="state==='deliver'" @click="printClick") 蓝牙打印
      button(v-show="state==='waited'" @click="sendClick") 发货
      button(v-show="state==='deliver'" @click="showQrcode")
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_erweimabule_")
        span 发货码
    .qrCode(v-if="flag")
      .img_box
        qrcode(:value="qrCode" :options="{ width: 250 }")
        p 扫一扫上面的二维码图案，将物料入库
      .tips 将此二维码和产品一起发送给客户
      <!--.save 保存图片-->
      .icon(@click="closeQrcode")
        svg.ali_icon(aria-hidden="true")
          use(xlink:href="#iconguanbi")
</template>

<script>
  import { StoreInvoiceDetail } from '_api/store/'
  export default {
    data() {
      return {
        value:'http://www.baidu.com',
        isLoad: false,
        flag:false,
        id: '',
        state: '',
        qrCode: '',
        listItem:{},
      }
    },
    filters: {
      stateDeliver(val) {
        let content = '';
        switch (parseInt(val)) {
          case 0:
            return '未发货';
          case 1:
            return '已发货';
          case 2:
            return '已送达';
          default:
            return content;
        }
      },
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData(){
        this.id = this.$route.query.id || ''
        this.state = this.$route.query.state || ''
        StoreInvoiceDetail({id:this.id},'get').then((res) => {
          this.listItem = res.data
          this.qrCode = JSON.stringify(res.data.qr_code)
          this.isLoad = true
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      printClick(){
        this.listItem.qr_code = {...this.listItem.qr_code,state: '3'}
        let u = navigator.userAgent
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        if (isAndroid) {
          window.android.blueToothPrinter(JSON.stringify(this.listItem).replace('"{', '{').replace('}"', '}'), 0)
        }else if(isIOS && window.webkit){
          window.webkit.messageHandlers.bluetoothPrinter.postMessage({
            data: this.listItem,
            type: 0,
          })
        }
      },
      sendClick(){
        this.$router.push(`/store/invoice_order/remark?id=${this.id}`)
      },
      phoneCall(phone) {
        let u = navigator.userAgent
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        if (isAndroid) {
          window.android.phoneCall(phone)
        }else if(isIOS){
          window.webkit && window.webkit.messageHandlers.phoneCall.postMessage(phone)
        }else{
          window.location.href = `tel://${phone}`
        }
      },
      showQrcode(){
        this.flag = true
      },
      closeQrcode(){
        this.flag = false
      },
    }
  }
</script>

<style scoped lang="stylus">
  .invoice_detail
    background #E6EAED
    padding-bottom 52px
    &.active
      padding-bottom 0
    .order_number
      display flex
      flex-direction row
      justify-content space-between
      align-items center
      background #fff
      padding 12px 10px
      .number_left
        display flex
        flex-direction row
        align-items center
        .icon
          display flex
          wh 16px 16px
          margin-right 4px
        span
          display flex
          fsc 16px #333333
          font-weight 600
      .number_right
        flex 1
        font-size 14px
        color #666666
        text-align right
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        margin-left 20px
    .state
      display flex
      flex-direction row
      padding 0 10px
      bgf()
      .item
        width 100%
        display flex
        flex-direction row
        justify-content space-between
        align-items center
        padding 12px 0
        border-top 1px solid #EEEEEE
        border-bottom 1px solid #EEEEEE
        .left
          display flex
          flex-direction row
          align-items center
          .icon
            display flex
            wh 16px 16px
            margin-right 4px
          span
            display flex
            fsc 16px #333333
            font-weight 600
        .right
          fsc 14px #666666
    .time
      display flex
      flex-direction column
      margin-bottom 10px
      background #fff
      padding 12px 10px
      .title
        display flex
        flex-direction row
        align-items center
        .icon
          display flex
          width 18px
          height 18px
          margin-right 4px
        span
          fsc 16px #333333
          font-weight 600
      .content
        background #F5FBFF
        border-radius 6px
        padding 12px 10px
        margin-top 10px
        .item
          display flex
          flex-direction row
          justify-content space-between
          &:nth-of-type(1)
            margin-bottom 15px
          span
            fsc 14px #333333
          p
            fsc 14px #666666
    .customer
      display flex
      flex-direction column
      background #fff
      padding 12px 10px
      .title
        display flex
        flex-direction row
        align-items center
        .icon
          display flex
          width 16px
          height 16px
          margin-right 4px
        span
          display flex
          fsc 16px #333333
          font-weight 600
      .info
        display flex
        flex-direction column
        background #F5FBFF
        border-radius 6px
        padding 12px 20px 12px 10px
        margin-top 10px
        .name
          display flex
          flex-direction row
          margin-bottom 12px
          align-items center
          .icon
            display flex
            wh 18px 18px
            margin-right 10px
          span
            display flex
            font-size 14px
            color #333333
        .boss
          display flex
          flex-direction row
          margin-bottom 12px
          span
            height 28px
            line-height 28px
            padding 0 14px
            border-radius 14px
            font-size 12px
            background #DEF2FF
            color #666666
            margin-right 10px
        .address
          display flex
          font-size 13px
          line-height 20px
          color #666666
    .product
      background #fff
      padding 0 10px
      margin-bottom 10px
      .title
        display flex
        flex-direction row
        align-items center
        margin-bottom 10px
        padding-top 12px
        border-top 1px solid #EEEEEE
        .icon
          display flex
          width 16px
          height 16px
          margin-right 4px
        span
          fsc 16px #333333
          font-weight 600
      .product_content
        display flex
        flex-direction column
        background #F5FBFF
        border-radius 6px
        padding 12px 10px
        .item
          display flex
          flex-direction column
          margin-bottom 12px
          &:last-child
            margin-bottom 0
          .item_name
            display flex
            flex-direction row
            justify-content space-between
            span
              fsc 14px #333333
            p
              fsc 14px #666666
          .item_num
            display flex
            justify-content flex-end
            fsc 12px #999999
            margin-top 6px
      .total
        display flex
        flex-direction row
        justify-content space-between
        padding 12px 0
        /*border-bottom 1px solid #E4E4E4
        &.border
          border-bottom 0*/
        span
          font-size 14px
          color #464646
        .num
          display flex
          flex-direction row
          align-items center
          font-size 14px
          color #FF9235
          margin-right 15px
          p
            font-size 18px
            font-weight 600
    .deliver
      display flex
      flex-direction column
      background #fff
      padding 12px 10px
      margin-bottom 20px
      &.bottom
        margin-bottom 20px
      .title
        display flex
        flex-direction row
        align-items center
        .icon
          display flex
          width 16px
          height 16px
          margin-right 4px
        span
          fsc 16px #333333
          font-weight 600
      .info
        display flex
        flex-direction column
        background #F5FBFF
        border-radius 6px
        padding 12px 10px
        margin-top 10px
        .name
          display flex
          flex-direction row
          justify-content space-between
          align-items center
          .left
            display flex
            flex-direction row
            align-items center
            img
              wh 48px 48px
              margin-right 10px
            .phone
              display flex
              flex-direction column
              span
                fsc 14px #333333
                margin-bottom 6px
              p
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
    .options
      width 100%
      position fixed
      bottom 0
      height 52px
      line-height 52px
      display flex
      flex-direction row
      background #fff
      justify-content flex-end
      align-items center
      border-top 1px solid #CCCCCC
      button
        wh(92px,32px)
        border-radius 16px
        margin-right 15px
        border 1px solid #1E9AFF
        color #4DA8EE
        &:nth-of-type(1)
          color #999999
          border-color #999999
        &:nth-of-type(3)
          display flex
          flex-direction row
          wh(110px,32px)
          color #1E9AFF
          justify-content center
          align-items center
          .icon
            wh 16px 16px
            margin-right 8px
          span
            fsc 14px #1E9AFF
    .qrCode
      width 100%
      height 100%
      position fixed
      left 0
      top 0
      background rgba(0,0,0,0.65)
      z-index 10
      display flex
      flex-direction column
      justify-content center
      align-items center
      .img_box
        display flex
        flex-direction column
        padding 20px 20px 12px
        margin-top 30px
        bgf()
        border-radius 4px
        p
          fsc 14px #999999
      .tips
        fsc 15px #FFFFFF
        margin-top 20px
      .save
        display flex
        align-items center
        justify-content center
        fsc 15px #FFFFFF
        wh 130px 40px
        border 1px solid #fff
        border-radius 20px
        margin-top 40px
      .icon
        wh 28px 28px
        margin-top 80px
</style>
<style lang="stylus">
  .cube-dialog-content
    margin 30px 0 28px 0
    .cube-dialog-content-def
      padding 0 20px
      p
        margin initial
        font-size 16px
        color #545454
  .cube-dialog-btns
    &:after
      border-right 0
    a:before
      border-top 0
    a:last-child
      color #0099FF
</style>

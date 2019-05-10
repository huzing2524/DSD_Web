<template lang="pug">
  .invoice_detail(v-if="isLoad" :class="state==='waited' || state==='deliver' ? '' : 'active'")
    .order_number
      .number_left
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_danhao")
        span 订单发货单号
      .number_right {{listItem.id}}
    .customer
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_clien")
        span 客户
      .info
        .name
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_supplier")
          span {{listItem.clients.company_name}}
        .boss
          span {{listItem.clients.client_name}}
          span {{listItem.clients.phone}}
        .address {{listItem.clients.address}}
    .time(v-show="state==='waited'")
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_time")
        span 时间
      .content
        .item
          span 预计到货
          p {{listItem.time.predict_time | timePointFilter}}
        .item
          span 实际到货
          p {{listItem.time.state | stateDeliver}}
    .product
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_product")
        span 产品
      .item(v-for="(item,index) in listItem.products.products_list" :key="index")
        .item_name {{item.category}}：{{item.name}}
        .item_info
          span {{item.count}}{{item.unit}}
          span ￥{{item.price | formatFloatNum}}
          span ￥{{item.money | formatFloatNum}}
      .total(:class="state!=='waited' ? 'border' : ''")
        span 合计金额
        .num ￥
          p {{listItem.products.total_money | formatFloatNum}}
      .gathering(v-show="state==='waited'")
        span 已收款
        .num ￥
          p {{listItem.products.receipt | formatFloatNum}}
    .remark(v-show="state==='waited'")
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_remarks")
        span 客户备注
      .content {{listItem.products.remark}}
    .deliver(v-show="state!=='waited'" :class="state==='waited' || state==='deliver' ? '' : 'bottom'")
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_shenpi")
        span 发货人
      .info
        .name {{listItem.deliver_person}}
        .phone
          span {{listItem.deliver_phone}}
          p {{listItem.deliver_time | timeYMDHMFilter}}
    .options(v-show="state==='waited' || state==='deliver'")
      button(v-show="state==='waited'" @click="sendClick") 发货
      button(v-show="state==='deliver'" @click="showQrcode")
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_erweima_1")
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
      sendClick(){
        this.$createDialog({
          type: 'confirm',
          title: '',
          content: '确定将该发货单设为已发货吗？',
          confirmBtn: {
            text: '发货',
            active: true,
            disabled: false,
            href: 'javascript:;',
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            StoreInvoiceDetail({id:this.id},'post').then((res) => {
              if (parseInt(res.data.res) === 0) {
                this.$toast(`发货成功`)
                this.$router.go(-1)
              } else {
                this.$toast(res.data.errmsg)
              }
            }).catch(() => {
              this.$toast('发货失败')
            })
          },
          onCancel: () => {

          }
        }).show()
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
    padding-bottom 62px
    &.active
      padding-bottom 0
    .order_number
      display flex
      flex-direction row
      justify-content space-between
      align-items center
      background #fff
      padding 15px
      margin-bottom 10px
      .number_left
        display flex
        flex-direction row
        align-items center
        .icon
          width 18px
          height 20px
          margin-right 7px
        span
          font-size 15px
          color #545454
      .number_right
        flex 1
        font-size 14px
        color #999999
        text-align right
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        margin-left 20px
    .customer
      display flex
      flex-direction column
      background #fff
      padding 15px
      margin-bottom 10px
      .title
        display flex
        flex-direction row
        align-items center
        .icon
          display flex
          width 16px
          height 18px
          margin-right 8px
        span
          display flex
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
            display flex
            font-size 14px
            color #545454
        .boss
          display flex
          flex-direction row
          margin-bottom 15px
          span
            height 22px
            line-height 22px
            padding 0 12px
            border 1px solid #999999
            border-radius 11px
            font-size 12px
            color #999999
            margin-right 10px
        .address
          display flex
          font-size 14px
          line-height 20px
          color #545454
    .time
      display flex
      flex-direction column
      margin-bottom 10px
      background #fff
      padding 15px
      .title
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
      .content
        background #E9F5FF
        border-radius 6px
        padding 15px
        margin-top 15px
        .item
          display flex
          flex-direction row
          justify-content space-between
          &:nth-of-type(1)
            margin-bottom 15px
          span
            font-size 14px
            color #999999
          p
            font-size 14px
            color #545454
    .product
      background #fff
      padding 15px 0 0 15px
      margin-bottom 10px
      .title
        display flex
        flex-direction row
        align-items center
        margin-bottom 15px
        .icon
          display flex
          width 18px
          height 18px
          margin-right 8px
        span
          font-size 15px
          color #545454
      .item
        display flex
        flex-direction column
        background #E9F5FF
        border-radius 6px
        padding 15px 0
        margin-right 15px
        margin-bottom 10px
        .item_name
          font-size 14px
          color #464646
          margin-left 15px
        .item_info
          display flex
          flex-direction row
          margin-top 12px
          span
            flex 1
            font-size 14px
            color #7A7A7A
            text-align center
            position relative
            &:nth-of-type(2)::before
              content: ''
              position absolute
              left 0
              top 50%
              margin-top -2px
              width 4px
              height 4px
              background #BEBEBE
              border-radius 2px
            &:nth-of-type(2)::after
              content: ''
              position absolute
              right 0
              top 50%
              margin-top -2px
              width 4px
              height 4px
              background #BEBEBE
              border-radius 2px
      .total
        display flex
        flex-direction row
        justify-content space-between
        padding 6px 0 16px
        border-bottom 1px solid #E4E4E4
        &.border
          border-bottom 0
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
            font-weight 500
      .gathering
        display flex
        flex-direction row
        justify-content space-between
        padding 16px 0
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
            font-weight 500
    .remark
      display flex
      flex-direction column
      background #fff
      padding 15px
      margin-bottom 40px
      .title
        display flex
        flex-direction row
        align-items center
        margin-bottom 15px
        .icon
          display flex
          wh(18px,18px)
          margin-right 8px
        span
          font-size 15px
          color #545454
      .content
        display flex
        flex-direction row
        padding 15px
        background #E9F5FF
        font-size 14px
        line-height 20px
        color #545454
    .deliver
      display flex
      flex-direction column
      background #fff
      padding 15px
      margin-bottom 40px
      &.bottom
        margin-bottom 20px
      .title
        display flex
        flex-direction row
        align-items center
        .icon
          display flex
          width 16px
          height 18px
          margin-right 8px
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
          fsc(14px,#545454)
          margin-bottom 10px
        .phone
          display flex
          flex-direction row
          justify-content space-between
          span
            fsc(14px,#545454)
          p
            fsc(13px,#999999)
    .options
      width 100%
      position fixed
      bottom 0
      height 62px
      line-height 62px
      display flex
      flex-direction row
      background #fff
      justify-content flex-end
      align-items center
      button
        wh(92px,32px)
        border-radius 16px
        margin-right 15px
        border 1px solid #4DA8EE
        color #4DA8EE
        &:nth-of-type(2)
          display flex
          flex-direction row
          wh(110px,32px)
          color #fff
          background #1E9AFF
          justify-content center
          align-items center
          .icon
            wh 16px 16px
            margin-right 8px
          span
            fsc 14px #fff
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

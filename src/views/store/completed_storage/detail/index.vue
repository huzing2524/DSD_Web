<template lang="pug">
  .completed_detail.full_box(v-if="isLoad" :class="state==='done' ? 'active' : ''")
    .completed_number
      .number_left
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_danhao")
        span 完工入库单号
      .number_right {{listItem.id}}
    .state
      .item
        .left
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_zhaungtai")
          span 完工入库状态
        .right {{listItem.state | stateCompleted}}
    .time
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_time")
        span 完工入库时间
      .right(v-if="listItem.completed_storage.income_time") {{listItem.completed_storage.income_time | timeYMDHMFilter}}
      .right(v-else) —
    .picking_info
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_product")
        span 完工入库产品
      .content
        span {{listItem.product.name}}
        p 计划生产：{{listItem.product.plan_count.toFixed(2)}}{{listItem.product.unit}}
        p 实际生产：{{listItem.product.complete_count.toFixed(2)}}{{listItem.product.unit}}
        p 生产单号：{{listItem.product.product_id}}
    .pickinger(v-if="listItem.completed_storage.send_person")
      .item
        .title
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_shenpi")
          span 交接人
        .info
          .name
            .left
              img(:src="listItem.completed_storage.send_image")
              .phone
                span {{listItem.completed_storage.send_person}}
                p {{listItem.completed_storage.send_phone}}
            .icon(@click="phoneCall(listItem.completed_storage.send_phone)")
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconphone")
      .item
        .title
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_shenpi")
          span 接收人
        .info
          .name
            .left
              img(:src="listItem.completed_storage.receive_image")
              .phone
                span {{listItem.completed_storage.receive_person}}
                p {{listItem.completed_storage.receive_phone}}
            .icon(@click="phoneCall(listItem.completed_storage.receive_phone)")
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconphone")
    .completed_option(v-show="state!=='done'")
      span(v-show="state==='not_yet'") 产品入库后，将状态设为：已入库
      span(v-show="state==='3'")
      button(v-show="state==='not_yet'" @click="showQrcode") 已入库
      button(v-show="state==='3'" @click="confirmClick") 确认入库
    .qrCode(v-if="flag")
      .img_box
        qrcode(:value="qrCode" :options="{ width: 250 }")
      .tips 让交接人扫描此二维码确认入库
      .icon(@click="closeQrcode")
        svg.ali_icon(aria-hidden="true")
          use(xlink:href="#iconguanbi")
</template>

<script>
  import { StoreCompletedDetail } from '_api/store/'
  export default {
  data( ){
      return {
        isLoad: false,
        flag:false,
        id: '',
        state: '',
        qrCode:'',
        listItem:{},
      }
    },
    filters: {
      stateCompleted(val) {
        let content = '';
        switch (parseInt(val)) {
          case 0:
            return '未入库';
          case 1:
            return '已入库';
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
        StoreCompletedDetail({id:this.id},'get').then((res) => {
          this.listItem = res.data
          if(this.state === 'not_yet'){
            this.qr_code = res.data.qr_code
            this.qr_code = {...this.qr_code,state:'3'}
            this.qrCode = JSON.stringify(this.qr_code)
          }
          this.isLoad = true
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      confirmClick(){
        StoreCompletedDetail({
          id:this.id,
          action: '2'
        },'post').then((res) => {
          if (parseInt(res.data.res) === 0) {
            this.$router.push(`/store/completed_storage/success?id=${this.id}`)
          } else {
            this.$toast(res.data.errmsg)
          }
        }).catch(() => {
          this.$toast('操作失败')
        })
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
        StoreCompletedDetail({
          id:this.id,
          action: '1'
        },'post').then((res) => {
          if (parseInt(res.data.res) === 0) {
            this.flag = true
          } else {
            this.$toast(res.data.errmsg)
          }
        }).catch(() => {
          this.$toast('操作失败')
        })
      },
      closeQrcode(){
        this.flag = false
      },
    },
  }
</script>

<style scoped lang="stylus">
  .completed_detail
    background #E6EAED
    padding-bottom 52px
    &.active
      padding-bottom 0
    .completed_number
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
      flex-direction row
      justify-content space-between
      align-items center
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
      .right
        fsc 14px #666666
    .picking_info
      display flex
      flex-direction column
      background #fff
      padding 12px 10px
      margin-bottom 10px
      .title
        display flex
        flex-direction row
        align-items center
        margin-bottom 10px
        .icon
          display flex
          wh 16px 16px
          margin-right 4px
        span
          display flex
          fsc 16px #333333
          font-weight 600
      .content
        display flex
        flex-direction column
        background #F5FBFF
        padding 12px 10px
        border-radius 6px
        span
          fsc 14px #333333
        p
          fsc 12px #666666
          margin-top 6px
    .pickinger
      display flex
      flex-direction column
      background #fff
      padding 0 10px
      margin-bottom 20px
      .item
        display flex
        flex-direction column
        padding 12px 0
        border-bottom 1px solid #EEEEEE
        &:last-child
          border-bottom 0
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
                border-radius 4px
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
    .completed_option
      width 100%
      position fixed
      bottom 0
      display flex
      flex-direction row
      background #fff
      padding 12px 10px
      justify-content space-between
      align-items center
      border-top 1px solid #CCCCCC
      span
        fsc 12px #666666
      button
        wh 80px 28px
        line-height 28px
        fsc 12px #1E9AFF
        border 1px solid #1E9AFF
        border-radius 14px
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
        margin-top 30px
        bgf()
        border-radius 4px
        p
          fsc 14px #999999
      .tips
        fsc 15px #FFFFFF
        margin-top 20px
      .icon
        wh 28px 28px
        margin-top 123px
</style>

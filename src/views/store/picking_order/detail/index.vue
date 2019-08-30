<template lang="pug">
  .picking_detail.full_box(v-if="isLoad" :class="state==='2' || state==='' ? 'active' : ''")
    .picking_number
      .number_left
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_danhao")
        span 领料单单号
      .number_right {{listItem.id}}
    .state
      .item
        .left
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_zhaungtai")
          span 领料状态
        .right {{listItem.state | statePicking}}
    .time(v-if="state==='0'")
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_time")
        span 时间
      .content
        .item
          span 期望领料时间
          p {{listItem.expect_picking_time | timePointFilter}}
        .item
          span 实际领料时间
          p(v-if="listItem.picking_time") {{listItem.picking_time | timePointFilter}}
          p(v-else) —
    .picking_time(v-if="state!=='0'")
      .left
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_time")
        span 领料时间
      .right(v-if="listItem.picking_time") {{listItem.picking_time | timePointFilter}}
      .right(v-else) —
    .picking_info
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_product")
        span 生产产品
        p(v-if="listItem.style==='1'") 补料
      .content
        span {{listItem.name}}
        p 计划生产：{{listItem.target_count.toFixed(2)}}{{listItem.unit}}
        p 生产单号：{{listItem.product_id}}
    .picking_material
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_cailiao")
        span 领取物料
      .content
        .item(v-for="(item,index) in listItem.materials_list" :key="index")
          span {{item.name}}
          p {{item.count.toFixed(2)}}{{item.unit}}
    .pickinger(v-if="listItem.accept_person")
      .item
        .title
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_shenpi")
          span 发料人
        .info
          .name
            .left
              img(:src="listItem.send_image")
              .phone
                span {{listItem.send_person}}
                p {{listItem.send_phone}}
            .icon(@click="phoneCall(listItem.send_phone)")
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconphone")
      .item
        .title
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_shenpi")
          span 领料人
        .info
          .name
            .left
              img(:src="listItem.accept_image")
              .phone
                span {{listItem.accept_person}}
                p {{listItem.accept_phone}}
            .icon(@click="phoneCall(listItem.accept_phone)")
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconphone")
    .picking_option(v-show="state==='0' || state==='1' || state==='3'")
      span(v-show="state==='0'") 完成备料后，将状态设为：待领料
      span(v-show="state==='1'") 经核对无误后，将状态设为：已领料
      span(v-show="state==='3'")
      button(v-show="state==='0'" @click="receiveClick") 待领料
      button(v-show="state==='1'" @click="showQrcode") 已领料
      button(v-show="state==='3'" @click="confirmClick") 确认领料
    .qrCode(v-if="flag")
      .img_box
        qrcode(:value="qrCode" :options="{ width: 250 }")
      .tips 让领料人扫描此二维码确认领料
      .icon(@click="closeQrcode")
        svg.ali_icon(aria-hidden="true")
          use(xlink:href="#iconguanbi")
</template>

<script>
  import { StorePickingListDetail } from '_api/store/'
  export default {
  data(){
      return {
        isLoad: false,
        flag:false,
        id: '',
        state: '',
        qrCode: '',
        listItem:{},
      }
    },
    filters: {
      statePicking(val) {
        let content = '';
        switch (parseInt(val)) {
          case 0:
            return '待备料';
          case 1:
            return '待领料';
          case 2:
            return '已领料';
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
        StorePickingListDetail({id:this.id},'get').then((res) => {
          if(res.data.errmsg){
            this.$toast('二维码错误')
            return
          }else {
            this.listItem = res.data
            if(this.state === '1'){
              this.qr_code = res.data.qr_code
              this.qr_code = {...this.qr_code,state:'3'}
              this.qrCode = JSON.stringify(this.qr_code)
            }
          }
          this.isLoad = true
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      receiveClick(){
        this.$createDialog({
          type: 'confirm',
          title: '',
          content: '状态设为待领料后，生产部的人员将收到领料通知',
          confirmBtn: {
            text: '待领料',
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
            StorePickingListDetail({
              id: this.id,
              state: '1',
            },'post').then((res) => {
              if (parseInt(res.data.res) === 0) {
                this.$toast(`领料成功`)
                this.$router.go(-1)
              } else {
                this.$toast(res.data.errmsg)
              }
            }).catch(() => {
              this.$toast('领料失败')
            })
          },
          onCancel: () => {

          }
        }).show()
      },
      showQrcode(){
        StorePickingListDetail({
          id: this.id,
          state: '2',
          action: '1'
        },'post').then((res) => {
          if (parseInt(res.data.res) === 0) {
            this.flag = true
          } else {
            this.$toast(res.data.errmsg)
          }
        }).catch(() => {
          this.$toast('领料失败')
        })
      },
      closeQrcode(){
        this.flag = false
      },
      confirmClick(){
        StorePickingListDetail({
          id: this.id,
          state: '2',
          action: '2'
        },'post').then((res) => {
          if (parseInt(res.data.res) === 0) {
            this.$router.push(`/store/picking_order/success?id=${this.id}`)
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
    },
  }
</script>

<style scoped lang="stylus">
  .picking_detail
    background #E6EAED
    padding-bottom 52px
    &.active
      padding-bottom 0
    .picking_number
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
    .picking_time
      display flex
      flex-direction row
      justify-content space-between
      align-items center
      margin-bottom 10px
      background #fff
      padding 12px 10px
      .left
        display flex
        flex-direction row
        align-items center
        .icon
          display flex
          wh 16px 16px
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
      padding 12px 10px 10px
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
          fsc 16px #333333
          font-weight 600
        p
          display flex
          align-items center
          justify-content center
          wh 48px 20px
          font-size 12px
          color #fff
          background #00C3D0
          margin-left 10px
          border-radius 4px
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
    .picking_material
      display flex
      flex-direction column
      background #fff
      padding 0 10px 12px
      margin-bottom 10px
      .title
        display flex
        flex-direction row
        align-items center
        padding-top 12px
        margin-bottom 10px
        border-top 1px solid #EEEEEE
        .icon
          display flex
          wh 16px 16px
          margin-right 4px
        span
          fsc 16px #333333
          font-weight 600
      .content
        display flex
        flex-direction column
        background #F5FBFF
        padding 12px 10px
        border-radius 6px
        .item
          display flex
          flex-direction row
          justify-content space-between
          margin-bottom 8px
          &:last-child
            margin-bottom 0
          span
            fsc 14px #333333
          p
            fsc 14px #666666
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
    .picking_option
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
<style lang="stylus">
  .cube-dialog-content
    margin 30px 0 28px 0
    .cube-dialog-content-def
      padding 0 20px
      line-height 20px
      p
        margin initial
        font-size 16px
        line-height 24px
        color #545454
  .cube-dialog-btns
    &:after
      border-right 0
    a:before
      border-top 0
    a:last-child
      color #0099FF
</style>

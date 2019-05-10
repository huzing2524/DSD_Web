<template lang="pug">
  .picking_detail(v-if="isLoad" :class="state==='2' || state==='' ? 'active' : ''")
    .picking_number
      .number_left
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_danhao")
        span 领料单单号
      .number_right {{listItem.id}}
    .picking_info
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_product")
        span {{listItem.category}}：{{listItem.name}}
        p(v-if="listItem.style==='1'") 补料
      .content
        .item
          span 计划生产
          p {{listItem.target_count}}{{listItem.unit}}
        .item
          span 生产时间
          p {{listItem.time | timePointFilter}}
    .status
      .item
        .left
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_zhaungtai")
          span 状态
        .right {{listItem.state | statePicking}}
      .item(v-show="listItem.picking_time > 0")
        .left
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_time")
          span 领料时间
        .right {{listItem.picking_time | timeYMDHMFilter}}
    .pickinger(v-show="listItem.send_person")
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_shenpi")
        span 发料人
      .info
        .phone
          span {{listItem.send_person}}
          p {{listItem.send_phone}}
    .pickinger(v-show="listItem.accept_person")
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_clien")
        span 领料人
      .info
        .phone
          span {{listItem.accept_person}}
          p {{listItem.accept_phone}}
    .picking_material(:class="state==='2' || state==='' ? 'bottom' : ''")
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_cailiao")
        span 领取物料
      .content
        .item(v-for="(item,index) in listItem.materials_list" :key="index")
          span {{item.name}}
          p {{item.count}}{{item.unit}}
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
            return '未备料';
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
    },
  }
</script>

<style scoped lang="stylus">
  .picking_detail
    background #E6EAED
    padding-bottom 62px
    &.active
      padding-bottom 0
    .picking_number
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
    .picking_info
      display flex
      flex-direction column
      background #fff
      padding 15px
      margin-bottom 10px
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
        background #E9F5FF
        padding 15px
        border-radius 6px
        .item
          display flex
          flex-direction row
          justify-content space-between
          margin-bottom 15px
          &:last-child
            margin-bottom 0
          span
            fsc(14px,#545454)
          p
            fsc(14px,#999999)
    .status
      display flex
      flex-direction column
      margin-bottom 10px
      .item
        display flex
        flex-direction row
        background #fff
        padding 15px
        justify-content space-between
        align-items center
        .left
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
        .right
          font-size 14px
          color #999999
    .pickinger
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
          font-size 15px
          color #545454
      .info
        display flex
        flex-direction column
        background #E9F5FF
        border-radius 6px
        padding 15px 21px 15px 15px
        margin-top 15px
        .phone
          display flex
          flex-direction row
          justify-content space-between
          span
            fsc(14px,#545454)
          p
            fsc(13px,#999999)
    .picking_material
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
        flex-direction column
        background #E9F5FF
        padding 15px
        border-radius 6px
        .item
          display flex
          flex-direction row
          justify-content space-between
          margin-bottom 15px
          &:last-child
            margin-bottom 0
          span
            fsc(14px,#545454)
          p
            fsc(14px,#999999)
    .picking_option
      width 100%
      position fixed
      bottom 0
      display flex
      flex-direction row
      background #fff
      padding 15px
      justify-content space-between
      align-items center
      span
        font-size 13px
        color #999999
      button
        wh(92px,32px)
        line-height 32px
        color #4DA8EE
        border 1px solid #4DA8EE
        border-radius 16px
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

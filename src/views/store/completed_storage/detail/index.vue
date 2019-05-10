<template lang="pug">
  .completed_detail.full_box(v-if="isLoad" :class="state==='done' ? 'active' : ''")
    .completed_number
      .number_left
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_danhao")
        span 完工入库单号
      .number_right {{listItem.id}}
    .picking_info
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_product")
        span {{listItem.product.category}}：{{listItem.product.name}}
      .content
        .item
          span 计划生产
          p {{listItem.product.plan_count}}{{listItem.product.unit}}
        .item
          span 实际生产
          p {{listItem.product.complete_count}}{{listItem.product.unit}}
        .item
          span 生产时间
          p {{listItem.product.complete_time | timePointFilter}}
    .status
      .item
        .left
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_zhaungtai")
          span 状态
        .right {{listItem.state | stateCompleted}}
      .item(v-if="listItem.completed_storage.incoming_time > 0")
        .left
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_time")
          span 领料时间
        .right {{listItem.completed_storage.incoming_time}}
    .pickinger(v-if="listItem.completed_storage.send_person")
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_shenpi")
        span 交接人
      .info
        .phone
          span {{listItem.completed_storage.send_person}}
          p {{listItem.completed_storage.send_phone}}
    .pickinger(v-if="listItem.completed_storage.receive_person")
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_clien")
        span 接收人
      .info
        .phone
          span {{listItem.completed_storage.receive_person}}
          p {{listItem.completed_storage.receive_phone}}
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
    padding-bottom 62px
    &.active
      padding-bottom 0
    .completed_number
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
      .content
        display flex
        flex-direction column
        background #E9F5FF
        padding 15px 15px 0
        border-radius 6px
        .item
          display flex
          flex-direction row
          justify-content space-between
          margin-bottom 15px
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
    .completed_option
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

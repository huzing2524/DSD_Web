<template lang="pug">
  .purchase_detail(v-if="isLoad" :class="state==='1' ? 'active' : ''")
    .order_number
      .number_left
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_danhao")
        span 采购入库单
      .number_right {{listItem.id}}
    .state
      .item
        .left
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_zhaungtai")
          span 采购入库状态
        .right {{listItem.state | statePurchase}}
    .time
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_time")
        span 采购入库时间
      .right(v-if="listItem.income.income_time") {{listItem.income.income_time | timeYMDHMFilter}}
      .right(v-else) —
    .customer
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_clien")
        span 供应商
      .info
        .name
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_supplier")
          span {{listItem.client.name ? listItem.client.name : '暂无'}}
        .boss
          span {{listItem.client.company_name ? listItem.client.company_name : '暂无'}}
          span {{listItem.client.phone ? listItem.client.phone : '暂无'}}
        .address {{listItem.client.address ? listItem.client.address : '暂无'}}
    .product
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_product")
        span 存货
      .product_content
        .item(v-for="(item,index) in listItem.purchase_list" :key="index")
          .item_name
            span {{item.category}}：{{item.name}}
            p ￥{{item.price | formatFloatNum}}
          .item_num ×{{item.count}}
      .total
        span 合计金额
        .num ￥
          p {{listItem.total_money | formatFloatNum}}
    .pickinger(v-show="state==='1'")
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_shenpi")
        span 入库人
      .info
        .name
          .left
            img(:src="listItem.income.image")
            .phone
              span {{listItem.income.income_person}}
              p {{listItem.income.phone}}
          .icon(@click="phoneCall(listItem.income.phone)")
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconphone")
    .options(v-show="state!=='1'")
      span 存货入库后，将状态设为：已入库
      button(@click="sendClick") 已入库
</template>

<script>
  import { StorePurchaseDetail } from '_api/store/'
  export default {
    data() {
      return {
        isLoad: false,
        id: '',
        state: '',
        listItem:{}
      }
    },
    filters: {
      statePurchase(val) {
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
        StorePurchaseDetail({id:this.id},'get').then((res) => {
          this.listItem = res.data
          if(res.data.errmsg){
            this.$toast('缺少参数')
            return
          }
          this.isLoad = true
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      sendClick(){
        this.$createDialog({
          type: 'confirm',
          title: '',
          content: '确定将该采购入库单设为已入库吗？',
          confirmBtn: {
            text: '确定',
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
            StorePurchaseDetail({id:this.id},'post').then((res) => {
              if (parseInt(res.data.res) === 0) {
                this.$toast(`入库成功`)
                this.$router.go(-1)
              } else {
                this.$toast(res.data.errmsg)
              }
            }).catch(() => {
              this.$toast('入库失败')
            })
          },
          onCancel: () => {

          }
        }).show()
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
    }
  }
</script>

<style scoped lang="stylus">
  .purchase_detail
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
    .pickinger
      display flex
      flex-direction column
      background #fff
      padding 12px 10px
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
    .options
      width 100%
      position fixed
      bottom 0
      display flex
      flex-direction row
      background #fff
      padding 15px
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

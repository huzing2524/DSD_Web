<template lang="pug">
  .purchase_detail(v-if="isLoad" :class="state==='1' ? 'active' : ''")
    .order_number
      .number_left
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_danhao")
        span 入库单号
      .number_right {{listItem.id}}
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
    .status
      .item
        .left
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_zhaungtai")
          span 状态
        .right {{listItem.state | statePurchase}}
      .item(v-show="state==='1'")
        .left
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_time")
          span 领料时间
        .right {{listItem.income.income_time | timePointFilter}}
    .pickinger(v-show="state==='1'")
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconbianzu")
        span 入库人
      .info
        .phone
          span {{listItem.income.income_person}}
          p {{listItem.income.phone}}
    .product
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_product")
        span 存货
      .item(v-for="(item,index) in listItem.purchase_list" :key="index")
        .item_name {{item.category}}：{{item.name}}
        .item_info
          span {{item.count}}{{item.unit}}
          span ￥{{item.price | formatFloatNum}}
          span ￥{{item.money | formatFloatNum}}
      .total
        span 合计金额
        .num ￥
          p {{listItem.total_money | formatFloatNum}}
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
      }
    }
  }
</script>

<style scoped lang="stylus">
  .purchase_detail
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
            width 20px
            height 20px
            margin-right 10px
          span
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
    .product
      background #fff
      padding 15px 0 16px 15px
      margin-bottom 40px
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
        padding-top 6px
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
      span
        font-size 13px
        color #999999
      button
        wh(92px,32px)
        line-height 32px
        color #4DA8EE
        border 1px solid #4DA8EE
        border-radius 16px
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

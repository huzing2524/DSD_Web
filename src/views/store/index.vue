<template lang="pug">
  .store.full_box(v-if="isLoad")
    StateHeader(:stateList="stateList")
    .content
      nav
        .tab(:class="{active: tabIdx === 0}" @click="toggleTab(0)") 日
        .tab(:class="{active: tabIdx === 1}" @click="toggleTab(1)") 周
        .tab(:class="{active: tabIdx === 2}" @click="toggleTab(2)") 月
        .tab(:class="{active: tabIdx === 3}" @click="toggleTab(3)") 季
        .tab(:class="{active: tabIdx === 4}" @click="toggleTab(4)") 年
      <!--.to_select_date-->
        <!--p 2019年4月7日-->
        <!--.line-->
        <!--.icon-->
          <!--svg.ali_icon(aria-hidden="true")-->
            <!--use(xlink:href="#iconicon_select")-->
      .data_box
        router-link.item(to="/store/invoice_order?type=statistic")
          .title
            p 发货完成率
            .to_detail 查看详情
          ChartWrapper(:dataList="invoice")
        router-link.item(to="/store/purchase_warehousing?type=statistic")
          .title
            p 采购入库完成率
            .to_detail 查看详情
          ChartWrapper(:dataList="purchase_warehousing")
        router-link.item(to="/store/picking_order?type=statistic")
          .title
            p 生产领料完成率
            .to_detail 查看详情
          ChartWrapper(:dataList="picking_list")
        router-link.item(to="/store/storage_list?type=statistic")
          .title
            p 仓库结存金额
            .to_detail 查看详情
          .total_box
            .total
              span 总金额
              .num ￥
                p {{storage_money.total | formatFloatNum}}
            .total_kind
              .kind_item
                span 产品结存总金额
                p ￥{{storage_money.products | formatFloatNum}}
              .kind_item
                span 物料结存总金额
                p ￥{{storage_money.materials | formatFloatNum}}
</template>

<script>
  import StateHeader from '_components/state_header/'
  import ChartWrapper from '_components/chart_wrapper/'
  import { StoreMain } from '_api/store/'
  import { timeTab } from '_common/util/'
  export default {
    data() {
      return {
        tabIdx: 0,
        isLoad:false,
        stateList: [],
        listItem:{},
        invoice:{
          total: 0,
          desc: '发货单',
          rows: [
            {'name': '待发货', 'val': 0},
            {'name': '已发货', 'val': 0},
            {'name': '已送达', 'val': 0},
          ]
        },
        purchase_warehousing:{
          total: 0,
          desc: '入库单',
          rows: [
            {'name': '未入库', 'val': 0},
            {'name': '已入库', 'val': 0},
          ]
        },
        picking_list:{
          total: 0,
          desc: '领料单',
          rows: [
            {'name': '待备料', 'val': 0},
            {'name': '已备料', 'val': 0},
            {'name': '已领料', 'val': 0},
          ]
        },
        storage_money:{},
      }
    },
    components: {
      StateHeader,
      ChartWrapper,
    },
    mounted() {
      this.getStroeMain()
    },
    methods: {
      toggleTab(idx) {
        this.tabIdx = idx
        this.getStroeMain()
      },
      getStroeMain(){
        StoreMain({...timeTab(this.tabIdx + 1)},'get').then((res) => {
          this.listItem = res.data
          this.storage_money = res.data.storage_money
          this.invoice.rows[0].val = res.data.invoice.waited
          this.invoice.rows[1].val = res.data.invoice.invoice
          this.invoice.rows[2].val = res.data.invoice.done
          this.invoice.total = res.data.invoice.waited + res.data.invoice.invoice + res.data.invoice.done
          this.purchase_warehousing.rows[0].val = res.data.purchase_warehousing.not
          this.purchase_warehousing.rows[1].val = res.data.purchase_warehousing.done
          this.purchase_warehousing.total = res.data.purchase_warehousing.not + res.data.purchase_warehousing.done
          this.picking_list.rows[0].val = res.data.picking_list.prepared
          this.picking_list.rows[1].val = res.data.picking_list.waited
          this.picking_list.rows[2].val = res.data.picking_list.done
          this.picking_list.total = res.data.picking_list.prepared + res.data.picking_list.waited + res.data.picking_list.done
          this.stateList = [
            {
              icon: 'iconicon_fahuodan',
              text: '发货单',
              num: res.data.header.invoice > 0 ? res.data.header.invoice : '',
              path: '/store/invoice_order',
            },
            {
              icon: 'iconicon_lingliaodan',
              text: '领料单',
              num: res.data.header.picking_list > 0 ? res.data.header.picking_list : '',
              path: '/store/picking_order',
            },
            {
              icon: 'iconicon_caigouru',
              text: '采购入库',
              num: res.data.header.purchase_warehousing > 0 ? res.data.header.purchase_warehousing : '',
              path: '/store/purchase_warehousing',
            },
            {
              icon: 'iconicon_wangongru',
              text: '完工入库',
              num: res.data.header.completed_storage > 0 ? res.data.header.completed_storage : '',
              path: '/store/completed_storage',
            },
            {
              icon: 'iconicon_pendingfuzhi',
              text: '临时申购',
              path: '/store/purchase_apply',
            },
            {
              icon: 'iconicon_pendingfuzhi1',
              text: '盘点审核',
              path: '/store/storage_check',
            },
            {
              icon: 'iconicon_kucunliebiao',
              text: '库存列表',
              path: '/store/storage_list',
            },
          ]
          this.isLoad = true
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
    }
  }
</script>

<style scoped lang="stylus">
  .store
    bgf()
    .content
      margin 10px
      box-shadow 0px 2px 8px 0px rgba(35,121,191,0.2)
      border-radius 6px
      nav
        height 60px
        display flex
        font-size 15px
        border-bottom 1px solid #E4E4E4
        .tab
          flex 1
          height 100%
          display flex
          align-items center
          justify-content center
          position relative
          &.active
            color $mainc
            &:after
              content ''
              position absolute
              bottom 0
              left 50%
              wh 50% 3px
              margin-left -25%
              background $mainc
      .to_select_date
        bg #F1FAFF
        mgauto()
        wh 171px 44px
        border-radius 6px
        margin-top 20px
        font-size 14px
        display flex
        align-items center
        justify-content space-between
        padding 0 15px 0 20px
        .line
          wh 2px 14px
          bg #DDE9F1
        .icon
          wh 20px 20px
      .data_box
        margin-top 10px
        padding 20px
        .item
          padding 20px 0
          border-bottom 1px solid #F0F0F0
          &:last-child
            border-bottom 0
            padding-bottom 0
          .title
            display flex
            align-items center
            justify-content space-between
            p
              font-size 15px
              color #545454
            .to_detail
              color #999
              font-size 12px
              &:after
                font-family iconfont
                content '\e673'
                font-size 10px
                margin-left 3px
          .total_box
            display flex
            flex-direction column
            padding-top 20px
            .total
              display flex
              flex-direction column
              align-items center
              span
                font-size 14px
                color #999999
                margin-bottom 10px
              .num
                display flex
                flex-direction row
                font-size 15px
                color #545454
                align-items center
                p
                  font-size 26px
                  color #545454
                  margin-left 2px
            .total_kind
              display flex
              flex-direction row
              justify-content center
              margin-top 30px
              .kind_item
                display flex
                flex 1
                flex-direction column
                align-items center
                position relative
                &:first-child:before
                  content ''
                  width 2px
                  height 20px
                  background #E9F2F8
                  position absolute
                  right 0
                  top 50%
                  margin-top -10px
                span
                  font-size 14px
                  color #999999
                  margin-bottom 5px
                p
                  font-size 15px
                  font-weight 500
                  color #545454
</style>

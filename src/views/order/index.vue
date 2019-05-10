<template lang="pug">
  .order.full_box#order_index(ref="text" v-if="isLoad")
    StateHeader(:stateList="stateList")
    .content
      nav
        .tab(:class="{active: tabIdx === 0}" @click="toggleTab(0)") 日
        .tab(:class="{active: tabIdx === 1}" @click="toggleTab(1)") 周
        .tab(:class="{active: tabIdx === 2}" @click="toggleTab(2)") 月
        .tab(:class="{active: tabIdx === 3}" @click="toggleTab(3)") 季
        .tab(:class="{active: tabIdx === 4}" @click="toggleTab(4)") 年
      //-.to_select_date
        p 2019年4月7日
        .line
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_select")
      .data_box(ref="content")
        .item
          .title
            p 订单交货率
            router-link.to_detail(to="/order/order_list?order_type=2") 查看详情
          ChartWrapper(:dataList="dataList")
        .item
          .title
            p 订单金额
            router-link.to_detail(to="/order/order_list?order_type=3") 查看详情
          .money_info
            p 订单总金额
            p {{orderMainData.order_amount.total_amount | formatFloatNum}}
            .number
              .number_item
                p 订单数
                p {{orderMainData.order_amount.orders}}
              .number_item
                p 新客户
                p {{orderMainData.order_amount.new_c}}
              .number_item
                p 老客户
                p {{orderMainData.order_amount.regular_c}}
        .item
          .title
            p 订单生产进度
            router-link.to_detail(to="/order/order_list?order_type=4") 查看详情
          .progress
            .progress_item
              .ring.purple {{orderMainData.order_progress.pending}}
              p 待生产
            .progress_item
              .ring.blue {{orderMainData.order_progress.producing}}
              p 生产中
            .progress_item
              .ring.orange {{orderMainData.order_progress.not_deliver}}
              p 完工未发货
        .item
          .title
            p 客户贡献度排名
            router-link.to_detail(to="/order/order_list?order_type=5") 查看详情
          .client_rank
            .client_rank_item(v-for="(item, idx) in cRankData" :key="idx")
              .name {{item.name.length > 3 ? item.name.slice(0, 3)+'...' : item.name}}
              .block
                .show(:style="{width: ((item.amount/maxRankVal.clients)*100)+'%'}")
              p {{item.amount}}
        .item
          .title
            p 订单状态
            .to_detail 查看详情
          .client_rank
            .client_rank_item(v-for="(item, idx) in Object.keys(orderMainData.order_status)")
              .name {{idx | orderListState}}
              .block
                .show(:style="{width: ((orderMainData.order_status[item] / maxRankVal.status)*100)+'%'}")
              b {{orderMainData.order_status[item]}}单
</template>

<script>
  import StateHeader from '_components/state_header/'
  import ChartWrapper from '_components/chart_wrapper/'
  import {OrderMain, OrderMainCrank} from '_api/order/'
  import { timeTab } from '_common/util/'

  export default {
    components: {
      StateHeader,
      ChartWrapper
    },
    data() {
      return {
        tabIdx: 0,
        isLoad: false,
        orderMainData: {},
        cRankData: [],
        maxRankVal: {
          clients: 0,
          status: 0
        },
        dataList:{
          total: 0,
          desc: '总订单',
          rows: [
            {'name': '准时交货 ', 'val': 0},
            {'name': '逾期交货 ', 'val': 0},
            {'name': '待发货 ', 'val': 0},
          ]
        },
        stateList: [
          {
            icon: 'iconicon_pending',
            text: '待审批',
            num: '',
            path: '/order/order_list',
          },
          {
            icon: 'iconicon_ship',
            text: '待发货',
            path: '/order/order_list',
          },
          {
            icon: 'iconicon_transport',
            text: '运输中',
            path: '/order/order_list',
          },
          {
            icon: 'iconicon_stop1',
            text: '已暂停',
            path: '/order/order_list',
          },
          {
            icon: 'iconicon_service',
            text: '已送达',
            path: '/order/order_list',
          },
          {
            icon: 'iconicon_cancel',
            text: '已取消',
            path: '/order/order_list',
          },
        ]
      }
    },
    filters: {
      orderListState(val) {
        let state = ''
        switch (val + 1) {
          case 1:
            state = '待审批'
            break
          case 2:
            state = '待发货'
            break
          case 3:
            state = '运输中'
            break
          case 4:
            state = '已发送'
            break
          case 5:
            state = '已取消'
            break
          case 6:
            state = '已暂停'
            break
          default:
            state = ''
        }
        return state
      }
      },
    computed: {},
    mounted() {
      this.getOrderMain()
      this.getOrderMainCrank()
      window.shareDetail = () => {
        return `${location.origin}/order/clients/client_list`
      }
    },
    beforeDestroy() {
      window.shareDetail = null
    },
    methods: {
      toggleTab(idx) {
        this.tabIdx = idx
        this.getOrderMain()
        this.getOrderMainCrank()
      },
      getOrderMain() {
        OrderMain({...timeTab(this.tabIdx + 1)}).then(res => {
          this.orderMainData = res.data.list
          this.stateList[0].num = this.orderMainData.header.approval
          this.stateList[1].num = this.orderMainData.header.deliver
          this.stateList[2].num = this.orderMainData.header.transit
          this.stateList[3].num = this.orderMainData.header.pause
          this.dataList.rows[0].val = this.orderMainData.deliver_stats.ontime
          this.dataList.rows[1].val = this.orderMainData.deliver_stats.overdue
          this.dataList.rows[2].val = this.orderMainData.deliver_stats.notdeliver
          this.dataList.total = this.orderMainData.deliver_stats.ontime + this.orderMainData.deliver_stats.overdue + this.orderMainData.deliver_stats.notdeliver

          Object.keys(this.orderMainData.order_status).forEach(item => {
            if (this.orderMainData.order_status[item] > this.maxRankVal.status) {
              this.maxRankVal.status = this.orderMainData.order_status[item]
            }
          })
          console.log(this.maxRankVal.status)
          this.isLoad = true
        })
      },
      getOrderMainCrank() {
        OrderMainCrank({...timeTab(this.tabIdx + 1), order: 1}).then(res => {
          this.cRankData = res.data.list
          this.cRankData.forEach(item => {
            if (item.amount > this.maxRankVal.clients) {
              this.maxRankVal.clients = item.amount
            }
          })
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .order
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
        >.item
          padding 20px 0
          border-bottom 1px solid #F0F0F0
          .title
            display flex
            align-items center
            justify-content space-between
            margin-bottom 20px
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
          .money_info
            >p
              display flex
              justify-content center
              &:nth-of-type(1)
                color #999
                font-size 14px
              &:nth-of-type(2)
                color #545454
                font-size 26px
                margin-top 18px
                &:before
                  content '¥'
                  font-size 15px
                  line-height 26px
                  margin-right 5px
             .number
                p
                  display flex
                  justify-content center
                  &:nth-of-type(1)
                    color #999
                    font-size 14px
                  &:nth-of-type(2)
                    color #545454
                    font-size 26px
                    margin-top 18px
            .number
              display flex
              justify-content space-between
              margin-top 36px
              &_item
                position relative
                color: #000
                &:after
                  content ''
                  position absolute
                  right -35px
                  top 50%
                  wh 2px 20px
                  bg #E9F2F8
                &:nth-last-of-type(1)
                  &:after
                    content ''
                    display none
          .progress
            display flex
            &_item
              flex 1
              ftb()
              flex-direction column
              .ring
                wh 75px 75px
                border-radius 50%
                &.purple
                  border 5px solid #AA85FF
                &.blue
                  border 5px solid #4FB5FF
                &.orange
                  border 5px solid #FFB455
                fct()
                fsc 16px #545454
              p
                fsc 14px #545454
                margin-top 12px
          .client_rank
            &_item
              display flex
              align-items center
              fsc 12px #666
              margin-top 5px
              .name
                width 4em
              .block
                flex 1
                height 20px
                margin 0 8px
                border-radius 2px
                position relative
                .show
                  position absolute
                  left 0
                  wh 100% 100%
                  bg #2FCCA6
              p
                &:before
                  content '¥'
                  margin-right 2px
</style>

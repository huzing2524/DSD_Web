<template lang="pug">
  .order.full_box#order_index()
    StateHeader(:stateList="stateList")
    .content(v-if="isLoad")
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
            p 生产完工率
            router-link.to_detail(to="/product/task_list?order_type=2") 查看详情
          ChartWrapper(:dataList='dataList')
        .item
          .title
            p 生产金额分析
            router-link.to_detail(to="/product/task_list?order_type=3") 查看详情
          .money_info
            p 生产总金额
            p.money {{productHomeStatsData.amount_stats.total_amount | formatFloatNum}}
            .number
              .number_item
                p 生产任务数
                p {{productHomeStatsData.amount_stats.total_tasks}}
              .number_item
                p 新客户
                p {{productHomeStatsData.amount_stats.new_client}}
              .number_item
                p 老客户
                p {{productHomeStatsData.amount_stats.old_client}}
        .item
          .title
            p 生产备料情况
            router-link.to_detail(to="/product/task_list?order_type=4") 查看详情
          .progress
            .progress_item
              .ring.purple {{productHomeStatsData.material_prepare.purchasing}}
              p 采购中
            .progress_item
              .ring.blue {{productHomeStatsData.material_prepare.not_prepared}}
              p 未备料
            .progress_item
              .ring.orange {{productHomeStatsData.material_prepare.not_picked}}
              p 待领料
        .item
          .title
            p 生产需求排名
            router-link.to_detail(to="/product/task_list?order_type=5") 查看详情
          .client_rank
            .client_rank_item(v-for="(item, idx) in productHomeStatsData.product_demands" :key="idx")
              .name {{item.name.length > 3 ? item.name.slice(0, 3)+'...' : item.name}}
              .block
                .show(:style="{width: ((item.amount/maxRankVal.clients)*100)+'%'}")
              p {{item.amount}}
</template>

<script>
  import StateHeader from '_components/state_header/'
  import {ProductHomeHeader, ProductHomeStats} from '_api/product/'
  import ChartWrapper from '_components/chart_wrapper/'
  import getStrlen from '_common/util'
  import { timeTab } from '_common/util/'

  export default {
    components: {
      StateHeader,
      ChartWrapper
    },
    data() {
      return {
        getStrlen,
        tabIdx: 0,
        isShowToBaCkMaterial: true,
        productHomeStatsData: {},
        maxRankVal: {
          clients: 0,
        },
        isLoad: false,
        dataList: {
          total: 1,
          desc: '生产任务',
          rows: [
            {'name': '完工已入库', 'val': 0},
            {'name': '完工未入库', 'val': 0},
            {'name': '未完工', 'val': 0},
          ]
        },
        stateList: [
          {
            icon: 'iconicon_renwu',
            text: '生产任务',
            num: '',
            path: '/product/task_list',
          },
          {
            icon: 'iconicon_gonyi',
            text: '工艺&BOM',
            path: '/product/crafts_bom_list',
          },
          {
            icon: 'icongongxu',
            text: '工序',
            path: '/product/process_list',
          },
          {
            icon: 'iconicon_chanp',
            text: '产品目录',
            path: '/product/product_list',
          },
          {
            icon: 'iconicon_wuliao',
            text: '物料目录',
            path: '/product/goods_list/',
          },
          {
            icon: 'iconicon_tuibu',
            text: '退补料',
            path: '',
            toNext: 1,
          },
        ]
      }
    },
    mounted() {
      this.getProductHomeHeader()
      this.getProductHomeStats()
    },
    methods: {
      toggleTab(idx) {
        this.tabIdx = idx
        this.getProductHomeHeader()
        this.getProductHomeStats()
      },
      getProductHomeHeader() {
        ProductHomeHeader().then(res => {
          this.stateList[0].num = res.data.tasks_count
        })
      },
      getProductHomeStats() {
        ProductHomeStats({...timeTab(this.tabIdx + 1)}).then(res => {
          this.productHomeStatsData = res.data
          this.dataList.rows[0].val = res.data.finish_rate.in_store.count
          this.dataList.rows[1].val = res.data.finish_rate.out_store.count
          this.dataList.rows[2].val = res.data.finish_rate.not_done.count
          this.dataList.total = this.dataList.rows[0].val + this.dataList.rows[1].val + this.dataList.rows[2].val
          this.isLoad = true
          this.productHomeStatsData.product_demands.forEach(item => {
            if (item.amount > this.maxRankVal.clients) {
              this.maxRankVal.clients = item.amount
            }
          })
        })
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .order
    bgf()
    .content
      margin 10px
      box-shadow 0px 2px 8px 0px rgba(35, 121, 191, 0.2)
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
        > .item
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
                &.money:before
                  content '¥'
                  font-size 15px
                  line-height 26px
                  margin-right 5px
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

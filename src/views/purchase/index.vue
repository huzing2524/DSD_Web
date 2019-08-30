<template lang="pug">
  .order.full_box(v-if="isLoad")#order_index(ref="text" @scroll="scrollIng")
    StateHeader(:stateList="stateList")
    .content
      nav
        .tab(:class="{active: tabIdx === 0}" @click="toggleTab(0)") 日
        .tab(:class="{active: tabIdx === 1}" @click="toggleTab(1)") 周
        .tab(:class="{active: tabIdx === 2}" @click="toggleTab(2)") 月
        .tab(:class="{active: tabIdx === 3}" @click="toggleTab(3)") 季
        .tab(:class="{active: tabIdx === 4}" @click="toggleTab(4)") 年
      .data_box(ref="content")
        .item
          .title
            p 采购到货率
            .to_detail(@click="clickButton('1')") 查看详情
          ChartWrapper(:dataList='dataList')
        .item(@click="clickButton('2')")
          .title
            p 采购金额
            .to_detail() 查看详情
          .money_info
            p 采购总金额
            p.money {{ purchaseMainData.purchase_amount.total_amount | formatFloatNum }}
            .number
              .number_item
                p 采购单数
                p {{purchaseMainData.purchase_amount.purchases}}
              .number_item
                p 新供应商
                p {{purchaseMainData.purchase_amount.new_c}}
              .number_item
                p 老供应商
                p {{purchaseMainData.purchase_amount.purchases}}
        .item
          .title
            p 采购执行情况
            .to_detail(@click="clickButton('3')") 查看详情
          .progress
            .progress_item
              .ring.purple {{purchaseMainData.purchase_progress.approval}}
              p 待审批
            .progress_item
              .ring.blue {{purchaseMainData.purchase_progress.deliver}}
              p 采购中
            .progress_item
              .ring.orange {{purchaseMainData.purchase_progress.transit}}
              p 运输中
        .item
          .title
            p 供应商准交排行
            .to_detail(@click="clickButton('4')") 查看详情
          .client_rank
            .client_rank_item(v-for="(item, idx) in cRankData" :key="idx")
              .name {{null != item.name && item.name.length > 3 ? item.name.slice(0, 3)+'...' : item.name}}
              .block
              p {{item.amount}}
</template>

<script>
  import StateHeader from '_components/state_header/'
  import {PurhcaseMain, PurhcaseMainCrank} from '_api/purchase/'
  import ChartWrapper from '_components/chart_wrapper/'
  import { timeTab } from '_common/util/'

  export default {
    components: {
      StateHeader,
      ChartWrapper
    },
    data() {
      return {
        cRankData: [],
        tabIdx: 0,
        isLoad: false,
        purchaseMainData: {purchase_amount:{}, purchase_progress:{}},
        dataList: {
          total: 1,
          desc: '采购单',
          rows: [
            {'name': '准时交货', 'val': 0},
            {'name': '逾期交货', 'val': 0},
            {'name': '待发货', 'val': 0},
          ]
        },
        stateList: [
          {
            icon: 'iconicon_pending',
            text: '待审批',
            num: '0',
            path: '/purchase/purchase_list',
          },
          {
            icon: 'iconicon_daiqueren',
            text: '待确认',
            path: '/purchase/purchase_list',
          },
          {
            icon: 'iconicon_caigzhong',
            text: '采购中',
            path: '/purchase/purchase_list',
          },
          {
            icon: 'iconicon_transport',
            text: '运输中',
            path: '/purchase/purchase_list',
          },
          {
            icon: 'iconicon_yiruk',
            text: '已入库',
            path: '/purchase/purchase_list',
          },
          {
            icon: 'iconicon_cancel',
            text: '已取消',
            path: '/purchase/purchase_list',
          },
        ]
      }
    },
    mounted() {
      this.getPurchaseMainCrank()
      this.getPurchaseMain()
      window.shareDetail = () => {
        return `${location.origin}/purchase/supplier/supplier_shop_management`
      }
    },
    beforeDestroy() {
      window.shareDetail = null;
    },
    methods: {
      toggleTab(idx) {
        this.tabIdx = idx
        this.getPurchaseMain()
        this.getPurchaseMainCrank()
      },
      getPurchaseMain() {
        PurhcaseMain({...timeTab(this.tabIdx + 1)},'get').then(res => {
          this.purchaseMainData = res.data.list
          this.stateList[0].num = this.purchaseMainData.header.approval
          this.stateList[1].num = this.purchaseMainData.header.confirm
          this.stateList[2].num = this.purchaseMainData.header.deliver
          this.stateList[3].num = this.purchaseMainData.header.transit
          this.dataList.rows[0].val = this.purchaseMainData.purchase_progress.approval
          this.dataList.rows[1].val = this.purchaseMainData.purchase_progress.deliver
          this.dataList.rows[2].val = this.purchaseMainData.purchase_progress.transit
          this.dataList.total = this.dataList.rows[0].val + this.dataList.rows[1].val + this.dataList.rows[2].val
          this.isLoad = true

        }).catch()
      },
      getPurchaseMainCrank() {
        PurhcaseMainCrank({...timeTab(this.tabIdx + 1)}).then(res => {
          this.cRankData = res.data.list;
        })
      },
      scrollIng() {
      },
      scrollAdd() {
        let vm = this
        let t = setInterval(function () {
          vm.$refs.text.scrollTop += 1
          if (vm.$refs.text.scrollTop >= (vm.$refs.content.offsetTop) || (vm.$refs.text.scrollTop + 667) >= vm.$refs.text.scrollHeight) {
            clearInterval(t)
          }
        }, 15)
      },
      clickButton(flag) {
        switch (flag) {
          case '1':
            flag = `purchase_arrival_rate`
            break;
          case '2':
            flag = `purchase_money`
            break;
          case '3':
            flag = `purchase_executive_condition`
            break;
          case '4':
            flag = `purchase_submit_ontime_rankinglist`
            break;
        }
        console.log(`/purchase/statistic_analysis/` + flag)
        this.$router.push(`/purchase/statistic_analysis/` + flag)
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

<template lang="pug">
  .card_list.full_box(ref="listContainer")
    .order_index(v-if="listType === 'invoice_order'")
      .list_tab
        .tab_item(v-for="(item, idx) in Object.keys(dataList)" :key="idx" @click="scrollAdd(idx)") {{item | deliverState}} {{dataList[Object.keys(dataList)[idx]].length}}
      .list_card(v-if="dataList[Object.keys(dataList)[idx]].length" v-for="(item, idx) in Object.keys(dataList)" ref="cardItem")
        p.card_title {{item | deliverState}}
        .card_item(v-for="(items, idxs) in dataList[Object.keys(dataList)[idx]]" :key="idxs" @click="toDetailClick(item,items,listType)")
          .name
            .icon(v-if="items.style==='1'")
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_own")
            .icon(v-else)
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_supplier")
            span {{items.name}}
          .info
            span {{items.products}}
            p(v-if="item==='waited'") 预计送达时间：{{items.plan_arrival_time | timePointFilter}}
            p(v-else-if="item==='deliver'") 发货时间：{{items.deliver_time | timePointFilter}}
            p(v-else) 送达时间：{{items.arrival_time | timePointFilter}}
    .order_index(v-if="listType === 'picking_order'")
      .list_tab
        .tab_item(v-for="(item, idx) in Object.keys(dataList)" :key="idx" @click="scrollAdd(idx)") {{item | materialState}} {{dataList[Object.keys(dataList)[idx]].length}}
      .list_card(v-if="dataList[Object.keys(dataList)[idx]].length" v-for="(item, idx) in Object.keys(dataList)" ref="cardItem")
        p.card_title {{item | materialState}}
        .card_item(v-for="(items, idxs) in dataList[Object.keys(dataList)[idx]]" :key="idxs" @click="toDetailClick(item,items,listType)")
          .name
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_ranking")
            span {{items.category}}：{{items.name}}
            p(v-if="items.style === '1'") 补料
          .info
            span {{items.materials}}
            p(v-if="parseInt(item)===0") 未备料时间：{{items.time | timePointFilter}}
            p(v-else-if="parseInt(item)===1") 待领料时间：{{items.waited_time | timePointFilter}}
            p(v-else) 已领料时间：{{items.picking_time | timePointFilter}}
    .order_index(v-if="listType === 'completed_storage'")
      .list_tab
        .tab_item(v-for="(item, idx) in Object.keys(dataList)" :key="idx" @click="scrollAdd(idx)") {{item | inOutState}} {{dataList[Object.keys(dataList)[idx]].length}}
      .list_card(v-if="dataList[Object.keys(dataList)[idx]].length" v-for="(item, idx) in Object.keys(dataList)" ref="cardItem")
        p.card_title {{item | inOutState}}
        .card_item(v-for="(items, idxs) in dataList[Object.keys(dataList)[idx]]" :key="idxs" @click="toDetailClick(item,items,listType)")
          .name
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_ranking")
            span {{items.category}}：{{items.name}}
          .info
            span 计划生产：{{items.plan_count}}
            p(v-if="item==='not_yet'") 生产时间：{{items.complete_time | timePointFilter}}
            p(v-if="item==='done'") 入库时间：{{items.income_time | timePointFilter}}
    .order_index(v-if="listType === 'purchase_warehousing'")
      .list_tab
        .tab_item(v-for="(item, idx) in Object.keys(dataList)" :key="idx" @click="scrollAdd(idx)") {{item | buyState}} {{dataList[Object.keys(dataList)[idx]].length}}
      .list_card(v-if="dataList[Object.keys(dataList)[idx]].length" v-for="(item, idx) in Object.keys(dataList)" ref="cardItem")
        p.card_title {{item | buyState}}
        .card_item(v-for="(items, idxs) in dataList[Object.keys(dataList)[idx]]" :key="idxs" @click="toDetailClick(item,items,listType)")
          .name
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_ranking")
            span {{items.company_name}}
          .info
            span {{items.purchase}}
            p(v-if="parseInt(item)===0") 发货时间：{{items.deliver_time | timePointFilter}}
            p(v-else) 入库时间：{{items.income_time | timePointFilter}}
    .order_index(v-if="listType === 'storage_check'")
      .list_tab
        .tab_item(v-for="(item, idx) in Object.keys(dataList)" :key="idx" @click="scrollAdd(idx)") {{item | checkState}} {{dataList[Object.keys(dataList)[idx]].length}}
      .list_card(v-if="dataList[Object.keys(dataList)[idx]].length" v-for="(item, idx) in Object.keys(dataList)" ref="cardItem")
        p.card_title {{item | checkState}}
        .card_item(v-for="(items, idxs) in dataList[Object.keys(dataList)[idx]]" :key="idxs"  @click="toDetailClick(item,items,listType)")
          .name
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_ranking1")
            span {{items.name}}&nbsp;&nbsp; {{items.more_less==='0' ? '+' + items.count : '-' + items.count}}{{items.unit}}
            p(:class="items.more_less==='0' ? 'up': 'down'") {{items.more_less==='0' ? '盘盈' : '盘亏'}}
          .info
            span {{items.remark}}
            p(v-if="parseInt(item)===0") {{items.time | timeYMDHMFilter}}
            p(v-else) {{items.approval_time | timeYMDHMFilter}}
    .order_index(v-if="listType === 'purchase_apply'")
      .list_tab
        .tab_item(v-for="(item, idx) in Object.keys(dataList)" :key="idx" @click="scrollAdd(idx)") {{item | applyState}} {{dataList[Object.keys(dataList)[idx]].length}}
      .list_card(v-if="dataList[Object.keys(dataList)[idx]].length" v-for="(item, idx) in Object.keys(dataList)" ref="cardItem")
        p.card_title {{item | applyState}}
        .card_item(v-for="(items, idxs) in dataList[Object.keys(dataList)[idx]]" :key="idxs"  @click="toDetailClick(item,items,listType)")
          .name
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_shengou")
            span {{items.products}}
          .info
            span {{items.remark}}
            p(v-if="parseInt(item)===0") 创建时间：{{items.create_time | timeYMDHMFilter}}
            p(v-else) 申购时间：{{items.approval_time | timeYMDHMFilter}}
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props: {
      orderListData: Object,
      dataList: Object,
      listType: String,
    },
    computed: {
    },
    filters: {
      applyState(val) {
        let state = ''
        switch (parseInt(val)) {
          case 0:
            state = '待审批'
            break
          case 1:
            state = '已通过'
            break
          case 2:
            state = '已取消'
            break
          default:
            state = ''
        }
        return state
      },
      deliverState(val) {
        let state = ''
        switch (val) {
          case 'waited':
            state = '待发货'
            break
          case 'deliver':
            state = '已发货'
            break
          case 'done':
            state = '已送达'
            break
          default:
            state = ''
        }
        return state
      },
      materialState(val) {
        let state = ''
        switch (parseInt(val)) {
          case 0:
            state = '待备料'
            break
          case 1:
            state = '待领料'
            break
          case 2:
            state = '已领料'
            break
          default:
            state = ''
        }
        return state
      },
      inOutState(val) {
        let state = ''
        switch (val) {
          case 'not_yet':
            state = '未入库'
            break
          case 'done':
            state = '已入库'
            break
          default:
            state = ''
        }
        return state
      },
      buyState(val) {
        let state = ''
        switch (parseInt(val)) {
          case 0:
            state = '未入库'
            break
          case 1:
            state = '已入库'
            break
          default:
            state = ''
        }
        return state
      },
      checkState(val) {
        let state = ''
        switch (parseInt(val)) {
          case 0:
            state = '待审核'
            break
          case 1:
            state = '已审核'
            break
          default:
            state = ''
        }
        return state
      },
    },
    mounted() {
    },
    methods: {
      toDetailClick(item,items,listType){
        this.$router.push(`/store/${listType}/detail?state=${item}&id=${items.id}`)
      },
      scrollAdd(idx) {
        let vm = this
        if(vm.$refs.cardItem[idx]){
          let t = setInterval(function () {
            vm.$refs.listContainer.scrollTop += 25
            if (vm.$refs.listContainer.scrollTop >= (vm.$refs.cardItem[idx].offsetTop) || (vm.$refs.listContainer.scrollTop + 667) >= vm.$refs.listContainer.scrollHeight) {
              clearInterval(t)
            }
          }, 15)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .card_list
    padding 0 10px 10px
    bgf()
    .list_tab
      display flex
      flex-direction row
      padding 20px 0
      .tab_item
        font-size 13px
        color #999999
        margin-right 20px
    .list_card
      display flex
      flex-direction column
      padding 15px 15px 0 15px
      box-shadow 0px 0px 10px 0px rgba(35,121,191,0.2)
      border-radius 8px
      margin-bottom 10px
      .card_title
        font-size 15px
        color #545454
        margin-bottom 20px
      .card_item
        display flex
        flex-direction column
        margin-bottom 20px
        .name
          display flex
          flex-direction row
          align-items center
          .icon
            wh(20px,20px)
            margin-right 10px
          span
            font-size 15px
            color #545454
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          p
            wh 48px 20px
            display flex
            justify-content center
            align-items center
            fsc 12px #fff
            background #00C3D0
            border-radius 4px
            margin-left 10px
            &.up
              background #6AE1C4
            &.down
              background #FF9999
        .info
          display flex
          flex-direction column
          padding-left 30px
          font-size 12px
          span
            color #7A7A7A
            margin 4px 0
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          p
            color #999999
</style>

<!--有图片的-->
<template lang="pug">
  .card_list.full_box(ref="listContainer")
    .order_index
      .list_tab
        .tab_item(v-for="(item, idx) in Object.keys(dataList)" :key="idx" class="normalColor"  @click="scrollAdd(idx)" ) hhh {{dataList[Object.keys(dataList)[idx]].length}}
      .list_card(v-for="(item, idx) in Object.keys(dataList)" ref="cardItem")
        p.card_title mfdsfsdfdsff
        router-link.card_item(v-for="(items, idxs) in dataList[Object.keys(dataList)[idx]]" :key="idxs" :to="{ path:jumpPath, query:{id:items.id}}" )
          .name
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_caigoux") // iconicon_supplier
            span {{typeof items.name == "undefined" || items.name == null || items.name == "" ? '佚名' : items.name}}fdfdfsdfadsfa
          .info
            span {{items.products}}
            p {{getYMDHMDateString(items.time)}}
</template>

<script>
  import {getYMDHMDateString } from '_common/util'

  export default {
    components: {
    },
    data() {
      return {
      }
    },
    props: {
      dataList: Object,
      jumpPath: String,
      listType: Number,
    },
    computed: {

    },
    filters: {
      // 1: 待审批， 2: 已审核待确认 3：采购中, 4: 运输中, 5：已入库, 6:已取消
      purchaseListState(val) {
        let state = ''
        switch (parseInt(val)) {
          case 1:
            state = '待审批'
            break
          case 2:
            state = '已审核待确认'
            break
          case 3:
            state = '采购中'
            break
          case 4:
            state = '运输中'
            break
          case 5:
            state = '已入库'
            break
          case 6:
            state = '已取消'
            break
          default:
            state = ''
        }
        return state
      },
      purchaseArrivalState(val) {
        let state = ''
        switch (parseInt(val)) {
          case 1:
            state = '准时交货'
            break
          case 2:
            state = '逾期交货'
            break
          case 3:
            state = '待发货'
            break
          default:
            state = ''
        }
        return state
      },
      purchaseExecutiveConditionState(val) {
        let state = ''
        switch (parseInt(val)) {
          case 1:
            state = '待审批'
            break
          case 2:
            state = '采购中'
            break
          case 3:
            state = '运输中'
            break
          default:
            state = ''
        }
        return state
      },
      purchaseMoneyState(val) {
        let state = ''
        switch (parseInt(val)) {
          case 1:
            state = '新供应商'
            break
          case 2:
            state = '老供应商'
            break
          default:
            state = ''
        }
        return state
      },
      purchaseSubmitOntimeRankinglistState(val) {
        let state = ''
        switch (parseInt(val)) {
          case 1:
            state = '待审批'
            break
          case 2:
            state = '采购中'
            break
          case 3:
            state = '运输中'
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
      getYMDHMDateString,
      scrollAdd(idx) {
        let vm = this
        let t = setInterval(function () {
          vm.$refs.listContainer.scrollTop += 25
          if (vm.$refs.listContainer.scrollTop >= (vm.$refs.cardItem[idx].offsetTop) || (vm.$refs.listContainer.scrollTop + 667) >= vm.$refs.listContainer.scrollHeight) {
            clearInterval(t)
          }
        }, 15)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .card_list
    padding 0 10px 10px
    bgf()
    .list_tab
      width 100%
      display flex
      flex-direction row
      padding 20px 0
      overflow-x scroll
      .tab_item
        display flex
        font-size 13px
        margin-right 20px
        color #999999
        white-space nowrap
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
          p
            color #999999
</style>

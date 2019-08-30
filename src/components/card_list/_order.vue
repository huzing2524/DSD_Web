<template lang="pug">
  .card_list.full_box(ref="listContainer")
    .order_index(v-if="listType === 1")
      .list_tab
        .tab_item(v-for="(item, idx) in Object.keys(orderListData)" :key="idx" @click="scrollAdd(idx)") {{item | orderListState}} {{orderListData[Object.keys(orderListData)[idx]].length}}
      .list_card(v-for="(item, idx) in Object.keys(orderListData)" ref="cardItem")
        p.card_title {{item | orderListState}}
        router-link.card_item(v-for="(items, idxs) in orderListData[Object.keys(orderListData)[idx]]" :key="idxs" :to="`/order/order_detail?id=${items.id}`")
          .name
            .icon(v-if="items.order_type== 1")
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_own")
            .icon(v-else)
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconqi")
            span {{items.name}}
          .info
            span {{items.products.length>60?(items.products.slice(0,60)+'...'):items.products}}
            p {{items.time | timePointFilter}}
    .order_index(v-else-if="listType === 2")
      .list_tab
        .tab_item(v-for="(item, idx) in Object.keys(orderListData)" :key="idx" @click="scrollAdd(idx)") {{item | orderJiaohuoState}} {{orderListData[Object.keys(orderListData)[idx]].length}}
      .list_card(v-for="(item, idx) in Object.keys(orderListData)" ref="cardItem")
        p.card_title {{item | orderJiaohuoState}}
        router-link.card_item(v-for="(items, idxs) in orderListData[Object.keys(orderListData)[idx]]" :key="idxs" :to="`/order/order_detail?id=${items.id}`")
          .name
            .icon(v-if="items.order_type== 1")
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_own")
            .icon(v-else)
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconqi")
            span {{items.name}}
          .info
            span {{items.products.length>60?(items.products.slice(0,60)+'...'):items.products}}
            p {{items.time | timePointFilter}}
    .order_index(v-else-if="listType === 3")
      .list_tab
        .tab_item(v-for="(item, idx) in Object.keys(orderListData)" :key="idx" @click="scrollAdd(idx)") {{item | orderMoneyState}} {{orderListData[Object.keys(orderListData)[idx]].length}}
      .list_card(v-for="(item, idx) in Object.keys(orderListData)" ref="cardItem")
        p.card_title {{item | orderMoneyState}}
        router-link.card_item(v-for="(items, idxs) in orderListData[Object.keys(orderListData)[idx]]" :key="idxs" :to="`/order/order_detail?id=${items.id}`")
          .name
            .icon(v-if="items.order_type== 1")
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_own")
            .icon(v-else)
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconqi")
            span {{items.name}}
          .info
            span {{items.products.length>60?(items.products.slice(0,60)+'...'):items.products}}
            p {{items.time | timePointFilter}}
    .order_index(v-else-if="listType === 4")
      .list_tab
        .tab_item(v-for="(item, idx) in Object.keys(orderListData)" :key="idx" @click="scrollAdd(idx)") {{item | orderProgressState}} {{orderListData[Object.keys(orderListData)[idx]].length}}
      .list_card(v-for="(item, idx) in Object.keys(orderListData)" ref="cardItem")
        p.card_title {{item | orderProgressState}}
        router-link.card_item(v-for="(items, idxs) in orderListData[Object.keys(orderListData)[idx]]" :key="idxs" :to="`/order/order_detail?id=${items.id}`")
          .name
            .icon(v-if="items.order_type== 1")
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_own")
            .icon(v-else)
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconqi")
            span {{items.name}}
          .info
            span {{items.products.length>60?(items.products.slice(0,60)+'...'):items.products}}
            p {{items.time | timePointFilter}}
    .order_index(v-else)
      .list_tab
        .tab_item(v-for="(item, idx) in Object.keys(orderListData)" :key="idx" @click="scrollAdd(idx)") {{item}} {{orderListData[Object.keys(orderListData)[idx]].length}}
      .list_card(v-for="(item, idx) in Object.keys(orderListData)" ref="cardItem")
        p.card_title {{item}}
        router-link.card_item(v-for="(items, idxs) in orderListData[Object.keys(orderListData)[idx]]" :key="idxs" :to="`/order/order_detail?id=${items.id}`")
          .name
            .icon(v-if="items.order_type== 1")
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_own")
            .icon(v-else)
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconqi")
            span {{items.name}}
          .info
            span {{items.products.length>60?(items.products.slice(0,60)+'...'):items.products}}
            p {{items.time | timePointFilter}}
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props: {
      orderListData: Object,
      listType: Number,
    },
    computed: {
    },
    filters: {
      orderListState(val) {
        let state = ''
        switch (parseInt(val)) {
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
      },
      orderJiaohuoState(val) {
        let state = ''
        switch (parseInt(val)) {
          case 1:
            state = '准时交货'
            break
          case 2:
            state = '逾期交货'
            break
          default:
            state = ''
        }
        return state
      },
      orderMoneyState(val) {
        let state = ''
        switch (parseInt(val)) {
          case 1:
            state = '新客户'
            break
          case 2:
            state = '老客户'
            break
          default:
            state = ''
        }
        return state
      },
      orderProgressState(val) {
        let state = ''
        switch (parseInt(val)) {
          case 1:
            state = '待生产'
            break
          case 2:
            state = '生产中'
            break
          case 3:
            state = '完工未入库'
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
      scrollAdd(idx) {
        let vm = this
        let t = setInterval(function () {
          vm.$refs.listContainer.scrollTop += 25
          if (vm.$refs.listContainer.scrollTop >= (vm.$refs.cardItem[idx].offsetTop - 20) || (vm.$refs.listContainer.scrollTop + 667) >= vm.$refs.listContainer.scrollHeight) {
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
      flex-wrap nowrap
      flex-direction row
      overflow-x scroll
      overflow-y auto
      padding 20px 0
      .tab_item
        display flex
        font-size 13px
        color #999999
        margin-right 20px
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
            line-height 20px
          p
            color #999999
</style>

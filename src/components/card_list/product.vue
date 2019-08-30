<template lang="pug">
  .card_list.full_box(ref="listContainer")
    .order_index(v-if="listType === 1")
      .list_tab
        .tab_item(v-for="(item, idx) in Object.keys(dataList)" :key="idx" @click="scrollAdd(idx)") {{item | productTaskState}} {{dataList[Object.keys(dataList)[idx]].length}}
      .list_card(v-for="(item, idx) in Object.keys(dataList)" ref="cardItem")
        p.card_title {{item | productTaskState}}
        router-link.card_item(v-for="(items, idxs) in dataList[Object.keys(dataList)[idx]]" :key="idxs" :to="`/product/task_detail?id=${items.id}`")
          .name
            span {{items.product}}
            p(v-show="item =='wait'" :class="{wait_1:items.state == 1,wait_2:items.state == 2,'wait_3':items.state == 3,wait_4:items.state == 4}") {{items.state | productTaskItemWaitState}}
            p(v-show="item =='done'") {{items.state | productTaskItemDoneState}}
          .info
            span 计划生产：{{items.target | formatFloat}}
            p {{items.time | timeFilter}}
    .order_index(v-else-if="listType === 2")
      .list_tab
        .tab_item(v-for="(item, idx) in Object.keys(dataList)" :key="idx" @click="scrollAdd(idx)") {{item | productTaskIsOverState}} {{dataList[Object.keys(dataList)[idx]].length}}
      .list_card(v-for="(item, idx) in Object.keys(dataList)" ref="cardItem")
        p.card_title {{item | productTaskIsOverState}}
        router-link.card_item(v-for="(items, idxs) in dataList[Object.keys(dataList)[idx]]" :key="idxs" :to="`/product/task_detail?id=${items.id}`")
          .name
            span {{items.name}}
            p(v-show="item =='wait'" :class="{wait_1:items.state == 1,wait_2:items.state == 2,'wait_3':items.state == 3,wait_4:items.state == 4}") {{items.state | productTaskItemWaitState}}
            p(v-show="item =='done'") {{items.state | productTaskItemDoneState}}
          .info
            span 计划生产：{{items.target}}
            p {{items.time | timeFilter}}
    .order_index(v-else-if="listType === 3")
      .list_tab
        .tab_item(v-for="(item, idx) in Object.keys(dataList)" :key="idx" @click="scrollAdd(idx)") {{item | productTaskMoneyState}} {{dataList[Object.keys(dataList)[idx]].length}}
      .list_card(v-for="(item, idx) in Object.keys(dataList)" ref="cardItem")
        p.card_title {{item | productTaskMoneyState}}
        router-link.card_item(v-for="(items, idxs) in dataList[Object.keys(dataList)[idx]]" :key="idxs" :to="`/product/task_detail?id=${items.id}`")
          .name
            span {{items.name}}
            p(v-show="item =='wait'" :class="{wait_1:items.state == 1,wait_2:items.state == 2,'wait_3':items.state == 3,wait_4:items.state == 4}") {{items.state | productTaskItemWaitState}}
            p(v-show="item =='done'") {{items.state | productTaskItemDoneState}}
          .info
            span 计划生产：{{items.target}}
            p {{items.time | timeFilter}}
    .order_index(v-else-if="listType === 4")
      .list_tab
        .tab_item(v-for="(item, idx) in Object.keys(dataList)" :key="idx" @click="scrollAdd(idx)") {{item | productTaskIsReadyState}} {{dataList[Object.keys(dataList)[idx]].length}}
      .list_card(v-for="(item, idx) in Object.keys(dataList)" ref="cardItem")
        p.card_title {{item | productTaskIsReadyState}}
        router-link.card_item(v-for="(items, idxs) in dataList[Object.keys(dataList)[idx]]" :key="idxs" :to="`/product/task_detail?id=${items.id}`")
          .name
            span {{items.name}}
            p(v-show="item =='wait'" :class="{wait_1:items.state == 1,wait_2:items.state == 2,'wait_3':items.state == 3,wait_4:items.state == 4}") {{items.state | productTaskItemWaitState}}
            p(v-show="item =='done'") {{items.state | productTaskItemDoneState}}
          .info
            span 计划生产：{{items.target}}
            p {{items.time | timeFilter}}
    .order_index(v-else)
      .list_tab
        .tab_item(v-for="(item, idx) in dataList" :key="idx" @click="scrollAdd(idx)") {{item.name}} {{item.list.length}}
      .list_card(v-for="(item, idxs) in dataList" ref="cardItem" :key="idxs")
        p.card_title {{item.name}}
        router-link.card_item(v-for="(items, idxs) in item.list" :key="idxs" :to="`/product/task_detail?id=${items.id}`")
          .name
            span {{item.name}}
            p(v-show="item =='wait'" :class="{wait_1:items.state == 1,wait_2:items.state == 2,'wait_3':items.state == 3,wait_4:items.state == 4}") {{items.state | productTaskItemWaitState}}
            p(v-show="item =='done'") {{items.state | productTaskItemDoneState}}
          .info
            span 计划生产：{{items.target}}
            p {{items.time | timeFilter}}
</template>

<script>
  export default {
    components: {},
    data() {
      return {
      }
    },
    // props: {
    //   dataList: Array || Object,
    //   listType: Number
    // },
    props: ['dataList', 'listType'],
    computed: {},
    filters: {
      productTaskState(val) {
        let state = ''
        switch (val) {
          case 'wait':
            state = '待生产'
            break
          case 'ready':
            state = '待领料'
            break
          case 'working':
            state = '生产中'
            break
          case 'done':
            state = '已完工'
            break
          default:
            state = ''
        }
        return state
      },
      productTaskItemWaitState(val) {
        let state = ''
        switch (Number(val)) {
          case 1:
            state = '待备料'
            break
          case 2:
            state = '待拆单'
            break
          case 3:
            state = '物料不足'
            break
          default:
            state = ''
        }
        return state
      },
      productTaskItemDoneState(val) {
        let state = ''
        switch (Number(val)) {
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
      productTaskIsOverState(val) {
        let state = ''
        switch (val) {
          case 'in_store':
            state = '完工已入库'
            break
          case 'out_store':
            state = '完工未入库'
            break
          case 'not_done':
            state = '未完工'
            break
          default:
            state = ''
        }
        return state
      },
      productTaskMoneyState(val) {
        let state = ''
        switch (val) {
          case 'new_client':
            state = '新客户生产任务'
            break
          case 'old_client':
            state = '老客户生产任务'
            break
          default:
            state = ''
        }
        return state
      },
      productTaskIsReadyState(val) {
        let state = ''
        switch (val) {
          case 'purchasing':
            state = '采购中'
            break
          case 'not_prepared':
            state = '未备料'
            break
          case 'not_picked':
            state = '待领料'
            break
          default:
            state = ''
        }
        return state
      },
    },
    mounted() {},
    methods: {
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
          span
            font-size 15px
            color #545454
          p
            /*wh 48px 20px*/
            /*display flex*/
            /*justify-content center*/
            /*align-items center*/
            padding 4px 6px
            fsc 12px #fff
            background #00C3D0
            border-radius 4px
            margin-left 10px
            &.wait_1
              background #FFB499
            &.wait_2
              background #C4AAFF
            &.wait_3
              background #FF9999
            &.done_1
              background #71C4FF
            &.done_2
              background #6AE1C4
        .info
          display flex
          flex-direction column
          font-size 12px
          span
            color #7A7A7A
            margin 4px 0
            overflow hidden
          p
            color #999999
</style>

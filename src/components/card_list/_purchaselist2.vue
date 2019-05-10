<!--没有图片的-->
<template lang="pug">
  .card_list.full_box(ref="listContainer")
    .order_index()
      .list_tab
        .tab_item(v-for="(item, idx) in Object.keys(dataList)" :key="idx" @click="scrollAdd(idx)") {{item | supplierProductListState}} {{dataList[Object.keys(dataList)[idx]].length}}
      .list_card(v-for="(item, idx) in Object.keys(dataList)" ref="cardItem")
        p.card_title {{item | supplierProductListState}}
        router-link.card_item(v-for="(items, idxs) in dataList[Object.keys(dataList)[idx]]" :key="idxs" :to="{ path:jumpPath, query:{id:items.id,state:item.toString()}}" )
          .name
            span {{typeof items.name == "undefined" || items.name == null || items.name == "" ? '佚名' : items.name}}
          .info
            span {{items.industry}}
            p {{items.materials}}
</template>

<script>
  export default {
    components: {},
    data() {
      return {}
    },
    props: {
      dataList: Object,
      jumpPath: String,
    },
    computed: {
    },
    filters: {
      // 1: 已加入DSD， 2: 未加入DSD
      supplierProductListState(val) {
        let state = ''
        switch (parseInt(val)) {
          case 1:
            state = '已加入DSD'
            break
          case 2:
            state = '未加入DSD'
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
      box-shadow 0px 0px 10px 0px rgba(35, 121, 191, 0.2)
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

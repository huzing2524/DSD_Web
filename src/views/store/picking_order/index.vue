<template lang="pug">
  .list.full_box
    div(v-doc-title="doctitle")
    OrderCardList(v-if="listItemLength" :dataList="listItem" :listType="listType")
    NullPage(v-else)
</template>

<script>
  import OrderCardList from '_components/card_list/store/'
  import NullPage from '_components/null_page/'
  import { StorePickingListMain } from '_api/store/'
  export default {
    components: {
      OrderCardList,
      NullPage,
    },
    data() {
      return {
        isLoad: false,
        doctitle:'',
        listType:'picking_order',
        listItem:{},
        listItemLength:0,
      }
    },
    mounted() {
      if(this.$route.query.type){
        this.doctitle = '生产领料完成率'
      }else {
        this.doctitle = '领料单'
      }
      this.getPickingList()
    },
    methods: {
      getPickingList(){
        StorePickingListMain({},'get').then((res) => {
          this.listItem = res.data
          Object.keys(this.listItem).forEach(item => {
            this.listItemLength += this.listItem[item].length
          })
          this.isLoad = true
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  .list
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

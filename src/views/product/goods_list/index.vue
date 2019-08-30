<template lang="pug">
  .main
    GoodsListItem(v-for="(item, index) in dataList"
      :key="index"
      :item='item'
      :title='item.name'
      :subtitle='item.id'
      @click="itemClick")
    NullPage(v-show="dataList.length<=0")
    NewIcon(to='/product/goods_list/add'
            :iconStyle="{position:'absolute'}")
    
</template>

<script>
import { GoodsList } from '_api/product'
import NullPage from '_components/null_page';
import NewIcon from '_components/new_icon/'
import GoodsListItem from '_components/product/goods_list_item/'
export default {
  components: {
    GoodsListItem,
    NewIcon,
    NullPage,
  },
  data() {
    return {
      dataList:[
        
      ]
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData() {
      try {
        const { data } = await GoodsList()
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.dataList = data
        }
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
    itemClick(item) {
      this.$router.push(`/product/goods_list/detail_two?id=${item.id}`)
    },
    addBtnClick() {
      this.$router.push('/product/goods_list/add')
    }
  },
}
</script>

<style lang="stylus" scoped>
  .main
    height 100%
    width 100%
    background-color #E6EAEd
    padding-left 10px
    padding-right 10px
    padding-bottom 10px
    .content
      overflow-y scroll
      flex 1
      .list-item
        height 71px
        width 100%
        background-color white
        border-radius 8px
        margin-top  10px
        padding 15px 0px 15px 15px
        box-shadow 0px 0px 10px 0px rgba(35,121,191,0.2);
        display flex
        flex-direction column
        .list-item-name
          font-size 14px
          color rgba(84,84,84,1)
        .list-item-id
          font-size 12px
          color rgba(102,102,102,1)
          margin-top 8px
      .icon
        position fixed
        right 20px
        bottom 20px
        width 84px
        height 84px
</style>



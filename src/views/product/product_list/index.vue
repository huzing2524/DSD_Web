<template lang="pug">
  .main
    GoodsListItem(v-for="(item, index) in listItem"
      :key="index"
      :item='item'
      :title='item.name'
      :subtitle='item.id'
      @click="itemClick(item)")
    NullPage(v-show="listItem.length<=0")
    NewIcon(to='/product/product_list/add')
</template>

<script>
import { ProductList } from '_api/product'
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
      listItem:[]
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData() {
      try {
        const { data } = await ProductList({category: 0})
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.listItem = data
        }
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
    itemClick(item) {
      this.$router.push(`/product/product_list/detail_two?id=${item.id}`)
    }
  },
}
</script>

<style lang="stylus" scoped>

  .main
    height 100%
    padding-bottom 10px
    width 100%
    background-color #E6EAEd
    padding-left 10px
    padding-right 10px
    overflow-y scroll
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



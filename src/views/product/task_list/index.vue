<template lang="pug">
  .task_list.full_box
    ProductCardList(:dataList="productList" :listType="productListType" v-if="dataListLength || productListType===5")
    NullPage(v-else)
</template>

<script>
  import ProductCardList from '_components/card_list/product/'
  import NullPage from '_components/null_page/'
  import {
    ProductTakList,
    ProductTaskDoneStats,
    ProductTaskAccountStats,
    ProductTaskPrepareStats,
    ProductTaskDemandStats
  } from '_api/product/'

  export default {
    components: {
      ProductCardList,
      NullPage
    },
    data() {
      return {
        productListType: parseInt(this.$route.query.order_type) || 1,
        productList: {},
        dataListLength: 0
      }
    },
    computed: {},
    mounted() {
      this.getProductTakList()
    },
    methods: {
      getProductTakList() {
        let getFn = ProductTakList
        switch (this.productListType) {
          case 1:
            getFn = ProductTakList
            break
          case 2:
            getFn = ProductTaskDoneStats
            break
          case 3:
            getFn = ProductTaskAccountStats
            break
          case 4:
            getFn = ProductTaskPrepareStats
            break
          case 5:
            getFn = ProductTaskDemandStats
            break
          default:
            getFn = ProductTakList
        }
        getFn().then(res => {
          this.productList = res.data
          Object.keys(this.productList).forEach(item => {
            this.dataListLength += this.productList[item].length
          })
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .task_list
    bgf()
</style>

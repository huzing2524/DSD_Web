<template lang="pug">
  .list.full_box
    OrderCardList(v-if="listItemLength" :dataList="listItem" :listType="listType")
    NullPage(v-else)
</template>

<script>
  import OrderCardList from '_components/card_list/store/'
  import NullPage from '_components/null_page/'
  import { StorePurchaseMain } from '_api/store/'
  export default {
    components: {
      OrderCardList,
      NullPage,
    },
    data() {
      return {
        isLoad: false,
        listType: 'purchase_warehousing',
        listItem:{},
        listItemLength:0,
      }
    },
    mounted() {
      this.getPurchaseList()
    },
    methods: {
      getPurchaseList(){
        StorePurchaseMain({},'get').then((res) => {
          this.listItem = res.data
          Object.keys(this.listItem).forEach(item => {
            this.listItemLength += this.listItem[item].length
          })
          this.isLoad = true
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      }
    },
  }
</script>

<style scoped>

</style>

<template lang="pug">
  .list.full_box(v-if="isLoad")
    OrderCardList(v-if="listItemLength" :dataList="listItem" :listType="listType")
    NullPage(v-else)
    NewIcon(to="/store/purchase_apply/new")
</template>

<script>
  import OrderCardList from '_components/card_list/store/'
  import NullPage from '_components/null_page/'
  import NewIcon from '_components/new_icon/'
  import { StoreApplyMain } from '_api/store/'
  export default {
    components: {
      OrderCardList,
      NullPage,
      NewIcon,
    },
    data() {
      return {
        isLoad:false,
        listType: 'purchase_apply',
        listItem:{},
        listItemLength:0,
      }
    },
    mounted() {
      this.getApplyList()
    },
    methods: {
      getApplyList(){
        StoreApplyMain({},'get').then((res) => {
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

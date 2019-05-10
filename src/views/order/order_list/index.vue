<template lang="pug">
  .order_list.full_box
    OrderCardList(v-if="Object.keys(orderListData).length" :orderListData="orderListData" :listType="orderListType")
    NullPage(v-else)
    NewIcon(to="/order/order_new" v-if="orderListType === 1")
</template>

<script>
  import OrderCardList from '_components/card_list/_order/'
  import NewIcon from '_components/new_icon/'
  import { OrderList } from '_api/order/'
  import NullPage from '_components/null_page/'
  export default {
    components: {
      OrderCardList,
      NewIcon,
      NullPage
    },
    data() {
      return {
        orderListType: Number(this.$route.query.order_type) || 1,
        orderListData: {}
      }
    },
    computed: {},
    mounted() {
      this.getOrderList()
    },
    methods: {
      getOrderList() {
        OrderList({}, 'get', this.orderListType).then(res => {
          this.orderListData = res.data.list
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>

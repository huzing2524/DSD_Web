<!--客户列表-->
<template lang="pug">
  .main
    ClientListItem(v-for="(item, index) in dataList"
      :key="index"
      :item='item'
      :title='item.name'
      :industry='item.industry'
      :products='item.products'
      @click="itemClick")
    NullPage(v-show="null == dataList || dataList.length<=0")
    NewIcon(to='/order/clients/client_add')
</template>

<script>
  import { OrderClients } from '_api/order'
  import NullPage from '_components/null_page';
  import NewIcon from '_components/new_icon/'
  import ClientListItem from '_components/client_list_item/'
  export default {
    components: {
      ClientListItem,
      NewIcon,
      NullPage,
    },
    data() {
      return {
        dataList:[
          /*{
            "id": "string",
            "name": "string",
            "industry": "string",
            "products": "string"
          },*/
        ]
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData() {
        OrderClients({},'get',).then(res => {
          this.isLoad = true
          this.dataList = res.data.list
        }).catch((e) => {
          console.log(e)
          this.$toast('加载失败')
        })
      },
      itemClick(item) {
        this.$router.push(`/order/clients/client_message_edit?id=${item.id}&type=edit&queryType=1`)
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .main
    height 100%
    width 100%
    background-color white
    padding-left 10px
    padding-right 10px
    overflow-y scroll
    .icon
      position fixed
      right 20px
      bottom 20px
      width 84px
      height 84px
</style>




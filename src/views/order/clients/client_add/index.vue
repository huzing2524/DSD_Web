<template lang="pug">
  .main
    .add-input
      input(placeholder="填写客户名称"
        v-model="searchName"
        @input="input")
      .under-line
      .result-content
        .result-item(v-for="(item, index) in resultDatas"
          :key="index"
          @click="itemClick(item.id)")
          span(class="item-title") {{item.name}}
    span(class="no-material-span" @click="toAddClient") 没找到对应客户？
</template>

<script>
  import { OrderClientSearchs } from '_api/order'
  export default {
    data() {
      return {
        resultDatas:[
         /* {
            id:'001',
            name: '徐波',
          },
          {
            id:'002',
            name: 'haiphon',
          },*/
        ],
        searchName:''
      }
    },
    methods: {
      toAddClient() {
        this.$router.push(`/order/clients/client_message_base?type=create`)
      },
      input(event) {
        const { target } = event
        const { value } = target
        this.searchClient(value)
      },
      async searchClient(value) {
        try {
          const { data } = await OrderClientSearchs({name: value})
          if(data.errmsg) {
            console.log(data.errmsg)
          } else {
            this.resultDatas = data.list
          }
        } catch (error) {
          console.log('数据获取失败')
        }
      },

      itemClick(item) {
        // queryType是客户详情查询参数，1: 已添加客户，2: 客户资源池客户
        // this.$router.push(`/order/clients/client_message_edit?id=${item}&type=edit&queryType=2`)
        this.$router.push(`/order/clients/client_message_add?id=${item}&type=add&queryType=2`)
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .main
    height 100%
    width 100%
    background-color white
    padding 39px 25px 0px 25px
    display flex
    justify-content  center
    .add-input
      width 100%
      height 40%
      font-size 15px
      font-weight 400
      input
        width 100%
      .under-line
        margin-top 5px
        height 1px
        background-color #DDDDDD
      .result-content
        height 40vh
        overflow-y scroll
        .result-item
          border-bottom 1px solid #DDDDDD
          width 100%
          padding 10px 0px 10px 0px
          display flex
          flex-direction column
          .item-title
            title()

    .no-material-span
      color rgba(0,141,255,1)
      width 100%
      font-weight 400
      font-size 14px
      position fixed
      text-align center
      bottom 20px
</style>



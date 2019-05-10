<template lang="pug">
  .main
    .item-content(v-for="(item, index) in itemList" :key="index" @click="itemClick(item)")
      .item-row
        span 工序名称：
        span {{item.name}}
      .item-row
        span 编号：
        span {{item.id}}
</template>

<script>
import { ProcessList } from '_api/product'
export default {
  data() {
    return {
      itemList: [
      ]
      
    }
  },
  computed: {
    queryId() {
      return this.$route.query.id
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData() {
      try {
        const { data } = await ProcessList()
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.itemList = data
        }
      } catch (error) {
        this.$toast('获取数据出错')
      }
    },
    itemClick(item) {
      this.$router.push(`/product/crafts_bom_list/material_select?process_id=${item.id}&id=${this.queryId}&name=${item.name}`)
    }
  },
}
</script>

<style lang="stylus" scoped>
  .main
    width 100%
    height 100%
    background-color #ffffff
    overflow-y scroll
    padding 10px 10px 0px 10px
    .item-content
      padding 15px 15px 0px 15px
      box-shadow 0px 0px 10px 0px rgba(35,121,191,0.2)
      border-radius 8px
      display flex
      flex-direction column
      margin-bottom 10px
      .item-row
        display flex
        flex-direction row
        justify-content space-between
        align-items center
        margin-bottom 15px
        span
          font-size 14px
          color #545454
</style>



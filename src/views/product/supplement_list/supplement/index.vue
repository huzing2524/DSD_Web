<template lang="pug">
  .main
    .title-content
      span(class="title") 请选择需要补料的生产任务
    .page-content(v-show="dataList.length>0")
      span(class="content-title") 生产中
      .itme-content(v-for="(item, index) in dataList" :key="index"
                  @click="itemClick(item)")
        span(class="item-title") {{item.product}}
        span(class="item-subtitle") {{`计划生产：${item.target}`}}
        span(class="item-minititle") {{getYMDDateDecimalString(item.time)}}

</template>

<script>
import { getYMDDateDecimalString } from '_common/util'
import { ProductTakList } from '_api/product'

export default {
  data() {
    return {
      dataList:[]
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    getYMDDateDecimalString,
    async initData() {
      try {
        const { data } = await ProductTakList()
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          // 只需生产中的任务列表
          this.dataList = data['working']
        }
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
    itemClick(item) {
      this.$store.commit('product/Supplement_Task', item)
      this.$router.push('/product/supplement_list/add')
    }
  },
}
</script>

<style lang="stylus" scoped>
  .main 
    width 100%
    height 100%
    background-color #ffffff 
    padding 0px 10px 10px 10px
    overflow-y scroll
    .title-content
      display flex
      flex-direction row
      align-items center
      padding 20px 0px 20px 0px
      .title
        bordertitle()
    .page-content
      shadow()
      display flex
      flex-direction column
      .content-title
        title(15px)
        margin 15px 0px 0px 15px
      .itme-content
        display flex
        flex-direction column
        padding 0px
        .item-title
          title()
          margin 20px 0px 0px 15px
        .item-subtitle
          subtitle()
          margin-left 15px
          margin-top 8px
        .item-minititle
          minititle()
          margin-top 5px
          margin-left 15px
          margin-bottom 15px

</style>



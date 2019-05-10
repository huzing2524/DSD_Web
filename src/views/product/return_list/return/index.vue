<template lang="pug">
  .main
    .title-content
      span(class="title") 请选择需要退料的生产任务
    .page-content(v-show="workingList.length>0")
      span(class="content-title") 生产中
      .itme-content(@click="itemClick(item)"
                    v-for="item in workingList" :key="item.id")
        span(class="item-title") {{item.product}}
        span(class="item-subtitle") {{`计划生产：${item.target}`}}
        span(class="item-minititle") {{getYMDDateDecimalString(item.time)}}

    .page-content(v-show="doneList.length>0")
      span(class="content-title") 已完工
      .itme-content(@click="itemClick(item)"
                    v-for="item in doneList" :key="item.id")
        span(class="item-title") {{item.product}}
          .item-status
            span(class="item-status-title") {{item.state==0?'未入库':'已入库'}}
        span(class="item-subtitle") {{`计划生产：${item.target}`}}
        span(class="item-minititle") {{getYMDDateDecimalString(item.time)}}
    NullPage(v-show="doneList.length<=0&&workingList.length<=0")
</template>

<script>
import NullPage from '_components/null_page/';
import { ProductTakList } from '_api/product';
import { getYMDDateDecimalString } from '_common/util';
export default {
  components: {
    NullPage
  },
  data() {
    return {
      workingList:[],
      doneList:[]
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
          this.workingList = data.working || []
          this.doneList = data.done || []
        }
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
    itemClick(item) {
      this.$store.commit('product/Return_Task', item)
      this.$router.push('/product/return_list/add')
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
      padding 20px 0px 0px 0px
      .title
        bordertitle()
    .page-content
      shadow()
      display flex
      flex-direction column
      margin-top 20px
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
          display flex
          flex-direction row
          .item-status
            margin-left 5px
            display flex
            justify-content center
            align-items center
            border-radius 4px
            padding 2px 10px 2px 10px
            background-color #71C4FF
            .item-status-title
              font-size 12px
              color #ffffff
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



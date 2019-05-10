<template lang="pug">
  .main
    .title-content
      span(:style="currentIndex==0?selectStyle:unSelectStyle" @click="titleClick(0)") {{`未退料${dataList['0'].length}`}}
      span(:style="[currentIndex==1?selectStyle:unSelectStyle, {'marginLeft':'15px'}]" @click="titleClick(1)") {{`已退料${dataList['1'].length}`}}
    .content
      .item-content(v-show="dataList[0].length>0")
        p(class="content-title") 未退料
        .row-content(v-for="(item, index) in dataList[0]" 
                    :key="index"
                    @click="itemClick(item,'0')")
          .row-icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href='#iconicon_ranking')
          .material-content
            span(class="title") {{item.name}}
            span(class="name") {{item.material}}
            span(class="time") {{getYMDDateDecimalString(item.time)}}
      
      .item-content(v-show="dataList[1].length>0")
        p(class="content-title") 已退料
        .row-content(v-for="(item, index) in dataList[1]" 
                    :key="index"
                    @click="itemClick(item,'1')")
          .row-icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href='#iconicon_ranking')
          .material-content
            span(class="title") {{item.name}}
            span(class="name") {{item.material}}
            span(class="time") {{getYMDDateDecimalString(item.time)}}
    NullPage(v-show="dataList[0].length<=0&&dataList[1].length<=0")
    NewIcon(to='/product/return_list/return'
            :iconStyle="{position:'absolute'}")
</template>

<script>
import NewIcon from '_components/new_icon/'
import NullPage from '_components/null_page/';
import indexVue from '../process_list/index.vue'
import { ReturnList } from '_api/product'
import { getYMDDateDecimalString } from '_common/util';
export default {
  components: {
    NewIcon,
    NullPage
  },
  data() {
    return {
      dataList: {
        0:[],
        1:[],
      },   // 0:未退料 1：已退料
      currentIndex: 0,
      selectStyle: {
        fontSize: '15px',
        color: '#545454',
      },
      unSelectStyle: {
        fontSize: '13px',
        color: '#999999'
      }
    }
  },
  mounted() {
    this.initData()
  },

  methods: {
    getYMDDateDecimalString,
    async initData() {
      try {
        const { data } = await ReturnList()
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.dataList = data
          Object.values(this.dataList).forEach((item, index)=>{
            if(item.length>0) {
              this.currentIndex = index
              return
            }
          })
        }
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
    titleClick(index) {
      this.currentIndex = index
    },
    itemClick(item,type) {
      // type: 1:已退料， 0：未退料
      this.$router.push(`/product/return_list/order_detail?id=${item.id}&state=${type}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .main
    width 100%
    height 100%
    background-color #ffffff
    display flex
    flex-direction column
    .title-content
      padding-top 20px
      padding-bottom 10px
      padding-left 10px
      width 100%
      display flex
      align-items center
      background-color #ffffff
    .content
      width 100%
      flex 1
      display flex
      flex-direction column
      align-items center
      overflow-y scroll
      padding 0px 10px 10px 10px
      .item-content
        margin-top 10px
        background-color #ffffff 
        box-shadow:0px 0px 10px 0px rgba(35,121,191,0.2);
        border-radius:8px;
        padding 15px 0px 20px 15px
        width 100%
        .content-title
          font-size 15px
          color #545454
          margin-bottom 7px
        .row-content
          display flex
          flex-direction row
          margin-top 20px
          .row-icon
            height 20px
            width 20px
            display flex
            justify-content center
            align-items center
          .material-content
            display flex
            flex-direction column
            margin-top 5px
            margin-left 5px
            width 80%
            .title
              font-size 14px
              color #545454
            .name
              font-size 12px
              color #7A7A7A
              margin-top 3px
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
            .time
              font-size 12px
              color #999999
              margin-top 3px
    // .add-icon
    //   width 84px
    //   height 84px
      // position fixed
      // right 20px
      // bottom 20px
      
</style>



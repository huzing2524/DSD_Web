<template lang="pug">
  .main
    .title-content
      span(:style="currentIndex==0?selectStyle:unSelectStyle" @click="titleClick(0)") {{`未备料${dataList['0'].length}`}}
      span(:style="[currentIndex==1?selectStyle:unSelectStyle, {'marginLeft':'15px'}]" @click="titleClick(1)") {{`待领料${dataList['1'].length}`}}
      span(:style="[currentIndex==2?selectStyle:unSelectStyle, {'marginLeft':'15px'}]" @click="titleClick(2)") {{`已领料${dataList['2'].length}`}}
    .content
      .item-content(v-show="dataList[0].length>0")
        p(class="content-title") 未备料
        .row-content(v-for="(item, index) in dataList[0]" :key="index")
          .row-icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href='#iconicon_ranking')
          .material-content(@click="itemClick(item)")
            span(class="title") {{item.name}}
            span(class="name") {{item.material}}
            span(class="time") {{getYMDDateDecimalString(item.time)}}
      
      .item-content(v-show="dataList[1].length>0")
        p(class="content-title") 待领料
        .row-content(v-for="(item, index) in dataList[1]" :key="index")
          .row-icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href='#iconicon_ranking')
          .material-content(@click="itemClick(item)")
            span(class="title") {{item.name}}
            span(class="name") {{item.material}}
            span(class="time") {{getYMDDateDecimalString(item.time)}}
      
      .item-content(v-show="dataList[2].length>0"
                    :style="{marginTop:dataList[0].length>0?'10px':'0px'}")
        p(class="content-title") 已领料
        .row-content(v-for="(item, index) in dataList[2]" :key="index")
          .row-icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href='#iconicon_ranking')
          .material-content(@click="itemClick(item)")
            span(class="title") {{item.name}}
            span(class="name") {{item.material}}
            span(class="time") {{getYMDDateDecimalString(item.time)}}
    NullPage(v-show="showNullPage")
    NewIcon(to='/product/supplement_list/supplement'
            :iconStyle="{position:'absolute'}")
</template>

<script>
import NewIcon from '_components/new_icon/'
import { SupplementList } from '_api/product'
import { getYMDDateDecimalString } from '_common/util'
import NullPage from '_components/null_page';
export default {
  components: {
    NullPage,
    NewIcon,
  },
  data() {
    return {
      dataList: {
        0:[],
        1:[],
        2:[]
      },   // 0:未备料 1：带领料 2： 已领料
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
  computed: {
    showNullPage() {
      let isShowPage = true
      Object.values(this.dataList).forEach(item => {
        if(item.length > 0) {
          isShowPage = false
          return
        }
      })
      return isShowPage
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    getYMDDateDecimalString,
    async initData() {
        try {
          const { data } = await SupplementList()
          if(data.errmsg) {
            this.$toast(errmsg)
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
      itemClick(item) {
        this.$router.push(`/product/supplement_list/order_detail?id=${item.id}`)
      }
  }
}
</script>

<style lang="stylus" scoped>
  .main
    width 100%
    height 100%
    display flex
    flex-direction column
    background-color #ffffff
    .title-content
      padding-top 20px
      padding-bottom 10px
      padding-left 10px
      width 100%
      display flex
      align-items center
      background-color rgba(0,0,0,0)
    .content
      padding 0px 10px 0px 10px
      overflow-y scroll
      margin-top 3px
      flex 1
      .item-content
        background-color #ffffff 
        box-shadow:0px 0px 10px 0px rgba(35,121,191,0.2);
        border-radius:8px;
        padding 15px 0px 20px 15px
        margin-top 10px
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
      .add-icon
        width 84px
        height 84px
        position fixed
        right 20px
        bottom 20px
      
</style>



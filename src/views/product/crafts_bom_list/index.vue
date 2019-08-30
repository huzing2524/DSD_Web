<template lang="pug">
  .main(ref="listContainer")
    .title-content
      span(:style="currentIndex==0?selectStyle:unSelectStyle" @click="titleClick(0)") {{`已添加工艺${dataList.yes.length}`}}
      span(:style="[currentIndex==1?selectStyle:unSelectStyle, {'marginLeft':'15px'}]" @click="titleClick(1)") {{`未添加的工艺${dataList.no.length}`}}
    .content
      .item-content(ref="addContent"
                    v-show="dataList.yes.length>0")
        p(class="content-title") 已添加工艺
        .item(v-for="(addItem, addIndex) in dataList.yes"
              :key="addIndex"
              @click="itemClick(addItem)")
          p(class="item-title") {{addItem.name}}
          p(class="item-count") {{addItem.count}}
          p(class="item-id") {{addItem.id}}
      .item-content(v-show="dataList.no.length>0" :style="{marginTop:'10px'}")
        p(class="content-title") 待添加工艺
        .item(v-for="(item, index) in dataList.no"
              :key="index"
              @click="itemClick(item)")
          p(class="item-title") {{item.name}}
          p(class="item-count") {{item.count}}
          p(class="item-id") {{item.id}}
    NullPage(v-show="dataList.yes<=0&&dataList.no<=0")
</template>

<script>
import NewIcon from '_components/new_icon/'
import NullPage from '_components/null_page/';
import { CraftsList } from '_api/product'
export default {
  components: {
    NewIcon,
    NullPage
  },
  data() {
    return {
      currentIndex: 0,
      dataList: {
        yes: [],
        no: [],
      },
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
    async initData() {
      try {
        const { data } = await CraftsList()
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
      if(index==0) {
        this.$refs.listContainer.scrollTop = 0
      } else {
        this.$refs.listContainer.scrollTop = this.$refs.addContent.clientHeight
      }
    },
    itemClick(item) {
      this.$store.commit('product/Bom_Product', item)
      this.$router.push(`/product/crafts_bom_list/detail?id=${item.id}`)
    }
  },
}
</script>

<style lang="stylus" scoped>
  .main
    width 100%
    height 100%
    padding-bottom 20px
    overflow-y scroll
    background-color #ffffff
    display flex
    flex-direction column
    .title-content
      padding-left 10px
      height 55px
      width 100%
      display flex
      align-items center
      position fixed
      background-color #fff
    .content
      margin-top 61px
      padding 0px 10px 0px 10px
      background-color #fff
      .item-content
        background-color #ffffff
        box-shadow:0px 0px 10px 0px rgba(35,121,191,0.2);
        border-radius:8px;
        padding 15px 0px 20px 15px
        .content-title
          font-size 15px
          color #545454
        .item-title
          font-size 14px
          color #545454
          margin-top 15px
        .item-count
          font-size 12px
          color #7a7a7a
          margin-top 4px
        .item-id
          font-size 12px
          color #999999
          margin-top 4px
</style>



<template lang="pug">
  .main
    .content
      .add-input
        input(placeholder="填写物料名称"
              v-model="searchName"
              @input="input"
              class="input")
        .close-icon(@click="clean")
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconguanb")
      .under-line
      .result-content
        .result-item(v-for="(item, index) in resultDatas" 
                    :key="index"
                    @click="itemClick(item)")
          span(class="item-title") {{item.name}}
          span(class="item-subtitle") {{item.category_name}}
    span(class="no-material-span" @click="noneGoods") 没有找到对应物料？
</template>

<script>
import { GoodsSearch } from '_api/product'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      resultDatas:[],
      searchName:''
    }
  },
  methods: {
    clean() {
      this.searchName = ""
      this.searchName = []
    },
    noneGoods() {
      this.$store.commit('product/Goods_Add_Type', '0')
      this.$router.push('/product/goods_list/create')
    },
    input(event) {
      const { target } = event
      const { value } = target
      this.searchGoods(value)
    },
    async searchGoods(value) {
      try {
        const { data } = await GoodsSearch({name: value})
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.resultDatas = data
        }
      } catch (error) {
        this.$toast('数据获取失败')
      }
    },
    itemClick(item) {
      const { id } = item
      this.$store.commit('product/Goods_Add_Type', '1')
      this.$router.push(`/product/goods_list/detail?id=${id}`)
    }
  },
}
</script>

<style lang="stylus" scoped>
  .main
    height 100%
    width 100%
    background-color #ffffff
    padding 39px 25px 0px 25px
    display flex
    justify-content  center
    .content
      height 40vh
      width 100%
      .add-input
        width 100%
        height 38px
        font-size 15px
        font-weight 400
        display flex
        flex-direction row
        align-items center
        .input
          height 38px
          flex 1
        .close-icon
          display flex
          justify-content center
          align-items center
          height 15px
          width 15px
      .under-line
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
          .item-subtitle
            minititle()
            margin-top 5px

    .no-material-span
      color rgba(0,141,255,1)
      width 100%
      font-weight 400
      font-size 14px
      position fixed
      text-align center
      bottom 20px
</style>



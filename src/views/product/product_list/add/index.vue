<template lang="pug">
  .main
    .add-input
      input(placeholder="填写产品名称"
            v-model="searchName"
            @input="input")
      .under-line
      .result-content
        .result-item(v-for="(item, index) in resultDatas" 
                    :key="index"
                    @click="itemClick(item)")
          span(class="item-title") {{item.name}}
          span(class="item-subtitle") {{item.category_name}}
    span(class="no-material-span" @click="noneGoods") 没有找到对应产品？
</template>

<script>
import { ProductSearch } from '_api/product'
export default {
  data() {
    return {
      resultDatas:[],
      searchName:''
    }
  },
  methods: {
    noneGoods() {
      this.$store.commit('product/Product_Add_Type','0')
      this.$router.push('/product/product_list/create')
    },
    input(event) {
      const { target } = event
      const { value } = target
      this.searchProduct(value)
    },
    async searchProduct(value) {
      try {
        const { data } = await ProductSearch({name: value})
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
      this.$store.commit('product/Product_Add_Type','1')
      this.$router.push(`/product/product_list/detail?id=${id}`)
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



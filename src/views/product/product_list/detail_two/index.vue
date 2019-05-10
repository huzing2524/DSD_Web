<template lang="pug">
  .main
    .title
      p {{`${product.name}`}}
    .detail
      p {{`编码：${product.id}`}}
    .detail
      p {{`单位：${product.unit}`}}
    .detail
      p {{`售价：${product.price||'未设置'}`}}
    .detail
      p {{`安全库存：${product.safety||'未设置'}`}}
    .detail
      p {{`生产损耗率：${product.loss_coefficient}`}}
    .detail
      p {{`类目：${product.category}`}}
    .detail
      p {{`添加时间：${date}`}}
    .edit-content
      .change-btn(@click="change")
        .btn-title
          p 修改
</template>

<script>
import { ProductDetail } from '_api/product'
import { getYMDDateDecimalString } from '_common/util'
export default {
  data() {
    return {
      product :{}
    }
  },
  computed: {
    queryId() {
      return this.$route.query.id
    },
    date() {
      return getYMDDateDecimalString(this.product.time)
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData() {
      const { data } = await ProductDetail(this.queryId)
      if(data.errmsg) {
        this.$toast(data.errmsg)
      }else {
        this.product = data
      }
    },
    change() {
      this.$store.commit('product/Product_Detail',this.product)
      this.$router.push(`/product/product_list/change?id=${this.queryId}`)
    }
  },
}
</script>

<style lang="stylus" scoped>
  .main
    width 100%
    height 100%
    padding-top  15px
    background-color #ffffff
    .title
      font-size 15px
      font-weight 500
      color #545454
      margin-left 15px
    .detail 
      margin-left 15px
      margin-top 10px
      font-size 14px
      font-weight 400
      color #666666
    .edit-content
      position fixed
      height 62px
      width 100%
      border-top 1px solid #cccccc
      display flex
      align-items center
      bottom 0px
      .change-btn
        height 32px
        width 92px
        position absolute
        right 15px
        display flex
        align-items center
        justify-content center
        border-width 1px
        border-style solid
        border-color #4da8ee
        border-radius 16px
        .btn-title
          color #4da8ee
          font-size 14px
          fontwei 400
</style>



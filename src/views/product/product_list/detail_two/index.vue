<template lang="pug">
  .main
    DetailCellInformation(iconHref="#iconicon_product"
                          :title="product.name"
                          :list="productInformation"
                          :showLine="false")

    DetailCellInformation(iconHref="#iconxinxi"
                          title="出售信息"
                          :list="saleInformation"
                          :style="{marginTop:'10px'}"
                          :showLine="false")

    DetailCellInformation(iconHref="#iconshengxi"
                          title="生产信息"
                          :list="makeInformation"
                          :style="{marginTop:'10px'}"
                          :showLine="false")
    //- .title
    //-   p {{`${product.name}`}}
    //- .detail
    //-   p {{`编码：${product.id}`}}
    //- .detail
    //-   p {{`单位：${product.unit}`}}
    //- .detail
    //-   p {{`售价：${product.price||'0'}`}}
    //- .detail
    //-   p {{`安全库存：${product.safety||'0'}`}}
    //- .detail
    //-   p {{`生产损耗率：${product.loss_coefficient}`}}
    //- .detail
    //-   p {{`类目：${product.category}`}}
    //- .detail
    //-   p {{`添加时间：${date}`}}
    .edit-content
      .change-btn(@click="change")
        .btn-title
          p 修改
</template>

<script>
import { ProductDetail } from '_api/product'
import { getYMDDateDecimalString } from '_common/util'
import DetailCellInformation from '_components/product/detail_cell_information'
export default {
  components: {
    DetailCellInformation
  },
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
    },
    productInformation() {
      return [
        `编码：${this.product.id}`,
        `单位：${this.product.unit}`,
        `安全库存：${this.product.safety||'0'}`,
        `类目：${this.product.category}`,
      ]
    },
    saleInformation() {
      return [
        this.product.price?`售价：${(this.product.price+'元/'+this.product.unit)}`:"0",
        `最小起订量：${this.product.lowest_count||'0'}`,
        `最小包装量：${this.product.lowest_package||'0'}`
      ]
    },
    makeInformation() {
      return [
        `生产损耗率：${this.product.loss_coefficient||'0'}`,
        `最小生产量：${this.product.lowest_product||'0'}`
      ]
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
    background-color #E6EAED
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
      background-color #fff
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



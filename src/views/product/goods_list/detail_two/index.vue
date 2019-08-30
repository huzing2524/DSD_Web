<template lang="pug">
  .main
    DetailCellInformation(iconHref="#iconicon_product"
                          :title="goods.name"
                          :list="goodInformation")
    DetailCellInformation(iconHref="#iconcaigou"
                          title="采购信息"
                          :list="purchaseInformation"
                          :style="{marginTop:'10px'}"
                          :showLine="false")
    .detail
      p {{`添加时间：${goodsTime}`}}
    
    .edit-content
      .change-btn(@click="change")
        .btn-title
          p 修改
</template>

<script>
import DetailCellInformation from '_components/product/detail_cell_information'
import { getYMDDateDecimalString } from '_common/util'
import { GoodsDetail } from '_api/product'
export default {
  components: {
    DetailCellInformation
  },
  data() {
    return {
      goods :{}
    }
  },
  computed: {
    queryId() {
      const { query } = this.$route
      return query.id
    },
    goodsTime() {
      return getYMDDateDecimalString(this.goods.time)
    },
    goodInformation() {
      return [
        `编码：${this.goods.id}`,
        `单位：${this.goods.unit}`,
        `安全库存：${this.goods.safety||'0'}`,
        `类目：${this.goods.category}`
      ]
    },
    purchaseInformation() {
      return [
        `单位成本价：${(this.goods.price+'/'+this.goods.unit)||'0'}`,
        `采购损耗率：${this.goods.loss_coefficient}`
      ]
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData() {
      try {
        const { data } = await GoodsDetail(this.queryId)
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.goods = data
        }
      } catch (error) {
        this.$toast('请求数据出错')
      }
    },
    change() {
      this.$store.commit('product/Goods_Detail', this.goods)
      this.$router.push(`/product/goods_list/change?id=${this.queryId}`)
    }
  },
}
</script>

<style lang="stylus" scoped>
  .main
    width 100%
    height 100%
    background-color #E6EAED
    .detail 
      margin-right 15px
      margin-top 10px
      font-size 14px
      font-weight 400
      color #999999
      text-align right
    .edit-content
      position fixed
      height 62px
      width 100%
      background-color #fff
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



<template lang="pug">
  .main
    .title
      p {{`${goods.name}`}}
    .detail
      p {{`编码：${goods.id}`}}
    .detail
      p {{`单位：${goods.unit}`}}
    .detail
      p {{`售价：${goods.price||'未设置'}`}}
    .detail
      p {{`最小采购量：${goods.lowest_count||'未设置'}`}}
    .detail
      p {{`安全库存：${goods.safety||'未设置'}`}}
    .detail
      p {{`生产损耗率：${goods.loss_coefficient}`}}
    .detail
      p {{`类目：${goods.category}`}}
    .detail
      p {{`添加时间：${goodsTime}`}}
    .edit-content
      .change-btn(@click="change")
        .btn-title
          p 修改
</template>

<script>
import { getYMDDateDecimalString } from '_common/util'
import { GoodsDetail } from '_api/product'
export default {
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



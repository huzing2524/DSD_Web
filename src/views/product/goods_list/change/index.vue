<template lang="pug">
  .main
    .goods-input
      span 售价
      input(placeholder="填写成本价",v-model="price")
    .goods-input
      span 最小采购
      input(placeholder="填写最小采购量",v-model="count")
    .goods-input
      span 安全库存
      input(placeholder="填写最安全库存",v-model="store")
    .goods-input
      span 生产损耗率
      input(placeholder="0-0.99",v-model="lossRate")
    StepButton(title="保存",class="step-button",@click="changeData")
</template>

<script>
import { GoodsPriceChange } from '_api/product'
import StepButton from '_components/product/step_button/'
import {mapState} from 'vuex'

export default {
  components: {
      StepButton
  },
  data() {
    return {
      price: '',
      count: '',
      store: '',
      lossRate: '',
      titleStyle: {
        fontSize:'40px'
      }
    }
  }, 
  computed: {
    ...mapState('product',{
      goodsDetail: state=>state.goodsDetail
    }),
    queryId() {
      const { query } = this.$route
      return query.id
    }
  },
  mounted() {
    this.price = this.goodsDetail.price || 0
    this.count = this.goodsDetail.lowest_count || 0
    this.store = this.goodsDetail.safety || 0
    this.lossRate = this.goodsDetail.loss_coefficient || 0
  },
  methods: {
    async changeData() {
      if(this.price.length <= 0) {
        return this.$toast('请填写成本价')
      }
      if(this.count.length <= 0) {
        return this.$toast('请填写最小采购量')
      }
      if(this.store.length <= 0) {
        return this.$toast('请填写安全库存')
      }
      if(this.lossRate.length <= 0) {
        return this.$toast('请填写生产损耗率')
      }
      const body = {
          price: this.price,
          lowest_count: this.count,
          safety: this.store,
          loss_coefficient: parseFloat(this.lossRate)
        }
      
      // cosnt data = 
      // [{name: 'aaaa', price: '222'}, {name: 'aaaa', price: '222'}]


      try {
        const { data } = await GoodsPriceChange(body, this.queryId)
        if (data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.$router.go(-2)
        }
      } catch (error) {
        this.$toast('操作失败')
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
  .main
    width: 100%
    height: 100%
    background-color #e6eaed
    padding-top 10px
    .goods-input
      display flex
      flex-direction row
      margin-top 1px
      background-color #ffffff
      height 50px
      align-items center
      padding 0px 15px 0px 15px
      justify-content space-between
      span
        font-size 15px
        font-weight 400
        color rgba(84,84,84,1)
      input
        flex 1
        text-align right 
        margin-left 10px
        color #545454
        font-size 14px
    .step-button
      width 80%
      margin-left 10%
    
</style>



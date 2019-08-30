<template lang="pug">
  .main
    InformationInput(title="安全库存" placeholder="请填写安全库存" :value="store" v-model="store")
    InformationInput(title="单位产品售价（元）" placeholder="请填写安全库存" :value="price" v-model="price" :style="{marginTop:'10px'}")
    InformationInput(title="采购损耗率" placeholder="请填写安全库存" :value="lossRate" v-model="lossRate")

    StepButton(title="保存",class="step-button",@click="changeData")
</template>

<script>
import InformationInput from '_components/product/information_input/'
import { GoodsPriceChange } from '_api/product'
import StepButton from '_components/product/step_button/'
import {mapState} from 'vuex'

export default {
  components: {
      StepButton,
      InformationInput,
  },
  data() {
    return {
      price: '',
      count: '',
      store: '20',
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
    this.price = this.goodsDetail.price || '0'
    this.count = this.goodsDetail.lowest_count || '0'
    this.store = this.goodsDetail.safety || '0'
    this.lossRate = this.goodsDetail.loss_coefficient || '0'
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
      if(this.lossRate >= 1) {
        return this.$toast('生产损耗率不能大于1')
      }
      const body = {
          price: this.price,
          lowest_count: this.count,
          safety: this.store,
          loss_coefficient: parseFloat(this.lossRate)
        }
      
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



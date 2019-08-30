<template lang="pug">
  .main
    InformationInput(title="安全库存" placeholder="请填写安全库存" :value="safety" v-model="safety")
    InformationInput(title="单位产品售价（元）" placeholder="请填写单位售价" :value="price" v-model="price" :style="{marginTop:'10px'}")
    InformationInput(title="最小起订量" placeholder="请填写最小起订量" :value="lowest_count" v-model="lowest_count")
    InformationInput(title="最小包装量" placeholder="请填写最小包装量" :value="lowest_package" v-model="lowest_package")
    InformationInput(title="生产损耗率" placeholder="请填写生产损耗率" :value="loss_coefficient" v-model="loss_coefficient" :style="{marginTop:'10px'}")
    InformationInput(title="最小生产量" placeholder="请填写最小生产量" :value="lowest_product" v-model="lowest_product")
    StepButton(title="保存",class="step-button",@click="click")
</template>


<script>
import { ProductPriceChange } from '_api/product'
import InformationInput from '_components/product/information_input/'
import StepButton from '_components/product/step_button/'
import {mapState} from 'vuex'
export default {
  components: {
      StepButton,
      InformationInput
  },
  data() {
    return {
      price: '',
      safety: '',
      loss_coefficient: '',
      lowest_count: '',
      lowest_package:'',
      lowest_product: '',
      titleStyle: {
        fontSize:'40px'
      }
    }
  },
  computed: {
    ...mapState('product',{
      productDetail: state=>state.productDetail
    }),
    queryId() {
      return this.$route.query.id
    }
  },
  mounted() {
    this.price = this.productDetail.price || '0'
    this.safety = this.productDetail.safety || '0'
    this.loss_coefficient = this.productDetail.loss_coefficient || '0'
    this.lowest_count = this.productDetail.lowest_count || '0'
    this.lowest_package = this.productDetail.lowest_package || '0'
    this.lowest_product = this.productDetail.lowest_product || '0'
  },
  methods: {
    async click() {
      // 判空
      if(!this.safety) {
        return this.$toast('请填写安全库存')
      }
      if(!this.price) {
        return this.$toast('请填写单位产品售价')
      }
      if(!this.lowest_count) {
        return this.$toast('请填写最小起订量')
      }
      if(!this.lowest_package) {
        return this.$toast('请填写最小包装量')
      }
      if(!this.loss_coefficient) {
        return this.$toast('请填写生产损耗率')
      }
      if(this.loss_coefficient>=1) {
        return this.$toast('生产损耗率不能大于1')
      }
      if(!this.lowest_product) {
        return this.$toast('请填写最小生产量')
      }
      try {
        const body = {
          price:this.price, 
          safety:this.safety, 
          loss_coefficient:this.loss_coefficient, 
          lowest_package: this.lowest_package, 
          lowest_product: this.lowest_product, 
          lowest_count: this.lowest_count}
        const { data } = await ProductPriceChange(body,this.queryId)
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.$router.go(-2)
        }
      } catch (error) {
        console.log(error)
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



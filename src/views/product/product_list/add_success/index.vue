<template lang="pug">
  .main
    InformationHeader(borderTitle="已添加" :title="queryName" :subtitle="`单位：${queryUnit}`")
    p(class="setup-title") 设置产品基础配置项
    InformationInput(title="安全库存" placeholder="请填写安全库存" v-model="safety")
    InformationInput(title="单位产品售价（元）" placeholder="请填写单位产品售价" v-model="price" :style="{marginTop:'10px'}")
    InformationInput(title="最小起订量" placeholder="请填写最小起订量" v-model="lowestCount")
    InformationInput(title="最小包装量" placeholder="请填写最小包装量" v-model="lowestPackage")
    InformationInput(title="生产损耗率" placeholder="0-0.99" v-model="lossCoefficient" :style="{marginTop:'10px'}")
    InformationInput(title="最小生产量" placeholder="请填写最小生产量" v-model="lowestProduct")
    BottomButton(title="保存并返回" @buttonClick="save")
</template>

<script>
import { ProductPriceChange } from '_api/product'
import { mapState } from 'vuex';
import InformationHeader from '_components/product/information_header'
import InformationInput from '_components/product/information_input/'
import BottomButton from '_components/product/information_bottom_button/'
export default {
  components: {
    InformationInput,
    BottomButton,
    InformationHeader
  },
  data() {
    return {
      price: '',
      lowestCount: '',
      lowestPackage: '',
      lowestProduct: '',
      lossCoefficient: '',
      safety: '',
    }
  },
  computed: {
    ...mapState('product',
      {
        productAddType: state => state.productAddType
      }
    ),
    queryName() {
      return this.$route.query.name
    },
    queryId() {
      return this.$route.query.id
    },
    queryUnit() {
      return this.$route.query.unit || ''
    }
  },
  methods: {
    async save() {
      // 判空
      // 判空
      if(!this.safety) {
        return this.$toast('请填写安全库存')
      }
      if(!this.price) {
        return this.$toast('请填写单位产品售价')
      }
      if(!this.lowestCount) {
        return this.$toast('请填写最小起订量')
      }
      if(!this.lowestPackage) {
        return this.$toast('请填写最小包装量')
      }
      if(!this.lossCoefficient) {
        return this.$toast('请填写生产损耗率')
      }
      if(this.lossCoefficient>=1) {
        return this.$toast('生产损耗率不能大于1')
      }
      if(!this.lowestProduct) {
        return this.$toast('请填写最小生产量')
      }
      try {
        const body = {
          price:this.price, 
          safety:this.safety, 
          loss_coefficient:this.lossCoefficient, 
          lowest_package: this.lowestPackage, 
          lowest_product: this.lowestProduct, 
          lowest_count: this.lowestCount}
        const { data } = await ProductPriceChange(body,this.queryId)
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          // 新增-4 搜索-3
          if(this.productAddType == '0') {
            this.$router.go(-4)
          } else {
            this.$router.go(-3)
          }
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
    width 100%
    height 100%
    background-color #E6EAED
    .setup-title
      title()
      padding 10px 0px 10px 10px
      font-weight 500
      
</style>



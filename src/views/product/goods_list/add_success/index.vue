<template lang="pug">
  .main
    InformationHeader(borderTitle="已添加" :title="queryName" :subtitle="`单位：${queryUnit}`")
    p(class="setup-title") 设置物料基础配置项
    InformationInput(title="安全库存" placeholder="请填写安全库存" v-model="store")
    InformationInput(title="单位产品售价（元）" placeholder="请填写单位产品售价" v-model="price" :style="{marginTop:'10px'}")
    InformationInput(title="采购率损耗率" placeholder="0-0.99" v-model="lossRate")
    BottomButton(title="保存并返回" @buttonClick="saveClick")
</template>

<script>
import { GoodsPriceCount } from '_api/product'
import { mapState } from 'vuex'
import InformationHeader from '_components/product/information_header'
import InformationInput from '_components/product/information_input/'
import BottomButton from '_components/product/information_bottom_button/'
export default {
  components:{
    InformationHeader,
    InformationInput,
    BottomButton
  },
  data() {
    return {
      price: '',
      store: '',
      lossRate: '',
    }
  },
  computed: {
    ...mapState('product', {
      goodsAddType: state => state.goodsAddType  // 0: 创建物料  1：新增物料
    }),
    queryId() {
      return this.$route.query.id
    },
    queryName() {
      return this.$route.query.name
    },
    queryUnit() {
      return this.$route.query.unit
    }
  },
  methods: {
    async saveClick() {
      if(this.store.length <= 0) {
        return this.$toast('请填写安全库存')
      }
      if(this.price <= 0) {
        return this.$toast('请填写单位产品售价')
      }
      if(this.lossRate.length <= 0) {
        return this.$toast('请填写损耗率')
      }
      if(this.lossRate >= 1) {
        return this.$toast('生产损耗率不能大于1')
      }
      try {
        const body = {price: this.price, safety: this.store, loss_coefficient: this.lossRate}
        const { data } = await GoodsPriceCount(body, this.queryId)
        if(data.errmsg) {
          this.$toast(data.errmsg)
        }else {
          // 跳转回物料目录页面
          // 新增 -4 搜索 -3
          if(this.goodsAddType == '0') {
            this.$router.go(-4)
          } else {
            this.$router.go(-3)
          }
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
    width 100%
    height 100%
    background-color #E6EAED
    .setup-title
      title()
      padding 10px 0px 10px 10px
      font-weight 500
</style>



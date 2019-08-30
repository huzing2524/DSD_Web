<template lang="pug">
  .main
    InformationInput(title="产品名称" placeholder="填写产品名称" v-model="name")
    InformationInput(title="产品单位" placeholder="填写产品单位" v-model="unit")
    .next-step(@click="nextStep")
      p 下一步
</template>

<script>
// import { ProductCreate } from '_api/product'
import InformationInput from '_components/product/information_input'
export default {
  components: {
    InformationInput
  },
  data() {
    return {
      name:'',
      unit:'',
    }
  },
  methods: {
    async nextStep() {
      // 判空
      if(this.name.length<=0) {
        return this.$toast('请填写物料名称')
      }
      if(this.unit.length<=0 || !isNaN(parseInt(this.unit))) {
        return this.$toast('请填写正确物料单位')
      }
      this.$router.push(`/product/product_list/detail?type=1&name=${this.name}&unit=${this.unit}`)
    }
  },
}
</script>

<style lang="stylus" scoped>
  .main
    width 100%
    height 100%
    background-color #E6EAED
    display flex
    flex-direction column
    align-items center
    .next-step
      display flex
      justify-content center
      align-items center
      background-color rgba(30,154,255,1)
      border-radius 22px
      height 44px
      width 180px
      margin-top 40px
      p
        color white
        font-size 15px
        font-weight 400

</style>



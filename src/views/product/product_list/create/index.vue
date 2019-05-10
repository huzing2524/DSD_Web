<template lang="pug">
  .main
    .goods-input
      .input-name
        p 产品名称
      .input
        input(placeholder="填写物料名称",v-model="name")
    .goods-input(margin-top='36px')
      .input-name
        p 产品单位
      .input
        input(placeholder="填写物料单位",v-model="unit")
    .next-step(@click="nextStep")
      p 下一步
</template>

<script>
// import { ProductCreate } from '_api/product'
export default {
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
      if(this.unit.length<=0) {
        return this.$toast('请填写物料单位')
      }
      this.$router.push(`/product/product_list/detail?type=1&name=${this.name}&unit=${this.unit}`)
      // try {
      //   const body = {name: this.name, unit: this.unit }
      //   const {data} = await ProductCreate(body)
      //   if(data.errmsg) {
      //     this.$toast(data.errmsg)
      //   } else {
      //     this.$router.push(`/product/product_list/detail?id=${data.id}`)
      //   }
      // } catch (error) {
      //   this.$toast('操作失败')
      // }
    }
  },
}
</script>

<style lang="stylus" scoped>
  .main
    width 100%
    height 100%
    background-color white
    padding 11px 20px 0px 25px
    .goods-input
      display flex
      flex-direction row
      margin-top 25px
      .input-name
        font-size 15px
        font-weight 400
        color rgba(84,84,84,1)
      .input
        flex 1
        margin-left 10px
        color rgba(153,153,153,1)
        font-size 14px
        border-bottom 1px solid rgba(204,204,204,1)
    .next-step
      display flex
      justify-content center
      align-items center
      background-color rgba(30,154,255,1)
      border-radius 22px
      height 44px
      margin-top 40px
      p
        color white
        font-size 15px
        font-weight 400

</style>



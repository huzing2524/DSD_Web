<template lang="pug">
  .main.full_box
    .product_info
      p {{product.name + "/" + product.unit}}
      input(placeholder="填写价格",v-model="product.price")
    button.ten_bottom_margin(@click="setPrice")  置为供应商定价
    button(@click="savePrice")  保存
</template>

<script>
  // import { GoodsPriceChange } from '../../../../api/purchase'
  import {mapState} from "vuex";

  export default {
    data() {
      return {
        product: {
          name: '防尘口罩',
          unit: '个',
          price: '2',
        }
      }
    },
    computed: {
      ...mapState('purchase',{
        getData: function (state) {
          return state.product
        },
      }),
    },
    methods: {
      setPrice() {
        console.log(this.getData.id)
        alert("设置价格")
      },
      async savePrice() {
        if(this.product.price.length <= 0) {
          return this.$toast('请填写成本价')
        }
        const body = {
          price: this.price,
          lowest_count: this.count
        }
        try {
          const { data } = await GoodsPriceChange(body, this.queryId)
          if (data.errmsg) {
            this.$toast(data.errmsg)
          } else {
            this.$router.go(-1)
          }
        } catch (error) {
          this.$toast('操作失败')
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .main
    background-color #E6EAED
    display flex
    flex-direction column
    .product_info
      bgf()
      display flex
      flex-direction row
      justify-content space-between
      margin-top 10px
      margin-bottom 20px
      align-items center
      padding 15px
      align-items center
      p
        display flex
        fsc(14px, #545454)
        margin-right 10px
        align-items center
      input
        fsc(14px, #545454)
        text-align right
        flex 1
    button
      height 48px
      background white
      border-radius 24px
      font-size 15px
      outline null
      margin-left 20px
      margin-right 20px
      border:1px solid white;
      color #1E9AFF
      &:nth-of-type(2)
        border:1px solid white;
        background:rgba(30,154,255,1);
        color white
      &.ten_bottom_margin
        margin-bottom 10px
</style>

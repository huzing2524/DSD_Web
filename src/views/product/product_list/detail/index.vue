<template lang="pug">
  .main
    p(class="goods-name") {{product.name}}
    .content
      p(class="goods-id" v-show="queryType!=1") {{`编码：${product.id}`}}
      p(class="goods-id") {{`单位：${product.unit}`}}
      p(class="goods-id") {{`类目：${product.category}`}}
    .add-btn(@click="create")
      p(class="add-title") 添加

</template>

<script>
import { ProductDetail, ProductCreate } from '_api/product';
export default {
  data() {
    return {
      product: { }
    }
  },

  computed: {
    queryId() {
      return this.$route.query.id
    },
    queryType() {
      // 0：为搜索   1：新建
      return this.$route.query.type
    },
    queryName() {
      return this.$route.query.name
    },
    queryUnit() {
      return this.$route.query.unit
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData() {
      if(this.queryType == 1) {
        this.product = {
          name: this.queryName,
          category: '其他',
          unit: this.queryUnit,
          id: ''
        }
        return
      }
      try {
        const { data } = await ProductDetail(this.queryId)
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.product = data
        } 
      } catch (error) {
        this.$toast('操作失败')
      }
    },
    async create() {
      if(this.queryType == 1) {
        try {
          const body = {name: this.queryName, unit: this.queryUnit }
          const {data} = await ProductCreate(body)
          if(data.errmsg) {
            this.$toast(data.errmsg)
          } else {
            // this.$router.push(`/product/product_list/detail?id=${data.id}`)
            this.$router.push(`/product/product_list/add_success?id=${data.id}&name=${this.queryName}&unit=${this.queryUnit}`)
          }
        } catch (error) {
          this.$toast('操作失败')
        }
        return
      }
      try {
        const body = { id:this.product.id, category_id:this.product.category_id }
        const { data } = await ProductCreate(body)
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.$router.push(`/product/product_list/add_success?id=${this.queryId}&name=${this.product.name}`)
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
    height 100%
    width 100%
    background-color white
    padding 15px
    display flex
    flex-direction column
    .content
      margin-top 10px
      background-color #F5FBFF
      border-radius 6px
      display flex
      flex-direction column
      padding 0px 0px 10px 10px
    .goods-name
      font-size 15px
      font-weight 500
      color rgba(84,84,84,1)
    .goods-id
      font-size 14px
      font-weight 400
      color rgba(102,102,102,1)
      margin-top 10px
    .add-btn
      display flex
      justify-content center
      align-items center
      background-color rgba(30,154,255,1)
      border-radius 22px
      height 44px
      width 180px
      align-self center
      margin-top 40px
      .add-title
        color white
        font-size 15px
        font-weight 400
</style>




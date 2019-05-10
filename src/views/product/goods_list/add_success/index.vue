<template lang="pug">
  .main
    .content
      .icon
        svg.ali_icon(aria-hidden="true")
          use(xlink:href='#iconsuccess')
      .added
        p 已添加
      .title-content
        .title
          p {{queryName}}
      .input-content
        .input-title
          p {{`成 本 价 `}} 
        input(class='input' placeholder="填写物料成本价",v-model="price")
      .input-content
        .input-title
          p {{`最小采购`}} 
        input(class='input' placeholder="填写最小采购量",v-model="count")
      .input-content
        .input-title
          p {{`安全库存`}} 
        input(class='input' placeholder="填写安全库存",v-model="store")
      .input-content
        .input-title
          p {{`生产损耗率`}} 
        input(class='input' placeholder="0-0.99",v-model="lossRate")
      .success-btn(@click="saveClick")
        .success-title
          p 保存并返回物料目录
</template>

<script>
import { GoodsPriceCount } from '_api/product'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      price: '',
      count: '',
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
    }
  },
  methods: {
    async saveClick() {
      if(this.price <= 0) {
        return this.$toast('请填写物料成本价')
      }
      if(this.count <= 0) {
        return this.$toast('请填写物料最小采购量')
      }
      if(this.store.length <= 0) {
        return this.$toast('请填写安全库存')
      }
      if(this.lossRate.length <= 0) {
        return this.$toast('请填写损耗率')
      }
      try {
        const body = {price: this.price, lowest_count: this.count, safety: this.store, loss_coefficient: this.lossRate}
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
    background-color white
    padding 30px 20px 0px 20px
    .content
      display flex
      flex-direction column
      align-items center
      .icon
        width 70px
        height 70px
      .added
        margin-top 10px
        color #545454
        font-size 15px
        font-weight 400
      .title-content
        width 100%
        margin-top 15px
        background-color #f1f8fe
        height 50px
        width 185px
        display flex
        align-items center
        justify-content center
        margin-bottom 16px
        .title
          font-size 15px
          color #545454
          font-weight 400
      .input-content
        margin-top 20px
        align-items center
        font-size 15px
        width 100%
        height 30px
        display flex
        flex-direction row
        .input-title
          margin-right 10px
        .input
          flex 1
          height 30px
          border-bottom 1px solid #cccccc
      .success-btn
        width 100%
        display flex
        justify-content center
        align-items center
        background-color rgba(30,154,255,1)
        border-radius 22px
        height 44px
        margin-top 40px
        .success-title
          color white
          font-size 15px
          font-weight 400
</style>



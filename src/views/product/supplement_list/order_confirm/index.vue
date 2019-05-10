<template lang="pug">
  .main
    .product-content
      .product-title-content
        .product-icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconicon_renwu1')
        span(class="product-title") 补料生产任务
      .product-item-content
        span(class="item-title") {{supplementTask.product}}
        span(class="item-subtitle") {{`计划生产：${supplementTask.target}`}}
        span(class="item-minititle") {{getYMDDateDecimalString(supplementTask.time)}}

    .product-content
      .product-title-content
        .product-icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconicon_remarks')
        span(class="product-title") 补料原因
      .product-item-content
        span(class="item-title") {{supplementRemark}}

    .product-content
      .product-title-content
        .product-icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconicon_cailiao')
        span(class="product-title") 补料清单
      .product-item-content(v-for="(item,index) in supplementMaterials" :key="index")
        .row-content
          span(class="item-title") {{item.name}}
          span(class="item-subtitle") {{`计划生产：${item.count}`}}
    .add-content
      .add-process(@click="orderConfirm")
        span 确认补料
</template>

<script>
import { mapState } from 'vuex'
import { getYMDDateDecimalString } from '_common/util';
export default {
  computed: {
    ...mapState('product', {
      supplementTask: (state) => state.supplementTask,
      supplementRemark: (state) => state.supplementRemark,
      supplementMaterials: (state) => state.supplementMaterials,
    })
  },
  methods: {
    getYMDDateDecimalString,
    orderConfirm() {
      // this.$router.push('/product/supplement_list/order_detail')
      this.$router.go(-4)
    }
  },
}
</script>

<style lang="stylus" scoped>
  .main
    width 100%
    height 100%
    background-color #E6EAED
    .product-content
      background-color #ffffff
      padding 15px
      margin-top 10px
      .product-title-content
        display flex
        flex-direction row
        align-items center
        width 100%
        .product-icon
          width 20px
          height 18px
          display flex
          align-items center
          justify-content center
        .product-title
          title()
          margin-left 5px
      .product-item-content
        margin-top 15px
        background-color #E9F5FF
        padding 15px
        display flex
        flex-direction column
        border-radius 6px
        .row-content
          display flex
          flex-direction row
          justify-content space-between
          align-items center
        .item-title
          title()
          margin-top 5px
        .item-subtitle
          subtitle()
          margin-top 5px
        .item-minititle
          minititle()
          margin-top 5px
    .add-content
      height 62px
      width 100%
      background-color #ffffff
      position fixed
      bottom 0px
      border-top 1px solid #EFEFEF
      .add-process
        position absolute
        right 15px
        top 15px
        display flex
        justify-content center
        align-items center
        background-color #1E9AFF
        border-radius 16px
        height 32px
        width 100px
        span 
          color #ffffff
          font-size 14px

</style>



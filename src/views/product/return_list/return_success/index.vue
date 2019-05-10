<template lang="pug">
  .main
    .content
      .icon
        svg.ali_icon(aria-hidden="true")
          use(xlink:href='#iconsuccess')
      .added
        p 已添加
      .title-content
        .title-row
          span(class="title") 创建人
          span(class="subtitle") {{orderData.creator_name}}
        .title-row
          span(class="title") 交接人
          span(class="subtitle") {{orderData.receiver_name}}
        .title-row
          span(class="title") 退料时间
          span(class="subtitle") {{getYMDDateDecimalString(orderData.time)}}
      .return-btn(@click="successClick")
        span(class="btn-title") 返回首页
</template>

<script>
import { getYMDDateDecimalString } from '_common/util'
import { ReturnDetail } from '_api/product'

export default {
  data() {
    return {
      orderData: {}
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData() {
      try {
        const { data } = await ReturnDetail(this.$route.query.id)
        if (data.errmsg) {
           this.$toast(data.errmsg)
        } else {
          this.orderData = data
        }
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
    getYMDDateDecimalString,
    successClick() {
      this.$router.push('/product')
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
        width 80vw
        margin-top 20px
        padding 0px 15px 15px 15px
        background-color #f1f8fe
        display flex
        flex-direction column
        align-items center
        border-radius 6px
        .title-row
          width 100%
          margin-top 15px
          display flex
          flex-direction row
          align-items center
          justify-content space-between
          .title
            title()
          .subtitle
            subtitle()
      .return-btn
        display flex
        align-items center
        justify-content center
        width 140px
        height 40px
        border-radius 20px
        border 1px solid #4988FC 
        position fixed
        bottom 15vh
        .btn-title
          font-size 15px
          color #4988FC
</style>



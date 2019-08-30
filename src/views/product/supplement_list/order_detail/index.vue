<template lang="pug">
  .main
    DetailRow(title="补料单号" :subtitle="orderData.id" iconHref="#iconicon_renwu1")
    DetailRow(title="补料状态" :subtitle="orderState" iconHref="#iconicon_renwu1" :showLine="false")    
    DetailCellReason(iconHref="#iconicon_remarks" title="补料原因" :remark="orderData.remark" :style="{marginTop:'10px'}")
    DetailCellPeople(iconHref="#iconicon_shenpi" 
                     title="申请人"
                     :name="orderData.creator"
                     :phone="orderData.phone"
                     :time="getYMDDateDecimalString(orderData.time)"
                     :imgUri="orderData.image"
                     @clickCall=""
                     )
    DetailCellOrder(iconHref="#iconicon_cailiao"
                    title="补料清单"
                    :orderList="orderData.material"
                    :style="{marginTop:'10px'}")
      template(v-slot:orderTitle="props") {{props.item.name}}
      template(v-slot:orderSubtitle="props") {{props.item.count}}

    .link-order(@click="linkClick")
      .link-icon
        svg.ali_icon(aria-hidden="true")
          use(xlink:href='#iconicon_lianjie')
      span(class="link-title") {{`关联订单：${orderData.order_id}`}}

</template>

<script>
import DetailRow from '_components/product/detail_row'
import DetailCellReason from '_components/product/detail_cell_reason'
import DetailCellPeople from '_components/product/detail_cell_people'
import DetailCellOrder from '_components/product/detail_cell_order'
import { SupplementDetail } from '_api/product';
import { getYMDDateDecimalString } from '_common/util';
export default {
  components: {
    DetailRow,
    DetailCellReason,
    DetailCellPeople,
    DetailCellOrder,
  },
  data() {
    return {
      orderData:{}
    }
  },
  computed: {
    queryId() {
      return this.$route.query.id
    },
    orderState() {
      const stateArr = ['未备料', '待领料', '已领料']
      return stateArr[this.orderData.state] || ''
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    getYMDDateDecimalString,
    async initData() {
      try {
        const { data } = await SupplementDetail(this.queryId)
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.orderData = data || {}
        }
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
    linkClick() {
      this.$router.push(`/order/order_detail?id=${this.orderData.order_id}`)
    }
  },
}
</script>

<style lang="stylus" scoped>
  .main
    width 100%
    height 100%
    background-color #E6EAED
    overflow-y scroll
    // padding 0px 0px 60px 0px
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
        .product-subtitle
          subtitle()
          position absolute
          right 15px
      .product-item-content
        margin-top 15px
        background-color #E9F5FF
        padding 15px 15px 5px 15px
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
          margin-bottom 10px
        .item-subtitle
          subtitle()
        .item-minititle
          minititle()
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
    .link-order
      height 50px
      width 100%
      background-color #ffffff
      display flex
      justify-content center
      align-items center
      position fixed
      bottom 0
      .link-icon
        width 20px
        height 20px
        display flex
        align-items center
        justify-content center
      .link-title
        font-size 14px
        color #1E9AFF
        margin-left 5px
        width 50%
        ellipsis(1)
        // overflow: hidden;
        // text-overflow:ellipsis;
        // white-space: nowrap;
        
</style>



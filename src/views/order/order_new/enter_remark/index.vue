<template lang="pug">
  .enter_remark.fbox
    div(v-doc-title="orderSub.isModify?'修改订单':''")
    .order_form_data
      .item_box.flex_box(@click="showDateTimePicker")
        .padd_l_r.flex_box
          img.left_icon(src="./date_icon.png")
          p.item_title 期望送达时间
          p.item_value {{getYMDHMDateString(orderSub.deliveryTime)}}
          img.arrow_right_img(src="./order_arrow_right.png")
      .item_box
        input(class="padd_l_r", type="text", placeholder="备注", v-model="orderSub.remark")
      router-link.sub_btn(to="/order/order_new") 下一步
</template>

<script>
  import {getYMDHMDateString} from '_common/util/'
  import {mapState, mapActions} from 'vuex'
  export default {
    components: {},
    data() {
      return {
        getYMDHMDateString,
      }
    },
    computed: {
      ...mapState('order', {
        orderSub: state => state.orderSub
      }),
    },
    mounted() {
      this.updateOrderSub({
        deliveryTime: this.orderSub.deliveryTime || Math.floor(new Date().getTime() / 1000)
      })
    },
    methods: {
      ...mapActions('order', [
        'updateOrderSub',
      ]),
      showDateTimePicker() {
        if (!this.dateTimePicker) {
          this.dateTimePicker = this.$createDatePicker({
            title: `选择发货时间`,
            min: new Date(2008, 7, 8, 8, 0, 0),
            max: new Date(2020, 9, 20, 20, 59, 59),
            value: new Date(),
            columnCount: 6,
            onSelect: this.selectHandle,
          })
        }
        this.dateTimePicker.show()
      },
      selectHandle(date) {
        this.updateOrderSub({
          deliveryTime: Math.floor(date.getTime() / 1000)
        })
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .enter_remark

    .order_form_data
      flex 1
      overflow-x hidden
      overflow-y scroll
      padding 10px 10px 64px
      fbox()
    .flex_box
      display flex
      align-items center

    .padd_l_r
      width 100%
      padding 0 16px

    .item_box
      font-size 14px
      background #FFF
      padding 16px 0
      border-radius 10px
      margin-bottom 10px

      .customer_box
        justify-content space-between
        margin-top 16px
        color #A1A1A1

      .customer_address_box
        color #A1A1A1
        margin-top 8px

      .left_icon
        width 20px
        height 20px

      .item_title
        margin-left 8px
        color #333333

      .item_value
        flex 1
        display flex
        text-align right
        flex-direction row-reverse
        color #A1A1A1

        &.selected
          color #333

        span
          flex 1
          text-align right

        .show_img
          /*display none*/
          width 76px
          height 76px

        input
          width 1px
          height 1px
          opacity 0

      .arrow_right_img
        width 6px
        height 12px
        margin-left 12px
    .sub_btn
      wh 180px 48px
      bg #1E9AFF
      fct()
      border-radius 24px
      fsc 16px #FFF
      mgauto()
      margin-top 30px
</style>

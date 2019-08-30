<template lang="pug">
  .order_select_product
    .order_select_product_list
      div(v-doc-title="orderSub.isModify?'修改订单':''")
      .product_list(v-if="isLoad")
        .product_list_item(v-for="(item,indexs) in productList" :key="indexs+'C'" @click="confirmProducts(item)")
          .product_list_text
            .product_list_text_value
              p {{item.name}}
            .product_list_text_point(v-if="item.dealInfo.isIn")
              .icon
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconxuanz")
    .select_product_next.next_box
      .car_box(@click="toggleShowSelectedBox")
        .car.active(:class="{active: productBag.num>0}")
          .car_point(v-if="productBag.num>0")
            p {{productBag.num}}
        .money ￥{{productBag.money || 0}}
      .next_btn(@click="toProductOutgoing") 下一步
    .selected_box(v-if="isShowSelectedBox" @click="toggleShowSelectedBox")
      .select_product_next.next_box
        .car_box
          .car.active(:class="{active: productBag.num>0}")
            .car_point(v-if="productBag.num>0")
              p {{productBag.num}}
          .money ￥{{productBag.money || 0}}
        .next_btn(@click="toProductOutgoing") 下一步
      .selected_list
        .close_btn 收起
          img(src="./pack_up_icon.png")
        .content
          .item(
            v-for="(item, indexs) in productList"
            :key="indexs + 'S'"
            @click.stop="confirmProducts(item,1)"
            v-show="item.dealInfo.isIn"
          )
            .product_info
              p {{item.name}}
              p 单位：{{item.unit}}
              p {{item.dealInfo.num}}&nbsp;x&nbsp;{{item.unit_price}}
            .arrow_icon
    .input_box(v-if="isShowInputBox" @click="toggleShowInputBox")
      .content(@click.stop="()=>{}")
        .close_btns(@click="toggleShowInputBox") 收起
          img(src="./pack_up_icon.png")
        .title.item
          .info
            p {{activeItem.name}}
            p 单位售价：{{activeItem.unit_price}}/{{activeItem.unit}}
            p 最小采购量：{{activeItem.lowest_count}} | 最小包装量{{activeItem.lowest_package}}
          .close_btn(@click="removeProduct" v-if="activeItem.dealInfo.num>0")
            img(src="./trash_icon.png")
            p 清空
          .close_btn_b(@click="toggleShowInputBox" v-else)
            img(src="./close_icon.png")
        .item.num
          p 数量
          .change_num
            .down(@click="downNum") -
            input(type="number" @input="inputBoxInput()" v-model="activeItem.dealInfo.num")
            .up(@click="upNum") +
        .money.item
          .money_value ￥{{activeItem.dealInfo.money? Common.toFixedNum(activeItem.dealInfo.money, 4) : 0}}
          .sub_btn(@click="addProduct") 添加产品
</template>

<script>
  import {OrderProductList} from '_api/order/'
  import {mapState, mapActions} from 'vuex'
  import * as Common from '_common/util/'

  export default {
    name: 'order_select_product',
    data() {
      return {
        Common,
        isLoad: false,
        productList: {},
        isShowInputBox: false,
        isShowSelectedBox: false,
        isOpenSelectedBox: false,
        activeItem: {},
        isPrice: true,
        defultDealInfo: {
          isIn: false,
          num: 0,
          price: 0,
          money: 0
        },
        productBag: {
          num: 0,
          money: 0,
          list: []
        }
      }
    },
    mounted() {
      this.getOrderProductList()
    },
    computed: {
      ...mapState('order', {
        orderSub: state => state.orderSub
      })
    },
    methods: {
      ...mapActions('order', [
        'updateOrderSub'
      ]),
      getOrderProductList() {
        if (!this.orderSub.customer) {
          if (this.$route.query.from) {
            this.$router.push(this.$route.query.from)
          } else {
            this.$router.go(-1)
          }
          return
        }
        if (this.orderSub.order_type === '2') {
          this.productList = this.orderSub.products
          this.productList.forEach((item) => {
            item.dealInfo = this._.cloneDeep(this.defultDealInfo)
            if (this.orderSub.isModify) {
              this.orderSub.products.forEach(items => {
                if (item.id === items.id) {
                  item.dealInfo.isIn = true
                  item.dealInfo.num = items.count
                  item.dealInfo.money = items.count * items.unit_price
                }
              })
            }
          })
          this.getVanResult()
          this.isLoad = true
          return
        }
        OrderProductList({client_id: this.orderSub.customer.id || this.orderSub.customer.client_id}, 'get').then((res) => {
          this.productList = res.data.list
          this.productList.forEach((item) => {
            item.dealInfo = this._.cloneDeep(this.defultDealInfo)
            if (this.orderSub.isModify) {
              this.orderSub.products.forEach(items => {
                if (item.id === items.id) {
                  item.dealInfo.isIn = true
                  item.dealInfo.num = items.count
                  item.dealInfo.money = items.count * items.unit_price
                }
              })
            }
          })
          this.getVanResult()
          this.isLoad = true
        })
      },
      confirmProducts(item, isFromBag) {
        if (isFromBag) {
          this.isOpenSelectedBox = true
          this.toggleShowSelectedBox()
        } else {
          this.isOpenSelectedBox = false
        }
        this.activeItem = this._.cloneDeep(item)
        this.toggleShowInputBox()
      },
      toProductOutgoing() {
        if (this.productBag.num <= 0) {
          this.$toast('请添至少选择一种产品')
          return
        }
        this.$router.push('/order/order_new/enter_remark')
      },
      toggleShowInputBox() {
        if (this.isShowInputBox && this.isOpenSelectedBox) {
          this.toggleShowSelectedBox()
        }
        this.isShowInputBox = !this.isShowInputBox
      },
      toggleShowSelectedBox() {
        if (!this.isShowSelectedBox) {
          if (this.productBag.num <= 0) {
            return
          }
        }
        this.isShowSelectedBox = !this.isShowSelectedBox
      },
      inputBoxInput() {
        this.activeItem.dealInfo.money = (this.activeItem.dealInfo.num * this.activeItem.unit_price) || 0
      },
      getVanResult() {
        this.productBag = {
          num: 0,
          money: 0,
          list: []
        }
        this.productList.forEach(item => {
          if (item.dealInfo.isIn === true) {
            this.productBag.num += Number(item.dealInfo.num)
            this.productBag.money += Number(item.dealInfo.money)
            this.productBag.list.push(item)
          }
        })
        this.updateOrderSub({
          productBag: this.productBag
        })
      },
      removeProduct() {
        this.productBag.num = 0
        this.productBag.money = 0
        this.productList.forEach(item => {
          if (item.id === this.activeItem.id) {
            item.dealInfo = this._.cloneDeep(this.defultDealInfo)
            item.dealInfo.isIn = false
          }
        })
        this.getVanResult()
        this.toggleShowInputBox()
        this.updateOrderSub({
          originData: this.productList
        })
      },
      addProduct() {
        this.productBag.num = 0
        this.productBag.money = 0
        if (!this.activeItem.dealInfo.num) {
          this.$toast('信息输入有误')
          return
        }
        if (this.activeItem.dealInfo.num < this.activeItem.lowest_count) {
          this.$toast('采购数量小于最小采购量')
          return
        }
        if (this.activeItem.dealInfo.num % this.activeItem.lowest_package > 0) {
          this.$toast('信息输入有误')
          return
        }
        this.productList.forEach(item => {
          if (item.id === this.activeItem.id) {
            item.dealInfo = this._.cloneDeep(this.activeItem.dealInfo)
            item.dealInfo.isIn = true
          }
        })
        this.getVanResult()
        this.toggleShowInputBox()
        this.updateOrderSub({
          originData: this.productList
        })
      },
      downNum() {
        if (Number(this.activeItem.dealInfo.num) <= 0) {
          return
        } else if (Number(this.activeItem.dealInfo.num) < this.activeItem.lowest_package) {
          this.activeItem.dealInfo.num = 0
        } else {
          this.activeItem.dealInfo.num = (Number(this.activeItem.dealInfo.num) - this.activeItem.lowest_package)
        }
        this.activeItem.dealInfo.money = this.activeItem.dealInfo.num * this.activeItem.unit_price
      },
      upNum() {
        this.activeItem.dealInfo.num = (Number(this.activeItem.dealInfo.num) + this.activeItem.lowest_package)
        this.activeItem.dealInfo.money = this.activeItem.dealInfo.num * this.activeItem.unit_price
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .order_select_product
    width 100%
    height 100%
    background $bgColor
    display flex
    flex-direction column

    .order_select_product_list
      flex 1
      overflow-x hidden
      overflow-y scroll

      .product_list
        display flex
        flex-direction column
        padding 10.1px 10px 0
        box-sizing border-box

        .product_list_item
          flr()
          flex-direction column
          height 60px
          border-radius 6px
          background #fff
          padding 10px 10px
          box-sizing border-box
          margin-bottom 10px

          .product_list_text
            display flex
            align-items center
            justify-content space-between

            .product_list_text_value
              display flex
              flex-direction column

              p
                &:nth-of-type(1)
                  fsc 14px #333

                &:nth-of-type(2)
                  fsc 12px #666
                  margin-top 6px
            .product_list_text_point
              wh 20px 20px
              .icon
                wh 100% 100%
    .select_product_next
      position relative
      z-index 1
      width 100%
      background #fff
      height 64px
      box-shadow 0 -1px 5px 1px #ccc
      display flex
      padding 12px 16px
      box-sizing border-box
      align-items center
      justify-content space-between

    .next_box
      position relative
      z-index 1
      width 100%
      background #fff
      height 64px
      box-shadow 0 -1px 5px 1px #ccc
      display flex
      padding 12px 16px
      box-sizing border-box
      align-items center
      justify-content space-between

      .car_box
        display flex
        align-items center

        .car
          width 40px
          height 40px
          position relative

          &.unactive
            background url(./inactive.png)
            background-size cover


          &.active
            background url(./active.png)
            background-size cover


          .car_point
            position absolute
            left 10px
            top -5px
            width 500%
            max-height 20px
            display flex

            p
              background #FF3301
              padding 1px 7px
              border-radius 20px
              color #FFF
              font-size 12px
              font-weight 200

        .money
          color #FF6602
          font-size 14px
          margin-left 10px

      .next_btn
        width 122px
        height 40px
        background #0099FF
        border-radius 20px
        color #FFF
        font-size $middleFontSize
        display flex
        align-items center
        justify-content center


    .selected_box
      position fixed
      z-index 2
      width 100%
      height 100%
      background rgba(0, 0, 0, .5)

      .select_product_next
        position absolute
        bottom 0
        left 0


      .selected_list
        position absolute
        bottom 64px
        left 0
        width 100%

        .close_btn
          position absolute
          top 0
          left 0
          display flex
          align-items center
          justify-content center
          font-size 12px
          width 100%
          height 24px
          background #F7F7F7
          color #A1A1A1

          img
            width 10px
            height 10px
            margin-left 3px


        .content
          max-height 400px
          overflow scroll
          margin-top 24px

          .item
            width 100%
            background #FFF
            padding 16px
            box-sizing border-box
            border-bottom 1px solid #EEE
            display flex
            align-items center
            justify-content space-between

            .product_info
              p
                &:nth-of-type(1)
                  font-size $middleFontSize
                  color $blackColor

                &:nth-of-type(2)
                  font-size $smallFontSize
                  color $lightBlackColor
                  margin-top 6px

                &:nth-of-type(3)
                  font-size $smallFontSize
                  color $lightBlackColor
                  margin-top 6px

            .arrow_icon
              background url(./arrow_icon.png)
              background-size cover
              width 20px
              height 20px

    .input_box
      position fixed
      z-index 2
      width 100%
      height 100%
      background rgba(0, 0, 0, .5)

      .content
        position absolute
        bottom 0
        left 0
        background #FFF
        width 100%

        .close_btns
          position absolute
          top -24px
          left 0
          display flex
          align-items center
          justify-content center
          font-size 12px
          width 100%
          height 24px
          background #F7F7F7
          color #A1A1A1

          img
            width 10px
            height 10px
            margin-left 3px


        > .item
          padding 16px 16px 14px
          border-bottom 1px solid #EEE
          display flex
          align-items center
          justify-content space-between
          font-size $middleFontSize
          color $blackColor

          input
            text-align right


        .title
          .info
            p
              &:nth-of-type(1)
                fsc 16px #333
              &:nth-of-type(2)
                fsc 12px #666
                margin 8px 0 8px
              &:nth-of-type(3)
                fsc 12px #666

          .close_btn
            margin-top -20px
            font-size 12px
            color #A1A1A1
            display flex
            align-items center

            img
              width 12px
              height 12px
              margin-right 2px

          .close_btn_b
            margin-top -20px

            img
              width 20px
              height 20px

        .num
          .change_num
            display flex
            border-radius 4px
            overflow hidden
            border 1px solid #EEE
            .down,.up
              bg #EEE
              wh 36px 30px
              fsc 22px #333
              fct()
            input
              wh 44px 30px
              fsc 14px #666
              text-align center
        .money
          .money_value
            color #FF6602

          .sub_btn
            display flex
            align-items center
            justify-content center
            width 122px
            height 40px
            background #0099FF
            border-radius 20px
            color #FFF
</style>

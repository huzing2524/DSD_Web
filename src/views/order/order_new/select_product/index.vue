<template>
  <div class="order_select_product">
    <div class="order_select_product_list">
      <div class="product_list" v-if="isLoad">
        <div class="product_list_item" v-for="(item,index) in productList" :key="index+'B'">
          <div v-if="item.category_name">
            <div class="product_list_header">
              {{item.category_name}}
            </div>
            <div class="product_list-content" v-for="(productListItem,indexs) in item.list" :key="indexs+'C'"
                 @click="confirmProducts(productListItem)">
              <div class="product_list_text">
                <div class="product_list_text_value">
                  <p>{{productListItem.name}}</p>
                  <p>库存：{{productListItem.stock_count}}{{productListItem.unit}}</p>
                </div>
                <div class="product_list_text_point" v-if="productListItem.dealInfo.num>0">
                  {{productListItem.dealInfo.num}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="select_product_next next_box">
      <div class="car_box" @click="toggleShowSelectedBox">
        <div class="car active" :class="{active: productBag.num>0}">
          <div class="car_point" v-if="productBag.num>0"><p>{{productBag.num}}</p></div>
        </div>
        <div class="money">￥{{productBag.money || 0}}</div>
      </div>
      <div class="next_btn" @click="toProductOutgoing">下一步</div>
    </div>
    <div class="selected_box" v-if="isShowSelectedBox" @click="toggleShowSelectedBox">
      <div class="select_product_next next_box">
        <div class="car_box">
          <div class="car active" :class="{active: productBag.num>0}">
            <div class="car_point" v-if="productBag.num>0"><p>{{productBag.num}}</p></div>
          </div>
          <div class="money">￥{{productBag.money || 0}}</div>
        </div>
        <div class="next_btn" @click="toProductOutgoing">下一步</div>
      </div>
      <div class="selected_list">
        <div class="close_btn">收起 <img src="./pack_up_icon.png"></div>
        <div class="content">
          <div v-for="(box, index) in this.productList" :key="index">
            <div class="item"
                 v-for="(item, indexs) in box.list"
                 :key="indexs + 'S'"
                 @click.stop="confirmProducts(item,1)"
                 v-show="item.dealInfo.isIn"
            >
              <div class="product_info">
                <p>{{item.name}}</p>
                <p>库存：{{item.count}}{{item.unit}}</p>
              </div>
              <div class="arrow_icon"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="input_box" v-if="isShowInputBox" @click="toggleShowInputBox">
      <div class="content" @click.stop="()=>{}">
        <div class="close_btns" @click="toggleShowInputBox">收起 <img src="./pack_up_icon.png"></div>
        <div class="title item">
          <div class="info">
            <p>{{activeItem.name}}</p>
            <p>库存：{{activeItem.stock_count}}{{activeItem.unit}}</p>
          </div>
          <div class="close_btn" @click="removeProduct" v-if="activeItem.dealInfo.num>0"><img src="./trash_icon.png">
            <p>清空</p></div>
          <div class="close_btn_b" @click="toggleShowInputBox" v-else><img src="./close_icon.png"></div>
        </div>
        <div class="item">
          <p>数量</p>
          <input type="number" placeholder="填写数量" v-model="activeItem.dealInfo.num" @input="inputBoxInput(1)">
        </div>
        <div class="price item">
          <p>价格 (元)</p>
          <div class="input_toggle">
            <input type="number" placeholder="填写单价" v-if="isPrice" v-model="activeItem.dealInfo.price"
                   @input="inputBoxInput(2)">
            <input type="number" placeholder="填写总价" v-else v-model="activeItem.dealInfo.money"
                   @input="inputBoxInput(3)">
            <div class="toggle_btn" @click="() => {isPrice = !isPrice}">
              <p>单价</p>
              <img src="./switch_icon.png">
            </div>
          </div>
        </div>
        <div class="money item">
          <div class="money_value">￥{{activeItem.dealInfo.money? Common.toFixedNum(activeItem.dealInfo.money, 4) : 0}}
          </div>
          <div class="sub_btn" @click="addProduct">添加产品</div>
        </div>
      </div>
    </div>
  </div>
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
          num: '',
          price: '',
          money: ''
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
        OrderProductList({}, 'get', ).then((res) => {
          this.productList = res.data.list
          this.productList.forEach((item) => {
            item.list.forEach((items) => {
              if (this.orderSub.productBag) {
                this.orderSub.productBag.list.forEach(itemss => {
                  if (items.id === itemss.id) {
                    items.isSelected = true
                    items.dealInfo = {...item.dealInfo, ...itemss.dealInfo}
                    items.category_name = item.category_name
                  } else {
                    items.isSelected = false
                    items.dealInfo = this._.cloneDeep(this.defultDealInfo)
                    items.category_name = item.category_name
                  }
                })
              } else {
                items.isSelected = false
                items.dealInfo = this._.cloneDeep(this.defultDealInfo)
                items.category_name = item.category_name
              }
            })
          })
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
        console.log(this.activeItem)
        this.toggleShowInputBox()
      },
      toProductOutgoing() {
        if (this.productBag.num <= 0) {
          this.$toast('请添至少选择一种产品')
          return
        }
        this.$router.push(this.$route.query.from)
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
        if (this.isPrice) {
          this.activeItem.dealInfo.money = (this.activeItem.dealInfo.num * this.activeItem.dealInfo.price) || 0
        } else {
          this.activeItem.dealInfo.price = Common.toFixedNum((this.activeItem.dealInfo.money / this.activeItem.dealInfo.num), 4) || 0
        }
      },
      getVanResult() {
        this.productBag = {
          num: 0,
          money: 0,
          list: []
        }
        this.productList.forEach(item => {
          item.list.forEach(items => {
            if (items.dealInfo.isIn === true) {
              this.productBag.num += Number(items.dealInfo.num)
              this.productBag.money += Number(items.dealInfo.money)
              this.productBag.list.push(items)
            }
          })
        })
        this.updateOrderSub({
          productBag: this.productBag
        })
      },
      removeProduct() {
        this.productBag.num = 0
        this.productBag.money = 0
        this.productList.forEach(item => {
          item.list.forEach(items => {
            if (items.id === this.activeItem.id) {
              items.dealInfo = this._.cloneDeep(this.defultDealInfo)
              items.dealInfo.isIn = false
            }
          })
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
        if (!this.activeItem.dealInfo.num || !this.activeItem.dealInfo.price) {
          this.$toast('信息输入有误');
          return;
        }
        this.productList.forEach(item => {
          item.list.forEach(items => {
            if (items.id === this.activeItem.id) {
              items.dealInfo = this._.cloneDeep(this.activeItem.dealInfo)
              items.dealInfo.isIn = true
            }
          })
        })
        this.getVanResult()
        this.toggleShowInputBox()
        this.updateOrderSub({
          originData: this.productList
        })
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
          .product_list_header
            color $blackColor
            margin-bottom 10px
            font-size $middleFontSize

          .product_list-content
            border-radius 10px
            background #fff
            padding 12px 16px
            box-sizing border-box
            margin-bottom 10px

            .product_list_text
              display flex
              align-items center
              justify-content space-between
              color $blackColor
              font-size $middleFontSize

              .product_list_text_value
                display flex
                flex-direction column

                p
                  &:nth-of-type(1)
                    font-size $middleFontSize
                    color $blackColor

                  &:nth-of-type(2)
                    font-size $smallFontSize
                    color $lightBlackColor
                    margin-top 6px

              .product_list_text_point
                display block
                background #FF3301
                padding 1px 7px
                border-radius 20px
                color #FFF
                font-size 12px
                font-weight 200

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
                font-size $middleFontSize
                color $blackColor


              &:nth-of-type(2)
                font-size $smallFontSize
                color $lightBlackColor
                margin-top 6px

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

        .price
          .input_toggle
            display flex

            .toggle_btn
              display flex
              align-items center
              justify-content center
              width 48px
              height 20px
              border 1px solid #0099FF
              margin-left 10px
              color #0099FF
              font-size 10px

              img
                width 20px
                height 20px

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

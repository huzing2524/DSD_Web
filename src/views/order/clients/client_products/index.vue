<!--创建或者修改客户都要用到这个材料修改界面，如果是创建，则在下一个页面保存数据；如果是修改在这个界面保存数据-->
<template lang="pug">
  .main
    .list-content
      p 以下数据源来自本公司的产品目录类
      .list-item(v-for="(product, productIdx) in categoryList"
        @click="itemClick(product)")
        .nameAndState
          span(class="item-name") {{product.name}}
          span(class="item_other") 最小起订量：{{product.lowest_count=== null ? 0 : product.lowest_count}}{{product.unit || ''}} | 最小包装量：{{product.lowest_package=== null ? 0 : product.lowest_package}}{{product.unit || ''}}
        .icon-chooice(v-if="selectedProductDict[product.id]&&(selectedProductDict[product.id].unit_price>0)")
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconxuanz')
    MaterialEditMask(:show="isShowEditMask"
      :items="Object.values(selectedProductDict)"
      @arrowClick="selectedMaskArrowClick"
      @clearClick="selectedMaskClearClick"
      @itemClick="selectedMaskItemClick")
      template(v-slot:title="slotProps") {{slotProps.item.name}}
      template(v-slot:subtitle="slotProps") {{`单位：${slotProps.item.unit}`}} {{`单位售价：${slotProps.item.unit_price}元`}}
      template(v-slot:tip="slotProps") 最小起订量：{{slotProps.item.lowest_count=== null ? 0 : slotProps.item.lowest_count}}{{slotProps.item.unit || ''}} | 最小包装量：{{slotProps.item.lowest_package === null ? 0 : slotProps.item.lowest_package}}{{slotProps.item.unit || ''}}
    .select-content
      .save-row
        .icon-car(v-if="totalCount <= 0")
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconicon_wuse')
        .icon-car(v-else @click="iconCarClick")
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconTheshoppingcart')
          .select-count
            span(class="select-count-span") {{totalCount}}
        .save-btn(@click="goNext")
          span(class="save-span") {{'下一步'}}
    MaterialInputMask(
      :title='currentInputProduct.name'
      :unit='currentInputProduct.unit'
      :inputPriceValue='inputPriceValue'
      :lowestCountValue='currentInputProduct.lowest_count'
      :lowestPackageNumValue='currentInputProduct.lowest_package'
      :isCreate='this.$route.query.type === "create" ? "true" : "false"'
      :show="isShowInputMask"
      priceName='单位售价'
      @arrowClick="hideInputMask"
      @addClick="inputMaskAddClick"
      @clearClick="inputMaskClearClick")
</template>

<script>
  import MaterialInputMask from '_components/purchase_list/purchase_car_input'
  import MaterialEditMask from '_components/purchase_list/purchase_car_edit'
  import NullPage from "_components/null_page"
  import {getClientsProductsList} from '_api/order'
  import {mapActions, mapState} from "vuex";

  export default {
    components: {
      MaterialInputMask,
      MaterialEditMask,
      NullPage
    },
    data() {
      return {
        isLoad: false,
        type: '',
        isShowInputMask: false,
        isShowEditMask: false,
        totalCount: 0,
        inputPriceValue: '',
        currentInputProduct: {},  // 当前编辑的产品
        selectedProductDict:{},  // 有数量的产品 {id: {id:'',name:'',category_id:'',count:''},...}
        categoryList: [],
        /*categoryList1: [
          {
            id: '111',
            name: '组件111',
            category_id: '111',
            unit: '件'
          },
          {
            id: '222',
            name: '螺丝刀',
            category_id: '222',
            unit: '把'
          },
          {
            id: '333',
            name: '螺丝钉',
            category_id: '333',
            unit: '个'
          },
          {
            id: '444',
            name: '元件444',
            category_id: '444',
            unit: '件'
          },
          {
            id: '555',
            name: '其他555',
            category_id: '555',
            unit: '件'
          },
          {
            id: '666',
            name: '其他666',
            category_id: '666',
            unit: '件'
          },
          {
            id: '777',
            name: '其他777',
            category_id: '777',
            unit: '件'
          },
          {
            id: '888',
            name: '其他888',
            category_id: '888',
            unit: '件'
          },
          {
            id: '999',
            name: '其他999',
            category_id: '999',
            unit: '件'
          },
        ]*/
      }
    },
    computed: {
      ...mapState('order',{
        getClientMessageDetail: (state) => {
          return state.orderClientsMessage
        },
      }),
      queryId() {
        return (null === this.$route.query.id) ? '' : this.$route.query.id
      },
      queryName() {
        return this.$route.query.name
      },
      queryStep() {
        return this.$route.query.step
      }
    },
    mounted() {
      this.type = this.$route.query.type || ''
      // this.categoryList = this.categoryList1
      this.initData()
    },
    methods: {
      ...mapActions('order', [
        'updateOrderClientMessage'
      ]),
      initData() {
        let path = this.type === 'add' ? this.queryId : ''
        console.log("path="+path)
        getClientsProductsList({'id': path}, 'get', '').then(res => {
          console.log("res="+res)
          console.log(res.data)
          this.categoryList = res.data.list
          if (res.status === 200) {
            this.categoryList = res.data.list
            this.initSelectedProductDict()
            this.isLoad = true
          } else {
            this.$toast('获取数据失败')
          }
        }).catch((e) => {
          console.log("获取数据失败,失败原因"+ e.toString())
        })
      },
      /**
       * 数据下载完后把详情那边带有的物料数据设置到已经选的list里面去。
       */
      initSelectedProductDict() {
        if(null != this.getClientMessageDetail.products) {
          let count = 0
          this.getClientMessageDetail.products.forEach(item =>{
            this.selectedProductDict[item.id] = item
            count = count + 1

            for(let i = 0; i< this.categoryList.length; i++) {
              if(item.id === this.categoryList[i].id) {
                this.categoryList[i] = item
              }
            }
          })
          Object.values(this.selectedProductDict).forEach(item => {
            // console.log('item.id='+item.id+'item.name='+item.name+'item.unit_price='+item.unit_price+'item.unit='+item.unit)
            console.log('item.id='+item.id)
          })
          this.totalCount = count >= 100 ? '···' : count
          console.log(this.totalCount);
        }
      },
      /**
       * @returns 如果最低起购量和最低打包量都是0，则返回false，不显示这一行了。
       */
      /*getOtherVisible(packageNum, count) {
        if((packageNum === null && count === null) || (packageNum === 0 && count === 0)) {
          return false
        }
        return true
      },*/
      // 计算总条数，筛选选中的产品
      getTotalCount() {
        let count = 0
        this.selectedProductArr = []
        Object.values(this.selectedProductDict).forEach(product => {
          this.selectedProductArr.push(product)
          count = count + 1
        })
        this.totalCount = count >= 100 ? '···' : count
      },
      itemClick(product) {
        this.currentInputProduct = product
        this.inputPriceValue = this.selectedProductDict[product.id] && (this.selectedProductDict[product.id].unit_price > 0) ? this.selectedProductDict[product.id].unit_price : ''
        this.isShowInputMask = true
      },
      hideInputMask() {
        this.isShowInputMask = false
      },
      // 点击添加物料时调用
      inputMaskAddClick(priceValue, countValue, packageNumValue) {
        if(priceValue<=0 || priceValue === '') {
          this.$toast('售价必须大于0')
          return
        }
        if(countValue<0 || countValue === '') {
          this.$toast('最小起订量不能小于0')
          return
        }
        if(packageNumValue<0 || packageNumValue === '') {
          console.log(packageNumValue);
          this.$toast(packageNumValue)
          this.$toast('最小包装量不能小于0')
          return
        }
        this.currentInputProduct['unit_price'] = parseInt(priceValue)
        this.currentInputProduct['lowest_count'] = parseInt(countValue)
        this.currentInputProduct['lowest_package'] = parseInt(packageNumValue)
        this.selectedProductDict[this.currentInputProduct.id] = this.currentInputProduct
        this.isShowInputMask = false
        this.selectedProductDict[this.currentInputProduct.id] = this.currentInputProduct

        this.getTotalCount()
      },
      // 点击输入框的清空按钮
      inputMaskClearClick() {
        delete this.selectedProductDict[this.currentInputProduct.id]
        this.isShowInputMask = false
        this.getTotalCount()
      },

      // 点击购物车
      iconCarClick() {
        this.isShowEditMask = true
      },
      // 点击购物车箭头
      selectedMaskArrowClick() {
        this.isShowEditMask = false
      },
      // 点击购物车清空按钮
      selectedMaskClearClick() {
        this.selectedProductDict = {}
        this.getTotalCount()
        this.isShowEditMask = false
      },
      // 点击购物车某样产品
      selectedMaskItemClick(item, value) {
        this.isShowEditMask = false
        this.itemClick(item)
        console.log(value)
      },
      // 下一步
      async goNext() {
        let products = []
        Object.values(this.selectedProductDict).forEach(product => {
          products.push({
            id:product.id,
            name:product.name,
            unit:product.unit,
            unit_price:product.unit_price,
            lowest_package:product.lowest_package,
            lowest_count:product.lowest_count,
          })
          this.getClientMessageDetail.products = products;
        })
        if(!this.getClientMessageDetail.products.length){
          this.$toast('请至少选择一种产品')
          return
        }
        this.updateOrderClientMessage({
          ...this.getClientMessageDetail
        })
        // if(this.type === 'edit') {
        this.$router.push(`/order/clients/client_message_create/?id=${this.queryId}&type=${this.type}`)
        // } else {
        //   this.$router.push(`/order/clients/client_message_create/`)
        // }
      }

    },
  }
</script>

<style lang="stylus" scoped>
  .main
    width 100%
    padding-bottom 95px
    background-color #E6EAED
    display flex
    flex-direction column
    .list-content
      overflow-y scroll
      padding 10px 10px 0
      p
        padding-bottom 15px
        fsc 14px #999999
      .list-item
        display flex
        height 50px
        flex-direction row
        justify-content space-between
        border-radius 6px
        background-color #ffffff
        margin-bottom 10px
        padding 10px
        align-items center
        .nameAndState
          display flex
          flex-direction column
          .item-name
            font-size 14px
            color #545454
          .item_other
            fsc 12px #999999
            margin-top 8px
            align-items left
        .icon-chooice
          wh 18px 18px
    .select-content
      background-color #ffffff
      width 100%
      height 62px
      position fixed
      bottom 0px
      display flex
      flex-direction column
      align-items center
      .save-row
        display flex
        flex-direction row
        align-items center
        justify-content space-between
        height 52px
        padding 0px 15px 0px 10px
        width 100%
        .icon-car
          height 28px
          width 36px
          position relative
          .select-count
            background-color #FF4452
            height 18px
            width 18px
            border-radius 9px
            display flex
            justify-content center
            align-items center
            position absolute
            right -9px
            top -9px
            .select-count-span
              font-size 13px
              color #ffffff
        .save-btn
          display flex
          justify-content center
          align-items center
          height 28px
          width 80px
          background-color #1E9AFF
          border-radius 16px
          .save-span
            font-size 14px
            color #ffffff
</style>




<template lang="pug">
  .main
    p 以下数据源来自供应商的产品目录
    PurchaseEditMask(:show="isShowEditMask"
      :items="Object.values(selectedProductDict)"
      @arrowClick="selectedMaskArrowClick"
      @clearClick="selectedMaskClearClick"
      @itemClick="selectedMaskItemClick")
      template(v-slot:title="slotProps") {{slotProps.item.name}}
      template(v-slot:subtitle="slotProps") {{`单位：${slotProps.item.unit}|采购价：${slotProps.item.count}元`}}
    .list-item(v-for="(product, productIdx) in categoryList"
      @click="itemClick(product)")
      span(class="item-name") {{product.name}}
      .icon-chooice(v-if="selectedProductDict[product.id]&&(selectedProductDict[product.id].count>0)")
        svg.ali_icon(aria-hidden="true")
          use(xlink:href='#iconxuanz')
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
          span(class="save-span") 下一步
    PurchaseInputMask(
      :title='currentInputProduct.name'
      :unit='currentInputProduct.unit'
      :show="isShowInputMask"
      :inputValue='inputValue'
      @arrowClick="hideInputMask"
      @addClick="inputMaskAddClick"
      @clearClick="inputMaskClearClick")


</template>

<script>
  import PurchaseInputMask from '_components/purchase_list/purchase_car_input'
  import PurchaseEditMask from '_components/purchase_list/purchase_car_edit'
  import { ChangeCrafts } from '_api/product'
  import {getSupplierMaterialsList} from '_api/purchase'
  import {mapActions, mapState} from "vuex"

  export default {
    components: {
      PurchaseInputMask,
      PurchaseEditMask,
    },
    data() {
      return {
        isShowInputMask: false,
        isShowEditMask: false,
        totalCount: 0,
        inputValue: '',
        currentInputProduct: {},  // 当前编辑的产品
        selectedProductDict:{},  // 有数量的产品 {id: {id:'',name:'',category_id:'',count:''},...}
        categoryList: [],
        categoryList1: [
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
        ]
      }
    },
    computed: {
      ...mapState('purchase',{
        getSupplierDetail: function (state) {
          return state.supplierDetail
        },
      }),
      queryId() {
        return this.$route.query.id
      },
      queryName() {
        return this.$route.query.name
      },
      queryStep() {
        return this.$route.query.step
      }
    },
    mounted() {
      this.initData()
      this.initSelectedProductDict()
    },
    methods: {
      ...mapActions('purchase', [
        'updateSupplierMessage'
      ]),
      initData() {
        getSupplierMaterialsList().then(res => {
          console.log(res.data)
          this.categoryList = res.data.list
          if (res.status === 200) {
            this.categoryList = res.data.list
          } else {
            this.$toast('获取数据失败')
          }
        }).catch((e) => {
          console.log("获取数据失败"+e)
        })
      },
      initSelectedProductDict() {
        if(null != this.getSupplierDetail && null != this.getSupplierDetail.materials)
        Object.values(this.getSupplierDetail.materials).forEach(product => {
          console.log(product);
          this.selectedProductDict.push({
            // id:product.id,
            name:product.name,
            unit:product.unit,
            unit_price:product.count})
          this.selectedProductDict = this.getSupplierDetail.materials
        })
        this.getTotalCount()
      },
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
        this.inputValue = this.selectedProductDict[product.id] && (this.selectedProductDict[product.id].count > 0) ? this.selectedProductDict[product.id].count : ''
        this.isShowInputMask = true
      },

      hideInputMask() {
        this.isShowInputMask = false
      },
      // 点击添加物料时调用
      inputMaskAddClick(value) {
        if(value==0) {
          this.$toast('采购价不能为0')
          return
        }
        this.currentInputProduct['count'] = parseInt(value)
        this.selectedProductDict[this.currentInputProduct.id] = this.currentInputProduct
        this.isShowInputMask = false
        if(value > 0) {
          this.selectedProductDict[this.currentInputProduct.id] = this.currentInputProduct
        }
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
        let materials = []
        Object.values(this.selectedProductDict).forEach(product => {
          materials.push({
            id:product.id,
            name:product.name,
            unit:product.unit,
            unit_price:product.count})
          this.getSupplierDetail.materials = materials;
        })
        console.log(this.getSupplierDetail)
        this.updateSupplierMessage({
          ...this.getSupplierDetail
        })
        this.$router.go(-1)
        // this.$router.push(`/purchase/supplier/supplier_message_chooice?from=create`)
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .main
    width 100%
    // height 100%
    padding-bottom 95px
    background-color #E6EAED
    overflow-y scroll
    p
      padding 15px 10px 15px 10px
      fsc 14px #999999
    .list-item
      border-radius 6px
      background-color #ffffff
      display flex
      justify-content space-between
      align-items center
      height 50px
      margin-top 10px
      margin 0px 15px 10px 10px
      padding 0 10px
      .item-name
        font-size 14px
        color #545454
      .icon-chooice
        wh 18px 18px
    .select-content
      background-color #ffffff
      width 100%
      height 85px
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
        height 60px
        padding 0px 15px 10px 10px
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
          height 32px
          width 100px
          background-color #1E9AFF
          border-radius 16px
          .save-span
            font-size 14px
            color #ffffff
</style>



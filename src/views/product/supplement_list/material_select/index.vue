<template lang="pug">
  .main
    MaterialEditMask(:show="isShowEditMask"
              :items="Object.values(selectedProductDict)"
              @arrowClick="selectedMaskArrowClick"
              @clearClick="selectedMaskClearClick"
              @itemClick="selectedMaskItemClick")
      template(v-slot:title="slotProps") {{slotProps.item.name}}
      template(v-slot:subtitle="slotProps") {{`${slotProps.item.count}条`}}
    .list-content
      .list-item(v-for="(product, productIdx) in materialList" 
              :key="product.name+productIdx"
              @click="itemClick(product)")
        span(class="item-name") {{product.name}}
        .item-select-count(v-if="selectedProductDict[product.id]&&(selectedProductDict[product.id].count>0)")
          span(class="item-select-span") {{selectedProductDict[product.id].count >= 100 ? "···" : selectedProductDict[product.id].count}}

    .select-content
      //- span(class="title" :style="{visibility:!isShowEditMask?'visible':'hidden'}") {{`工序：${queryName}`}}
      .save-row
        .icon-car(v-if="totalCount <= 0")
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconicon_wuse')
        .icon-car(v-else @click="iconCarClick")
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconTheshoppingcart')
          .select-count
            span(class="select-count-span") {{totalCount}}
        .save-btn(@click="saveClick")
          span(class="save-span") 下一步
    MaterialInputMask(:title='currentInputProduct.name', 
            :show="isShowInputMask"
            :inputValue='inputValue'
            @arrowClick="hideInputMask"
            @addClick="inputMaskAddClick"
            @clearClick="inputMaskClearClick")
    

</template>

<script>
import MaterialInputMask from '_components/product/material_input_mask'
import MaterialEditMask from '_components/product/material_edit_mask'
import { GoodsList, SupplementCreate, ProductTsMaterials } from '_api/product'
import { mapState } from 'vuex'
export default {
  components: {
    MaterialInputMask,
    MaterialEditMask,
  },
  data() {
    return {
      isShowInputMask: false,
      isShowEditMask: false,
      totalCount: 0,
      inputValue: '0',
      currentInputProduct: {},  // 当前编辑的产品
      selectedProductDict:{},  // 有数量的产品 {id: {id:'',name:'',category_id:'',count:''},...}
      materialList: []
    }
  },
  computed: {
    ...mapState('product', {
      supplementRemark: state => state.supplementRemark,
      supplementTask: state => state.supplementTask
    }),
    // lch  --- 这个地方缺了productId
    // queryId() {
    //   return this.$route.query.id
    // }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      ProductTsMaterials(this.supplementTask.id).then(res=>{
        const {data} = res
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.materialList = data.reverse()
        }
      })
    },

    // 计算总条数，筛选选中的产品
    getTotalCount() {
      let count = 0
      this.selectedProductArr = []
      Object.values(this.selectedProductDict).forEach(product => {
        this.selectedProductArr.push(product)
        count += product.count
      })
      this.totalCount = count >= 100 ? '···' : count
    },
    itemClick(product) {
      this.currentInputProduct = product
      this.inputValue = this.selectedProductDict[product.id] && (this.selectedProductDict[product.id].count > 0) ? this.selectedProductDict[product.id].count : 0
      this.isShowInputMask = true
    },

    hideInputMask() {
      this.isShowInputMask = false
    },
    // 点击添加物料时调用
    inputMaskAddClick(value) {
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
    selectedMaskItemClick(item) {
      this.isShowEditMask = false
      this.itemClick(item)
    },
    // 点击保存
    async saveClick() {
      // this.$router.push('/product/supplement_list/order_confirm')
      // return
      let materials = []
      Object.values(this.selectedProductDict).forEach(product => {
        materials.push({id:product.id,count:product.count})
      })
      if(materials.length <= 0) {
        return this.$toast('请选择要补充的物料数量')
      }
      const body = {
        id: this.supplementTask.id,
        remark: this.supplementRemark,
        materials: materials
      }
      try {
        const { data } = await SupplementCreate(body)
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.$store.commit('product/Supplement_Materials',Object.values(this.selectedProductDict))
          this.$router.push('/product/supplement_list/order_confirm')
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
    padding-bottom 95px
    background-color #E6EAED
    .list-content
      padding 0px 10px 10px 10px
      overflow-y scroll
      .item-title
        font-size 15px
        color #545454
        margin-top 20px
      .list-item
        border-radius 6px
        background-color #ffffff
        display flex
        justify-content space-between
        align-items center
        height 50px
        margin-top 10px
        padding 0px 15px 0px 15px
        .item-name
          font-size 14px
          color #545454
        .item-select-count
          background-color #FF4452
          height 18px
          width 18px
          border-radius 9px
          display flex
          justify-content center
          align-items center
          .item-select-span
            font-size 13px
            color #ffffff
    .select-content
      background-color #ffffff
      width 100%
      height 60px
      position fixed
      bottom 0px
      display flex
      flex-direction column
      align-items center
      justify-content center
      .title
        font-size 12px
        color #545454
        margin-top 8px
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




<template lang="pug">
  .main
    .list-content(v-for="(category, categoryIdx) in categoryList" :key="categoryIdx")
      span(class="item-title") {{category.name}}
      .list-item(v-for="(product, productIdx) in category.list"
              :key="product.name+productIdx"
              @click="itemClick(product)")
        span(class="item-name") {{product.name}}
        .icon-selected(v-if="selectedProductDict[product.id]&&(selectedProductDict[product.id].count>0)")
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconxuanz')
    MaterialEditMask(:show="isShowEditMask"
                  :items="Object.values(selectedProductDict)"
                  @arrowClick="selectedMaskArrowClick"
                  @clearClick="selectedMaskClearClick"
                  @itemClick="selectedMaskItemClick")
          template(v-slot:title="slotProps") {{slotProps.item.name}}
          template(v-slot:subtitle="slotProps") {{`${slotProps.item.count}${slotProps.item.unit}`}}
    .select-content
      span(class="title" :style="{visibility:!isShowEditMask?'visible':'hidden'}") {{`工序：${process.name || process.process_name}`}}
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
    MaterialInputMask(:title="currentInputProduct.name",
            :show="isShowInputMask"
            :inputValue='inputValue'
            @arrowClick="hideInputMask"
            @addClick="inputMaskAddClick"
            @clearClick="inputMaskClearClick")


</template>

<script>
import MaterialInputMask from '_components/product/material_input_mask'
import MaterialEditMask from '_components/product/material_edit_mask'
import { GoodsList } from '_api/product'
import {mapState} from 'vuex'
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
      categoryList: []      // [{name: '', list:[{name:'',id:'',category_id:''}]}]
    }
  },
  computed: {
    ...mapState('product', {
      process: state => state.bomProcess
    })
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData() {
      try {
        const { data } = await GoodsList({category:1})
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.categoryList = data.reverse()
        }
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },

    // 计算总条数，筛选选中的产品
    getTotalCount() {
      // let count = 0
      // this.selectedProductArr = []sou
      // Object.values(this.selectedProductDict).forEach(product => {
      //   this.selectedProductArr.push(product)
      //   count += product.count
      // })
      // this.totalCount = count >= 100 ? '···' : count
      this.totalCount = Object.values(this.selectedProductDict).length
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
      this.isShowInputMask = false
      if(value > 0) {
        this.currentInputProduct['count'] = parseInt(value)
        this.selectedProductDict[this.currentInputProduct.id] = this.currentInputProduct
        this.getTotalCount()
      }
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
      this.$store.commit('product/Bom_Materials', Object.values(this.selectedProductDict))
      this.$router.push('/product/crafts_bom_list/add_time')
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
      overflow-y scroll
      padding 0px 10px 10px 10px
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
        .icon-selected
          height 18px
          width 18px
          display flex
          justify-content center
          align-items center
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
      height 85px
      position fixed
      bottom 0px
      display flex
      flex-direction column
      align-items center
      .title
        font-size 12px
        color #545454
        margin-top 8px
        margin-bottom 8px
      .save-row
        display flex
        flex-direction row
        align-items center
        justify-content space-between
        height 60px
        padding 0px 15px 0px 10px
        width 100%
        border-top 1px #cccccc solid
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



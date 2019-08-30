<!--创建或者修改供应商都要用到这个材料修改界面，如果是创建，则默认数据只有标题，如果是修改，则要把当前用户已经有的材料选上-->
<template lang="pug">
  .main
    .list-content(v-if="type==='create' && categoryList.length")
      p {{title}}
      .list-item(v-for="(product, productIdx) in categoryList" :key="productIdx"
        @click="itemClick(product)")
        .nameAndState
          span(class="item-name") {{product.name}}
        .icon-chooice(v-if="selectedProductDict[product.id]&&(selectedProductDict[product.id].unit_price>0)")
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconxuanz')
    .list-content(v-else-if="type==='add' && able.length")
      .item(v-if="able.length")
        p 供应商可售的物料
        .list-item(v-for="(product, productIdx) in able" :key="productIdx"
        @click="itemClick(product)")
          .nameAndState
            span(class="item-name") {{product.name}}
            span(class="item_other") 最小起订量：{{product.lowest_count=== null ? 0 : product.lowest_count}}{{product.unit || ''}} | 最小包装量：{{product.lowest_product=== null ? 0 : product.lowest_product}}{{product.unit || ''}}
          .icon-chooice(v-if="selectedProductDict[product.id]&&(selectedProductDict[product.id].unit_price>0)")
            svg.ali_icon(aria-hidden="true")
              use(xlink:href='#iconxuanz')
      .item(v-if="disable.length")
        p 供应商未出售的物料
        .list-item(v-for="(product, productIdx) in disable" :key="productIdx"
        @click="unsaleItemClick")
          .nameAndState
            span(class="item-name") {{product.name}}
    .list-content(v-else-if="type==='edit' && able.length")
      .item(v-if="able.length")
        p 供应商可售的物料
        .list-item(v-for="(product, productIdx) in able" :key="productIdx"
        @click="itemClick(product)")
          .nameAndState
            span(class="item-name") {{product.name}}
            span(class="item_other") 最小起订量：{{product.lowest_count=== null ? 0 : product.lowest_count}}{{product.unit || ''}} | 最小包装量：{{product.lowest_product=== null ? 0 : product.lowest_product}}{{product.unit || ''}}
          .icon-chooice(v-if="selectedProductDict[product.id]&&(selectedProductDict[product.id].unit_price>0)")
            svg.ali_icon(aria-hidden="true")
              use(xlink:href='#iconxuanz')
      .item(v-if="disable.length")
        p 供应商未出售的物料
        .list-item(v-for="(product, productIdx) in disable" :key="productIdx"
        @click="unsaleItemClick")
          .nameAndState
            span(class="item-name") {{product.name}}
          <!--.icon-chooice(v-if="selectedProductDict[product.id]&&(selectedProductDict[product.id].unit_price>0)")-->
            <!--svg.ali_icon(aria-hidden="true")-->
              <!--use(xlink:href='#iconxuanz')-->
    NullPage(v-else)
    MaterialEditMask(:show="isShowEditMask"
      :items="Object.values(selectedProductDict)"
      @arrowClick="selectedMaskArrowClick"
      @clearClick="selectedMaskClearClick"
      @itemClick="selectedMaskItemClick")
      template(v-slot:title="slotProps") {{slotProps.item.name}}
      template(v-slot:subtitle="slotProps") {{`单位：${slotProps.item.unit}`}} {{`单位采购价：${slotProps.item.unit_price}元`}}
      template(v-slot:tip="slotProps") 最小起订量：{{slotProps.item.lowest_count=== null ? 0 : slotProps.item.lowest_count}}{{slotProps.item.unit || ''}} | 最小包装量：{{slotProps.item.lowest_product === null ? 0 : slotProps.item.lowest_product}}{{slotProps.item.unit || ''}}
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
      :lowestPackageNumValue='currentInputProduct.lowest_product'
      :isCreate='this.$route.query.type === "create" ? "true" : "false"'
      :show="isShowInputMask"
      priceName='单位采购价'
      @arrowClick="hideInputMask"
      @addClick="inputMaskAddClick"
      @clearClick="inputMaskClearClick")
</template>

<script>
  import MaterialInputMask from '_components/purchase_list/purchase_car_input'
  import MaterialEditMask from '_components/purchase_list/purchase_car_edit'
  import NullPage from "_components/null_page"
  import { SupplierDetail,getSupplierMaterialsList } from '_api/purchase'
  import {mapActions, mapState} from "vuex";

  export default {
    components: {
      MaterialInputMask,
      MaterialEditMask,
      NullPage
    },
    data() {
      return {
        title: '以下数据源来自本公司的产品目录表',
        isLoad: false,
        type: '',
        isShowInputMask: false,
        isShowEditMask: false,
        totalCount: 0,
        inputPriceValue: '',
        currentInputProduct: {},  // 当前编辑的产品
        selectedProductDict:{},  // 有数量的产品 {id: {id:'',name:'',category_id:'',count:''},...}
        categoryList: [],
        able: [],
        disable: [],
        categoryList1: [
          {
            id: '111',
            name: '组件111',
            unit: '件',
            lowest_package: 1.0,
            lowest_count: 1.0
          },
          {
            id: '222',
            name: '螺丝刀',
            category_id: '222',
            unit: '把',
            lowest_package: 20,
            lowest_count: 10
          },
          {
            id: '333',
            name: '螺丝钉',
            category_id: '333',
            unit: '个',
            lowest_package: 20,
            lowest_count: 10
          },
          {
            id: '444',
            name: '元件444',
            category_id: '444',
            unit: '件',
            lowest_package: 20,
            lowest_count: 10
          },
          {
            id: '555',
            name: '其他555',
            category_id: '555',
            unit: '件',
            lowest_package: 20,
            lowest_count: 10
          },
          {
            id: '666',
            name: '其他666',
            category_id: '666',
            unit: '件',
            lowest_package: 20,
            lowest_count: 10
          },
          {
            id: '777',
            name: '其他777',
            category_id: '777',
            unit: '件',
            lowest_package: 20,
            lowest_count: 10
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
        getSupplierDetail: (state) => {
          return state.supplierDetail
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
      // 正式调网络数据
      this.initData()
      // 开启本地测试数据
      // this.categoryList = this.categoryList1
      // this.isLoad = true
    },
    methods: {
      ...mapActions('purchase', [
        'updateSupplierMessage'
      ]),
      initData() {
        // let path = this.type === 'add' ? this.queryId : ''
        let path = ''
        switch (this.type) {
          case 'edit':
          case 'add':
            path = this.queryId
            break
          case 'create':
            this.title = '以下数据源来自本公司的产品目录表'
            break
        }
        getSupplierMaterialsList({'id': path}, 'get', '').then(res => {
            this.categoryList = res.data.list || []
            this.able = res.data.able || []
            this.disable = res.data.disable || []
              this.initSelectedProductDict()
              this.isLoad = true
            // }
          }).catch(() => {
            this.$toast('获取数据失败')
        })

      },
      /**
       * 数据下载完后把详情那边带有的物料数据设置到已经选的list里面去。
       */
      initSelectedProductDict() {
        if(null != this.getSupplierDetail.materials) {
          let count = 0
          this.getSupplierDetail.materials.forEach(item =>{
            this.selectedProductDict[item.id] = item
            // count = count + 1
            for(let i = 0; i< this.able.length; i++) {
              if(item.id === this.able[i].id) {
                count = count + 1
                this.able[i] = item
              }
            }
          })
          this.totalCount = count >= 100 ? '···' : count
        }
      },
      // initSelectedProductDict() {
      //   if(null != this.getSupplierDetail.materials) {
      //     let count = 0
      //     this.getSupplierDetail.materials.forEach(item =>{
      //       this.selectedProductDict[item.id] = item
      //       count = count + 1
      //       for(let i = 0; i< this.categoryList.length; i++) {
      //         if(item.id === this.categoryList[i].id) {
      //           this.categoryList[i] = item
      //         }
      //       }
      //     })
      //     this.totalCount = count >= 100 ? '···' : count
      //   }
      // },
      getPrice(unit_price) {
        if(!unit_price) {
          return ''
        } else {
          return '￥'+unit_price
        }
      },
      getLowestCount(lowest_count) {
        // if(lowest_count === undefined || lowest_count === null) {
          return 0
        // }else {
        //   return lowest_count
        // }
      },
      // 计算总条数，筛选选中的产品
      getTotalCount() {
        let count = 0
        // this.selectedProductArr = []
        Object.values(this.selectedProductDict).forEach(product => {
          // this.selectedProductArr.push(product)
          count = count + 1
        })
        this.totalCount = count >= 100 ? '···' : count
      },
      itemClick(product) {
        this.currentInputProduct = product
        this.inputPriceValue = this.selectedProductDict[product.id] && (this.selectedProductDict[product.id].unit_price > 0) ? this.selectedProductDict[product.id].unit_price : ''
        this.isShowInputMask = true
      },
      unsaleItemClick(){
        this.$toast('供应商未出售物料')
      },
      hideInputMask() {
        this.isShowInputMask = false
      },
      // 点击添加物料时调用
      inputMaskAddClick(priceValue, countValue, packageNumValue) {
        if(priceValue<=0 || priceValue === '') {
          this.$toast('采购价必须大于0')
          return
        }
        if(countValue<0 || countValue === '') {
          this.$toast('最小起订量不能小于0')
          return
        }
        console.log(packageNumValue);
        if(packageNumValue<0 || packageNumValue === '') {
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
        /*Object.values(this.selectedProductDict).forEach(product => {
          console.log("product.id="+product.id);
          delete this.selectedProductDict[product.id]
          delete this.getSupplierDetail.materials[product.id]
        })
        console.log("销毁后查看是否还有数据")
        for(let i = 0; i < this.getSupplierDetail.materials.length; i++){
          // delete this.getSupplierDetail.materials[i]
          console.log(this.getSupplierDetail.materials[i].name)
        }*/
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
      // 点击保存
      async saveClick() {
        try {
          // this.data.supplierMessage.id = this.$route.query.id || ''
          console.log("this.getSupplierDetail="+this.getSupplierDetail)
          const { result } = await SupplierDetail(this.getSupplierDetail, 'put')
          if (result.errmsg) {
            this.$toast(result.errmsg)
          } else {
            this.$toast("修改成功")
            this.$router.go(-2)
          }
          console.log(result)
        } catch (e) {
          this.$toast("修改失败")
          console.log(e)
        }
      },
      // 下一步
      async goNext() {
        console.log("点击下一步赋值前")
        Object.values(this.selectedProductDict).forEach(product => {
          console.log("点击下一步赋值前selectedProductDirect的产品"+product.name)
        })
        let materials = []
        if(null != this.selectedProductDict) {
          Object.values(this.selectedProductDict).forEach(product => {
            if(null != product) {
              console.log("product.id="+product.id)
              if(!product.name) {
                console.log("product.name="+product.name)
              }
              materials.push({
                id:product.id,
                name:product.name,
                unit:product.unit,
                unit_price:product.unit_price,
                lowest_package:product.lowest_package,
                lowest_count:product.lowest_count,
              })
              // this.getSupplierDetail.materials = materials;
            }
          })
        }
        this.getSupplierDetail.materials = materials
        this.getSupplierDetail.materials.forEach((product) => {
          console.log("真正跳转时数据名字时："+product.name)
        })
        if(!this.getSupplierDetail.materials.length){
          this.$toast('请至少选择一种产品')
          return
        }
        this.updateSupplierMessage({
          ...this.getSupplierDetail
        })

        console.log("create_supplier_add_material->this.type="+this.type)
        if(this.type === 'edit') {
          // 1: 已加入DSD， 2: 未加入DSD
          let mState = this.$route.query.state || '1'
          this.$router.push(`/purchase/supplier/supplier_message_create?id=${this.queryId}&type=${this.type}&state=${mState}`)
        } else{// 'add'或者'create'
          this.$router.push(`/purchase/supplier/supplier_message_create?id=${this.queryId}&type=${this.type}`)
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
    display flex
    flex-direction column
    .list-content
      overflow-y scroll
      padding 0px 10px 10px 10px
      p
        padding 15px 10px 15px 10px
        fsc 14px #999999
      .list-content
        overflow-y scroll
        padding 15px 15px 0 15px
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
        padding 7px 20px 7px 15px
        align-items center
        .nameAndState
          display flex
          flex-direction column
          .item-name
            font-size 14px
            color #545454
          .item-price
            fsc 12px #999999
            margin-top 8px
            align-items left
          .item_other
            fsc 12px #999999
            margin-top 8px
            align-items left
        .icon-chooice
          wh 18px 18px
    .select-content
      background-color #ffffff
      width 100%
      height 52px
      position fixed
      bottom 0px
      display flex
      flex-direction column
      align-items center
      box-shadow 0px -1px 8px 0px rgba(182,205,214,0.5)
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



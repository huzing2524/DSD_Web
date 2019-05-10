<template lang="pug">
  .storage_list(v-if="isLoad")
    div(v-doc-title="doctitle")
    .storage_nav
      .nav_item(:class="selectedIndex===0?'active':''" @click="optionClick(0)") 产品库存
      .nav_item(:class="selectedIndex===1?'active':''" @click="optionClick(1)") 物料库存
    .storage_product(v-if="selectedIndex===0")
      .storage_box(v-if="products.category.length" v-for="(item,index) in products.category" :key="index")
        .storage_category {{item.category}}
        .storage_item(v-for="(items,index) in item.products" :key="index" @click="toProductDetail(items)")
          .storage_name {{items.name}}
          span 可用库存：{{items.available}}{{items.unit}}
          p 最近一次出库：{{items.recent | timePointFilter}}
      .storage_box(v-if="products.not_category.length" v-for="(item,index) in products.not_category")
        .storage_category 未分类的产品
        .storage_item(v-for="(items,index) in item.products" :key="index" @click="toProductDetail(items)")
          .storage_name {{items.name}}
          span 可用库存：{{items.available}}{{items.unit}}
          p 最近一次出库：{{items.recent | timePointFilter}}
    .storage_material(v-else)
      .storage_box(v-if="materials.category.length" v-for="(item,index) in materials.category" :key="index")
        .storage_category {{item.category}}
        .storage_item(v-for="(items,index) in item.materials" :key="index" @click="toMaterialDetail(items)")
          .storage_name {{items.name}}
          span 可用库存：{{items.available}}{{items.unit}}
          p 最近一次出库：{{items.recent | timePointFilter}}
      .storage_box(v-if="materials.not_category.length" v-for="(item,index) in materials.not_category")
        .storage_category 未分类的产品
        .storage_item(v-for="(items,index) in item.materials" :key="index" @click="toMaterialDetail(items)")
          .storage_name {{items.name}}
          span 可用库存：{{items.available}}{{items.unit}}
          p 最近一次出库：{{items.recent | timePointFilter}}
</template>

<script>
  import { StoreStorageMain } from '_api/store/'
  export default {
    data() {
      return {
        isLoad:false,
        doctitle:'',
        selectedIndex: 0,
        products:{},
        materials:{},
      }
    },
    mounted() {
      if(this.$route.query.type){
        this.doctitle = '库存结存金额'
      }else {
        this.doctitle = '库存列表'
      }
      this.initData()
    },
    methods: {
      initData() {
        if (this.$route.query.kind === '0') {
          this.selectedIndex = 0
        } else if (this.$route.query.kind === '1') {
          this.selectedIndex = 1
        }
        this.getListData()
      },
      getListData(){
        StoreStorageMain({},'get').then((res) => {
          this.listItem = res.data
          this.products = this.listItem[0]
          this.materials = this.listItem[1]
          this.isLoad = true
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      optionClick(index) {
        this.selectedIndex = index
        if (index === 0) {
          this.$router.replace(this.$route.path + '?kind=0')
        } else {
          this.$router.replace(this.$route.path + '?kind=1')
        }
      },
      toProductDetail(items){
        this.$router.push(`/store/storage_list/detail/product?id=${items.id}`)
      },
      toMaterialDetail(items){
        this.$router.push(`/store/storage_list/detail/material?id=${items.id}`)
      },
    },
  }
</script>

<style scoped lang="stylus">
  .storage_list
    width 100%
    height 100%
    background #fff
    padding 0 10px 10px 10px
    overflow scroll
    .storage_nav
      display flex
      flex-direction row
      padding 20px 0
      align-items center
      .nav_item
        font-size 13px
        color #999999
        margin-right 20px
        &.active
          font-size 15px
          font-weight 500
          color #545454
    .storage_product,.storage_material
      display flex
      flex-direction column
      .storage_box
        display flex
        flex-direction column
        padding 15px 15px 5px
        box-shadow 0px 0px 10px 0px rgba(35,121,191,0.2)
        border-radius 8px
        margin-bottom 10px
        .storage_category
          fsc(15px,#545454)
          margin-bottom 20px
        .storage_item
          margin-bottom 15px
          .storage_name
            fsc(14px,#545454)
          span
            fsc(12px,#7A7A7A)
          p
            fsc(12px,#999999)
</style>

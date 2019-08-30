<template lang="pug">
  .storage.full_box(v-if="isLoad")
    div(v-doc-title="doctitle")
    .storage_list(v-if="!selectBoxShow")
      .storage_nav
        .left
          .nav_item(:class="selectedIndex===0?'active':''" @click="optionClick(0)") 产品库存
          .nav_item(:class="selectedIndex===1?'active':''" @click="optionClick(1)") 物料库存
        .right(@click="selectBoxShow=!selectBoxShow")
          span 全部
          img(src="./arrow_top.png" v-if="selectBoxShow")
          img(src="./arrow_down.png" v-else)
      .storage_product(v-if="selectedIndex===0")
        .storage_box(v-if="products.category.length" v-for="(item,index) in products.category" :key="index")
          <!--.storage_category {{item.category}}-->
          .storage_item(v-for="(items,index) in item.products" :key="index" @click="toProductDetail(items)")
            .storage_name {{items.name}}
            span 可用库存：{{items.available}}{{items.unit}}
            p {{items.store_name}}
        .storage_box(v-if="products.not_category.length" v-for="(item,index) in products.not_category")
          <!--.storage_category 未分类的产品-->
          .storage_item(v-for="(items,index) in item.products" :key="index" @click="toProductDetail(items)")
            .storage_name {{items.name}}
            span 可用库存：{{items.available}}{{items.unit}}
            p {{items.store_name}}
      .storage_material(v-else)
        .storage_box(v-if="materials.category.length" v-for="(item,index) in materials.category" :key="index")
          <!--.storage_category {{item.category}}-->
          .storage_item(v-for="(items,index) in item.materials" :key="index" @click="toMaterialDetail(items)")
            .storage_name {{items.name}}
            span 可用库存：{{items.available}}{{items.unit}}
            p {{items.store_name}}
        .storage_box(v-if="materials.not_category.length" v-for="(item,index) in materials.not_category")
          <!--.storage_category 未分类的产品-->
          .storage_item(v-for="(items,index) in item.materials" :key="index" @click="toMaterialDetail(items)")
            .storage_name {{items.name}}
            span 可用库存：{{items.available}}{{items.unit}}
            p {{items.store_name}}
    .storage_content(v-show="selectBoxShow")
      .storage_nav
        .left
          .nav_item(:class="selectedIndex===0?'active':''" @click="optionClick(0)") 产品库存
          .nav_item(:class="selectedIndex===1?'active':''" @click="optionClick(1)") 物料库存
        .right(@click="selectBoxShow=!selectBoxShow")
          span 全部
          img(src="./arrow_top.png" v-if="selectBoxShow")
          img(src="./arrow_down.png" v-else)
      .storage_select(@click="toCancleClick")
        .select_box(@click.stop="()=>{}")
          .title 选择仓库
          .content
            .storage_item(v-for="(item,index) in storageList" :key="index" @click="confirmClick(item)")
              .left
                span {{item.name}}
                p 产品库存：{{item.products}} I 物料库存 {{item.materials}}
              .icon(v-if="item.isSelected")
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconxuanz")
          .options
            .item(@click="toEditClick") 编辑仓库
            .item(@click="toNewClick") 新建仓库
</template>

<script>
  import { StoreStorageMain,StoreStorageSelect } from '_api/store/'
  export default {
    data() {
      return {
        isLoad:false,
        doctitle:'',
        selectedIndex: 0,
        selectBoxShow: false,
        listItem:{},
        products:{},
        materials:{},
        storageList:[],
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
        this.getStorageList()
      },
      getStorageList(){
        StoreStorageSelect({},'get').then((res) => {
          this.storageList = res.data
          this.storageList.forEach((item) => {
            if(item.id === 'default'){
              item.isSelected = true
            }
          })
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      getListData(id){
        StoreStorageMain({
          choice: id ? id : 'all'
        },'get').then((res) => {
          this.listItem = res.data
          this.products = this.listItem[0]
          this.materials = this.listItem[1]
        }).catch(() => {
          this.$toast('获取数据失败')
        })
        this.isLoad = true
      },
      optionClick(index) {
        this.selectedIndex = index
        this.selectBoxShow = false
        if (index === 0) {
          this.$router.replace(this.$route.path + '?kind=0')
        } else {
          this.$router.replace(this.$route.path + '?kind=1')
        }
      },
      confirmClick(item){
        this.storageList.forEach((item) => {
          item.isSelected = false
        })
        item.isSelected = true
        if(item.id==='default'){
          this.getListData()
        }else {
          this.getListData(item.id)
        }
        this.selectBoxShow = false
      },
      toProductDetail(items){
        this.$router.push(`/store/storage_list/detail/product?id=${items.id}`)
      },
      toMaterialDetail(items){
        this.$router.push(`/store/storage_list/detail/material?id=${items.id}`)
      },
      toCancleClick(){
        this.selectBoxShow  = false
      },
      toEditClick(){
        this.$router.push(`/store/storage_list/edit`)
      },
      toNewClick(){
        this.$router.push(`/store/storage_list/new?state=create`)
      },
    },
  }
</script>

<style scoped lang="stylus">
  .storage
    width 100%
    height 100%
    background #fff
    position relative
    overflow-y hidden
    .storage_list
      width 100%
      height 100%
      overflow scroll
      .storage_nav
        display flex
        flex-direction row
        padding 20px 10px
        justify-content space-between
        align-items center
        box-shadow 0px 1px 6px 0px rgba(35,121,191,0.15)
        z-index 10
        .left
          display flex
          flex-direction row
          align-items center
          .nav_item
            font-size 13px
            color #999999
            margin-right 20px
            &.active
              font-size 15px
              font-weight 600
              color #545454
        .right
          display flex
          flex-direction row
          align-items center
          span
            fsc 15px #545454
            margin-right 6px
          img
            wh 12px 6px
      .storage_product,.storage_material
        display flex
        flex-direction column
        .storage_box
          display flex
          flex-direction column
          padding 0 10px
          margin-bottom 10px
          .storage_category
            fsc(15px,#545454)
            margin-bottom 20px
          .storage_item
            display flex
            flex-direction column
            margin-top 12px
            padding-bottom 12px
            border-bottom 1px solid #EEEEEE
            .storage_name
              fsc(14px,#545454)
            span
              fsc(12px,#7A7A7A)
              margin 2px 0
            p
              fsc(12px,#999999)
    .storage_content
      display flex
      flex-direction column
      position absolute
      left 0
      top 0
      right 0
      bottom 0
      z-index 5
      overflow-y hidden
      .storage_nav
        display flex
        flex-direction row
        padding 20px 10px
        justify-content space-between
        align-items center
        box-shadow 0px 1px 6px 0px rgba(35,121,191,0.15)
        z-index 10
        .left
          display flex
          flex-direction row
          align-items center
          .nav_item
            font-size 13px
            color #999999
            margin-right 20px
            &.active
              font-size 15px
              font-weight 600
              color #545454
        .right
          display flex
          flex-direction row
          align-items center
          span
            fsc 15px #545454
            margin-right 6px
          img
            wh 12px 6px
      .storage_select
        display flex
        flex-direction column
        align-items center
        width 100%
        height 100%
        background rgba(0,0,0,0.5)
        .select_box
          position relative
          wh 315px 435px
          display flex
          flex-direction column
          bgf()
          border-radius 8px
          margin-top 40px
          padding-bottom 68px
          .title
            fsc 16px #333333
            text-align center
            font-weight 600
            padding 12px 0 8px
          .content
            flex-direction column
            padding 0 10px
            overflow scroll
            .storage_item
              display flex
              flex-direction row
              justify-content space-between
              align-items center
              margin-top 12px
              padding-bottom 12px
              border-bottom 1px solid #EEEEEE
              .left
                display flex
                flex-direction column
                span
                  fsc 14px #333333
                  margin-bottom 4px
                p
                  fsc 12px #666666
              .icon
                wh 20px 20px
          .options
            width 100%
            height 60px
            line-height 60px
            position absolute
            bottom 0
            display flex
            flex-direction row
            border-top 1px solid #EEEEEE
            margin-top 8px
            .item
              display flex
              flex 1
              align-items center
              justify-content center
              fsc 14px #1E9AFF
              border-right 1px solid #E5EFF5
              &:last-child
                border-right 0
</style>

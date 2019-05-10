<template lang="pug">
  .main
    .add-input
      input(placeholder="填写供应商名称"
        v-model="searchName"
        @input="input")
      .under-line
      .result-content()
        .result-item(v-for="(item, index) in resultDatas"
          :key="index"
          @click="itemClick(item.id)")
          span(class="item-title") {{item.name}}
    span(class="no-material-span" @click="toAddSupplier") 没找到对应供应商？
</template>

<script>
  import { SupplierSearch } from '../../../../api/purchase'
  export default {
    data() {
      return {
        resultDatas:[
          // {
          //   id:'001',
          //   name: '深圳大数点科技有限公司',
          // },
          // {
          //   id:'002',
          //   name: '东莞市永明劳保用品有限公司',
          // },
          /*{
            "id": "LFJts5rRjVZ4f6dkiQ",
            "name": "fac_app_10312"
          }, {
            "id": "2rL3UDkJy3NUJedCKY",
            "name": "fac_app_10313"
          }, {
            "id": "xujZAfTMB4RHfx4sKU",
            "name": "fac_app_10314"
          }*/
        ],
        searchName:''
      }
    },
    methods: {
      toAddSupplier() {
        this.$router.push(`/purchase/supplier/supplier_create?type=create`)
      },
      input(event) {
        const { target } = event
        const { value } = target
        this.searchSupplier(value)
      },
      async searchSupplier(value) {
        try {
          const { data } = await SupplierSearch({name: value})
          if(data.errmsg) {
            console.log(data.errmsg)
          } else {
            this.resultDatas = data.list
          }
        } catch (error) {
          console.log('数据获取失败')
        }
      },
      itemClick(item) {
        console.log("item="+item)
        // 打开添加客户的客户信息界面
        this.$router.push(`/purchase/supplier/supplier_message_chooice?id=${item}`)
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .main
    height 100%
    width 100%
    background-color white
    padding 39px 25px 0px 25px
    display flex
    justify-content  center
    .add-input
      width 100%
      height 40%
      font-size 15px
      font-weight 400
      input
        width 100%
      .under-line
        margin-top 5px
        height 1px
        background-color #DDDDDD
      .result-content
        height 40vh
        overflow-y scroll
        .result-item
          border-bottom 1px solid #DDDDDD
          width 100%
          padding 10px 0px 10px 0px
          display flex
          flex-direction column
          .item-title
            title()

    .no-material-span
      color rgba(0,141,255,1)
      width 100%
      font-weight 400
      font-size 14px
      position fixed
      text-align center
      bottom 20px
</style>



<!--供应商商品管理-->
<template lang="pug">
  .order_list.full_box
    PurchaseList(v-if="isLoad" :dataList="dataList"  :jumpPath="jumpPath")
    NullPage(v-else)
    NewIcon(to="/purchase/supplier/supplier_add")
</template>

<script>
  import PurchaseList from "_components/card_list/_purchaselist2";
  import NewIcon from '_components/new_icon/'
  import NullPage from "_components/null_page"
  import {getSupplierList} from "_api/purchase"

  export default {
    components: {
      PurchaseList,
      NewIcon,
      NullPage
    },
    data() {
      return {
        isLoad: false,
        jumpPath: '/purchase/supplier/supplier_message_edit',
        dataList: {
          /*"1": [
            {
              name: '湖北天仙来工贸有限公司',
              industry: '机械制造',
              materials: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '阿里巴巴有限公司',
              industry: '电子商务',
              materials: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '湖北天仙来工贸有限公司',
              industry: '机械制造',
              materials: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '阿里巴巴有限公司',
              industry: '电子商务',
              materials: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '湖北天仙来工贸有限公司',
              industry: '机械制造',
              materials: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '阿里巴巴有限公司',
              industry: '电子商务',
              materials: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            }
          ],
          "2": [
            {
              name: '汇美科技有限公司',
              industry: '电子商务',
              materials: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '湖北天仙来工贸有限公司',
              industry: '机械制造',
              materials: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '阿里巴巴有限公司',
              industry: '电子商务',
              materials: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '珠海格力科技有限公司',
              industry: '机械制造',
              materials: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            }
          ],*/
        }
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      async initData() {
        try {
          const {data} = await getSupplierList()
          if (data.errmsg) {
            this.$toast(data.errmsg)
          } else {
            this.isLoad = true
            this.dataList = data.list
            console.log("dataList="+this.dataList)
            console.log("dataList[0].id="+this.dataList[0])
          }
        } catch (e) {
          console.log("获取数据失败,失败原因"+ e.toString())
        }
      },
      toCreateClick() {
        this.$router.push(`/purchase/supplier/supplier_add`)
      },
      // onItemClick(itemId) {
      //   this.$router.push({
      //     path: `/purchase/supplier/supplier_message_chooice?id=${itemId}`
      //   })
      // },
    }
  }
</script>

<style scoped lang="stylus">
  .main
    white-space:
</style>

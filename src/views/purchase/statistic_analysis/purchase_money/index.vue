<!--采购金额-->
<template lang="pug">
  .order_list(v-if="Object.keys(this.mDataList).length != 0").full_box
    PurchaseList(:dataList="mDataList"  :jumpPath="jumpPath" :listType="purchaseListType")
  NullPage(v-else)
</template>

<script>
  import PurchaseList from "_components/card_list/_purchaselist";
  import {getPurchaseList} from "_api/purchase"
  import NullPage from '_components/null_page/'

  export default {
    components: {
      PurchaseList,
      NullPage
    },
    data() {
      return {
        purchaseListType: '3',
        jumpPath: '/purchase/purchase_list/purchase_detail',
        mDataList: {
          "1": [
            {
              name: '湖北天仙来工贸有限公司',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '阿里巴巴有限公司',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '湖北天仙来工贸有限公司',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '阿里巴巴有限公司',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '湖北天仙来工贸有限公司',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '阿里巴巴有限公司',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            }
          ],
          "2": [
            {
              name: '汇美科技有限公司',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '北京明达科技有限公司',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '珠海格力科技有限公司',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            }
          ],
        },
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      toCreateClick() {
        this.$router.push(`/purchase/supplier/supplier_add`)
      },
      async initData() {
        try {
          const {data} = await getPurchaseList('3')
          if (data.errmsg) {
            this.$toast(data.errmsg)
          } else {
            this.mDataList = data.list
            Object.keys(this.mDataList).forEach(value,index,array=>{

            })


          }
        } catch (e) {
          console.log("获取数据失败,失败原因"+ e.toString())
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
</style>

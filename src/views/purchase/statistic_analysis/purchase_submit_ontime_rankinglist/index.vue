<!--供应商准时提交排行榜-->
<template lang="pug">
  .order_list(v-if="Object.keys(this.mDataList).length != 0").full_box
    PurchaseList(:dataList="mDataList" @click="onItemClick"  :typeArray="titleList" :jumpPath="jumpPath" :listType="purchaseListType")
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
        purchaseListType: '4',
        // typeArray: ["深圳大数点科技有限公司", "南方机器人","汇美科技有限公司","湖北天仙来工贸有限公司","珠海格力科技有限公司"],
        jumpPath: '/purchase/purchase_list/purchase_detail',
        titleList: [],
        mDataList: {
          /*"深圳大数点科技有限公司": [
            {
              name: '深圳大数点科技有限公司',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '深圳大数点科技有限公司',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            }
          ],
          "南方机器人": [
            {
              name: '南方机器人',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '南方机器人',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '南方机器人',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            }
          ],
          "汇美科技有限公司3": [
            {
              name: '汇美科技有限公司',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '汇美科技有限公司',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '汇美科技有限公司',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            }
          ],
          "湖北天仙来工贸有限公司": [
            {
              name: '湖北天仙来工贸有限公司',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '湖北天仙来工贸有限公司',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '湖北天仙来工贸有限公司',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            }
          ],
          "珠海格力科技有限公司": [
            {
              name: '珠海格力科技有限公司',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '珠海格力科技有限公司',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            },
            {
              name: '珠海格力科技有限公司',
              time: '2019.04.02 14:19',
              products: '一次性口罩、棉布口罩、N95口罩、防尘口罩...'
            }
          ],*/
        }
      }
    },
    mounted() {
      console.log(Object.keys(this.mDataList));
      this.initData()
      Object.keys(this.mDataList).forEach((titleName) => {
        console.log(titleName)
        this.titleList.push(titleName ? "佚名" : titleName)
      })
    },
    methods: {
      toCreateClick() {
        this.$router.push(`/purchase/supplier/supplier_add`)
      },
      onItemClick(itemId) {
        this.$router.push({
          path: `/purchase/purchase_list/purchase_detail?id=${itemId}`
        })
      },
      /*async initData() {
          try {
            const {data} = await getPurchaseList('4');
            if (data.errmsg) {
              console.log(data.errmsg)
            } else {
              this.mDataList = data.list;
              if(null != this.mDataList) {
                Object.keys(this.mDataList).forEach((titleName) => {
                  console.log(titleName)
                  this.titleList.push(titleName ? "佚名" : titleName)
                })
              }
              console.log("mDataList="+this.mDataList)
            }
          } catch (e) {
            console.log("获取数据失败,失败原因"+ e.toString())
          }
      },*/
      initData() {
        try {
          getPurchaseList('4').then( res=>{
            console.log(res.data.errmsg)
            console.log(res.data.list)
            if (res.data.errmsg) {
              console.log(res.errmsg)
            } else {
              this.mDataList = res.data.list;
              if(null != this.mDataList) {
                Object.keys(this.mDataList).forEach((titleName) => {
                  console.log(titleName)
                  this.titleList.push(titleName ? "佚名" : titleName)
                })
              }
              console.log("mDataList="+this.mDataList)
            }
          });
        } catch (e) {
          console.log("获取数据失败,失败原因"+ e.toString())
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
</style>

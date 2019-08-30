<template lang="pug">
  .order_list(v-if="null != this.dataList && Object.keys(this.dataList).length != 0").full_box
    PurchaseList(:dataList="dataList"  :jumpPath="jumpPath" :listType="purchaseListType")
  NullPage(v-else)
</template>

<script>
  import PurchaseList from "_components/card_list/_purchaselist";
  import NullPage from "_components/null_page"
  import {getPurchaseList} from "_api/purchase"

  export default {
    components: {
      PurchaseList,
      NullPage,
    },
    data() {
      return {
        purchaseListType: '1',
        // typeArray: ["待审批", "已审核待确认","采购中","运输中","已入库","已取消"],
        jumpPath: '/purchase/purchase_list/purchase_detail',
        dataList: {
        // 待审批
        /*"1": [
          {
            "id": "2019041200001",
            name: '东莞市永明劳保用品有限公司1',
            products: '普通口罩：500个；防尘口罩：300个；一次性…',
            time: '2019.04.02 14:19'
         },
        ],
        // 待确认
        "2":  [
          {
            "id": "2019041200001",
            name: '东莞市永明劳保用品有限公司2',
            products: '普通口罩：500个；防尘口罩：300个；一次性…',
            time: '2019.04.02 14:19'
          },
        ],
        // 采购中
        "3": [
          {
            "id": "2019041200001",
            name: '东莞市永明劳保用品有限公司3',
            products: '普通口罩：500个；防尘口罩：300个；一次性…',
            time: '2019.04.02 14:19'
         },
        ],
        // 运输中
        "4": [
          {
            "id": "2019041200001",
            name: '东莞市永明劳保用品有限公司4',
            products: '普通口罩：500个；防尘口罩：300个；一次性…',
            time: '2019.04.02 14:19'
          },
        ],
        // 已入库
        "5": [
          {
            "id": "2019041200001",
            name: '东莞市永明劳保用品有限公司6',
            products: '普通口罩：500个；防尘口罩：300个；一次性…',
            time: '2019.04.02 14:19'
          },
        ],
        // 已取消
        "6": [
          {
            "id": "2019041200001",
            name: '东莞市永明劳保用品有限公司7',
            products: '普通口罩：500个；防尘口罩：300个；一次性…',
            time: '2019.04.02 14:19'
          },
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
          const {data} = await getPurchaseList('1')
          if (data.errmsg) {
            this.$toast(data.errmsg)
          } else {
            this.dataList = data.list
            console.log("dataList="+this.dataList)
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

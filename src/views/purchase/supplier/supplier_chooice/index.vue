<template lang="pug">
  .order_list.full_box(v-if="Object.keys(this.dataList).length != 0")
    .card_list.full_box(ref="listContainer")
      .order_index()
        .list_tab
          .tab_item(v-for="(item, idx) in Object.keys(dataList)" :key="idx" @click="scrollAdd(idx)") {{item | purchaseChooiceState}} {{dataList[Object.keys(dataList)[idx]].length}}
        .list_card(v-for="(item, idx) in Object.keys(dataList)" ref="cardItem")
          p.card_title {{item | purchaseChooiceState}}
          .card_item(v-for="(items, idxs) in dataList[Object.keys(dataList)[idx]]" :key="idxs" @click="toChooiceClick(items)")
            .name
              span {{items.name}}
            .info
              span {{items.industry}}
              p {{items.materials}}
    NewIcon(to="/purchase/supplier/supplier_add")
  NullPage(v-else)
</template>

<script>
  import NewIcon from '_components/new_icon/'
  import NullPage from "_components/null_page"
  import {getSupplierList} from "_api/purchase"
  import {mapState,mapActions} from "vuex";

  export default {
    components: {
      NewIcon,
      NullPage
    },
    data() {
      return {
        dataList: {},
      }
    },
    computed: {
      ...mapState('purchase',{
        getData: function (state) {
          this.isLoad = true;
          return state.purchaseDetail
        },
      }),
    },
    filters: {
      purchaseChooiceState(val) {
        let state = ''
        switch (parseInt(val)) {
          case 1:
            state = '已加入DSD'
            break
          case 2:
            state = '未加入DSD'
            break
          default:
            state = ''
        }
        return state
      },
    },
    mounted() {
      this.initData()
    },
    methods: {
      ...mapActions('purchase', [
        'updatePurchase'
      ]),
      async initData() {
        try {
          const {data} = await getSupplierList()
          if (data.errmsg) {
            this.$toast(data.errmsg)
          } else {
            this.dataList = data.list
          }
        } catch (e) {
          this.$toast("获取数据失败")
        }
      },
      scrollAdd(idx) {
        let vm = this
        let t = setInterval(function () {
          vm.$refs.listContainer.scrollTop += 25
          if (vm.$refs.listContainer.scrollTop >= (vm.$refs.cardItem[idx].offsetTop) || (vm.$refs.listContainer.scrollTop + 667) >= vm.$refs.listContainer.scrollHeight) {
            clearInterval(t)
          }
        }, 15)
      },
      // 选择供应商，返回到‘供应商修改’界面
      toChooiceClick(item) {
        this.getData.supplier.supplier_id = item.id
        this.getData.supplier.name = item.name
        this.getData.supplier.contact = item.contact
        this.getData.supplier.position = item.position
        this.getData.supplier.phone = item.phone
        this.getData.supplier.address = item.region + item.address
        this.updatePurchase({
          ...this.getData
        })
        this.$router.go(-1)
      },
    }
  }
</script>

<style scoped lang="stylus">
  .order_list
    .card_list
      padding 0 10px 10px
      bgf()
      .list_tab
        display flex
        flex-direction row
        padding 20px 0
        .tab_item
          font-size 13px
          color #999999
          margin-right 20px
      .list_card
        display flex
        flex-direction column
        padding 15px 15px 0 15px
        box-shadow 0px 0px 10px 0px rgba(35, 121, 191, 0.2)
        border-radius 8px
        margin-bottom 10px
        .card_title
          font-size 15px
          color #545454
          margin-bottom 20px
        .card_item
          display flex
          flex-direction column
          margin-bottom 20px
          .name
            display flex
            flex-direction row
            align-items center
            span
              font-size 15px
              color #545454
          .info
            display flex
            flex-direction column
            font-size 12px
            span
              color #7A7A7A
              margin 4px 0
              overflow hidden
            p
              color #999999
</style>

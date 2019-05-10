<template lang="pug">
  .main
    .goods-name
      p {{data.name}}
    .goods-id(v-show="queryType!=1")
      p {{`编码：${data.id}`}}
    .goods-id
      p {{`单位：${data.unit}`}}
    .goods-id
      p {{`类目：${data.category || '其他'}`}}
    .add-btn(@click="create")
      .add-title
        p 添加

</template>

<script>
import { GoodsDetail, GoodsCreate} from '_api/product'
export default {
  data() {
    return {
      data: {

      }
    }
  },
  mounted() {
    this.initData()
  },
  computed: {
    queryId() { return this.$route.query.id },
    queryType() { return this.$route.query.type },  // 0: 搜索  1： 新建
    queryName() { return this.$route.query.name },
    queryUnit() { return this.$route.query.unit },
  },
  methods: {
    async initData() {
      if(this.queryType == 1) {
        this.data = { name: this.queryName, unit: this.queryUnit, id: '' }
        return
      }
      try {
        const { data } = await GoodsDetail(this.queryId)
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.data = data
        }
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
    async create() {
      if (this.queryType == 1) {
        try {
          const body = {name: this.queryName, unit: this.queryUnit }
          const {data} = await GoodsCreate(body)
          if(data.errmsg) {
            this.$toast(data.errmsg)
          } else {
            // this.$router.push(`/product/goods_list/detail?id=${data.id}`)
            this.$router.push(`/product/goods_list/add_success?id=${data.id}&name=${this.queryName}`)
          }
        } catch (error) {
          this.$toast('操作失败')
        }
        return
      }
      try {
        const body = { id:this.data.id, category_id:this.data.category_id }
        const { data } = await GoodsCreate(body)
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.$router.push(`/product/goods_list/add_success?id=${this.queryId}&name=${this.data.name}`)
        }
      } catch (error) {
        this.$toast('操作失败')
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
  .main
    height 100%
    width 100%
    background-color white
    padding 15px
    .goods-name
      font-size 15px
      font-weight 500
      color rgba(84,84,84,1)
    .goods-id
      font-size 14px
      font-weight 400
      color rgba(102,102,102,1)
      margin-top 10px
    .add-btn
      display flex
      justify-content center
      align-items center
      background-color rgba(30,154,255,1)
      border-radius 22px
      height 44px
      margin-top 40px
      .add-title
        color white
        font-size 15px
        font-weight 400
</style>




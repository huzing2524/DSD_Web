<template lang="pug">
  .main
    p(class="title-content") {{`${data.name}/ ${data.unit}`}}
    .main-content
      .process-content(v-for="(item, index) in data.process" :key="index")
        .name-content
          span(class="process-name") {{`工艺${item.process_step}`}}
          span(class="process-name") {{item.process_name}}
        .detail-content
          .name-content
            span(class="unit-span") 单位工序用时
            span(class="unit-span") {{`${item.unit_time}分`|| '0分'}} 
          .line
          .name-content
            span(class="unit-span") 工序所需物料
          .name-content(v-for="(material, mIdx) in item.material_list" :key="mIdx")
            span(class="material-name") {{material.name}}
            span(class="material-name") {{`${material.count} ${material.unit}`}}
        .btn-content
          .btn(@click="deleteClick(item)")
            span(class="delete") 删除
          .space-line
          .btn(@click="changeClick(item)")
            span(class="edit") 修改
    NullPage(v-show="Object.values(data).length<=0")
    .add-content
      .add-process(@click="addClick")
        span 添加工序
</template>

<script>
import NullPage from '_components/null_page';
import { CraftsDetail, DeleteCrafts } from '_api/product'
export default {
  components: {
    NullPage
  },
  data() {
    return {
      data: {}
    }
  },
  computed: {
    queryId() {
      return this.$route.query.id
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async initData() {
      const { query } = this.$route
      try {
        const { data } = await CraftsDetail(query.id)
        if (data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.data = data
        }
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
    async deleteClick(item) {
      // 调用删除
      try {
        const body = {process_step: item.process_step}
        const { data } = await DeleteCrafts(body, this.queryId)
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.initData()
        }
      } catch (error) {
        this.$toast('删除出错')
      }
    },
    changeClick(item) {
      this.$store.commit('product/Bom_Type','0')
      this.$store.commit('product/Bom_Process',item)
      this.$router.push(`/product/crafts_bom_list/material_select`)
    },
    addClick() {
      this.$store.commit('product/Bom_Type','1')
      this.$router.push(`/product/crafts_bom_list/add?id=${this.queryId}`)
    }
  },
}
</script>

<style lang="stylus" scoped>
  .main
    width 100%
    height 100%
    background-color #ffffff
    .title-content
      display flex
      flex-direction row
      align-items center
      background-color #ffffff
      padding 10px 0px 10px 15px
      color #333333
      font-size 16px
      font-weight 500
    .main-content
      width 100%
      padding 10px 10px 72px 10px
      background-color #ffffff
      overflow-y scroll
    .process-content
      padding 15px 15px 0px 15px
      margin-bottom 10px
      display flex
      flex-direction column
      box-shadow:0px 0px 10px 0px rgba(35,121,191,0.2);
      border-radius:8px;
      .name-content
        display flex
        flex-direction row
        justify-content space-between
        margin-bottom 12px
        .process-name
          font-size 14px
          color #333333
          font-weight 500
        .unit-span
          font-size 14px
          color #333333
      .detail-content
        background-color #F5FBFF
        border-radius 6px
        padding 12px 10px 12px 10px
      .line
        background-color #D6E9F6
        height 1px
        flex 1
        margin-bottom 12px
      .material-name
        color #666666
        font-size 12px
      .btn-content
        display flex
        align-items center
        height 50
        justify-content space-between
        .btn 
          display flex
          align-items center
          justify-content center
          width 30%
          height 50px
          .delete
            color #666666
            font-size 15px
          .edit
            color #1E9AFF
            font-size 15px
        .space-line
          height 20px
          width 1px
          background-color #e5eff5
    .add-content
      height 62px
      width 100%
      background-color #ffffff
      position fixed
      bottom 0px
      border-top 1px solid #EFEFEF
      .add-process
        position absolute
        right 15px
        top 15px
        display flex
        justify-content center
        align-items center
        background-color #1E9AFF
        border-radius 16px
        height 32px
        width 100px
        span 
          color #ffffff
          font-size 14px
</style>



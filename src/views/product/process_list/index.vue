<template lang="pug">
  .main
    .process-content(v-for="(item, index) in dataList" :key="index")
      .name-content
        span(class="process-name") 工序名称：
        span(class="process-name") {{item.name}}
      .name-content
        span(class="process-name") 编号：
        span(class="process-name") {{item.id}}
      .btn-content
        .btn(@click="deleteClick(item,index)")
          span(class="delete") 删除
        .space-line
        .btn(@click="changeClick(index,item)")
          span(class="edit") 修改
    NullPage(v-show="dataList.length<=0")
    NewIcon(to='/product/process_list/add'
            :iconStyle="{position:'absolute'}")
</template>

<script>
import NewIcon from '_components/new_icon/'
import NullPage from '_components/null_page';
import { ProcessList, ProcessDelete } from '_api/product'
export default {
  components:{
    NewIcon,
    NullPage
  },
  data() {
    return {
      dataList: [
        // {
        //   name: '---',
        //   id: '---'
        // },
      ]
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    async deleteClick(item,index) {
      try {
        const { data } = await ProcessDelete(item.id)
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.dataList.splice(index,1)
        }
      } catch (error) {
        this.$toast('删除出错')
      }
    },
    changeClick(index,item) {
      this.$router.push(`/product/process_list/add?id=${item.id}&name=${item.name}`)
    },
    async initData() {
      try {
        let { data } = await ProcessList()
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.dataList = data
        }
      } catch (error) {
        this.$toast('获取数据失败')
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
  .main
    width 100%
    height 100%
    background-color #ffffff
    overflow-y scroll
    padding 0px 10px 0px 10px
    .process-content
      padding 15px 15px 0px 15px
      margin-top 10px
      display flex
      flex-direction column
      box-shadow:0px 0px 10px 0px rgba(35,121,191,0.2);
      border-radius:8px;
      .name-content
        display flex
        flex-direction row
        justify-content space-between
        margin-bottom 15px
        .process-name
          font-size 14px
          color #545454
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
    .add-icon
      width 84px
      height 84px
      position fixed
      right 20px
      bottom 20px
</style>



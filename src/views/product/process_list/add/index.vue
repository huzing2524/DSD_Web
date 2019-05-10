<template lang="pug">
  .main
    .input-content
      span(class="input-title") 工序
      input(class="input" placeholder="填写工序名称" v-model="processName")
    StepButton(title="保存" 
      @click="saveClick")
</template>

<script>
import StepButton from '_components/product/step_button'
import { ProcessChange, ProcessAdd } from '_api/product'
export default {
  components: {
    StepButton
  },
  data() {
    return {
      processName:''
    }
  },
  mounted() {
    this.processName = this.$route.query.name
  },
  methods: {
    async saveClick() {
      if(this.processName == this.$route.query.name) {
        return this.$router.go(-1)
      }
      if(this.processName.length <= 0) {
        return this.$toast('请填写工序名称')
      }
      const { query } = this.$route
      let result      
      if(query.id) {  // 修改
        try {
          result = await ProcessChange({name: this.processName}, query.id)
        } catch (error) {
          this.$toast('操作失败')
        }
      } else {  // 新增
        try {
          result = await ProcessAdd({name: this.processName})
        } catch (error) {
          this.$toast('操作失败')
        }
      }
      const { data } = result
      if(data.errmsg) {
        this.$toast(data.errmsg)
      } else {
        this.$router.go(-1)
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
  .main
    height 100%
    width 100%
    background-color #ffffff
    padding 40px 20px 0px 20px
    .input-content
      display flex
      flex-direction row
      align-items center
      height 30px
      .input-title
        font-size 15px
        color #545454
      .input
        font-size 14px
        color #545454
        margin-left 10px
        border-bottom 1px solid #cccccc
        height 30px
        flex 1
</style>



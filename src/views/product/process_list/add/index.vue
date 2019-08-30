<template lang="pug">
  .main
    InformationInput(title="工序", placeholder="填写工序名称" v-model="processName" :style="{marginTop:'10px'}")
    StepButton(title="保存" 
      @click="saveClick")
</template>

<script>
import StepButton from '_components/product/step_button'
import InformationInput from '_components/product/information_input'
import { ProcessChange, ProcessAdd } from '_api/product'
export default {
  components: {
    StepButton,
    InformationInput
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
    background-color #E6EAED
    .input-content
      display flex
      flex-direction row
      align-items center
      height 30px
</style>



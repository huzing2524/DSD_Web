<template lang="pug">
  .main
    DetailCellTask(iconHref="#iconicon_renwu1" 
                    title="退料生产任务"
                    :borderTitle="returnTask.product"
                    :normalTitle="`计划生产：${returnTask.target}`"
                    :subtitle="getYMDDateDecimalString(returnTask.time)")
    
    DetailCellInput(iconHref="#iconicon_renwu1" 
                    title="退料原因" 
                    placeholder="填写退料原因..."
                    v-model="remark"
                    :style="{marginTop:'10px'}")
    
    StepButton(title="下一步"
      class="step-button"
      @click="nextStep")
</template>

<script>
import DetailCellTask from '_components/product/detail_cell_task'
import DetailCellInput from '_components/product/detail_cell_input'
import StepButton from '_components/product/step_button/'
import { mapState } from 'vuex';
import { getYMDDateDecimalString } from '_common/util';

export default {
  components: {
    StepButton,
    DetailCellTask,
    DetailCellInput
  },
  data() {
    return {
      remark: this.returnTask
    }
  },
  computed:{
    ...mapState('product', {
      returnTask: state => state.returnTask
    })
  },
  methods:{
    getYMDDateDecimalString,
    nextStep() {
      this.$store.commit('product/Return_Remark', this.remark)
      this.$router.push('/product/return_list/material_select')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .main
    width 100%
    height 100%
    background-color #E6EAED
    .product-content
      background-color #ffffff
      padding 15px
      margin-top 10px
      .product-title-content
        display flex
        flex-direction row
        align-items center
        width 100%
        .product-icon
          width 20px
          height 18px
          display flex
          align-items center
          justify-content center
        .product-title
          title()
          margin-left 5px
      .product-item-content
        background-color #E9F5FF
        padding 15px
        margin-top 15px
        display flex
        flex-direction column
        border-radius 6px
        .item-title
          title()
          margin-top 5px
        .item-subtitle
          subtitle()
          margin-top 5px
        .item-minititle
          minititle()
          margin-top 5px
        .reason-input
          flex 1
          font-size 14px
          color #545454
          background-color #E9F5FF
    .step-button
      width 80%
      margin-left 10%
      
</style>



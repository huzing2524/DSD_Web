<template lang="pug">
  .main
    DetailCellInformation(iconHref="#iconicon_product"
                          :title="product.name"
                          :list="productInformation"
                          :showLine="false")
    DetailCellOrder(iconHref="#iconicon_cailiao"
                    title="退料清单"
                    :orderTitle="`工序：${process.name}`"
                    :orderList="materials"
                    :style="{marginTop:'10px'}")
      template(v-slot:orderTitle="props") {{props.item.name}}
      template(v-slot:orderSubtitle="props") {{`${props.item.count}${props.item.unit}`}}
    InformationInput(title="单位工序用时（分钟）" placeholder="填写时间" :value="time" v-model="time")
    BottomButton(title="保存" @buttonClick="save")
</template>

<script>
import DetailCellInformation from '_components/product/detail_cell_information'
import DetailCellOrder from '_components/product/detail_cell_order'
import InformationInput from '_components/product/information_input'
import BottomButton from '_components/product/information_bottom_button/'
import {mapState} from 'vuex'
import { ChangeCrafts } from '_api/product'
export default {
  components: {
    DetailCellInformation,
    DetailCellOrder,
    InformationInput,
    BottomButton,
  },
  data() {
    return {
      time: ''
    }
  },
  computed: {
    ...mapState('product',{
      product: state=>state.bomProduct,
      process: state=>state.bomProcess,
      materials: state=>state.bomMaterials,
      type: state=>state.bomType,// 0: 修改 1：新增
    }),
    productInformation() {
      return [
        ` 编码：${this.product.id}`,
        ` 单位：${this.product.unit}`
      ]
    }
  },
  methods:{
    async save() {
      if(!this.time) {
        return this.$toast('请填写时间')
      }
      const body = {
        materials: this.materials,
        unit_time: this.time
      }
      if(this.type==0) {  // 修改
        body['process_step'] = this.process.process_step
      } else {  // 新增
        body['process_id'] = this.process.id
      }
      try {
        const { data } = await ChangeCrafts(body, this.product.id, this.type==0?'put':'post')
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.$router.go(-4)
        }
      } catch (error) {
        this.$toast('保存出错')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .main
    width 100%
    height 100%
    background-color #E6EAED
</style>


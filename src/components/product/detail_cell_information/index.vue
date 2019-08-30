<template lang="pug">
  CellBase(:iconHref="iconHref" :title="title" :showLine='showLine')
    span(class="dcin-title" 
          v-for="(item, index) in list" 
          :key="index"
          :style="index==0?{marginTop:'0px'}:{}") {{item}}
</template>

<script>
/**
   em:
      DetailCellInformation(iconHref="#iconshengxi"
                          title="生产信息"
                          :list="makeInformation"
                          :style="{marginTop:'10px'}"
                          :showLine="false")
 */
import CellBase from '_components/product/detail_cell_base'
export default {
  components: {
    CellBase
  },
  props:['iconHref','title','showLine','list']
}
</script>

<style lang="stylus" scoped>
  .dcin-title
    font-size 12px
    color #333333
    margin-top 12px
</style>



<template lang="pug">
  CellBase(:iconHref="iconHref" :title="title")
    span(class="dct-border-title") {{borderTitle}}
    span(class="dct-title") {{normalTitle}}
    span(class="dct-subtitle") {{subtitle}}
</template>

<script>
/**
 *  em:
       DetailCellTask(iconHref="#iconicon_renwu1" 
                    title="退料生产任务"
                    :borderTitle="returnTask.product"
                    :normalTitle="`计划生产：${returnTask.target}`"
                    :subtitle="getYMDDateDecimalString(returnTask.time)")
 */
import CellBase from '_components/product/detail_cell_base'
export default {
  components: {
    CellBase
  },
  props:['iconHref','title','borderTitle','normalTitle','subtitle']
}
</script>

<style lang="stylus" scoped>
  .dct-border-title
    font-size 14px
    color #333333
    font-weight 500
  .dct-title
    font-size 12px
    color #666666
    margin 5px 0px 5px 0px
  .dct-subtitle
    font-size 12px
    color #999999
</style>



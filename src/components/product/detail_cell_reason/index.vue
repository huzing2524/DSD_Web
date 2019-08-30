<template lang="pug">
  CellBase(:iconHref="iconHref" :title="title" :showLine="showLine")
    span(class="dcr-remark") {{remark}}
</template>

<script>
import CellBase from '_components/product/detail_cell_base'
export default {
  /**
   em:
    DetailCellReason(iconHref="#iconicon_remarks" 
                    title="退料原因" 
                    :remark="orderData.remark")
   */
  components: {
    CellBase
  },
  props: ['iconHref','title','remark','showLine']
}
</script>

<style lang="stylus" scoped>
  .dcr-remark
    font-size 14px
    font-weight 400
    color #333333
</style>



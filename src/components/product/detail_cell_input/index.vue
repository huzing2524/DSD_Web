<template lang="pug">
  CellBase(:iconHref="iconHref" :title="title")
    input(class="dci-input" :placeholder="placeholder" @input="$emit('input',$event.target.value)")
</template>

<script>
/**
    em:
      DetailCellInput(iconHref="#iconicon_renwu1" 
                    title="退料原因" 
                    placeholder="填写退料原因..."
                    v-model="remark"
                    :style="{marginTop:'10px'}")
 */
import CellBase from '_components/product/detail_cell_base'
export default {
  model:{
    props:'value'
  },
  components: {
    CellBase
  },
  props:['iconHref', 'title', 'placeholder', 'value']
}
</script>

<style lang="stylus" scoped>
  .dci-input
    flex 1
    font-size 14px
    color #545454
    background-color #E9F5FF
</style>



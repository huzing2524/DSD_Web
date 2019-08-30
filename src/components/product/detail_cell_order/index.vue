<template lang="pug">
  CellBase(:iconHref="iconHref" :title="title" :showLine="showLine")
    span(class="dco-order-title" v-show="orderTitle") {{orderTitle}}
    .dco-order-row(v-for="(item, index) in orderList" :key="index" :style="index==0?{marginTop:'0px'}:{}")
      span(class="dco-row-title" :style="orderTitle?{fontSize:'12px',color:'#666666'}:{}") 
        slot(name="orderTitle" :item="item")
      span(class="dco-row-subtitle" :style="orderTitle?{fontSize:'12px',color:'#666666'}:{}")
        slot(name="orderSubtitle" :item="item")
</template>

<script>
/**
   em:
      DetailCellOrder(iconHref="#iconicon_cailiao"
                    title="退料清单"
                    orderTitle="工序"
                    :orderList="orderData.material"
                    :style="{marginTop:'10px'}")
      template(v-slot:orderTitle="props") {{props.item.name}}
      template(v-slot:orderSubtitle="props") {{props.item.count}}
 */
import CellBase from '_components/product/detail_cell_base';
export default {
  props:['iconHref','title','showLine','orderTitle','orderList'],
  components: { CellBase },
}
</script>

<style lang="stylus" scoped>
  .dco-order-title
    color #333333
    font-size 14px
    margin-bottom 10px
  .dco-order-row
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    margin-top 15px
    .dco-row-title
      font-size 14px
      color #666666
    .dco-row-subtitle
      font-size 14px
      color #999999
</style>



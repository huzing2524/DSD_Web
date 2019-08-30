<template lang="pug">
  .selected-mask(:style="{visibility:show?'visible':'hidden'}")
    .selected-content(:style="{bottom:bottom+'px'}")
      .selected-title-content
        .selected-arrow-icon(@click="arrowClick")
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconicon_more_xia')
        .selected-clear-btn(@click="clearClick")
          .selected-delete-icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href='#iconicon_delete')
          span(class="selected-clear-span") 清空
      .list-content
        .list-item-content(v-for="(item, index) in items" :key="index"
                          @click="itemClick(item, index)")
          .list-item-title-content
            span(class="list-item-title") 
              slot(name="title" :item="item") title
            span(class="list-item-count") 
              slot(name="subtitle" :item="item") subtitle
          .list-item-arrow
            svg.ali_icon(aria-hidden="true")
              use(xlink:href='#iconArrow_1')

</template>

<script>
/**
 MaterialEditMask(:show="isShowEditMask"
              :items="Object.values(selectedProductDict)"
              @arrowClick="selectedMaskArrowClick"
              @clearClick="selectedMaskClearClick"
              @itemClick="selectedMaskItemClick")
  template(v-slot:title="slotProps") {{slotProps.item.name}}
  template(v-slot:subtitle="slotProps") {{`${slotProps.item.count}条`}}
 */
export default {
  props:{
    show: {
      default: false
    },
    items:{
      default: []
    },
    titleKey: {
      default: ''
    },
    subtitleKey: {
      default: ''
    },
    bottom: {
      default: '80'
    }
  },
  methods: {
    arrowClick() {
      this.$emit('arrowClick')
    },
    clearClick() {
      this.$emit('clearClick')
    },
    itemClick(item) {
      this.$emit('itemClick',item)
    }
  },
}
</script>

<style lang="stylus" scoped>
  .selected-mask
    height 100%
    width 100%
    position fixed
    top 0px
    left 0px
    background-color rgba(0,0,0,0.5)
    .selected-content
      position absolute
      width 100%
      background-color #ffffff
      bottom 80px
      display flex
      flex-direction column
      overflow scroll
      .selected-title-content
        height 34px
        width 100%
        background-color #F0F8FF
        display flex
        justify-content center
        align-items center
        .selected-arrow-icon
          height 14px
          width 14px
          display flex
          align-items center
          justify-content center
        .selected-clear-btn
          position absolute
          top 0px
          right 0px
          display flex
          flex-direction row
          align-items center
          height 34px
          padding-right 15px
          .selected-delete-icon
            width 16px
            height 16px
            display flex
            align-items center
            justify-content center
          .selected-clear-span
            color #A1A1A1
            font-size 12px
            margin-left 5px
      .list-content
        max-height 60vh
        overflow-y scroll
        .list-item-content
          display flex
          flex-direction row
          align-items center
          justify-content space-between
          height 80px
          width 100%
          margin-top 0px
          border-bottom 1px solid #EFEFEF
          padding 0px 5px 0px 5px
          .list-item-title-content
            display flex
            flex-direction column
            .list-item-title
              font-size 14px
              color #545454
              font-weight 500
            .list-item-count
              font-size 12px
              color #545454
              margin-top 5px
          .list-item-arrow
            height 16px
            width 8px
            margin-bottom 20px
</style>
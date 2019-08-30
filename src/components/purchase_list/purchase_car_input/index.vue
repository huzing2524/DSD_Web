<template lang="pug">
  .add-mask(:style="{visibility:show?'visible':'hidden'}"
            @click="maskClick")
    .add-edit-content
      .add-title-content
        .add-arrow-icon(@click="arrowClick")
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconicon_more_xia')
        .add-clear-btn(@click="clearClick")
          .delete-icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href='#iconicon_delete')
          span(class="clear-span") 清空
      .name_and_unit
        span(class="item-name") {{title}}
        span(class="item-unit") {{`(单位：`+unit+ `)`}}
      .lower_count_package_num(v-if="isCreate != 'true'")
        span(class="item_other") 最小起订量：{{lowestCountValue=== null ? 0 : lowestCountValue}}{{unit || ''}} | 最小包装量：{{lowestPackageNumValue=== null ? 0 : lowestPackageNumValue}}{{unit || ''}}
      .edit-content
        span(class="item-tip") {{priceName+`(元)`}}
        input(class="input"
              :placeholder= "`填写${priceName}`"
              type="number"
              v-model="priceValue")
      .edit-content(v-if="isCreate === 'true'")
        span(class="item-tip") 最小起订量
        input(class="input"
          :placeholder= "`填写最小起订量`"
          type="number"
          v-model="countValue")
      .edit-content(v-if="isCreate === 'true'")
        span(class="item-tip") 最小包装量
        input(class="input"
          :placeholder= "`填写最小包装量`"
          type="number"
          v-model="packageNumValue")
      .add-material-content
        .add-btn(@click="addClick")
          span(class="btn-title") 添加
</template>

<script>
export default {
  props:{
    title: {
      default: '产品名字'
    },
    unit: {
      default: '个'
    },
    show: {
      default: false
    },
    // 价格输入
    inputPriceValue: {
    },
    // 最小包装量输入
    lowestPackageNumValue: {
    },
    // 最小起订量输入
    lowestCountValue: {
    },
    priceName: {
      default: ''
    },
    isCreate: {
      default: 'false'
    }
  },
  data() {
    return {
      priceValue:this.inputPriceValue,
      countValue:this.lowestCountValue,
      packageNumValue: this.lowestPackageNumValue,
      showPriceName: ''
    }
  },
  methods: {
    arrowClick() {
      this.$emit('arrowClick')
    },
    maskClick() {

    },
    clearClick() {
      this.$emit('clearClick')
    },
    addClick() {
      this.$emit('addClick',this.priceValue, this.countValue, this.packageNumValue)
    }

  },
  watch: {
    show(newValue, oldValue) {
      this.priceValue = this.inputPriceValue
      this.show = newValue
    },
    inputPriceValue(newValue) {
      this.priceValue = newValue
    },
    lowestPackageNumValue(newValue) {
      this.packageNumValue = newValue
    },
    lowestCountValue(newValue) {
      this.countValue = newValue
    },
    title(newTitle) {
      this.title = newTitle
    },
  },
}
</script>

<style lang="stylus" scoped>
  .add-mask
    height 100%
    width 100%
    position fixed
    top 0px
    left 0px
    background-color rgba(0,0,0,0.5)
    .add-edit-content
      position absolute
      width 100%
      background-color #ffffff
      bottom 0px
      display flex
      flex-direction column
      .add-title-content
        height 34px
        width 100%
        background-color #F0F8FF
        display flex
        justify-content center
        align-items center
        .add-arrow-icon
          height 14px
          width 14px
          display flex
          justify-content center
          align-items center
        .add-clear-btn
          position absolute
          top 0px
          right 0px
          display flex
          flex-direction row
          align-items center
          height 34px
          padding-right 15px
          .delete-icon
            width 16px
            height 16px
            display flex
            justify-content center
            align-items center
          .clear-span
            color #A1A1A1
            font-size 12px
            margin-left 5px
      .name_and_unit
        display flex
        flex-direction row
        margin-left 10px
        margin-top 14px
        align-items center
        .item-name
          height:22px;
          font-size:16px;
          font-weight:500;
          color:rgba(51,51,51,1);
          line-height:22px;
          font-weight bold
        .item-unit
          height:17px;
          font-size:12px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
          line-height:17px;
      .lower_count_package_num
        margin-left 10px
        margin-bottom 14px
        span
          height:17px;
          font-size:12px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
          line-height:17px;
      .edit-content
        height 44px
        width 100%
        padding 0 10px
        display flex
        align-items center
        justify-content space-between
      .item-tip
        font-size 14px
        color #545454
      .input
        fixed 1
        height 100%
        font-size 14px
        text-align right
    .add-material-content
      width 100%
      height 52px
      display flex
      flex-direction row
      align-items center
      border-top 1px solid #EFEFEF
      .add-btn
        background-color #1E9AFF
        height 32px
        width 100px
        border-radius 16px
        display flex
        justify-content center
        position absolute
        right 15px
        align-items center
        .btn-title
          font-size 14px
          color #ffffff


</style>



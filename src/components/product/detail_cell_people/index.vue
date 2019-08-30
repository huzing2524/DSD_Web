<template lang="pug">
  CellBase(:iconHref="iconHref"
          :title="title"
          :style="{paddingBottom:'40px'}")
    .dcp-row
      img(class="dcp-avator" :src="imgUri")
      .dcp-name-content
        span(class="dcp-name") {{name || "sdf"}}
        span(class="dcp-phone") {{phone || "aaa"}}
      .dcp-call-icon(@click="callClick")
        svg.ali_icon(aria-hidden="true")
          use(xlink:href='#iconphone')
    span(class="dcp-time") {{time}}
</template>

<script>
/**
 * <a href="tel:10086">10086</a>
 em:
    DetailCellPeople(iconHref="#iconicon_shenpi"
                    title="申请人"
                    :name="orderData.creator_name"
                    :phone="orderData.creator_phone"
                    :time="getYMDDateDecimalString(orderData.time)"
                    :imgUri="orderData.creator_image"
                    @clickCall=""
                    )
 */
import CellBase from '_components/product/detail_cell_base'
export default {
  components: {
     CellBase
  },
  props: ['iconHref','title','imgUri','name','phone','time','clickCall'],
  methods: {
    callClick() {
      let mobile = navigator.userAgent.toLowerCase()
      if (/iphone|ipad|ipod/.test(mobile)) {
        window.webkit && window.webkit.messageHandlers.phoneCall.postMessage(this.phone)
      } else {
        window.android.phoneCall(thi.phone)
      }
      this.$emit('clickCall',this.phone)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .dcp-row
    width 100%
    height 50px
    display flex
    flex-direction row
    align-items center
  .dcp-time
    color #999999
    font-size 12px
    position absolute
    bottom 12px
    right 10px
  .dcp-avator
    height 48px
    width 48px
    border-radius 4px
    background-color #eeeeee
  .dcp-name-content
    height 48px
    flex 1
    display flex
    flex-direction column
    justify-content space-between
    padding 5px 5px 5px 0px
    margin-left 10px
    .dcp-name
      font-size 14px
      color #333333
    .dcp-phone
      font-size 14px
      color #666666
  .dcp-call-icon
    width 38px
    height 38px
    display flex
    justify-content center
    align-items center
</style>



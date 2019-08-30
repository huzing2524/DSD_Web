<template lang="pug">
  .apply_detail(v-if="isLoad" :class="state!=='0' ? 'active' : ''")
    .apply_number
      .number_left
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_danhao")
        span 临时申购单号
      .number_right {{listItem.id}}
    .state
      .item
        .left
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_zhaungtai")
          span 采购入库状态
        .right {{listItem.state | stateApply}}
    .material
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_product")
        span 申购物料
      .material_content
        .item(v-for="(item,index) in listItem.products" :key="index")
          .item_name
            span {{item.category}}：{{item.name}}
            p ￥{{item.price | formatFloatNum}}
          .item_num ×{{item.count}}
      .total
        span 合计金额
        .num ￥
          p {{listItem.total_money | formatFloatNum}}
    .applyer
      .item
        .title
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_shenpi")
          span 申购人
        .info
          .name
            .left
              img(:src="listItem.creator_image")
              .phone
                span {{listItem.creator}}
                p {{listItem.phone}}
            .icon(@click="phoneCall(listItem.phone)")
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconphone")
          .remark(v-if="listItem.remark") {{listItem.remark}}
        .deliver_time {{listItem.time | timeYMDHMFilter}}
      .item(v-if="listItem.approval")
        .title
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_shenpi")
          span 审批人
        .info
          .name
            .left
              img(:src="listItem.approval_image")
              .phone
                span {{listItem.approval}}
                p {{listItem.approval_phone}}
            .icon(@click="phoneCall(listItem.approval_phone)")
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconphone")
          .remark(v-if="listItem.remark") {{listItem.remark}}
        .deliver_time {{listItem.approval_time | timeYMDHMFilter}}
    .options(v-show="state==='0'")
      button(@click="nopassClick") 取消申购
      button(@click="passClick") 通过申购
</template>

<script>
  import { StoreApplyDetail } from '_api/store/'
  export default {
    data() {
      return {
        isLoad: false,
        id: '',
        state: '',
        listItem:{}
      }
    },
    filters: {
      stateApply(val) {
        let content = '';
        switch (parseInt(val)) {
          case 0:
            return '待审批';
          case 1:
            return '已通过';
          case 2:
            return '已取消';
          default:
            return content;
        }
      },
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData(){
        this.id = this.$route.query.id || ''
        this.state = this.$route.query.state || ''
        StoreApplyDetail({id:this.id},'get').then((res) => {
          this.listItem = res.data
          this.isLoad = true
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      nopassClick(){
        this.$router.push(`/store/purchase_apply/remark?id=${this.id}&type=nopass`)
      },
      passClick(){
        this.$router.push(`/store/purchase_apply/remark?id=${this.id}&type=pass`)
      },
      phoneCall(phone) {
        let u = navigator.userAgent
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        if (isAndroid) {
          window.android.phoneCall(phone)
        }else if(isIOS){
          window.webkit && window.webkit.messageHandlers.phoneCall.postMessage(phone)
        }else{
          window.location.href = `tel://${phone}`
        }
      },
    }
  }
</script>

<style scoped lang="stylus">
  .apply_detail
    background #E6EAED
    padding-bottom 52px
    &.active
      padding-bottom 0
    .apply_number
      display flex
      flex-direction row
      justify-content space-between
      align-items center
      background #fff
      padding 12px 10px
      .number_left
        display flex
        flex-direction row
        align-items center
        .icon
          display flex
          wh 16px 16px
          margin-right 4px
        span
          display flex
          fsc 16px #333333
          font-weight 600
      .number_right
        flex 1
        font-size 14px
        color #666666
        text-align right
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        margin-left 20px
    .state
      display flex
      flex-direction row
      padding 0 10px
      margin-bottom 10px
      bgf()
      .item
        width 100%
        display flex
        flex-direction row
        justify-content space-between
        align-items center
        padding 12px 0
        border-top 1px solid #EEEEEE
        .left
          display flex
          flex-direction row
          align-items center
          .icon
            display flex
            wh 16px 16px
            margin-right 4px
          span
            display flex
            fsc 16px #333333
            font-weight 600
        .right
          fsc 14px #666666
    .material
      background #fff
      padding 0 10px
      margin-bottom 10px
      .title
        display flex
        flex-direction row
        align-items center
        margin-bottom 10px
        padding-top 12px
        .icon
          display flex
          width 16px
          height 16px
          margin-right 4px
        span
          fsc 16px #333333
          font-weight 600
      .material_content
        display flex
        flex-direction column
        background #F5FBFF
        border-radius 6px
        padding 12px 10px
        .item
          display flex
          flex-direction column
          margin-bottom 12px
          &:last-child
            margin-bottom 0
          .item_name
            display flex
            flex-direction row
            justify-content space-between
            span
              fsc 14px #333333
            p
              fsc 14px #666666
          .item_num
            display flex
            justify-content flex-end
            fsc 12px #999999
            margin-top 6px
      .total
        display flex
        flex-direction row
        justify-content space-between
        padding 12px 0
        span
          font-size 14px
          color #464646
        .num
          display flex
          flex-direction row
          align-items center
          font-size 14px
          color #FF9235
          margin-right 15px
          p
            font-size 18px
            font-weight 600
    .applyer
      display flex
      flex-direction column
      background #fff
      padding 0 10px
      margin-bottom 20px
      .item
        display flex
        flex-direction column
        background #fff
        margin-top 12px
        padding-bottom 12px
        border-bottom 1px solid #EEEEEE
        &:last-child
          border-bottom 0
        .title
          display flex
          flex-direction row
          align-items center
          .icon
            display flex
            width 16px
            height 16px
            margin-right 4px
          span
            fsc 16px #333333
            font-weight 600
        .info
          display flex
          flex-direction column
          background #F5FBFF
          border-radius 6px
          padding 12px 10px
          margin-top 10px
          .name
            display flex
            flex-direction row
            justify-content space-between
            align-items center
            .left
              display flex
              flex-direction row
              align-items center
              img
                wh 48px 48px
                margin-right 10px
              .phone
                display flex
                flex-direction column
                span
                  fsc 14px #333333
                  margin-bottom 6px
                p
                  fsc 14px #666666
            .icon
              wh 38px 38px
          .remark
            display flex
            flex-direction row
            background #DEF2FF
            line-height 20px
            border-radius 8px
            padding 12px 10px
            margin-top 12px
            fsc 12px #333333
            position relative
            &:before
              content ''
              wh 0px 0px
              border-left 6px solid transparent
              border-right 6px solid transparent
              border-bottom 12px solid #DEF2FF
              position absolute
              top -12px
              left 17px
        .deliver_time
          display flex
          flex-direction row
          justify-content flex-end
          fsc 12px #999999
          margin-top 12px
    .options
      width 100%
      position fixed
      bottom 0
      display flex
      flex-direction row
      background #fff
      padding 12px 10px
      justify-content flex-end
      align-items center
      border-top 1px solid #CCCCCC
      button
        wh 80px 28px
        line-height 28px
        color #1E9AFF
        border 1px solid #1E9AFF
        border-radius 16px
        margin-left 15px
        &:nth-of-type(1)
          color #999999
          border 1px solid #999999
</style>
<style lang="stylus">
  .cube-dialog-content
    margin 30px 0 28px 0
    .cube-dialog-content-def
      padding 0 20px
      p
        margin initial
        font-size 16px
        color #545454
  .cube-dialog-btns
    &:after
      border-right 0
    a:before
      border-top 0
    a:last-child
      color #0099FF
</style>


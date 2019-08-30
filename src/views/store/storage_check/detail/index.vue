<template lang="pug">
  .check_detail(v-if="isLoad" :class="state==='1' || listItem.state!=='0' ? 'active' : ''")
    .check_number
      .number_left
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_danhao")
        span 盘点单号
      .number_right {{listItem.id}}
    .state
      .item
        .left
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_zhaungtai")
          span 盘点状态
        .right {{listItem.state | stateCheck}}
    .check
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_pandian")
        span 盘点
        p(:class="listItem.more_less==='1'? 'bg':''") {{listItem.more_less==='1'? '盘亏':'盘盈'}}
      .item
        span {{listItem.name}}
        p 数量：{{listItem.update.toFixed(2)}}{{listItem.unit}}
        p 单价：￥{{listItem.price.toFixed(2)}}
        p 总价：￥{{listItem.money.toFixed(2)}}
    .checher
      .item
        .title
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_shenpi")
          span 盘点人
        .info
          .name
            .left
              img(:src="listItem.check_image")
              .phone
                span {{listItem.check_person}}
                p {{listItem.check_phone}}
            .icon(@click="phoneCall(listItem.check_phone)")
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconphone")
          .remark(v-if="listItem.remark") {{listItem.remark}}
        .deliver_time {{listItem.check_time | timeYMDHMFilter}}
      .item(v-if="listItem.approval_person")
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
                span {{listItem.approval_person}}
                p {{listItem.approval_phone}}
            .icon(@click="phoneCall(listItem.approval_phone)")
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconphone")
          .remark(v-if="listItem.remark") {{listItem.remark}}
        .deliver_time {{listItem.approval_time | timeYMDHMFilter}}
    .options(v-show="state==='0' || listItem.state==='0'")
      button(@click="nopassClick") 不通过
      button(@click="passClick") 通过
</template>

<script>
  import { StorecheckDetail } from '_api/store/'
  export default {
    data() {
      return {
        isLoad:false,
        id: '',
        state: '',
        listItem: {},
      }
    },
    filters: {
      stateCheck(val) {
        let content = '';
        switch (parseInt(val)) {
          case 0:
            return '待审批';
          case 1:
            return '审批通过';
          case 2:
            return '审批未通过';
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
        StorecheckDetail({id:this.id},'get').then((res) => {
          this.listItem = res.data
          this.isLoad = true
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      nopassClick(){
        this.$router.push(`/store/storage_check/remark?id=${this.id}&type=nopass`)
      },
      passClick(){
        this.$router.push(`/store/storage_check/remark?id=${this.id}&type=pass`)
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
  .check_detail
    background #E6EAED
    padding-bottom 52px
    &.active
      padding-bottom 0
    .check_number
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
    .check
      background #fff
      padding 12px 10px
      margin-bottom 10px
      .title
        display flex
        flex-direction row
        align-items center
        margin-bottom 12px
        .icon
          display flex
          wh 16px 16px
          margin-right 4px
        span
          fsc 16px #333333
          font-weight 600
        p
          display flex
          justify-content center
          align-items center
          wh(48px,18px)
          background #6AE1C4
          fsc(11px,#ffffff)
          border-radius 4px
          margin-left 10px
          &.bg
            background #FF9999
      .item
        display flex
        flex-direction column
        background #F5FBFF
        border-radius 6px
        padding 12px 10px
        span
          fsc 14px #333333
        p
          fsc 12px #666666
          margin-top 6px
    .checher
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
      padding 15px
      justify-content flex-end
      align-items center
      border-top 1px solid #CCCCCC
      button
        wh(92px,32px)
        line-height 32px
        color #4DA8EE
        border 1px solid #4DA8EE
        border-radius 16px
        margin-left 15px
        &:nth-of-type(1)
          color #F4616C
          border 1px solid #F4616C
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


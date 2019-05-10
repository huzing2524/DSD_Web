<template lang="pug">
  .check_detail.full_box(:class="state==='1' || listItem.state!=='0' ? 'active' : ''")
    .check_number
      .number_left
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_danhao")
        span 盘点编码
      .number_right {{listItem.id}}
    .check
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_pandian")
        span 盘点
        p(:class="listItem.more_less==='1'? 'bg':''") {{listItem.more_less==='1'? '盘亏':'盘盈'}}
      .item
        .item_name {{listItem.category}}：{{listItem.name}}
        .item_info
          span {{listItem.update}}{{listItem.unit}}
          span ￥{{listItem.price}}
          span ￥{{listItem.money}}
    .status
      .left
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_zhaungtai")
        span 状态
      .right(v-show="listItem.state==='0'") 待审批
      .right(v-show="listItem.state==='1'") 审批通过
      .right(v-show="listItem.state==='2'") 审批未通过
    .reason
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_remarks")
        span 盘点原因
      .content {{listItem.remark}}
    .customer(:class="state==='1' ? 'bottom' : ''")
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_clien")
        span 盘点人
      .info
        .name {{listItem.check_person}}
        .phone
          span {{listItem.check_phone}}
          p {{listItem.check_time}}
    .customer(v-show="state==='1'" style="margin-bottom:20px;")
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_shenpi")
        span 审批人
      .info
        .name {{listItem.approval_person}}
        .phone
          span {{listItem.approval_phone}}
          p {{listItem.approval_time}}
    .options(v-show="state==='0' || listItem.state==='0'")
      button(@click="nopassClick") 不通过
      button(@click="passClick") 通过
</template>

<script>
  import { StorecheckDetail } from '_api/store/'
  export default {
    data() {
      return {
        id: '',
        state: '',
        listItem: {},
      }
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
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      nopassClick(){
        this.$createDialog({
          type: 'confirm',
          title: '',
          content: '确定不通过审批吗？',
          confirmBtn: {
            text: '不通过',
            active: true,
            disabled: false,
            href: 'javascript:;',
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            StorecheckDetail({
              id: this.id,
              state: '2'
            },'post').then((res) => {
              if (parseInt(res.data.res) === 0) {
                this.$toast(`操作成功`)
                this.$router.go(-1)
              } else {
                this.$toast(res.data.errmsg)
              }
            }).catch(() => {
              this.$toast('操作失败')
            })
          },
          onCancel: () => {

          }
        }).show()
      },
      passClick(){
        this.$createDialog({
          type: 'confirm',
          title: '',
          content: '确定通过审批吗？',
          confirmBtn: {
            text: '通过',
            active: true,
            disabled: false,
            href: 'javascript:;',
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            StorecheckDetail({
              id: this.id,
              state: '1'
            },'post').then((res) => {
              if (parseInt(res.data.res) === 0) {
                this.$toast(`操作成功`)
                this.$router.go(-1)
              } else {
                this.$toast(res.data.errmsg)
              }
            }).catch(() => {
              this.$toast('操作失败')
            })
          },
          onCancel: () => {

          }
        }).show()
      }
    }
  }
</script>

<style scoped lang="stylus">
  .check_detail
    background #E6EAED
    padding-bottom 62px
    &.active
      padding-bottom 0
    .check_number
      display flex
      flex-direction row
      justify-content space-between
      align-items center
      background #fff
      padding 15px
      margin-bottom 10px
      .number_left
        display flex
        flex-direction row
        align-items center
        .icon
          width 18px
          height 20px
          margin-right 7px
        span
          font-size 15px
          color #545454
      .number_right
        flex 1
        font-size 14px
        color #999999
        text-align right
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        margin-left 20px
    .check
      background #fff
      padding 15px 0 16px 15px
      margin-bottom 10px
      .title
        display flex
        flex-direction row
        align-items center
        margin-bottom 15px
        .icon
          display flex
          wh(18px,18px)
          margin-right 8px
        span
          fsc(15px,#545454)
        p
          display flex
          justify-content center
          align-items center
          wh(48px,20px)
          background #6AE1C4
          fsc(12px,#ffffff)
          border-radius 4px
          margin-left 10px
          &.bg
            background #FF9999
      .item
        display flex
        flex-direction column
        background #E9F5FF
        border-radius 6px
        padding 15px 0
        margin-right 15px
        margin-bottom 15px
        &:last-child
          margin-bottom 0
        .item_name
          font-size 14px
          color #464646
          margin-left 15px
        .item_info
          display flex
          flex-direction row
          margin-top 12px
          span
            flex 1
            font-size 14px
            color #7A7A7A
            text-align center
            position relative
            &:nth-of-type(2)::before
              content: ''
              position absolute
              left 0
              top 50%
              margin-top -2px
              width 4px
              height 4px
              background #BEBEBE
              border-radius 2px
            &:nth-of-type(2)::after
              content: ''
              position absolute
              right 0
              top 50%
              margin-top -2px
              width 4px
              height 4px
              background #BEBEBE
              border-radius 2px
    .status
      display flex
      flex-direction row
      margin-bottom 10px
      background #fff
      padding 15px
      justify-content space-between
      align-items center
      .left
        display flex
        flex-direction row
        align-items center
        .icon
          display flex
          width 18px
          height 18px
          margin-right 8px
        span
          font-size 15px
          color #545454
      .right
        font-size 14px
        color #999999
    .reason
      display flex
      flex-direction column
      background #fff
      padding 15px
      margin-bottom 10px
      .title
        display flex
        flex-direction row
        align-items center
        margin-bottom 15px
        .icon
          display flex
          wh(18px,18px)
          margin-right 8px
        span
          font-size 15px
          color #545454
      .content
        display flex
        flex-direction row
        padding 15px
        background #E9F5FF
        font-size 14px
        line-height 20px
        color #545454
    .customer
      display flex
      flex-direction column
      background #fff
      padding 15px
      margin-bottom 40px
      &.bottom
        margin-bottom 10px
      .title
        display flex
        flex-direction row
        align-items center
        .icon
          display flex
          width 16px
          height 18px
          margin-right 8px
        span
          font-size 15px
          color #545454
      .info
        display flex
        flex-direction column
        background #E9F5FF
        border-radius 6px
        padding 15px 21px 15px 15px
        margin-top 15px
        .name
          display flex
          fsc(14px,#545454)
          margin-bottom 10px
        .phone
          display flex
          flex-direction row
          justify-content space-between
          span
            fsc(14px,#545454)
          p
            fsc(13px,#999999)
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


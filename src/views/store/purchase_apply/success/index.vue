<template lang="pug">
  .purchase_success.full_box
    .reason
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_remarks")
        span 盘点原因
      .content {{listItem.remark}}
    .list
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_cailiao")
        span 申购清单
      .content
        .item(v-for="(item,index) in materials.list" :key="index")
          span {{item.name}}
          p {{item.dealInfo.num}}{{item.unit}}
    .option
      button(@click="confirmClick") 确认申购
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import { StoreApplyNew } from '_api/store/'
  export default {
  data( ){
      return {
        listItem: {},
        materials:{},
      }
    },
    computed: {
      ...mapState('store', {
        storeSub: state => state.storeSub
      })
    },
    mounted() {
      this.initData()
    },
    methods: {
      ...mapActions('store', [
        'updateStoreSub'
      ]),
      initData(){
        this.listItem.remark = this.storeSub.remark
        this.materials = this.storeSub.materialBag
      },
      confirmClick(){
        this.materials.list.forEach((item) => {
          if(item.dealInfo.isIn){
            item.count = parseInt(item.dealInfo.num)
          }
        })
        let params = {
          remark: this.listItem.remark,
          materials: this.materials.list,
        }
        StoreApplyNew(params,'post').then((res) => {
          if (parseInt(res.data.res) === 0) {
            this.$toast(`新建成功`)
            this.leavePage()
          } else {
            this.$toast(res.data.errmsg)
          }
        }).catch(() => {
          this.$toast('新建失败')
        })
      },
      leavePage() {
        this.isLoad = false
        this.updateStoreSub()
        this.$router.replace('/store/purchase_apply')
      }
    },
  }
</script>

<style scoped lang="stylus">
  .purchase_success
    padding-bottom 52px
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
    .list
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
        flex-direction column
        background #E9F5FF
        padding 15px 15px 0
        border-radius 6px
        .item
          display flex
          flex-direction row
          justify-content space-between
          margin-bottom 15px
          span
            fsc(14px,#545454)
          p
            fsc(14px,#999999)
    .option
      width 100%
      height 52px
      display flex
      justify-content flex-end
      align-items center
      position fixed
      bottom 0
      padding-right 15px
      bgf()
      button
        wh(100px,32px)
        line-height 32px
        background #1E9AFF
        fsc(15px,#fff)
        border 0
        outline 0
        border-radius 22px
</style>

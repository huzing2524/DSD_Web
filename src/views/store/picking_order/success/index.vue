<template lang="pug">
  .success.full_box(v-if="isLoad")
    .top
      .icon
        svg.ali_icon(aria-hidden="true")
          use(xlink:href="#iconsuccess")
      span 完成领料
    .content
      .item_list
        .item
          span 发料人
          p {{listItem.send_person}}
        .item
          span 领料人
          p {{listItem.accept_person}}
        .item
          span 领料时间
          p {{listItem.picking_time | timePointFilter}}
    .back(@click="backClick") 返回首页
</template>

<script>
  import { StorePickingListDetail } from '_api/store/'
  export default {
  data(){
      return {
        isLoad: false,
        id: '',
        listItem:{},
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData(){
        this.id = this.$route.query.id || ''
        StorePickingListDetail({id:this.id},'get').then((res) => {
          this.listItem = res.data
          this.isLoad = true
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      backClick(){
        let u = navigator.userAgent
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        if (isAndroid) {
          window.android.getFinish()
        }else if(isIOS){
          window.webkit.messageHandlers.iosGetFinish.postMessage(null);
        }
        // this.$router.push(`/store`)
      }
    },
  }
</script>

<style scoped lang="stylus">
  fdr()
    display flex
    flex-direction row
  fdc()
    display flex
    flex-direction column
  .success
    bgf()
    .top
      fdc()
      fct()
      margin-top 40px
      .icon
        wh 60px 60px
        margin-bottom 12px
      span
        fsc 16px #333333
        margin-bottom 30px
    .content
      padding 0 35px
      .item_list
        fdc()
        background #F5FBFF
        padding 20px 20px 0
        .item
          fdr()
          margin-bottom 20px
          justify-content space-between
          span
            fsc 14px #333333
          p
            fsc 14px #666666
    .back
      display flex
      justify-content center
      align-items center
      margin 0 auto
      wh 120px 36px
      fsc 14px #1E9AFF
      border 1px solid #1E9AFF
      border-radius 20px
      margin-top 180px
</style>

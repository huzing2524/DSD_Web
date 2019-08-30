<template lang="pug">
  #app.full_box
    Layouts
      router-view(v-doc-title="$route.meta.title")
      .dev_router(@click="showDevRouter = !showDevRouter" v-show="isDev")
        .path_box(v-show="showDevRouter")
          router-link(to="/order") 订单
          router-link(to="/order/clients/client_list") 客户
          router-link(to="/store") 仓库
          router-link(to="/product") 生产
          router-link(to="/purchase") 采购
          router-link(to="/purchase/supplier/supplier_shop_management") 供应商
          router-link(to="/rights") 权限
          router-link(to="/industry") 智能+
</template>

<script>
  import Layouts from '@/layouts/'
  import {isDev} from '_common/util/'
  import Bus from '@/bus'
  export default {
    components: {
      Layouts
    },
    data() {
      return {
        isDev,
        showDevRouter: false,
      }
    },
    mounted() {
      Bus.$on('UnAuthorized', () => {
        localStorage.removeItem("Authorization")
        if (this.$route.path !== '/user/login') {
          // this.$router.replace({path: '/user/login', query: this.$route.fullPath})
        }
      })
      Bus.$on('NoRightsToBack', () => {
        this.$toast("访问权限受限");
        // this.$router.go(-1);
        // this.$createDialog({
        //   type: 'alert',
        //   // showClose: true,
        //   title:'提示',
        //   content: '访问权限受限,请求管理员帮助',
        //   confirmBtn: {
        //     text: '我知道了',
        //     active: true,
        //   },
        //   onConfirm: () => {
        //     this.$router.go(-1)
        //   },
        // }).show()
      })
      Bus.$on('SystemError', (val = '系统错误，请稍后再试') => {
        this.$toast(val)
      })
      Bus.$on('showLoading', (val) => {
        const toast = this.$createToast({
          txt: 'Loading...',
          mask: true,
          time: 20000
        })
        if (val === 1) {
          toast.show()
        } else if (val === 0) {
          toast.hide()
        }
      })
    }
  }
</script>

<style lang="stylus">
  @import "//at.alicdn.com/t/font_1145607_i8ct78imyi8.css"
  @require "~@/style/reset.styl"
  @require "~@/style/common.styl"
  #app
    .dev_router
      position fixed
      width 25px
      height 25px
      bg rgba(204,204,204,.7)
      bottom 66px
      left 26px
      border-radius 25px
      z-index 99
      cursor pointer
      font-size 18px
      .path_box
        width 130px
        position absolute
        bottom 26px
        bgf()
        box-shadow 0px 2px 8px 0px rgba(35,121,191,0.2)
        a
          fct()
          padding 10px
          color red
</style>

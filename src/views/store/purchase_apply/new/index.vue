<template lang="pug">
  .apply_new.full_box
    .reason_box
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_remarks")
        span 申购原因
      cube-input(type="text" :clearable="clearable" placeholder="填写申购原因..." v-model="listItem.remark")
    .next
      button(@click="toNext") 下一步
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  export default {
  data( ){
      return {
        clearable:{
          visible: true,
          blurHidden: false
        },
        listItem: {},
      }
    },
    mounted() {

    },
    computed: {
      ...mapState('store', {
        storeSub: state => state.storeSub
      })
    },
    methods: {
      ...mapActions('store', [
        'updateStoreSub'
      ]),
      toNext(){
        if(!this.listItem.remark){
          this.$toast('请填写申购原因')
          return
        }
        this.storeSub.remark = this.listItem.remark
        this.$router.push(`/store/purchase_apply/select`)
      }
    },
  }
</script>

<style scoped lang="stylus">
  .apply_new
    padding-top 10px
    .reason_box
      display flex
      flex-direction column
      padding 15px
      margin-bottom 20px
      bgf()
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
          display flex
          fsc(15px,#545454)
    .next
      padding 0 20px
      button
        width 100%
        height 44px
        line-height 44px
        background #1E9AFF
        fsc(15px,#fff)
        border 0
        outline 0
        border-radius 22px
</style>
<style scoped lang="stylus">
  .reason_box
    .cube-input
      background #E9F5FF
      padding 5px
      border-radius 6px
      flex 1
      .cube-input-field
        border 0
        outline 0
      &:after
        border 0
</style>

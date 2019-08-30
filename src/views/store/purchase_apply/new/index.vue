<template lang="pug">
  .apply_new.full_box
    cube-textarea(
    v-model="listItem.remark"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :autofocus="autofocus"
    )
    .save
      button(@click="toNext") 下一步
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  export default {
  data( ){
      return {
        listItem: {},
        placeholder: '填写申购原因',
        maxlength: 60,
        autofocus: true
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
    padding 10px
    .save
      display flex
      justify-content center
      button
        wh 180px 48px
        line-height 48px
        background #1E9AFF
        fsc 16px #fff
        border-radius 24px
        border 0
        margin-top 30px
</style>
<style lang="stylus">
  .cube-textarea-wrapper::after
    border 0
  .cube-textarea
    border-radius 8px
</style>

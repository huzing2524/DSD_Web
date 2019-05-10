<template lang="pug">
  .main.full_box
    .check_box
      .top
        img(src="./icon_storage.png")
        span {{listItem.category}}：{{listItem.name}}/{{listItem.unit}}
      .item
        span 实际库存
        p {{listItem.actual}}
      .item
        span 盘点后库存
        p {{listItem.update}}
      .item
        span 库存增减
        p {{parseInt(listItem.update)-parseInt(listItem.actual)}}
    .remark
      cube-input(
      type="text"
      :clearable="clearable"
      placeholder="盘点原因"
      v-model="listItem.remark")
    .save
      button(@click="saveClick") 保存
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import { StorecheckNew } from '_api/store'
  export default {
  data(){
      return {
        type:'',
        clearable:{
          visible: true,
          blurHidden: false
        },
        listItem:{},
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
        this.type = this.$route.query.type || ''
        this.listItem = this.storeSub.storageDetail
      },
      saveClick(){
        if(!this.listItem.remark){
          this.$toast('请填写盘点原因')
          return
        }
        StorecheckNew({
          id: this.listItem.id,
          update: parseInt(this.listItem.update),
          remark: this.listItem.remark,
        },'post',this.type).then((res) => {
          if (parseInt(res.data.res) === 0) {
            this.$toast(`盘点成功`)
            this.leavePage()
          } else {
            this.$toast(res.data.errmsg)
          }
        }).catch(() => {
          this.$toast('盘点失败')
        })
      },
      leavePage() {
        this.isLoad = false
        this.updateStoreSub()
        this.$router.go(-1)
      }
    },
  }
</script>

<style scoped lang="stylus">
  .main
    .check_box
      display flex
      flex-direction column
      padding 10px 20px 0
      bgf()
      .top
        display flex
        flex-direction row
        align-items center
        img
          wh 20px 20px
          margin-right 5px
        span
          fsc 15px #545454
      .item
        display flex
        flex-direction row
        justify-content space-between
        align-items center
        padding 15px 0
        border-bottom 1px solid #eeeeee
        &:last-child
          border-bottom 0
        span
          fsc 15px #545454
        p
          fsc 14px #999
    .remark
      margin-top 10px
    .save
      display flex
      flex-direction row
      padding 0 20px
      button
        width 100%
        height 44px
        align-items center
        justify-content center
        fsc 15px #fff
        background #1E9AFF
        margin-top 20px
        border-radius 22px
        border 0
</style>
<style scoped lang="stylus">
  .cube-input
    flex 1
    text-align right
    .cube-input-field
      border 0
      outline 0
    &:after
      border 0
</style>

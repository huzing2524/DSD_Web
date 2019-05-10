<template lang="pug">
  .main
    .header
      img(:src="listItem.image")
      .info
        span {{listItem.name?listItem.name:listItem.phone}}
        p {{listItem.phone}}
    .rights
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_quanxian")
        span 拥有权限
      .list
        p(v-for="(item,index) in listItem.rights" :key="index") {{item | rightsState}}
    .options
      button(@click="deleteClick") 删除
      button(@click="editClick") 修改权限
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import { RightsInfo,RightsDel } from '_api/rights'
  export default {
  data( ){
      return {
        phone:'',
        listItem:{},
      }
    },
    filters: {
      rightsState(val) {
        let state = ''
        switch (val) {
          case '3':
            state = '订单：普通管理员'
            break
          case '33':
            state = '订单：审批人'
            break
          case '5':
            state = '采购：普通管理员'
            break
          case '55':
            state = '采购：审批人'
            break
          case '7':
            state = '生产：普通管理员'
            break
          case '9':
            state = '仓库：普通管理员'
            break
          case '99':
            state = '仓库：审批人'
            break
          case '8':
            state = '权限：普通管理员'
            break
          default:
            state = ''
        }
        return state
      },
    },
    computed: {
      ...mapState('rights', {
        rightList: state => state.rightList
      })
    },
    mounted() {
      this.initData()
    },
    methods: {
      ...mapActions('rights', [
        'updateRightsDetail'
      ]),
      initData(){
        this.phone = this.$route.query.phone || ''
        RightsInfo({phone:this.phone},'get').then((res) => {
          this.listItem = res.data
          this.isLoad = true
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      deleteClick(){
        RightsDel({phone:this.phone},'delete').then((res) => {
          if(parseInt(res.data.res) === 0){
            this.$toast(`删除成功`)
            this.$router.push(`/rights`)
          }else {
            this.$toast(res.data.errmsg)
          }
        }).catch(() => {
          this.$toast(`删除失败`)
        })
      },
      editClick(){
        this.rightList.phone = this.listItem.phone
        this.rightList.rightsItem = this.listItem.rights
        this.$router.push(`/rights/create?type=edit`)
      }
    },
  }
</script>

<style scoped lang="stylus">
  .main
    .header
      display flex
      flex-direction row
      padding 20px
      margin-bottom 10px
      align-items center
      bgf()
      img
        wh 46px 46px
        margin-right 12px
      .info
        display flex
        flex-direction column
        span
          fsc 14px #545454
          margin-bottom 6px
        p
          fsc 12px #999999
    .rights
      display flex
      flex-direction column
      bgf()
      padding 15px 0 7px 15px
      .title
        display flex
        flex-direction row
        align-items center
        margin-bottom 20px
        .icon
          wh 20px 20px
          margin-right 10px
        span
          fsc 15px #545454
      .list
        padding-left 30px
        p
          fsc 14px #545454
          margin-bottom 8px
    .options
      display flex
      flex-direction row
      position fixed
      bottom 0
      width 100%
      height 62px
      justify-content flex-end
      align-items center
      bgf()
      button
        wh 92px 32px
        border-radius 16px
        font-size 14px
        margin-right 15px
        &:nth-of-type(1)
          color #F4616C
          border 1px solid #F4616C
        &:nth-of-type(2)
          color #4DA8EE
          border 1px solid #4DA8EE
</style>

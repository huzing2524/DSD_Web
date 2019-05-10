<template lang="pug">
  .main.full_box
    .phone(v-if="type=='create'")
      .icon
        svg.ali_icon(aria-hidden="true")
          use(xlink:href="#iconicon_dianhua")
      input(v-model="listItem.phone" type="number" placeholder="填写管理员手机号")
    .rights
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_quanxian")
        span 选择权限
      .right_item
        .name 订单
        .options
          cube-radio-group(v-model="listItem.orders" :options="orders" :horizontal="true")
      .right_item
        .name 采购
        .options
          cube-radio-group(v-model="listItem.buys" :options="buys" :horizontal="true")
      .right_item
        .name 生产
        .options
          cube-radio-group(v-model="listItem.product" :options="product" :horizontal="true")
      .right_item
        .name 仓库
        .options
          cube-radio-group(v-model="listItem.store" :options="store" :horizontal="true")
      .right_item
        .name 权限管理
        .options
          cube-radio-group(v-model="listItem.rights" :options="rights" :horizontal="true")
    .save_btn
      button(v-if="type === 'edit'" @click="editClick") 修改
      button(v-else @click="saveClick") 保存
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import { RightsOrgs,RightsNew,RightsModify } from '_api/rights'
  export default {
  data( ){
      return {
        type:'',
        listItem:{},
        orders: [
          {
            label: '审批人',
            value: '33'
          },
          {
            label: '普通管理员',
            value: '3'
          },
        ],
        buys: [
          {
            label: '审批人',
            value: '55'
          },
          {
            label: '普通管理员',
            value: '5'
          },
        ],
        product: [
          {
            label: '普通管理员',
            value: '7'
          },
        ],
        store: [
          {
            label: '审批人',
            value: '99'
          },
          {
            label: '普通管理员',
            value: '9'
          },
        ],
        rights: [
          {
            label: '普通管理员',
            value: '8'
          },
        ],
        list:[],
        res:null,
      }
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
        this.type = this.$route.query.type || ''
        this.listItem.phone = this.rightList.phone
        this.list = this.rightList.rightsItem
        RightsOrgs({},'get').then((res) => {
          this.res = res.data.res
        }).catch(() => {
          this.$toast('获取数据失败')
        })
        if(this.list){
          this.list.forEach((item) => {
            this.orders.forEach((orderItem) => {
              if(item === orderItem.value){
                this.listItem.orders = item
              }
            })
            this.buys.forEach((buysItem) => {
              if(item === buysItem.value){
                this.listItem.buys = item
              }
            })
            this.product.forEach((productItem) => {
              if(item === productItem.value){
                this.listItem.product = item
              }
            })
            this.store.forEach((storeItem) => {
              if(item === storeItem.value){
                this.listItem.store = item
              }
            })
            this.rights.forEach((rightsItem) => {
              if(item === rightsItem.value){
                this.listItem.rights = item
              }
            })
          })
        }
      },
      saveClick(){
        if(!this.listItem.phone || !(/^1(3|4|5|7|8)\d{9}$/.test(this.listItem.phone))){
          this.$toast('请填写正确的手机号码')
          return
        }
        let arr = []
        if(this.listItem.orders){
          arr.push(this.listItem.orders)
        }
        if(this.listItem.buys){
          arr.push(this.listItem.buys)
        }
        if(this.listItem.product){
          arr.push(this.listItem.product)
        }
        if(this.listItem.store){
          arr.push(this.listItem.store)
        }
        if(this.listItem.rights){
          arr.push(this.listItem.rights)
        }
        // arr.push(this.listItem.orders,this.listItem.buys,this.listItem.product,this.listItem.store,this.listItem.rights)
        // arr.forEach((item) => {
        //   if(!item){
        //     this.$toast('请完善权限信息')
        //     return
        //   }
        // })
        RightsNew({
          phone: this.listItem.phone,
          rights: arr,
        },'post').then((res) => {
          if(parseInt(res.data.res) === 0){
            this.$toast(`新增成功`)
            this.$router.push(`/rights`)
          }else {
            this.$toast(res.data.errmsg)
          }
        }).catch(() => {
          this.$toast('新增失败')
        })
      },
      editClick(){
        let arr = []
        if(this.listItem.orders){
          arr.push(this.listItem.orders)
        }
        if(this.listItem.buys){
          arr.push(this.listItem.buys)
        }
        if(this.listItem.product){
          arr.push(this.listItem.product)
        }
        if(this.listItem.store){
          arr.push(this.listItem.store)
        }
        if(this.listItem.rights){
          arr.push(this.listItem.rights)
        }
        // arr.push(this.listItem.orders,this.listItem.buys,this.listItem.product,this.listItem.store,this.listItem.rights)
        // arr.forEach((item) => {
        //   if(!item){
        //     this.$toast('请完善权限信息')
        //     return
        //   }
        // })
        RightsModify({
          phone: this.listItem.phone,
          rights: arr,
        },'put').then((res) => {
          if(parseInt(res.data.res) === 0){
            this.$toast(`修改成功`)
            this.leavePage()
          }else {
            this.$toast(res.data.errmsg)
          }
        }).catch(() => {
          this.$toast('修改失败')
        })
      },
      leavePage() {
        this.isLoad = false
        this.updateRightsDetail()
        this.$router.replace(`/rights`)
      },
    },
  }
</script>

<style scoped lang="stylus">
  .main
    padding 10px 0 62px
    .phone
      display flex
      flex-direction row
      align-items center
      bgf()
      padding 14px
      margin-bottom 10px
      .icon
        wh 16px 22px
        margin-right 14px
      input
        flex 1
        fsc 14px #999999
    .rights
      display flex
      flex-direction column
      bgf()
      padding 15px 15px 5px
      .title
        display flex
        flex-direction row
        margin-bottom 20px
        align-items center
        .icon
          wh 20px 20px
          margin-right 10px
        span
          fsc 15px #545454
      .right_item
        display flex
        flex-direction column
        background #E9F5FF
        padding 15px 0 15px 15px
        margin-bottom 10px
        .name
          fsc 14px #545454
        .options
          display flex
          flex-direction row
    .save_btn
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
        bgf()
        font-size 14px
        color #4DA8EE
        border 1px solid #4DA8EE
        border-radius 16px
        margin-right 15px
</style>

<style lang="stylus">
  .cube-radio-group
    width 100%
    background #E9F5FF
    &:after
      border 0!important
    .cube-radio
      padding 15px 0 0 0!important
      &.cube-radio_selected
        .cube-radio-ui
          background #4DA8EE
      &:after
        border 0
      .cube-radio-wrap
        padding 0
        justify-content flex-start
        .cube-radio-ui
        .cube-radio-label
          fsc 14px #545454
</style>

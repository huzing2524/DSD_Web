<template lang="pug">
  .order_customer.full_box
    .customer_list
      .customer_item(v-for="(item,idx) in customerList"
        :key="idx"
        @click="confirmClick(item)")
        p {{item.name}}
        p {{item.industry}}
        p {{item.products}}
</template>

<script>
  import { OrderClients } from '_api/order/'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'order_select_customer',
    data(){
      return{
        customerList:[],
      }
    },
    computed: {
      ...mapState('order', {
        orderSub: state => state.orderSub
      })
    },
    methods:{
      ...mapActions('order', [
        'updateOrderSub'
      ]),
      getOrderClients(){
        OrderClients().then((res) => {
          this.customerList = res.data.list
        }).catch(() => {
        })
        // let res = {
        //   data: {"list":[{"region":"湖北省荆门市东宝区","position":"总经理","phone":"13714992277","name":"DSDT俱乐部","id":"9dVyDHIuoOqFlR9BAW","contacts":"谷成晔","address":"福海大厦"},{"region":"北京市北京市东城区","position":"采购员","phone":"13423746452","name":"y","id":"9ePrupEaiVjAcchLpA","contacts":"y","address":"h"},{"region":"","position":"老板","phone":"18682358009","name":"仁爱","id":"9dTJEZQCS60ho78FGq","contacts":"马云","address":""},{"region":"江苏省淮安市清江浦区","position":"老板","phone":"13852396780","name":"孙华昌","id":"9dvAAKFlRlDERa1v16","contacts":"孙华昌","address":"华德力运河城东门北边4号楼4室"},{"region":"","position":"老板","phone":"13969517171","name":"山东博界科技有限公司","id":"9djpr2MZbPfVdOBGXw","contacts":"丁相芬","address":""},{"region":"","position":"老板","phone":"18754940188","name":"山东省汇通科技有限公司","id":"9dkImeIg1U1SW7cNSS","contacts":"武总","address":""},{"region":"","position":"老板","phone":"13706351113","name":"山东省聊城市华辉实业有限公司","id":"9di4y0KSfoZiLi3N0S","contacts":"李伟","address":""},{"region":"","position":"总助","phone":"18567345698","name":"欣旺达","id":"9dVxtBp5TsE0yOcHKK","contacts":"刘峰","address":""},{"region":"湖南省长沙市芙蓉区","position":"老板","phone":"13549524716","name":"湖南石矿","id":"9eEpG8ze0nZRNocbbc","contacts":"王泽","address":"长沙市芙蓉街"},{"region":"","position":"总经理 ","phone":"13880666282","name":"科莱特(青岛)纳米涂料科技有限公司","id":"9di5IsmBwvd30Qymsi","contacts":"郑新","address":""},{"region":"","position":"采购员","phone":"18857908217","name":"绿源电动车山东有限公司","id":"9di5cb5FRKxlvPIGEy","contacts":"苏波","address":""}]}
        // }
        // this.customerList = res.data.list
      },
      confirmClick(item){
        this.updateOrderSub({
          customer: item
        })
        this.$router.push('/order/order_new/select_product')
      },
    },
    mounted(){
      this.getOrderClients()
    }
  }
</script>

<style lang="stylus">
  .order_customer
    .customer_list
      background #fff
      padding 0 20px
      margin-top 10px
      .customer_item
        padding 16px 0
        border-bottom 1px solid #E5E5E5
        &:nth-last-of-type(1)
          border: none
        p
          &:nth-of-type(1)
            fsc 16px #333
          &:nth-of-type(2)
            fsc 14px #333
            margin 8px 0 6px
          &:nth-of-type(3)
            fsc 12px #666
</style>

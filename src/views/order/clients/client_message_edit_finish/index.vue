<!--创建客户-添加对应物料-最后展示详情用-->
<template lang="pug">
  .main(v-doc-title="title")
    .company_name
      .qrcode
        .left
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_ke")
        .right
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="")
      p {{orderClientsMessage.name}}

    .company_address
      span 地址
      p {{orderClientsMessage.region+orderClientsMessage.address}}
    .company_boss_message
      .link_item
        span 联系人
        span {{orderClientsMessage.contact + "(" + orderClientsMessage.position + ")"}}
      .link_item
        span 联系电话
        span {{orderClientsMessage.phone}}
      .link_item
        span 所属行业
        span {{orderClientsMessage.industry}}
    .company_products(v-show="Object.getOwnPropertyNames(orderClientsMessage.products).length != 0")
      .title 客户购买的产品
      .product_list(v-for="(item,index) in orderClientsMessage.products" :key="index")
        span {{item.name}}
        span {{`￥`+item.unit_price+`元/`+item.unit}}
    .add_operator
      button(@click="clickCreateOrModify") {{getButtonName()}}
</template>

<script>
  import {mapActions, mapState} from "vuex";
  import { OrderClients,OrderClientsDetail } from '_api/order'

  export default {
    data() {
      return {
        id: '',
        type: '',
        title: '',
        /*mData: {
          clientMessage: {
            id: "",
            name: "北京天信有限公司",
            phone: "15625267876",
            contact: "Bob",
            position: "Boss",
            address: "永街道五道口前海2区4巷滨海大厦608永街道五道口前海2区4巷滨海大厦608",
            qrcode: "https://....",
            industry: "机械制造",
          },
          products: [
            {
              name: "活性炭口罩",
              unit_price: '2.5',
              unit: '个'
            },
            {
              name: "一次性口罩",
              unit_price: '5',
              unit: '个'
            },
            {
              name: "N95口罩",
              unit_price: '10',
              unit: '个'
            },
            {
              name: "棉布口罩",
              unit_price: '2',
              unit: '个'
            }
          ]
        }*/

      }
    },
    mounted() {
      this.id = this.$route.query.id
      this.type = this.$route.query.type
      if(this.type === 'edit') {
        this.initData()
      }
    },
    computed: {
      ...mapState('order', {
        orderClientsMessage: state => state.orderClientsMessage
      }),
    },
    methods: {
      ...mapActions('purchase', [
        'updateOrderClientMessage'
      ]),
      initData() {
          this.myId = this.$route.query.id || ''
          OrderClientsDetail({type:'1'}, 'get', this.myId).then(res => {
            console.log(res.data)
            this.orderClientsMessage = res.data
            console.log(this.orderClientsMessage)
            this.updateOrderClientMessage({
              ...this.orderClientsMessage
            })
        })
      },
      clickCreateOrModify() {
        // console.log(this.$route.query.type)
        if(this.$route.query.type === 'create') {
          console.log('create')
          this.createClient()
        } else if(this.$route.query.type === 'edit') {
          console.log('edit')
          this.modifyClient()
        }
      },
      createClient() {
        console.log("this.clientMessage="+this.orderClientsMessage)
        OrderClients(this.orderClientsMessage, 'post').then(result => {
          console.log(result);
          if (parseInt(result.data.res) === 0) {
            this.$toast("创建成功")
            // this.$router.push(`/order/clients/client_list`)
            this.$route.go(-4)
          } else {
            console.log(result.data.errmsg)
            this.$toast('创建失败')
          }
          console.log(result)
        })
      },
      modifyClient() {
        console.log("this.clientMessage=" + this.orderClientsMessage)
        OrderClientsDetail(this.orderClientsMessage, 'put', this.id).then(result => {
          if (parseInt(result.data.res) === 0) {
            this.$toast("修改成功")
            // 1: 已加入DSD， 2: 未加入DSD
            let mState = this.$route.query.state || 1
            if(mState === '1') {
              this.$router.go(-3)// 可能是-4可能是-3，如果是未加入DSD的进行编辑是-4；已经加入DSD的编辑-3，目前还不知道怎么传这个类型
            } else {
              this.$router.go(-4)// 可能是-4可能是-3，如果是未加入DSD的进行编辑是-4；已经加入DSD的编辑-3，目前还不知道怎么传这个类型
            }
            console.log('修改成功')
          } else {
            this.$toast('修改失败')
          }
          console.log(result)
        }).catch(() => {
          this.$toast('修改失败')
        })
      },
      getButtonName() {
        switch (this.type) {
          case "edit":
            this.title = "编辑客户"
            return '编辑'
          case "create":
            this.title = "创建客户"
            return '创建'
        }
      },
    },
  }
</script>

<style lang="stylus" scoped>
  column()
    display flex
    flex-direction column
  row()
    display flex
    flex-direction row
    justify-content space-between

  .main
    bg(#E6EAED)
    column()
    .company_name
      bgf()
      column()
      padding 0 15px 0 15px
      margin 10px 0px
      .qrcode
        row()
        margin-bottom 15px
        margin-top 15px
        .left
          .icon
            wh(20px,20px)
        .right
          .icon
            wh(18px, 18px)
      p
        fsc 15px #545454
        display flex
        justify-content center
        margin-bottom 50px

    .company_address
      bgf()
      row()
      margin-bottom 10px
      padding 15px
      span
        display flex
        width 50px
        fsc 14px #545454
        margin-right 20px
        line-height 18px
      p
        display flex
        text-align right
        fsc 14px #999999
        line-height 18px
    .company_boss_message
      column()
      background #fff
      padding 15px 15px 0
      margin-bottom 10px
      justify-content space-between
      .link_item
        row()
        margin-bottom 15px
        span
          fsc 14px #545454
          font-family PingFangSC-Medium
          font-weight 500
          &:nth-of-type(2)
            fsc 14px #999999
            font-family PingFangSC-Medium
            font-weight 500
    .company_products
      column()
      margin-bottom 21px
      bgf()
      .title
        fsc 14px #545454
        padding 15px
      .product_list
        row()
        padding  0 15px 15px 15px
        span
          fsc 14px #999999
        span
          fsc 14px #999999
    .add_operator
      bgf()
      position fixed
      bottom 0
      left 0
      right 0
      bgf()
      margin-top 40px
      padding 15px 15px 15px
      display flex
      align-items center
      justify-content flex-end
      button
        wh(120px,32px)
        line-height 32px
        display flex
        justify-content center
        fsc 14px white
        border 0
        outline none
        border-radius 16px
        background #1E9AFF


</style>



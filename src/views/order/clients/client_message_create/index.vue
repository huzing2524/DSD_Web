<!--创建客户-添加对应物料-最后展示详情用-->
<template lang="pug">
  .main.full_box(v-doc-title="title")
    .body
      .ten_padding
      .company_name
        .qrcode
          .left
            .icon
              svg.ali_icon(aria-hidden="true")
                use(xlink:href="#iconicon_ke")
        p {{orderClientsMessage.name || '-'}}
      .ten_padding
      .company_item
        span 所属行业
        p {{orderClientsMessage.industry || ''}}
      .one_padding
      .company_item
        span(style="width: 60px;") 地址
        p(style="line-height: 20px;text-align: right;") {{(getAddress(orderClientsMessage.region, orderClientsMessage.address))}}
      .company_item
        span 送达天数
        p {{orderClientsMessage.deliver_days}}天
      .one_padding
      .company_item
        span 联系人
        p {{getContact(orderClientsMessage.contact, orderClientsMessage.position)}}
      .company_item
        span 联系电话
        p {{orderClientsMessage.phone || '无'}}
      .ten_padding
      .company_products(v-show="Object.getOwnPropertyNames(orderClientsMessage.products).length != 0")
        .title 客户购买的产品
        .one_padding
        .product_list(v-for="(item,index) in orderClientsMessage.products" :key="index")
          span {{item.name || ''}}
          .item
            span {{(item.unit_price || '') | formatFloatNum }}元/{{item.unit || ''}}
          .item
            span 最小起订量：{{(item.lowest_count || 0)}}{{item.unit || ''}} | 最小包装量：{{item.lowest_package || 0}}{{item.unit || ''}}
          .divider_line
    .add_operator
      p(@click="clickCreateOrModify") {{getButtonName()}}
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
      }
    },
    mounted() {
      this.id = this.$route.query.id
      this.type = this.$route.query.type
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
      getButtonName() {
        switch (this.type) {
          case "edit":
            this.title = "编辑客户"
            return '保存'
          case "create":
            this.title = "创建客户"
            return '创建'
          case "add":
            this.title = "添加客户"
            return '添加'
        }
      },
      clickCreateOrModify() {
        if(this.$route.query.type === 'create') {
          this.createClient()
        } else if(this.$route.query.type === 'edit') {
          this.modifyClient()
        } else if(this.$route.query.type === 'add') {
          this.modifyAdd()
        }
      },
      createClient() {
        OrderClients(this.orderClientsMessage, 'post').then(result => {
          if (parseInt(result.data.res) === 0) {
            this.$toast("已创建供应商")
            this.$router.push(`/order/clients/client_list`)
          } else {
            this.$toast('result.data.errmsg')
          }
        }).catch(() => {
          this.$toast('创建失败')
        })
      },
      modifyClient() {
        // console.log("this.clientMessage=" + this.orderClientsMessage)
        // 复制一个，如果失败了点击返回数据也不会因为下面删除了name和unit受到影响
        let body = this.copy(this.orderClientsMessage)
        this.orderClientsMessage.products.forEach((product) => {
          delete product.name
          delete product.unit
          // 因为上面那个拷贝方法没有成功拷贝到array，所以这里手动再复制一次。
          body.products.push(product)
        })
        if(null != body.products) {
          body.products.forEach((product) => {
            console.log(product.id)
            console.log(product.unit_price)
          })
        }
        OrderClientsDetail(body, 'put', this.id).then(result => {
          if (parseInt(result.data.res) === 0) {
            this.$toast("修改成功")
            // 1: 已加入DSD， 2: 未加入DSD
            let mState = this.$route.query.state || 1
            if(mState === '1') {
              this.$router.go(-3)// 可能是-4可能是-3，如果是未加入DSD的进行编辑是-4；已经加入DSD的编辑-3，目前还不知道怎么传这个类型
            } else {
              this.$router.go(-4)// 可能是-4可能是-3，如果是未加入DSD的进行编辑是-4；已经加入DSD的编辑-3，目前还不知道怎么传这个类型
            }
            this.$toast('修改成功')
          } else {
            this.$toast('修改失败')
          }
        }).catch(() => {
          this.$toast('修改失败')
        })
      },
      modifyAdd() { // 添加客户
        let postData = this._.cloneDeep(this.orderClientsMessage)
        // let mProdcuts = this._.cloneDeep(this.orderClientsMessage.products)
        postData.products.forEach((product) => {
          delete product.name
          delete product.unit
        })
        const body = {products: postData.products}
        OrderClientsDetail(body,  'post', this.id).then(result => {
          if(parseInt(result.data.res) === 0) {
            this.$toast("添加成功")
            this.$router.go(-5)// 返回到客户列表
          } else {
            this.$toast(result.data.errmsg)
          }
        }).catch(() => {
          this.$toast(this.myId+"添加失败")
        })
      },
      copy(obj){
        let copyObj = {}; //最初的时候给它一个初始值=它自己或者是一个json
        for(let name in obj){
          if(typeof obj[name] === "object"){ //先判断一下obj[name]是不是一个对象
            copyObj[name]= (obj[name].constructor===Array)?[]:{}; //我们让要复制的对象的name项=数组或者是json
            this.copy(obj[name],copyObj[name]); //然后来无限调用函数自己 递归思想
          }else{
            copyObj[name]=obj[name];  //如果不是对象，直接等于即可，不会发生引用。
          }
        }
        return copyObj; //然后在把复制好的对象给return出去
      },
      getAddress(region, address) {
        if(!region && !address) {
          return '无'
        } else {
          return (region || '')+ (address || '')
        }
      },
      getContact(contact, position) {
        if(!contact) {
          return "无"
        } else {
          if(!position) {
            return contact
          } else {
            return contact + " (" + position + ")"
          }
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
    bgf()
    .body
      fbox()
      flex-direction column
      .one_padding
        background #EEEEEE
        width 100%
        height 1px
      .ten_padding
        background #EEEEEE
        width 100%
        height 10px
      .company_name
        bgf()
        column()
        margin 0 10px
        .qrcode
          row()
          margin 12px 0
          .left
            .icon
              wh(20px,20px)
        p
          fsc 16px #333333
          display flex
          justify-content center
          margin-bottom 50px
          font-family:PingFangSC-Medium;
          font-weight:500;
          line-height:22px;
      .company_item
        bgf()
        row()
        padding 12px 0
        margin 0 10px
        span
          display flex
          fsc 14px #333333
          margin-right 20px
          line-height 18px
          font-weight bold
        p
          display flex
          justify-content flex-end
          fsc 14px #666666
          line-height 18px
      .company_products
        column()
        margin-bottom 21px
        bgf()
        .title
          bgf()
          fsc 14px #333333
          padding 12px 0
          margin 0 10px
          font-weight bold
        .one_padding
          background #EEEEEE
          width 100%
          height 1px
        .product_list
          bgf()
          column()
          margin-top 12px
          span
            height:20px;
            font-size:14px;
            font-weight:400;
            line-height:20px;
            padding-bottom 12px
            margin 0 10px
            color #333333
          .item
            span
              height:17px;
              font-size:12px;
              font-weight:400;
              color:rgba(102,102,102,1);
              line-height:17px;
          .divider_line
            background #EEEEEE
            width 100%
            height 1px
            margin-top 12px
    .divider_line
      background #CCCCCC
      width 100%
      height 1px
    .add_operator
      bgf()
      wh 100% 52px
      font-size 14px
      padding 15px
      display flex
      align-items center
      justify-content flex-end
      border-top 1px solid #CCCCCC
      p
        padding 8px 17px
        border-radius 16px
        margin-left 15px
        background #1E9AFF
        color white
</style>



<!--创建供应商-添加对应物料-最后展示详情用-->
<template lang="pug">
  .main(v-doc-title="title")
    .company_name
      .qrcode
        .left
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_supplier")
        .right
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="")
      p {{supplierDetail.name || "佚名"}}

    .company_address
      span 地址
      p {{getAddress(supplierDetail.region, supplierDetail.address)}}
    .company_boss_message
      .link_item
        span 联系人
        span {{getContact(supplierDetail.contact, supplierDetail.position)}}
      .link_item
        span 联系电话
        span {{supplierDetail.phone || '无'}}
      .link_item
        span 所属行业
        span {{supplierDetail.industry || ''}}
    .company_products(v-if="null != supplierDetail && null != supplierDetail.materials")
      .title 向该供应商采购的物料
      .product_list(v-for="(item,index) in supplierDetail.materials" :key="index")
        span {{item.name || ''}}
        span {{(item.unit_price || '') | formatFloatNum }}元/{{item.unit || ''}}
    .add_operator
      button(@click="buttonClick") {{getButtonName()}}
</template>

<script>
  import {mapState} from "vuex";
  import {SupplierCreate,SupplierDetail} from '_api/purchase';

  export default {
    data() {
      return {
        title: '',
        id: '',
        data: {
          supplierMessage: {
            id: "",
            name: "北京天信有限公司",
            phone: "15625267876",
            contact: "Bob",
            position: "Boss",
            address: "永街道五道口前海2区4巷滨海大厦608永街道五道口前海2区4巷滨海大厦608",
            qrcode: "https://....",
            industry: "机械制造",

          },
          materials: [
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
        }

      }
    },
    mounted() {
      this.id = this.$route.query.id
      console.log("supplier_message_create->type=="+this.$route.query.type )
    },
    computed: {
      ...mapState('purchase', {
        supplierDetail: state => state.supplierDetail
      }),
    },
    methods: {
      // onItemClick(supplierMessageId, info) {
        /*this.product.id = this.data.supplierMessage.id
        this.product.info = info
        this.updatePurchase({
          ...this.product
        })
        this.$router.push(`/purchase/supplier/product_price_modify`)*/
      // },
      getButtonName() {
        switch (this.$route.query.type) {
          case "create":
            this.title = "创建供应商"
            return '创建'
          case "edit":
            this.title = "编辑客户"
            return '保存'
          case "add":
            this.title = "添加供应商"
            return "添加"
        }
      },
      buttonClick() {
        switch (this.$route.query.type) {
          case "create":
            console.log('create')
            this.createSupplier()
            break
          case "edit":
            console.log('edit')
            this.modifySupplier()
            break
          case "add":
            console.log('add')
            this.clickAdd()
            break
          default:
            console.log('都不是')
            break
        }
      },
      createSupplier() {
        console.log("this.supplierMessage="+this.supplierDetail)
        SupplierCreate(this.supplierDetail, 'post').then(result => {
          console.log(result);
          if (parseInt(result.data.res) === 0) {
            this.$toast("创建成功")
            this.$router.push(`/purchase/supplier/supplier_shop_management`)
          } else {
            this.$toast(result.data.errmsg)
          }
          console.log(result)
        })
      },
      modifySupplier() {
        console.log("this.supplierDetail=" + this.supplierDetail)
        // 复制一个，如果失败了点击返回数据也不会因为下面删除了name和unit受到影响
        let body = this.copy(this.supplierDetail)
        this.supplierDetail.materials.forEach((material) => {
          console.log(material.id)
          console.log(material.unit_price)
          // 因为上面那个拷贝方法没有成功拷贝到array，所以这里手动再复制一次。
          body.materials.push(material)
        })
        body.materials.forEach((material) => {
          // 因为上面那个拷贝方法没有成功拷贝到array，所以这里手动再复制一次。
          delete material.name
          delete material.unit
          console.log(material.id)
          console.log(material.unit_price)
        })
        SupplierDetail(body, 'put', this.id).then(result => {
          if (parseInt(result.data.res) === 0) {
            this.$toast("修改成功")
            // 1: 已加入DSD， 2: 未加入DSD
            let mState = this.$route.query.state || '1'
            if(mState === '1') {
              this.$router.go(-3)// 已加入 返回三个界面到达供应商商品目录
            } else {
              this.$router.go(-4)// 未加入 返回四个界面到达供应商商品目录(多了一个基本信息的修改)
            }
            console.log('修改成功')
          } else {
            console.log("失败原因"+result.data.errormsg)
            this.$toast('修改失败')
          }
          console.log(result)
        }).catch((e) => {
          this.$toast('修改失败')
          console.log(e);
        })
      },
      /*
       * 添加供应商
       * */
      clickAdd() {
        let postData = this._.cloneDeep(this.supplierDetail)
        postData.materials.forEach((material) => {
          delete material.name
          delete material.unit
        })
        const body = {materials: postData.materials}
        SupplierDetail(body,  'post', this.id).then(result => {
          console.log("result.data.res="+result.data.res)
          if(parseInt(result.data.res) === 0) {
            this.$toast("添加成功")
            this.$router.go(-4)
          } else {
            console.log(result.data.errmsg)
            this.$toast(result.data.errmsg)
          }
        }).catch((e) => {
          this.$toast(this.myId+"添加失败")
          console.log(e)
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
            return contact + "(" + position + ")"
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



<!--创建供应商-添加对应物料-最后展示详情用-->
<template lang="pug">
  .main.full_box(v-doc-title="title")
    .body
      .ten_padding
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
        p {{supplierDetail.name || '佚名'}}
      .ten_padding
      .company_item
        span 所属行业
        p {{supplierDetail.industry || ''}}
      .one_padding
      .company_item
        span(style="width: 60px;") 地址
        p(style="line-height: 20px;text-align: right;") {{(getAddress(supplierDetail.region, supplierDetail.address))}}
      .company_item
        span 送达天数
        p {{supplierDetail.deliver_days}}天
      .one_padding
      .company_item
        span 联系人
        p {{getContact(supplierDetail.contact, supplierDetail.position)}}
      .company_item
        span 联系电话
        p {{supplierDetail.phone || '无'}}
      .ten_padding
      .company_item(v-if="this.$route.query.type === 'edit'")
        span 是否使用DSD APP
        p {{this.$route.query.state  === '1' ? '是' : '否'}}
      .ten_padding
      .company_products(v-if="supplierDetail != undefined && undefined != supplierDetail.materials && supplierDetail.materials.length > 0")
        .title 向该公司采购的物料
        .one_padding
        .product_list(v-for="(item,index) in supplierDetail.materials" :key="index")
          span {{item.name || ''}}
          .item
            span {{(item.unit_price || '') | formatFloatNum }}元/{{item.unit || ''}}
          .item
            span(class="item_other") 最小起订量：{{item.lowest_count=== null ? 0 : item.lowest_count}}{{item.unit || ''}} | 最小包装量：{{item.lowest_package=== null ? 0 : item.lowest_package}}{{item.unit || ''}}
          .divider_line
    .add_operator
      p(@click="buttonClick") {{getButtonName()}}
</template>

<script>
  import {mapState,mapActions} from "vuex";
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
      ...mapActions('purchase', [
        'updatePurchase'
      ]),
      getButtonName() {
        switch (this.$route.query.type) {
          case "create":
            this.title = "创建供应商"
            return '创建'
          case "edit":
            this.title = "编辑供应商"
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
            this.updatePurchase({
              ...null
            })
            this.$router.push(`/purchase/supplier/supplier_shop_management`)
          } else {
            this.$toast(result.data.errmsg)
          }
          console.log(result)
        })
      },
      modifySupplier() {
        if(this.supplierDetail.de)
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
            /*// 想在这里把vuex的数据清空咋清？
            this.updatePurchase({
              // 这样不行
              ...null
            })

            // 平时我更新数据是
            this.updatePurchase({
              ...this.getData
            })*/
            this.clearSupplierVuex()


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
          this.clearSupplierVuex()
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
      clearSupplierVuex() {
        let data = {
          name: '',
          contact: '',
          phone: '',
          position: '',
          industry: '',
          region:'',
          address: '',
          materials: [],
        }
        this.updatePurchase({
          ...data
        })
      }
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
          display flex
          flex-direction row
          justify-content space-between
          padding 12px 0 8px
          .left
            .icon
              wh(20px,20px)
          .right
            .icon
              wh(18px, 18px)
        p
          fsc 16px #333333
          display flex
          justify-content center
          margin-bottom 40px
          font-weight 600
          line-height 22px
      .company_item
        bgf()
        display flex
        flex-direction row
        justify-content space-between
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
          fsc 14px #333333
          padding 12px 0
          margin 0 10px
          font-weight bold
        .one_padding
          background #EEEEEE
          width 100%
          height 1px
        .product_list
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
        width 96px
        padding 8px 0
        border-radius 16px
        margin-left 15px
        background #1E9AFF
        text-align center
        color white


</style>



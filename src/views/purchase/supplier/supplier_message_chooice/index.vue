<!--搜索到供应商后根据id打开供应商详情信息-->
<template lang="pug">
  .main(v-if="isLoad && mData!=null")
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
      p {{mData.name || "佚名"}}
    .company_address
      span 地址
      p {{getAddress(mData.region, mData.address)}}
    .company_boss_message
      .link_item
        span 联系人
        span {{getContact(mData.contact, mData.position)}}
      .link_item
        span 联系电话
        span {{mData.phone || '无'}}
      .link_item
        span 所属行业
        span {{mData.industry || ''}}
    .company_products(v-if="null != mData && null != mData.materials")
      .title 向该供应商采购的物料
      .product_list(v-for="(item,index) in mData.materials" :key="index" @click="onItemClick(item)")
        span {{item.name || ''}}
        span {{(item.unit_price || '') | formatFloatNum }}元/{{item.unit || ''}}
    .add_operator
      button(@click="onButtonClick") {{buttonName}}
  NullPage(v-else)
</template>

<script>
  import NullPage from "_components/null_page"
  import {SupplierDetail} from "../../../../api/purchase"
  import {mapActions, mapState} from "vuex";

  export default {
    components: {
      NullPage,
    },
    data() {
      return {
        buttonName: '下一步',
        isLoad: false,
        mData: {
          /*name: "北京天信有限公司",
          phone: "15625267876",
          contact: "Bob",
          position: "Boss",
          address: "广东省深圳市宝安区福永街道五道口前海2区4巷滨海大厦608",
          qrcode: "https://....",
          industry: "机械制造",
          materials:
            [
              // {
              //   name: "活性炭口罩",
              //   unit_price: '2.5',
              //   unit: '个'
              // },
              // {
              //   name: "一次性口罩",
              //   unit_price: '5',
              //   unit: '个'
              // },
              // {
              //   name: "N95口罩",
              //   unit_price: '10',
              //   unit: '个'
              // },
              // {
              //   name: "棉布口罩",
              //   unit_price: '2',
              //   unit: '个'
              // }
            ]*/
        },
      }
    },
    computed: {
      ...mapState('purchase', {
        dataBack: state => state.supplierDetail
      }),
    },
    mounted() {
      if(Object.keys(this.dataBack).length != 0) {
        this.mData = this.dataBack
        console.log('dataBack.........,this.dataBack'+this.dataBack)
        // this.buttonName = '添加'
        this.isLoad = true
      } else {
        this.initData()
        console.log('init...........')
        this.isLoad = true
      }
    },
    methods: {
      ...mapActions('purchase', [
        'updateSupplierMessage'
      ]),
      initData() {
        SupplierDetail({type:'2'}, 'get',this.$route.query.id || '').then(result => {
          this.mData = result.data;
          console.log(result)
          console.log(this.mData)
          // this.updateSupplierMessage({
          //   ...this.mData
          // })
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      // onItemClick(supplierMessageId, info) {
      /*this.product.id = this.mData.supplierMessage.id
      this.product.info = info
      this.$router.push(`/purchase/supplier/product_price_modify`)*/
      // },
      onButtonClick() {
        // if("下一步" === this.buttonName) {
        this.goNext()
        // } else if("添加" === this.buttonName) {
        //   this.clickAdd()
        // }
      },
      /*clickAdd() {
        SupplierDetail({}, 'post',this.$route.query.id || '').then(result => {
          console.log("result.data.res="+result.data.res)
          if(parseInt(result.data.res) === 0) {
            this.$toast("添加成功")
            this.$router.go(-2)
          } else {
            console.log(result.data.errmsg)
          }
        }).catch(() => {
          this.$toast(this.myId+"添加失败")
          console.log(e)
        })
      },*/
      goNextOld() {
        this.updateSupplierMessage({
          ...this.mData
        })
        this.$router.push(`/purchase/supplier/add_supplier_add_material`)
      },
      goNext() {
        this.updateSupplierMessage({
          ...this.mData
        })
        // 因为从supplier_add那边进来的都是已经加入DSD的，不能重新编辑基本信息，直接进入物料信息。
        this.$router.push(`/purchase/supplier/create_supplier_add_material?id=${this.$route.query.id || ''}&type=add`)
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
    }
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



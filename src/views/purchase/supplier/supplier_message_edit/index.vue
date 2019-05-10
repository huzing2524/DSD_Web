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
      p {{mData.name || '佚名'}}
    .company_address
      span 地址
      p {{(getAddress(mData.region, mData.address))}}
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
      .product_list(v-for="(item,index) in mData.materials" :key="index")
        span {{item.name || ''}}
        span {{(item.unit_price || '') | formatFloatNum }}元/{{item.unit || ''}}
    .add_operator
      button(@click="goNext") 编辑
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
        isLoad: false,
        mData: {
          /*name: "北京天信有限公司",
          phone: "15625267876",
          contact: "Bob",
          position: "Boss",
          region:'广东省深圳市宝安区',
          address: "福永街道五道口前海2区4巷滨海大厦608",
          qrcode: "https://....",
          industry: "机械设备制造",
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
      // if(Object.keys(this.dataBack).length != 0) {
      //   this.mData = this.dataBack
      // } else {
      this.initData()
      // }
    },
    methods: {
      ...mapActions('purchase', [
        'updateSupplierMessage'
      ]),
      initData() {
        SupplierDetail({type:'1'}, 'get',this.$route.query.id || '').then(result => {
          this.isLoad = true
          this.mData = result.data;
          // this.mData.materials.forEach(item =>{
          //   console.log('item='+item.name+"/"+item.unit_price+"/"+item.unit)
          // })
          this.updateSupplierMessage({
            ...this.mData
          })
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      // onItemClick(supplierMessageId, info) {
      /*this.product.id = this.mData.supplierMessage.id
      this.product.info = info
      this.$router.push(`/purchase/supplier/product_price_modify`)*/
      // },
      // async clickAdd() {
      //   try {
      //     this.data.supplierMessage.id = this.$route.query.id || ''
      //     const { result } = await SupplierCreate({}, 'post',this.data.supplierMessage.id)
      //     if (result.errmsg) {
      //       this.$toast(result.errmsg)
      //     } else {
      //       this.$toast(this.myId+"添加成功")
      //       // this.$router.go(-1)
      //     }
      //     console.log(result)
      //   } catch (e) {
      //     this.$toast(this.myId+"添加失败")
      //     console.log(e)
      //   }
      // },
      goNext() {
        this.updateSupplierMessage({
          ...this.mData
        })
        let mId = this.$route.query.id || ''
        let mState = this.$route.query.state || '1'
        // '1': 已加入DSD， '2': 未加入DSD,最后在supplier_message_create的修改方法中用到
        if(mState === '1') {// 如果已经加入DSD，点击编辑只能调到物料列表进行修改。
          console.log("1..........................................")
          this.$router.push(`/purchase/supplier/create_supplier_add_material?id=${mId}&type=edit&state=${mState}`)
        } else {// 如果是未加入DSD的，点击编辑可以修改基本信息
          console.log("2.。。。。。。。。。。。。。。。。。")
          this.$router.push(`/purchase/supplier/supplier_create?id=${mId}&type=edit&state=${mState}`)
        }
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



<!--搜索到供应商后根据id打开供应商详情信息-->
<template lang="pug">
  .main.full_box(v-if="isLoad && mData!=null")
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
        p {{mData.name || '佚名'}}
      .ten_padding
      .company_item
        span 所属行业
        p {{mData.industry || ''}}
      .one_padding
      .company_item
        span(style="width: 60px;") 地址
        p(style="line-height: 20px;text-align: right;") {{(getAddress(mData.region, mData.address))}}
      .company_item
        span 送达天数
        p {{mData.deliver_days}}天
      .one_padding
      .company_item
        span 联系人
        p {{getContact(mData.contact, mData.position)}}
      .company_item
        span 联系电话
        p {{mData.phone || '无'}}
      .ten_padding
      .company_item
        span 是否使用DSD APP
        p {{this.$route.query.state  === '1' ? '是' : '否'}}
      .ten_padding
      .company_products(v-if="mData != undefined && undefined != mData.materials && mData.materials.length > 0")
        .title 向该公司采购的物料
        .one_padding
        .product_list(v-for="(item,index) in mData.materials" :key="index")
          span {{item.name || ''}}
          .item
            span {{(item.unit_price || '') | formatFloatNum }}元/{{item.unit || ''}}
          .item
            span 最小起订量：{{(item.lowest_count || 0)}}{{item.unit || ''}} | 最小包装量：{{item.lowest_package || 0}}{{item.unit || ''}}
          .divider_line
    .divider_line
    .add_operator
      p(@click="goNext") 编辑
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
      this.initData()
    },
    methods: {
      ...mapActions('purchase', [
        'updateSupplierMessage'
      ]),
      initData() {
        SupplierDetail({type:'1'}, 'get',this.$route.query.id || '').then(result => {
          this.isLoad = true
          this.mData = result.data;
          this.updateSupplierMessage({
            ...this.mData
          })
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
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
      p
        width 80px
        padding 8px 0
        text-align center
        border-radius 16px
        margin-left 15px
        background #1E9AFF
        color white


</style>



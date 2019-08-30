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
        p {{mData.name || "-"}}
      .ten_padding
      .company_item
        span 所属行业
        p {{mData.industry || ''}}
      .one_padding
      .company_item
        span(style="width: 60px;") 地址
        p(style="line-height: 20px;text-align: right;") {{getAddress(mData.region, mData.address)}}
      <!--.company_item(v-if="mData.deliver_days !== 0")-->
        <!--span 送达天数-->
        <!--p {{mData.deliver_days}}天-->
      .one_padding
      .company_item
        span 联系人
        p {{getContact(mData.contact, mData.position)}}
      .company_item
        span 联系电话
        p {{mData.phone || '无'}}
      .ten_padding
      .company_products(v-if="mData != undefined && undefined != mData.materials && mData.materials.length > 0")
        .title 向该供应商采购的物料
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
      p(@click="onButtonClick") {{buttonName}}
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
        mData: {},
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
        this.isLoad = true
      } else {
        this.initData()
        this.isLoad = true
      }
    },
    methods: {
      ...mapActions('purchase', [
        'updateSupplierMessage'
      ]),
      initData() {
        this.updateSupplierMessage({
          ...this.mData
        })
        SupplierDetail({type:'2'}, 'get',this.$route.query.id || '').then(result => {
          this.mData = result.data;
          this.updateSupplierMessage({
            ...this.mData
          })
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      onButtonClick() {
        // if(this.mData.deliver_days === 0) {
        //   this.$router.push(`/purchase/supplier/supplier_add_deliver_days`)
        // } else {
        //   this.goNext()
        // }
        this.$router.push(`/purchase/supplier/supplier_add_deliver_days?id=${this.$route.query.id || ''}`)
      },
      goNext() {
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



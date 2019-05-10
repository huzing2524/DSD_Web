<template lang="pug">
  .order_detail.full_box
    .order_detail_item
      .title
        p.tips
          span.icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_tishi")
          | 提示
      p 1、拆单生产指的是将原生产单一分为二
      p 2、拆单后可优先生产物料库存足够的生产单
    .order_detail_item
      .title
        p
          span.icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_danhao")
          | 生产单号
        p {{$route.query.id}}
    .order_detail_item
      .title
        p
          span.icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_product")
          | 生产产品
      .content.product
        .item
          p 产品
          p {{productInfo.category_name}}：{{productInfo.product}}
        .item
          p 生产数量
          p {{productInfo.target}}{{productInfo.unit}}
    .order_detail_item
      .title
        p
          span.icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_zhaungtai")
          | 状态
        p {{productInfo.state | productTaskItemState}}
    .order_detail_item(v-if="productInfo.state > 4")
      .title
        p
          span.icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_jindu")
          | 生产进度
      .progress_list
        .progress_list_item
          .title
            p
              span.icon
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconicon_gongxu")
              | 工序1：CNC切割
            p 周杰伦
          .content
            .card_top
              .card_top_left 计划生产
                span {{20}}
                | 台
              .card_top_right
                vm-progress(type="circle" :width="40" stroke-width="2" stroke-color="#00CC66" :percentage="80")
            .card_middle
              .card_middle_bar
                .progress
                  .active(:style="{width: 80+ '%'}")
              .card_middle_text
                span(style="color: #31CBA7;") 生产合格产品：80
                span(style="color: #A1A1A1;") 不合格产品：20
            .card_bottom
              .card_bottom_item
                span 11月01日 09:30 - 12月31日 09:30
                span {{24}}小时
              .card-bottom-item 备注：生产中
        .progress_list_item
          .title
    .order_detail_item
      .title
        p
          span.icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_cailiao")
          | 所需物料
      .content.product
        .item(v-for="(item, idx) in materialList" :key="idx")
          p {{item.name}}
          p {{item.count}}
    .btn_box(v-if="productInfo.state == 2")
      .state_2
        .tips 仓库物料可齐套生产300个产品，是否拆单生产
        p.blue 确定拆单
    .btn_box(v-if="productInfo.state == 5")
      .state_5
        p.blue 完工入库
    .tip_box(v-if="productInfo.state === 3")
      p 仓库物料不足，已发送采购申请，暂时无法生成备料单
</template>

<script>
  import { ProductTaskSplit } from '_api/product/'
  export default {
    components: {},
    data() {
      return {
        taskDetailData: {},
        productInfo: {},
        materialList: {},
      }
    },
    computed: {},
    filters: {
      productTaskItemState(val) {
        let state = ''
        switch (Number(val)) {
          case 1:
            state = '待备料'
            break
          case 2:
            state = '待拆单'
            break
          case 3:
            state = '物料不足'
            break
          case 4:
            state = '待领料'
            break
          case 5:
            state = '生产中'
            break
          case 6:
            state = '未入库'
            break
          case 7:
            state = '已入库'
            break
          default:
            state = ''
        }
        return state
      }
    },
    mounted() {
      this.getProductTaskDetail()
    },
    methods: {
      getProductTaskDetail() {
        ProductTaskSplit({}, 'get', this.$route.query.id).then(res => {
          this.taskDetailData = res.data
          this.productInfo = this.taskDetailData.product_info
          this.materialList = this.taskDetailData.material_list
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .order_detail
    padding-bottom 62px
    &_item
      padding 18px
      margin-bottom 10px
      bgf()
      >.title
        display flex
        justify-content space-between
        font-size 15px
        p
          &.tips
            color #FF6868
          ftb()
          .icon
            display block
            wh 18px 18px
            margin-right 7px
          &:nth-of-type(2)
            fsc 14px #999
      >p
        fsc 13px #545454
        margin-top 10px
      >.content
        margin-top 15px
        padding 15px
        bg #E9F5FF
        border-radius 6px
        &.product
          .item
            ftb()
            justify-content space-between
            font-size 14px
            margin-top 15px
            &:nth-of-type(1)
              margin 0
            p
              &:nth-of-type(1)
                color #545454
              &:nth-of-type(2)
                color #999999
      .progress_list
        display flex
        flex-wrap nowrap
        flex-direction row
        overflow-x scroll
        overflow-y auto
        margin-top 5px
        &_item
          display flex
          flex-direction column
          position relative
          margin 10px
          width 420px
          box-shadow 0px 0px 10px 0px rgba(35,121,191,0.3)
          >.title
            width 420px
            padding 15px
            bg #E9F5FF
            display flex
            justify-content space-between
            font-size 15px
            p
              ftb()
              fsc 14px #545454
              .icon
                display block
                wh 18px 18px
                margin-right 7px
              &:nth-of-type(2)
                fsc 14px #999
          >.content
            padding 15px
            .card_top
              display flex
              flex-direction row
              justify-content space-between
              align-items center
              padding 18px 0
              .card_top_left
                font-size 14px
                span
                  font-size 16px
                  font-weight 600
            .card_middle
              display flex
              flex-direction column
              .card_middle_bar
                width 100%
                .progress
                  height 16px
                  background rgba(49,203,167,0.4)
                  .active
                    height 100%
                    background rgba(49,203,167,1)
              .card_middle_text
                display flex
                justify-content space-between
                margin 6px 0
                font-size 14px
              .add_schedule
                display flex
                flex-direction column
                justify-content center
                align-items center
                margin 30px 0
                img
                  width 74px
                  height 74px
                span
                  color #1E9AFF
            .card_bottom
              display flex
              flex-direction column
              margin-top 10px
              font-size 12px
              color #A1A1A1
              .card_bottom_item
                margin-bottom 10px
                span
                  padding 3px 4px
                  background #F0F1F6
                  border-radius 10px
                  margin-right 6px
    .btn_box
      position fixed
      bottom 0
      left 0
      bgf()
      wh 100% 62px
      padding 15px
      div
        display flex
        align-items center
        justify-content flex-end
        font-size 14px
        .tips
          flex 1
          fsc 13px #999999
          line-height 20px
        p
          padding 8px 17px
          border-radius 16px
          margin-left 15px
          &.blue
            border 1px solid #4DA8EE
            color #4DA8EE
          &.orange
            border 1px solid #F4616C
            color #F4616C
    .tip_box
      position fixed
      bottom 0
      left 0
      bgf()
      wh 100% 62px
      display flex
      align-items center
      justify-content center
      padding 15px
      fsc 13px #1E9AFF
  .about
    color: #000;
</style>

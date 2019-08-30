<template lang="pug">
  .order_detail.full_box
    .order_detail_item(v-if="taskState === 0")
      .title
        p.tips
          span.icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_tishi")
          | 提示
      p 1、拆单生产指的是将原生产单一分为二
      p 2、拆单后可优先生产物料库存足够的生产单
    .order_detail_item(v-if="taskState > 0" :style="{marginBottom:'0px'}")
      .title
        p
          span.icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_danhao")
          | 生产单号
        p {{$route.query.id}}
      .line
    .order_detail_item(v-if="taskState > 0")
      .title
        p
          span.icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_zhaungtai")
          | 生产状态
        p {{taskState | productTaskItemState}}
    .order_detail_item(v-if="taskState > 0" :style="{marginBottom:'0px'}")
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
          p {{parseFloat(productInfo.target).toFixed(2)}}{{productInfo.unit}}
      .line
    .order_detail_item(v-if="taskState > 4" :style="{marginBottom:'0px'}")
      .line
      .title
        p
          span.icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_jindu")
          | 生产进度
      .progress_list
        .progress_list_item(v-for="(item, idx) in taskProcess" :key="idx" @click="processClick(idx,item)")
          .title
            p
              span.icon
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconicon_gongxu")
              | 工序{{idx+1}}：{{item.name}}
            p {{item.creator}}
          .content
            .card_top
              .card_top_left 计划生产
                span {{parseFloat(productInfo.target).toFixed(2)}}
                | {{productInfo.unit}}
              .card_top_right
                vm-progress(type="circle" :width="40" stroke-width="2" stroke-color="#00CC66" :percentage="getProgress(item)")
            .card_middle
              .card_middle_bar
                .progress
                  .active(:style="{width: parseFloat((item.good/(item.good+item.ng))*100).toFixed(0) + '%'} || 0")
              .card_middle_text
                span(style="color: #31CBA7;") {{`生产合格产品：${item.good===undefined?'0':item.good}`}}
                span(style="color: #A1A1A1;") {{`不合格产品：${item.ng===undefined?'0':item.ng}`}}
            .card_bottom
              .card_bottom_item
                span {{item.start?`${getTimeString(item.start)} - ${getTimeString(item.end)}`:'0'}}
                span {{item.take_time||0}}小时
              .card-bottom-item {{`备注：${item.remark || ''}`}}
    .order_detail_item(v-if="taskState > 0")
      .title
        p
          span.icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_cailiao")
          | 所需物料
      .content.product
        .item(v-for="(item, idx) in materialList" :key="idx")
          p {{item.name}}
          p {{parseFloat(item.count).toFixed(2)}}
      .material_title(v-for="(item, idx) in supplementList" :key="item" @click="materialTitleClick(0,item)")
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_lianjie")
        span(class="title") {{`补料单：${item}`}}
      .material_title(v-for="item in returnList" :key="item" @click="materialTitleClick(1,item)")
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_lianjie")
        span(class="title") {{`退料单：${item}`}}
    .order_detail_item(v-if="taskState === 0")
      .title
        p
          span.icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_product")
          | 原生产单
      .content.product
        .item
          p 产品
          p {{productInfo.category_name}}：{{productInfo.product}}
        .item
          p 生产数量
          p {{parseFloat(taskSplitData.target).toFixed(2)}}{{productInfo.unit}}
        .item
          p 库存物料是否齐套
          p 否
    .order_detail_item(v-if="taskState === 0")
      .title
        p
          span.icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconicon_product")
          | 拆单后
      .content.product
        .title 生产单1
        .item
          p 产品
          p {{productInfo.category_name}}：{{productInfo.product}}
        .item
          p 生产数量
          p {{parseFloat(taskSplitData.split_count).toFixed(2)}}{{productInfo.unit}}
        .item
          p 库存物料是否齐套
          p 是
      .content.product
        .title 生产单2
        .item
          p 产品
          p {{productInfo.category_name}}：{{productInfo.product}}
        .item
          p 生产数量
          p {{parseFloat(taskSplitData.target - taskSplitData.split_count).toFixed(2) || 0}}{{productInfo.unit}}
        .item
          p 库存物料是否齐套
          p 否
    .btn_box(v-if="taskState == 2")
      .state_2
        .tips 仓库物料可齐套生产{{taskSplitData.split_count}}个产品，是否拆单生产
        p.blue(@click="getProductTaskSplit") 拆单生产
    .btn_box(v-if="taskState == 5")
      .state_5
        p.blue(@click="showDialog") 完工入库
    .tip_box(v-if="taskState == 3")
      p 仓库物料不足，已发送采购申请，暂时无法生成备料单
    .btn_box(v-if="taskState == 0")
      .state_0
        p.blue(@click="postProductTaskSplit") 确定拆单
</template>

<script>
  import { ProductTaskDetail, ProductTaskSplit, ProductTaskDone } from '_api/product/'
  import {getTimeString} from '_common/util'
  export default {
    components: {},
    data() {
      return {
        taskDetailData: {},
        taskSplitData: {},
        productInfo: {},
        materialList: {},
        taskProcess: {},
        taskState: -1,
        returnList: [],
        supplementList: [],
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
      ProductTaskSplit({}, 'get', this.$route.query.id).then(res => {
        this.taskSplitData = res.data
        // this.taskState = 0
      })
    },
    methods: {
      getTimeString,
      getProgress(item) {
        const result = item.good/(item.good+item.ng) * 100
        if(isNaN(result)) {
          return 0
        }
        return result
      },
      getProductTaskDetail() {
        ProductTaskDetail({}, 'get', this.$route.query.id).then(res => {
          this.taskDetailData = res.data
          this.productInfo = this.taskDetailData.product_info
          this.materialList = this.taskDetailData.material_list
          this.taskProcess = this.taskDetailData.process
          this.taskState = this.productInfo.state
          this.returnList = this.taskDetailData.related ? this.taskDetailData.related.return : []
          this.supplementList = this.taskDetailData.related ? this.taskDetailData.related.supplement : []
        })
      },
      getProductTaskSplit() {
        ProductTaskSplit({}, 'get', this.$route.query.id).then(res => {
          this.taskSplitData = res.data
          this.taskState = 0
        })
      },
      postProductTaskSplit() {
        ProductTaskSplit({
          target: this.taskSplitData.target,
          split_count: this.taskSplitData.split_count
        }, 'post', this.$route.query.id).then(res => {
          console.log(res)
          if (res.data.res === 0) {
            this.$toast('拆单成功')
            this.$router.go(-1)
          } else {
            this.$toast(res.errmsg)
          }
        })
      },
      postProductTaskDone() {
        ProductTaskDone({complete_count:this.taskDetailData.total_good}, 'post', this.$route.query.id).then(res => {
          if (res.data.res === 0) {
            this.$toast('入库成功')
            this.$router.go(-1)
          } else {
            this.$toast(res.errmsg)
          }
        })
      },
      processClick(idx,item) {
        this.$store.commit('product/Process_Data',{productName:this.productInfo.product, processName:item.name, target:this.productInfo.target})
        this.$router.push(`/product/task_detail/process_add?id=${this.$route.query.id}&step=${idx+1}`)
      },
      materialTitleClick(type,id) {
        // 0: 补料单 1：退料单
        if(type==0) {
          this.$router.push(`/product/supplement_list/order_detail?id=${id}`)
        } else {
          this.$router.push(`/product/return_list/order_detail?id=${id}&state=1`)
        }
      },
      showDialog(){
        let content ='',
            confirm = '',
            cancel='',
            onConfirm = ()=>{}
        // 0: 良品数量>=计划生产数量 1: 良品数<计划生产数 2: 一个良品都没有
        switch(this.taskDetailData.done_state) {
          case 1:
            content = '生产的合格产品数少于计划生产数量，是否设为完工入库'
            confirm = '完工入库'
            onConfirm = () => this.postProductTaskDone()
            cancel= '取消'
            break
          case 0:
            content = '确定将生产任务设为完工入库吗？'
            confirm = '完工入库'
            onConfirm = () => this.postProductTaskDone()
            cancel = '取消'
            break
          case 2:
            content = '生产的合格产品数为0，请先填写准确的生产数量再选择完工入库'
            confirm = '我知道了'
            break 
        }
        this.$createAppDialog({
          content: content,
          confirmText: confirm, 
          cancelText: cancel,
          onConfirm: onConfirm,
        }).show()

        // this.$createDialog({
        //   type: type,
        //   title: '',
        //   content: content,
        //   confirmBtn: {
        //     text: confirm,
        //     active: true,
        //     disabled: false,
        //     href: 'javascript:;',
        //   },
        //   cancelBtn: {
        //     text: '取消',
        //     active: false,
        //     disabled: false,
        //     href: 'javascript:;'
        //   },
        //   onConfirm: onConfirm
        // }).show()
      },
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
      position relative
      >.line
        position absolute
        height 1px
        flex 1
        width calc(100% - 36px) 
        bottom 0px
        background-color #eeeeee
        bottom 0px
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
      >.material_title
        margin-top 20px
        display flex
        flex-direction row
        align-items center
        .icon
          wh 15px 15px
          margin-right 7px
          display flex
          justify-content center
          align-items center
        .title
          color #1E9AFF
          font-size 14px
      >p
        fsc 13px #545454
        margin-top 10px
      >.content
        margin-top 15px
        padding 15px
        bg #E9F5FF
        border-radius 6px
        &.product
          >.title
            fsc 15px #545454
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
      border 1px #cccccc solid
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

<style lang="stylus">
  .cube-dialog-content
    margin 30px 0 28px 0
    .cube-dialog-content-def
      padding 0 20px
      line-height 20px
      p
        margin initial
        font-size 16px
        line-height 24px
        color #545454
  .cube-dialog-btns
    &:after
      border-right 0
    a:before
      border-top 0
    a:last-child
      color #0099FF
</style>

<template lang="pug">
  .industry_test(v-if="isLoad")
    .icon.mgauto(:class="showIndex === 7?'mgb': ''")
      img(:src="icon0", v-if="showIndex < 2")
      img(v-for="(item, idx) in testList", :src="item.icon", :key="idx", v-if="(idx+2)===showIndex")
    p.loading_text(v-if="showIndex === 7") 小D正在生成检测结果中...
    .content(v-if="showIndex!==7")
      p.title(v-if="showIndex === 0") 回答以下问题，小D将自动为你生成企业智能化 程度结果
      ul.list_box(v-if="showIndex === 0")
        li.item(v-for="(item, idx) in testList", :key="idx", v-if="idx<5")
          img(:src="item.icon")
          p {{item.title}}
      p.title(v-if="showIndex === 1") 填写公司名称
      input.w(placeholder="填写公司名称",v-if="showIndex === 1", v-model="name")
      .next_btn(v-if="showIndex === 1", @click="startBtnClick(1)") 下一步
      .answer(v-for="(item, idx) in testList", :key="idx", v-if="(idx+2)===showIndex&&showIndex < 7")
        p.title {{(idx +1) + '/5 ' + item.title}}
        p.question {{item.question}}
        .btn_box
          .btn(@click="answerBtnClick(idx, 0)") 否
          .btn(@click="answerBtnClick((idx + 1), 1)") 是
        .go_back(v-if="showIndex>2", @click="goBack") 上一篇
      .result_box(v-if="showIndex === 8")
        p.msg {{resultData.company_name}}智能化程度
        p.score {{resultData.score}}分
        p.info 超过了{{resultData.beyond * 100}}%的企业，还有继续提升的空间
        ul.list_box
          li.item(v-for="(item, idx) in testList", :key="idx", v-if="idx<5")
            img(:src="item.icon")
            p {{item.title}}
            .result
              .icon(v-if="resultData.intelligent_degree.indexOf((idx+1) + '') > -1")
                img(src="./yes.png")
              p(v-else) 待完善
        .next_btn(@click="toMore") 我想提升企业智能化
        .try_again(@click="resetTest") 重新测试
    .content.d_tips(v-for="(item, idx) in testList", :key="idx", v-if="(idx+2)===showIndex&&showIndex < 7")
      p.title
        img(src="./icon_d.png")
        span 小D提示
      .msg {{item.tips}}
    .start_btn(v-if="showIndex === 0", @click="startBtnClick(0)") 开始测试
    .tips(v-if="showIndex === 0||showIndex === 8") 测试结果仅供参考
</template>

<script>
  import icon0 from './icon_0.png'
  import icon1 from './icon_1.png'
  import icon2 from './icon_2.png'
  import icon3 from './icon_3.png'
  import icon4 from './icon_4.png'
  import icon5 from './icon_5.png'
  import icon6 from './icon_6.png'
  import icon7 from './icon_7.png'
  import { IndustryPlusScore } from '_api/industry/'
  export default {
    data() {
      return {
        icon0,
        testList: [
          {
            icon: icon1,
            title: '数据可视化',
            question: '企业的办公、生产数据能否在数据看板或手机APP中查看',
            tips: '数据可视化的最重要的好处是它能够帮助人们更快地理 解数据。在一个图表中突出显示一个大的数据量，人们 可以快速地发现关键点',
          },
          {
            icon: icon2,
            title: '数据分析',
            question: '企业的办公、生产数据是否使用数据分析工具，从多个 维度拆解、分析数据',
            tips: '数据分析的目的是把隐没在一大批看来杂乱无章的数据 中发现其内在规律。在工作中，数据分析可帮助人们作 出判断，以便采取适当行动',
          },
          {
            icon: icon3,
            title: '机器替代人工',
            question: '企业是否使用机器替代重复性高的工作，比如生产流程 中的产品质量检查',
            tips: '近些年来，高科技机器开始逐渐代替人工，机器代替人 工的好处显而易见：超高的效率、精准度和工作时长。 我们也应顺应时代的潮流，这样才不会被社会淘汰',
          },
          {
            icon: icon4,
            title: '机器远程控制',
            question: '企业是否使用手机、控制器等设备远程机器的运行或调 整机器参数',
            tips: '机器远程控制可以突破时间和空间的限制，让你可以更 高效、方便的管理。机器控制还能减轻了运维人员的负 担，为运维工作提供了更多的便利',
          },
          {
            icon: icon5,
            title: '智能预测、预警',
            question: '企业机器是否能根据历史数据或者数据波动而自动发出 预测或预警提示',
            tips: '通过大数据进行预测和预警，可以减少未来的不确定性 ，降低决策可能遇到的风险，使决策目标得以顺利实现',
          },
          {
            icon: icon6,
          },
          {
            icon: icon7,
          },
        ],
        showIndex: 0,
        name: '',
        answerArr: [],
        resultData: {},
        isLoad: false
      }
    },
    mounted() {
      this.getResult()
    },
    methods: {
      startBtnClick(idx) {
        if (idx === 1) {
          if (this.name === '') {
            this.$toast({message:'请输入公司名称！'})
            return
          }
        }
        this.showIndex++
      },
      getResult() {
        IndustryPlusScore({}, 'get').then(res => {
          this.resultData = res.data
          if (this.resultData.company_name) {
            this.showIndex = 8
          }
          this.isLoad = true
          // if (isFirst) {
          //   this.showIndex++
          // }
        })
      },
      answerBtnClick(idx, answer) {
        this.showIndex++
        if (answer === 1) {
          if (this.answerArr.indexOf(idx) > -1) {
            return
          }
          this.answerArr.push(idx + '')
        }
        if (this.showIndex === 7) {
          IndustryPlusScore({
            company_name: this.name,
            content_list: this.answerArr
          }, 'post').then(res => {
            // this.resultData = {...res.data,intelligent_degree: this.answerArr}
            // this.showIndex++
            if (res.data.res === 0) {
              //
              this.getResult()
            }
          })
        }
      },
      goBack() {
        if (this.answerArr.indexOf((this.showIndex - 2) + '') > -1) {
          this.answerArr.splice(this.answerArr.indexOf(this.showIndex - 2), 1)
        }
        this.showIndex--
      },
      resetTest() {
        this.showIndex = 0
        this.answerArr = []
      },
      toMore() {
        this.$router.replace('/industry/more')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .industry_test
    width 100%
    height 100%
    padding-top 1px
    overflow scroll
    >.icon
      width 78px
      height 72px
      margin-top 64px
      margin-bottom 54px
      img
        width 100%
      &.mgb
        margin-top 134px
    p.loading_text
      font-size 14px
      text-align center
    >.content
      margin 10px 10px 0
      padding 14px 10px
      background #FFF
      border-radius 10px
      p.title
        font-size 16px
        color #333333
      ul.list_box
        margin-top 16px
        li.item
          margin-top 16px
          display flex
          align-items center
          font-size 14px
          &:nth-of-type(1)
            margin-top 0
          img
            width 20px
            height 20px
            margin-right 8px
      input
        font-size 16px
        margin-top 30px
        padding 7px 0
        border-bottom 1px solid #EEEEEE
      .next_btn
        display flex
        align-items center
        justify-content center
        margin 38px 0 28px
        height 46px
        border-radius 24px
        background #007AFF
        color #FFF
        font-size 16px
      .answer
        p.question
          font-size 14px
          margin-top 24px
          margin-bottom 40px
        .btn_box
          display flex
          margin-bottom 40px
        .go_back
          color #007AFF
          font-size 14px
          text-align center
        .btn
          flex 1
          height 46px
          display flex
          align-items center
          justify-content center
          border-radius 24px
          background #007AFF
          color #FFF
          font-size 16px
          &:nth-of-type(1)
            margin-right 20px
      >.result_box
        p
          text-align center
          &.msg
            font-size 14px
            color #333333
          &.score
            font-size 24px
            color #FF6602
            margin-top 10px
          &.info
            color #A1A1A1
            font-size 12px
        ul.list_box
          margin-top 16px
          li.item
            margin-top 16px
            display flex
            align-items center
            font-size 14px
            &:nth-of-type(1)
              margin-top 0
            img
              width 20px
              height 20px
              margin-right 8px
            >p
              flex 1
              text-align left
            .result
              >p
                color #FB371D
        .try_again
          color #007AFF
          font-size 12px
          text-align center
    >.start_btn
      display flex
      align-items center
      justify-content center
      margin 38px 16px 28px
      height 46px
      border-radius 24px
      background #007AFF
      color #FFF
      font-size 16px
    >.tips
      color #A1A1A1
      font-size 12px
      text-align center
      margin-top 9px
    >.d_tips
      p.title
        display flex
        img
          width 20px
          height 20px
          margin-right 10px
      .msg
        color #000
        font-size 14px
        margin-top 16px
</style>


<template lang="pug">
  .main
    .product-content
      .product-title-content
        .product-icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconicon_product')
        span(class="product-title") {{processData.productName}}

    .product-content
      .product-title-content
        .product-icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#icongongxu1')
        span(class="product-title") 工序
        span(class="product-subtitle") {{processData.processName}}
    
    .product-content(:style="{paddingBottom:'0px'}")
      .product-title-content
        .product-icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconicon_time')
        span(class="product-title") 时间
      .product-input-content(@click="shwoBeginDatePicker()" :style="{marginTop:'5px'}")
        span(class="product-title") 开始时间
        span(class="product-subtitle") {{process.start?getYMDHMDateString(process.start):"请选择开始时间"}}

      .product-input-content(@click="showEndDatePicker()")
        span(class="product-title") 结束时间
        span(class="product-subtitle") {{process.end?getYMDHMDateString(process.end):"请选择结束时间"}}
      .product-input-content
        span(class="product-title") 生产总耗时
        span(class="product-minntitle") (单位小时)
        input(class="product-input" placeholder="请输入生产总耗时" v-model="process.take_time")


    .product-content(:style="{paddingBottom:'0px'}")
      .product-title-content
        .product-icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconshumu')
        span(class="product-title") 生产数
      .product-input-content(:style="{marginTop:'5px'}")
        span(class="product-title") 生产合格产品数
        input(class="product-input" placeholder="请输入合格产品数" v-model="process.good")
      .product-input-content
        span(class="product-title") 生产不合格产品数
        input(class="product-input" placeholder="请输入不合格产品数" v-model="process.ng")
      
      
    .product-content
      .product-title-content
        .product-icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href='#iconicon_remarks')
        span(class="product-title") 备注
      .product-item-content
        input(class="remark-input" placeholder="请输入备注" v-model="process.remark") 

    .edit-content
      .delete-btn(@click="deleteClick")
        span(class="delete-title") 删除
      .save-btn(@click="saveClick")
        span(class="save-title") 保存

        
</template>

<script>
import {getYMDHMDateString} from '_common/util'
import { ProductProcessDetail } from '_api/product'
import { mapState } from 'vuex';
export default {
  
  data() {
    return {
      process: {},
      requestMethod: '',  // post：新增 put：修改
    }
  },
  computed: {
    ...mapState('product', {
      processData: state=>state.processData
    }),
    requestPath() {
      return `${this.$route.query.id}/${this.$route.query.step}`
    }
  },
  mounted() {
    this.getProcess()
  },
  methods: {
    getYMDHMDateString,
    getProcess() {
      ProductProcessDetail({},'get',this.requestPath).then(res=>{
        const { data } = res
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.requestMethod = Object.values(data).length>0?'put':'post'
          this.process = data
        }
      })
    },
    shwoBeginDatePicker() {
      if (!this.dateTimePicker) {
        this.dateBeginPicker = this.$createDatePicker({
          title: '请选择开始时间',
          min: new Date(2008, 7, 8, 8, 0),
          max: new Date(2020, 9, 20, 20, 59),
          value: new Date(),
          columnCount: 5,
          onSelect: (date,selectedVal,selectedText) => this.selectHandle(date,selectedVal,selectedText,0),
        })
      }
      this.dateBeginPicker.show()
    },
    showEndDatePicker() {
      if (!this.dateTimePicker) {
        this.dateEndPicker = this.$createDatePicker({
          title: '请选择结束时间',
          min: new Date(2008, 7, 8, 8, 0),
          max: new Date(2020, 9, 20, 20, 59),
          value: new Date(),
          columnCount: 5,
          onSelect:(date,selectedVal,selectedText) => this.selectHandle(date,selectedVal,selectedText,1),
        })
      }
      this.dateEndPicker.show()
    },
    selectHandle(date,selectedVal,selectedText,type) {
      const time = date.getTime()/1000
      if(type==0) { // 开始时间
        this.process = {...this.process, start: time}
      } else {  // 结束时间
        this.process = {...this.process, end: time}
      }
      // 计算耗时
      // if(this.process.start&&this.process.end) {
      //   const timeStmp = this.process.end - this.process.start
      //   const hours = (timeStmp/(3600))
      //   console.log('lch--22--', hours, timeStmp)
      //   this.process.take_time = hours
      // }
    },
    saveClick() {
      ProductProcessDetail(this.process,this.requestMethod,this.requestPath).then( res => {
        const { data } = res
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.$router.go(-1)
        }
      })
    },
    deleteClick() {
      ProductProcessDetail({}, 'delete', this.requestPath).then(res => {
        const { data } = res
        if(data.errmsg) {
          this.$toast(data.errmsg)
        } else {
          this.$router.go(-1)
        }
      })
    }
  },
}
</script>

<style lang="stylus" scoped>
  .main
    width 100%
    height 100%
    padding-bottom 72px
    background-color #E6EAED
    overflow-y scroll
    .product-content
      background-color #ffffff
      padding 15px
      margin-top 10px
      .product-title-content
        display flex
        flex-direction row
        align-items center
        width 100%
        position relative
        .product-icon
          width 20px
          height 18px
          display flex
          align-items center
          justify-content center
      .product-title
        title()
        margin-left 5px
      .product-subtitle
        subtitle()
        position absolute
        right 15px
        width 70%
        text-align right
        single-text()
      .product-minntitle
        minititle()
      .product-input-content
        height 45px
        width 100%
        display flex
        flex-direction row
        align-items center
        border-bottom 1px solid #dddddd
        
        .product-input
          position absolute
          right 10px
          width 40%
          text-align right
          subtitle()
      .product-item-content
        margin-top 15px
        background-color #E9F5FF
        padding 15px
        display flex
        flex-direction column
        border-radius 6px
        .row-content
          display flex
          flex-direction row
          justify-content space-between
          align-items center
          margin-top 15px
        .item-title
          title()
          margin-top 5px
        .item-subtitle
          subtitle()
          margin-top 5px
        .item-minititle
          minititle()
          margin-top 5px
        .remark-input
          flex 1
          font-size 14px
          color #545454
          background-color #E9F5FF
          margin-left 5px
    .add-content
      height 62px
      width 100%
      background-color #ffffff
      position fixed
      bottom 0px
      border-top 1px solid #EFEFEF
      .add-process
        position absolute
        right 15px
        top 15px
        display flex
        justify-content center
        align-items center
        background-color #1E9AFF
        border-radius 16px
        height 32px
        width 120px
        .confirm-icon
          width 16px
          height 16px
          display flex
          align-items center
          justify-content center
          color #ffffff
        span 
          color #ffffff
          margin-top 2px
          font-size 14px
          margin-left 5px
    .edit-content
      position fixed
      bottom 0px
      left 0px
      width 100%
      height 52px
      background-color #ffffff
      display flex
      align-items center
      .delete-btn
        height 32px
        width 92px
        border 1px solid #999999
        border-radius 16px
        display flex
        justify-content center
        align-items center
        position absolute
        right 132px
        .delete-title
          font-size 14px
          color #999999
      .save-btn
        height 32px
        width 92px
        border-radius 16px
        display flex
        justify-content center
        align-items center
        background-color #1E9AFF
        position absolute
        right 20px
        .save-title
          font-size 14px
          color #ffffff

    
</style>



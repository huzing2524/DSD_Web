<template lang="pug">
  .storage_detail.full_box
    .storage_info
      .item_info
        span {{listItem.category}}：{{listItem.name}}
        p 编号：{{listItem.id}}
      .item_storage
        span 可用库存：{{listItem.available}}{{listItem.unit}}
        p 实际库存：{{listItem.actual}}{{listItem.unit}}
        p 在途库存：{{listItem.on_road}}{{listItem.unit}}
        p 预分配库存：{{listItem.prepared}}{{listItem.unit}}
        p 安全库存：{{listItem.safety}}{{listItem.unit}}
      .item_option(@click="toCheckClick") 库存盘点
    .storage_list
      .nav_options
        .option(:class="activedIndex===0?'selected':''" @click="changeTypeClick(0)") 周
        .option(:class="activedIndex===1?'selected':''" @click="changeTypeClick(1)") 月
        .option(:class="activedIndex===2?'selected':''" @click="changeTypeClick(2)") 年
      .list_box(v-for="(item,index) in materialTypeData.data" :key="index")
        .top(@click="item.flag=!item.flag")
          .left
            .date(v-if="activedIndex===0")
              span {{item.mon_or_week}}周
              p {{item.startDate | timeYearMonthFilter}}-{{item.endDate | timeYearMonthFilter}}
            .date(v-else-if="activedIndex===1")
              span {{item.mon_or_week}}月
              p {{item.year}} 年
            .date(v-else)
              span {{item.year}} 年
              p
            .number
              p 出库：{{item.out}}{{listItem.unit}}
              p 入库：{{item.in}}{{listItem.unit}}
          img(v-if="item.flag" src="./arrow_top.png")
          img(src="./arrow_down.png" v-else)
        .content(v-show="item.flag")
          .list_item(v-for="(items,idx) in item.history" :key="idx" @click="toDetailClick(items)")
            .left
              .icon(v-show="items.parent_type==='物料入库'")
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconicon_ruku")
              .icon(v-show="items.parent_type==='库存盘点'")
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconicon_chuku")
              .icon(v-show="items.parent_type==='物料出库'")
                svg.ali_icon(aria-hidden="true")
                  use(xlink:href="#iconicon_churuku")
              .kind
                span {{items.parent_type}}
                p {{items.time | timeMDHMFilter}}
            .right {{items.count}}{{listItem.unit}}
    .input_box(v-if="popupVisible" @click="toCloseClick")
      .content(@click.stop="()=>{}")
        .box_top
          .name
            span {{listItem.category}}：{{listItem.name}}
            img(src="./icon_cancle.png" @click="toCloseClick")
          .value 实际库存：{{listItem.actual}}{{listItem.unit}}
          input(type="number" placeholder="填写盘点后库存" v-model="listItem.update")
        .box_button
          button(@click="toNext") 下一步
</template>

<script>
  import { StoreStorageDetail } from '_api/store/'
  import {mapState,mapActions} from 'vuex'
  export default {
    data( ){
      return {
        isLoad:false,
        id:'',
        weekData:null,
        monthData:null,
        yearData:null,
        clickIndex: 0,
        activedIndex: 0,
        popupVisible:false,
        listItem:{},
        materialTypeData:{}
      }
    },
    computed: {
      ...mapState('store', {
        storeSub: state => state.storeSub
      })
    },
    mounted() {
      this.initData()
    },
    methods: {
      ...mapActions('store', [
        'updateStoreSub'
      ]),
      initData(){
        this.id = this.$route.query.id || ''
        this.getMaterialTypeData()
      },
      getMaterialTypeData(){
        let date  = ''
        if(this.activedIndex === 0){//按周
          date  = '3'
        }else if(this.activedIndex === 1){//按月
          date  = '1'
        }else if(this.activedIndex === 2){//按年
          date  = '2'
        }
        StoreStorageDetail({id:this.id,date:date},'get','material').then((res) => {
          this.listItem = res.data
          if(date  === '3'){
            this.weekData = res.data;
            this.weekData.data.forEach((dataItem) => {
              let year = dataItem.year;
              let week = dataItem.mon_or_week;
              let {startDate,endDate} = this.confirmWeekRange(year,week);
              dataItem.startDate = startDate;
              dataItem.endDate = endDate;
            });
            this.materialTypeData = this.weekData;
          }else if(date  === '1'){
            this.materialTypeData =this.monthData = res.data;
          } else if(date  === '2') {
            this.materialTypeData =this.yearData = res.data;
          }
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      toCheckClick(){
        this.popupVisible = true
      },
      toCloseClick(){
        this.popupVisible = false
      },
      toDetailClick(items){
        if(items.parent_type==='物料入库'){
          this.$router.push(`/store/purchase_warehousing/detail?id=${items.source_id}`)
        }else if(items.parent_type==='物料出库'){
          this.$router.push(`/store/picking_order/detail?id=${items.source_id}`)
        }else {
          this.$router.push(`/store/storage_check/detail?id=${items.source_id}`)
        }
      },
      changeTypeClick(index){
        this.activedIndex = index;
        if(this.activedIndex === 0 && this.weekData){
          this.materialTypeData = this.weekData;
        }else if(this.activedIndex === 1 && this.monthData){
          this.materialTypeData = this.monthData;
        }else if(this.activedIndex === 2 && this.yearData){
          this.materialTypeData = this.yearData;
        }else {
          this.getMaterialTypeData();
        }
      },
      confirmWeekRange(year,week) {
        let d = new Date(year, 0, 1);
        while (d.getDay() != 1) {
          d.setDate(d.getDate() + 1);
        }
        let startDate = new Date(d.valueOf());
        startDate.setDate(startDate.getDate() + (week-1)*7);
        startDate = Math.floor((startDate.getTime())/1000);
        let endDate = new Date(d.valueOf());
        endDate.setDate(endDate.getDate() + (week-1)*7+6);
        endDate = Math.floor((endDate.getTime())/1000);
        return {startDate:startDate,endDate:endDate};
      },
      toNext(){
        if(!this.listItem.update || parseInt(this.listItem.update)<0){
          this.$toast('请填写正确的盘点后库存')
          return
        }
        this.storeSub.storageDetail = {
          id: this.listItem.id,
          category: this.listItem.category,
          name: this.listItem.name,
          unit: this.listItem.unit,
          actual: this.listItem.actual,
          update: this.listItem.update,
        }
        this.$router.push(`/store/storage_list/detail/check?type=material`)
      },
    },
  }
</script>

<style scoped lang="stylus">
  .storage_detail
    background #E6EAED
    .storage_info
      display flex
      flex-direction column
      background #fff
      padding-top 20px
      margin-bottom 10px
      .item_info
        display flex
        flex-direction column
        padding 0 15px
        span
          fsc(14px,#545454)
          margin-bottom 4px
        p
          fsc(12px,#999999)
      .item_storage
        display flex
        flex-direction column
        padding 20px 15px
        span
          fsc(14px,#545454)
          margin-bottom 4px
        p
          fsc(12px,#999999)
          margin 4px 0
      .item_option
        display flex
        flex-direction row
        justify-content center
        padding 15px 0
        border-top 1px solid #E4E4E4
        fsc(14px,#1E9AFF)
    .storage_list
      display flex
      flex-direction column
      background #fff
      .nav_options
        width 100%
        display flex
        flex-direction row
        justify-content space-around
        align-items center
        height 50px
        border-bottom 1px solid #E4E4E4
        .option
          width 40px
          height 50px
          line-height 50px
          text-align center
          fsc(15px,#545454)
          &.selected
            color #1E9AFF
            border-bottom 2px solid #1E9AFF
      .list_box
        display flex
        flex-direction column
        .top
          display flex
          flex-direction row
          justify-content space-between
          align-items center
          padding 15px
          background #F5FAFF
          .left
            display flex
            flex-direction row
            align-items center
            .date
              display flex
              flex-direction column
              margin-right 20px
              span
                fsc(20px,#545454)
              p
                fsc(15px,#999999)
            .number
              display flex
              flex-direction column
              p
                fsc(14px,#999999)
                margin 2px 0
          img
            wh(16px,8px)
        .content
          display flex
          flex-direction column
          padding 15px 15px 0
          .list_item
            display flex
            flex-direction row
            justify-content space-between
            align-items center
            margin-bottom 15px
            .left
              display flex
              flex-direction row
              align-items center
              .icon
                wh(38px,38px)
                margin-right 10px
              .kind
                display flex
                flex-direction column
                span
                  fsc(14px,#545454)
                  margin-bottom 4px
                p
                  fsc(12px,#999999)
            .right
              fsc(14px,#545454)
    .input_box
      position fixed
      top 0
      z-index 2
      width 100%
      height 100%
      background rgba(0, 0, 0, .5)
      .content
        position absolute
        bottom 0
        left 0
        bgf()
        width 100%
        padding 20px
        .box_top
          display flex
          flex-direction column
          .name
            display flex
            flex-direction row
            justify-content space-between
            align-items center
            span
              fsc 14px #545454
            img
              wh 18px 18px
          .value
            fsc 14px #999999
            padding 6px 0
          input
            fsc 14px #545454
            padding 16px 0 10px
            border-bottom 1px solid #eeeeee
        .box_button
          display flex
          flex-direction row
          button
            width 100%
            height 44px
            align-items center
            justify-content center
            fsc 15px #fff
            background #1E9AFF
            margin-top 20px
            border-radius 22px
            border 0
</style>

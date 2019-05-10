<template lang="pug">
  .select
    .select_data
      .select_list
        .list_item(v-for="(item,index) in meterialList" :key="index")
          .item_title(v-if="item.name") {{item.name}}
          .item_content
            .item(v-for="(items,idx) in item.list" :key="idx" @click="confirmProducts(items)")
              span {{items.name}}
              p(v-if="items.dealInfo.num>0") {{items.dealInfo.num}}
    .select_option
      .car(@click="toggleShowSelectedBox")
        img(src="./icon_wuse.png")
        .car_point
          p( v-if="materialBag.num>0") {{materialBag.num}}
      .next(@click="toNext") 下一步
    .input_box(v-if="isShowInputBox" @click="toggleShowInputBox")
      .content(@click.stop="()=>{}")
        .close_btns
          .close_btn
            img(src="./icon_down.png", @click="toggleShowInputBox")
          .clear_btn
            .box(@click="removeMaterial")
              img(src="./icon_clear.png")
              span 清空
        .name {{activeItem.name}}
        .item
          p 数量
          input(type="number" placeholder="填写数量" v-model="activeItem.dealInfo.num")
        .btn
          button(@click="addMaterial") 添加物料
    .deal_box(v-if="isShowSelectedBox" @click="toggleShowSelectedBox")
      .deal_option
        .car
          img(src="./icon_wuse.png")
          .car_point
            p( v-if="materialBag.num>0") {{materialBag.num}}
        .next(@click="toNext") 下一步
      .deal_list(@click.stop="()=>{}")
        .close_btns
          .close_btn
            img(src="./icon_down.png", @click="toggleShowSelectedBox")
          .clear_btn
            .box(@click="clearAll")
              img(src="./icon_clear.png")
              span 清空
        .content(v-for="(item,index) in this.meterialList" :key="index")
          .item(v-for="(items,idx) in item.list" :key="idx" v-show="items.dealInfo.isIn" @click.stop="confirmProducts(items,1)")
            .info
              span {{items.name}}
              p {{items.dealInfo.num}}
            img(src="./arrow_right.png")
</template>

<script>
  import {StoreMaterialList} from '_api/store/'
  import {mapState, mapActions} from 'vuex'
  export default {
  data( ){
      return {
        isLoad: false,
        meterialList: [],
        isShowInputBox: false,
        isShowSelectedBox: false,
        isOpenSelectedBox: false,
        activeItem: {},
        noCategoryory:[],
        categoryory:[],
        clearable:{
          visible: true,
          blurHidden: false
        },
        defultDealInfo: {
          isIn: false,
          num: '',
        },
        materialBag: {
          num: 0,
          list: []
        },
      }
    },
    created() {

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
        StoreMaterialList({category:'1'},'get').then((res) => {
          this.meterialList = res.data
          this.meterialList.forEach((item) => {
            item.list.forEach((items) => {
              if(this.storeSub.materialBag){
                this.storeSub.materialBag.list.forEach((itemss) => {
                  if(items.id === itemss.id){
                    items.isSelected = true
                    items.dealInfo = {...item.dealInfo, ...itemss.dealInfo}
                    // items.name = item.name
                  }else{
                    items.isSelected = false
                    items.dealInfo = this._.cloneDeep(this.defultDealInfo)
                    // items.name = item.name
                  }
                })
              }else {
                items.isSelected = false
                items.dealInfo = this._.cloneDeep(this.defultDealInfo)
                // items.name = item.name
              }
            })
          })
          this.isLoad = true
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      confirmProducts(item,isFromBag) {
        if (isFromBag) {
          this.isOpenSelectedBox = true
          this.toggleShowSelectedBox()
        } else {
          this.isOpenSelectedBox = false
        }
        this.activeItem = this._.cloneDeep(item)
        this.toggleShowInputBox()
      },
      toggleShowInputBox() {
        if (this.isShowInputBox && this.isOpenSelectedBox) {
          this.toggleShowSelectedBox()
        }
        this.isShowInputBox = !this.isShowInputBox
      },
      toggleShowSelectedBox() {
        if (!this.isShowSelectedBox) {
          if (this.materialBag.num <= 0) {
            return
          }
        }
        this.isShowSelectedBox = !this.isShowSelectedBox
      },
      getVanResult() {
        this.materialBag = {
          num: 0,
          list: []
        }
        this.meterialList.forEach(item => {
          item.list.forEach(items => {
            if (items.dealInfo.isIn === true) {
              this.materialBag.num += Number(items.dealInfo.num)
              this.materialBag.list.push(items)
            }
          })
        })
        this.updateStoreSub({
          materialBag: this.materialBag
        })
      },
      removeMaterial(){
        this.materialBag.num = 0
        this.meterialList.forEach(item => {
          item.list.forEach(items => {
            if (items.id === this.activeItem.id) {
              items.dealInfo = this._.cloneDeep(this.defultDealInfo)
              items.dealInfo.isIn = false
            }
          })
        })
        this.getVanResult()
        this.toggleShowInputBox()
        this.updateStoreSub({
          originData: this.meterialList
        })
      },
      addMaterial(){
        this.materialBag.num = 0
        if (!this.activeItem.dealInfo.num) {
          this.$toast('请填写数量');
          return;
        }
        this.meterialList.forEach((item) => {
          item.list.forEach(items => {
            if (items.id === this.activeItem.id) {
              items.dealInfo = this._.cloneDeep(this.activeItem.dealInfo)
              items.dealInfo.isIn = true
            }
          })
        })
        this.getVanResult()
        this.toggleShowInputBox()
        this.updateStoreSub({
          originData: this.meterialList
        })
      },
      clearAll(){
        this.materialBag.num = 0
        this.meterialList.forEach((item) => {
          item.list.forEach(items => {
              items.dealInfo = this._.cloneDeep(this.defultDealInfo)
              items.dealInfo.isIn = false
          })
        })
        this.toggleShowSelectedBox()
      },
      toNext(){
        if (this.materialBag.num <= 0) {
          this.$toast('请添至少选择一种产品')
          return
        }
        this.$router.push(`/store/purchase_apply/success`)
      }
    },
  }
</script>

<style scoped lang="stylus">
  .select
    width 100%
    height 100%
    display flex
    flex-direction column
    .select_data
      flex 1
      overflow scroll
      .select_list
        flex-direction column
        padding 20px 10px
        .list_item
          display flex
          flex-direction column
          margin-bottom 10px
          .item_title
            fsc(15px,#545454)
            margin-bottom 10px
          .item_content
            .item
              display flex
              flex-direction row
              bgf()
              padding 15px
              margin-bottom 10px
              border-radius 6px
              justify-content space-between
              span
                fsc(14px,#545454)
              p
                background #FF4452
                padding 1px 4px
                border-radius 20px
                color #FFF
                font-size 12px
                font-weight 200
    .select_option
      display flex
      position relative
      width 100%
      height 52px
      justify-content space-between
      align-items center
      bgf()
      .car
        display flex
        flex-direction row
        margin-left 10px
        position relative
        img
          wh(36px,28px)
        .car_point
          position absolute
          right -10px
          top -5px
          max-height 20px
          display flex
          p
            background #FF4452
            padding 1px 4px
            border-radius 20px
            color #FFF
            font-size 12px
            font-weight 200
      .next
        display flex
        justify-content center
        align-items center
        wh(100px,32px)
        fsc(14px,#fff)
        background #1E9AFF
        margin-right 15px
        border-radius 16px
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
        .close_btns
          display flex
          flex-direction row
          height 34px
          align-items center
          background #F0F8FF
          .close_btn
            display flex
            justify-content flex-end
            flex 1
            img
              wh(14px,14px)
          .clear_btn
            display flex
            flex 1
            justify-content flex-end
            align-items center
            margin-right 15px
            .box
              display flex
              flex-direction row
              justify-items center
              img
                wh(16px,16px)
                margin-right 5px
              span
                fsc(12px,#A1A1A1)
        .name
          padding 15px
          fsc(15px,#545454)
        .item
          display flex
          flex-direction row
          align-items center
          padding 0 15px 10px
          border-bottom 1px solid #EFEFEF
          p
            fsc(14px,#545454)
          input
            flex 1
            text-align right
            fsc(14px,#A1A1A1)
        .btn
          padding 20px
          display flex
          justify-content flex-end
          button
            wh(100px,32px)
            background #1E9AFF
            fsc(14px,#fff)
            border 0
            outline  0
            border-radius 16px
    .deal_box
      width 100%
      position fixed
      top 0
      z-index 2
      width 100%
      height 100%
      background rgba(0, 0, 0, .5)
      .deal_option
        display flex
        position fixed
        bottom 0
        width 100%
        height 52px
        justify-content space-between
        align-items center
        bgf()
        .car
          display flex
          flex-direction row
          margin-left 10px
          position relative
          img
            wh(36px,28px)
          .car_point
            position absolute
            right -10px
            top -5px
            /*width 500%*/
            max-height 20px
            display flex
            p
              background #FF4452
              padding 1px 4px
              border-radius 20px
              color #FFF
              font-size 12px
              font-weight 200
        .next
          display flex
          justify-content center
          align-items center
          wh(100px,32px)
          fsc(14px,#fff)
          background #1E9AFF
          margin-right 15px
          border-radius 16px
      .deal_list
        width 100%
        position absolute
        bgf()
        left 0
        bottom 52px
        .close_btns
          display flex
          flex-direction row
          height 34px
          align-items center
          background #F0F8FF
          .close_btn
            display flex
            justify-content flex-end
            flex 1
            img
              wh(14px,14px)
          .clear_btn
            display flex
            flex 1
            justify-content flex-end
            align-items center
            margin-right 15px
            .box
              display flex
              flex-direction row
              align-items center
              img
                wh(16px,16px)
                margin-right 5px
              span
                fsc(12px,#A1A1A1)
        .content
          display flex
          flex-direction column
          .item
            display flex
            flex-direction row
            justify-content space-between
            align-items center
            padding 20px 15px 20px 10px
            border-bottom 1px solid #EFEFEF
            .info
              display flex
              flex-direction column
              span
                fsc(14px,#545454)
                font-weight 500
                margin-bottom 6px
              p
                fsc(12px,#545454)
            img
              wh(8px,16px)
</style>

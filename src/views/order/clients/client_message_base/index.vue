<!--客户基本信息创建或者修改-->
<template lang="pug">
  .main
    div(v-doc-title="doctitle")
    .item.ten_margin_bottom
      .input_box
        p 客户名称
        input(placeholder="填写客户名称",v-model="data.name")
    .item.ten_margin_bottom
      .input_box(@click="chooiceAddress")
        p 客户地址
        .right
          input(placeholder="选择地址",v-model="data.region",readonly)
          img(src="./arrow_right.png")
      .input_box
        p 详细地址
        input(placeholder="填写详细地址",v-model="data.address")
      .input_box
        p 送达天数
        input(placeholder="填写送达天数",v-model="data.deliver_days", v-only-input-number)
    .item.ten_margin_bottom
      .input_box(@click="chooiceIndustry")
        p 所属行业
        .right
          input(placeholder="选择行业",v-model="data.industry",readonly)
          img(src="./arrow_right.png")
    .item.ten_margin_bottom
      .input_box
        p 联系人
        input(placeholder="填写联系人",v-model="data.contact")
      .input_box
        p 联系电话
        input(id="phone" placeholder="填写联系电话",v-model="data.phone" type="number" maxlength="11")
      .input_box
        p 职位
        input(placeholder="填写职位",v-model="data.position")
    .position
      span(:class="selectedIndex===0?'active':'' ?'active':''", @click="confirmPosition('销售经理'),selectedIndex=0") 销售经理
      span(:class="selectedIndex===1?'active':'' ?'active':''", @click="confirmPosition('老板'),selectedIndex=1") 老板
    .save
      button(@click="goNext") 下一步
</template>

<script>
  import {provinceList, cityList, areaList} from "_common/area";
  import {company_category} from "_common/company_category";
  import {mapActions, mapState} from "vuex";

  const addressData = provinceList
  addressData.forEach(province => {
    province.children = cityList[province.value]
    province.children.forEach(city => {
      city.children = areaList[city.value]
    })
  })
  const industryData = company_category
  export default {
    data() {
      return {
        doctitle: '',
        type: '',
        id: '',
        selectAddressPosition: [],
        selectIndustryPosition: [],
        data: {
          name: '',
          contact: '',
          phone: '',
          position: '销售经理',
          industry: '',
          region:'',
          address: '',
          deliver_days: null,
          products: [],
        },
        selectedIndex: -1,
      }
    },
    computed: {
      ...mapState('order', {
        getData: state => state.orderClientsMessage
      }),
      ...mapState({
        phoneReg: state => state.phoneReg
      }),
    },
    mounted(){
      this.type = this.$route.query.type
      this.id = this.$route.query.id
      if(this.type === 'edit' || this.type === 'add') {
        this.doctitle = '编辑客户'
        this.data = this.getData
        switch (this.data.position) {
          case "销售经理":
            this.selectedIndex = 0
            break;
          case "老板":
            this.selectedIndex = 1
            break;
          default:
            this.selectedIndex = -1
            break;
        }
        this.getAddressPosition()
        this.getIndustryPosition()
      } else {
        this.doctitle = '创建客户'
        this.selectedIndex = 0
      }
      this.addressPicker = this.$createCascadePicker({
        title: '选择地址',
        data: addressData,
        selectedIndex: this.selectAddressPosition,
        onSelect: this.selectAddress,
        onCancel: this.cancelHandle
      })
      this.industryPicker = this.$createPicker({
        title: '选择行业',
        data: [industryData],
        selectedIndex: this.selectIndustryPosition,
        onSelect: this.selectIndustry,
        onCancel: this.cancelHandle
      })
    },
    methods: {
      ...mapActions('order', [
        'updateOrderClientMessage'
      ]),
      confirmPosition(position){// 选择职位
        this.data = {...this.data,position:position};
      },
      chooiceIndustry() {// 选择行业
        this.industryPicker.show()
      },
      selectIndustry(selectedVal, selectedIndex, selectedText) { //选择行业的回调
        this.selectedIndustryText = selectedText.join('')
        this.data = {...this.data,industry:this.selectedIndustryText}
      },
      chooiceAddress() {//选择地址
        this.addressPicker.show()
      },
      selectAddress(selectedVal, selectedIndex, selectedText) {//选择地址的回调
        this.selectedAddressText = selectedText.join('')
        this.data = {...this.data,region:this.selectedAddressText}
      },
      // 如果是编辑界面，则需要获取当前所在省，市，区对应的position去初始化addressPicker
      getAddressPosition() {
        let pNum = 0,cNum = 0, aNum = 0
        if(null != this.data && null != this.data.region){
          // 获取已经选择的地址位置
          for(let i = 0; i < provinceList.length; i++) {
            if(this.data.region.indexOf(provinceList[i].text)!=-1) {
              pNum = i
              let pCityList =  cityList[provinceList[i].value]
              for(let j = 0; j < pCityList.length; j++) {
                if(this.data.region.indexOf(pCityList[j].text)!= -1) {
                  cNum = j
                  let cAreaList = areaList[pCityList[j].value]
                  for(let k = 0; k < cAreaList.length; k++) {
                    if(this.data.region.indexOf(cAreaList[k].text)!= -1) {
                      aNum = k
                      break;
                    }
                  }
                }
                break;
              }
              break;
            }
          }
          this.selectAddressPosition = [pNum, cNum, aNum]
        }
      },
      // 如果是编辑界面，则需要获取当前所属行业的position给industryPicker赋值
      getIndustryPosition() {
        if(null != this.data && null != this.data.industry){
          console.log("this.data.industry="+this.data.industry)
          for(var i = 0; i < industryData.length; i++) {
            // console.log(industryData[i].text)
            if(this.data.industry.indexOf(industryData[i].text) != -1) {
              this.selectIndustryPosition = [i]
              console.log("industryData[i].text"+industryData[i].text+",i="+i)
              break;
            }
          }
        }
      },
      goNext() {
        let {name,contact, phone,position,industry,region,address,deliver_days} = this.data;
        if(!name || !contact || !phone || !position || !industry || !region || !address){
          this.$toast('请完善信息再提交')
          return
        }
        if (!this.phoneReg.test(this.data.phone)) {
          this.$toast("请输入正确的手机号")
          return false
        }
        if(Number(deliver_days) === 0) {
          this.$toast("送达天数应该大于0天")
          return;
        }
        this.data.deliver_days = Number(deliver_days)
        this.updateOrderClientMessage({
          ...this.data
        })
        // if(null != this.type) {
          this.$router.push(`/order/clients/client_products/?id=${this.id}&type=${this.type}`)
        // } else {
        //   this.$router.push(`/order/clients/client_products/`)
        // }
      }


    },
  }
</script>

<style lang="stylus" scoped>
  row()
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    padding 12px 10px
  .main
    width 100%
    height 100%
    background-color #E6EAED
    display flex
    flex-direction column
    .item
      bgf()
      margin-top 10px
      .input_box
        align-items center
        row()
        border-bottom 1px solid #EEEEEE
        &:last-child
          border-bottom 0
        p
          display flex
          fsc(14px, #333333)
          margin-right 10px
          align-items center
          font-weight bold
          line-height 20px
        input
          fsc(14px, #999999)
          text-align right
          flex 1
          line-height 20px
        .right
          display flex
          flex 1
          flex-direction row
          align-items center
          input
            display flex
            flex 1
            fsc(14px, #999999)
          img
            wh 5px 10px
            margin-left 7px
            display flex
    .position
      display flex
      justify-content flex-end
      padding-right 10px
      span
        align-items center
        margin-left 10px
        border-radius 4px
        border 1px solid #999999
        fsc(12px, #999999)
        padding 5px 10px
        margin-top 12px
        &.active
          border 1px solid #1E9AFF
          color #1E9AFF
    .save
      width 100%
      bgf()
      position fixed
      bottom 0
      wh 100% 52px
      font-size 14px
      padding 12px
      display flex
      justify-content flex-end
      border-top 1px solid #CCCCCC
      button
        display flex
        justify-content center
        align-items center
        height 28px
        width 80px
        background-color #1E9AFF
        color #fff
        border-radius 16px
</style>



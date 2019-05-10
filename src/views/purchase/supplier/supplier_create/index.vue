<template lang="pug">
  .main.full_box
    .item.ten_margin_bottom
      .input_box
        p 供应商名称
        input(placeholder="填写供应商名称",v-model="data.name")
    .item.ten_margin_bottom
      .input_box.one_border_bottom(@click="chooiceAddress")
        p 供应商地址
        .right
          span {{data.region}}
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconArrow")
      .input_box.one_border_bottom()
        p 详细地址
        input(placeholder="填写详细地址",v-model="data.address")
    .item.ten_margin_bottom
      .input_box.one_border_bottom(@click="chooiceIndustry")
        p 所属行业
        .right
          span {{data.industry}}
          .icon
            svg.ali_icon(aria-hidden="true")
              use(xlink:href="#iconArrow")
    .item.ten_margin_bottom
      .input_box.one_border_bottom
        p 联系人
        input(placeholder="填写联系人",v-model="data.contact")
      .input_box.one_border_bottom
        p 联系电话
        input(id="phone" placeholder="填写联系电话",v-model="data.phone" type="number" maxlength="11")
      .input_box.one_border_bottom
        p 职位
        input(placeholder="填写职位",v-model="data.position")
    .position
      span(:class="selectedIndex===0?'active':'' || data.position==='0'?'active':''", @click="confirmPosition('销售经理'),selectedIndex=0") 销售经理
      span(:class="selectedIndex===1?'active':'' || data.position==='1'?'active':''", @click="confirmPosition('老板'),selectedIndex=1") 老板
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
          materials: [],
        },
        selectedIndex: 0,
      }
    },
    computed: {
      ...mapState('purchase', {
        getData: state => state.supplierDetail
      }),
    },
    mounted(){
      this.type = this.$route.query.type
      this.id = this.$route.query.id
      if(this.type === 'edit') {
        this.data = this.getData
        this.selectedIndex = this.data.position === '销售经理' ? 0 : 1
        this.getAddressPosition()
        this.getIndustryPosition()
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
      ...mapActions('purchase', [
        'updateSupplierMessage'
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
        let {name,contact, phone,position,industry,region,address} = this.data;
        if(!name || !contact || !phone || !position || !industry || !region || !address){
          this.$createToast({
            txt: '请完善信息再提交',
            type: 'txt'
          }).show()
          return
        }
        /*if (!this.phoneReg.test(this.data..phone)) {
          this.$createToast({
            txt: '请输入正确的手机号',
            type: 'txt'
          }).show()
          return false
        }*/
        this.updateSupplierMessage({
          ...this.data
        })
        if(this.type === 'edit') {
          // 1: 已加入DSD， 2: 未加入DSD
          // let mState = this.$route.query.state || 1
          this.$router.push(`/purchase/supplier/create_supplier_add_material?id=${this.id}&type=${this.type}&state=${this.$route.query.state || '1'}`)
        } else {
          this.$router.push(`/purchase/supplier/create_supplier_add_material?type=${this.type}`)
        }
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
    padding 15px
  .main
    background-color #E6EAED
    display flex
    flex-direction column
    .item
      bgf()
      &.ten_margin_bottom
        margin-bottom 10px
      .input_box
        align-items center
        row()
        &.one_border_bottom
          border-bottom 1px solid #DDDDDD
        p
          display flex
          fsc(14px, #545454)
          margin-right 10px
          align-items center
        input
          fsc(14px, #999999)
          text-align right
          flex 1
        .right
          display flex
          flex-direction row
          span
            fsc(14px, #999999)
            text-align center
          .icon
            wh(5px, 10px)
            margin-left 7px
            display flex
            align-items center
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
        &.active
          border 1px solid #199ED7
          color #199ED7
    .save
      width 100%
      bgf()
      display flex
      justify-content flex-end
      position absolute
      bottom 0
      padding 15px
      button
        wh(92px,32px)
        line-height 32px
        display flex
        justify-content center
        fsc 14px white
        border:1px solid rgba(77,168,238,1);
        outline none
        color #4DA8EE
        border-radius 16px
</style>



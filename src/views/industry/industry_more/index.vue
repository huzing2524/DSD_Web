<template>
  <div id="industry-more">
    <div class="industry-more-data">
      <div class="industry-more-title">若想咨询合作或者进一步了解，请留下你的联系方式，我们工作人员会自动联系您。</div>
      <div class="industry-more-form">
        <div class="form-item">
          <div class="item-lable">公司名称</div>
          <input type="text" placeholder="填写公司名称" v-model="company_name">
        </div>
        <div class="form-item" @click="chooiceIndustry">
          <div class="item-lable">所属行业</div>
          <input type="text" placeholder="选择行业" v-model="industry" readonly disableClear>
<!--          <cube-select-->
<!--            v-model="industry"-->
<!--            title="行业"-->
<!--            :options="options"-->
<!--            placeholder="选择行业"-->
<!--            :auto-pop="autoPop"-->
<!--            :disabled="disabled"-->
<!--            class="form_select">-->
<!--          </cube-select>-->
          <img src="./icon_right.png" alt="">
        </div>
        <div class="form-item" @click="chooiceAddress">
          <div class="item-lable">公司地区</div>
          <input type="text" placeholder="选择地区" v-model="region" readonly disableClear>
          <img src="./icon_right.png" alt="">
        </div>
        <div class="form-item">
          <div class="item-lable">联系人</div>
          <input type="text" placeholder="填写联系人" v-model="contact_name">
        </div>
        <div class="form-item">
          <div class="item-lable">联系电话</div>
          <input type="text" placeholder="填写联系电话" v-model="contact_phone">
        </div>
      </div>
      <div class="industry-more-problems">
        <div class="problems-resolve">
          <div class="problems-resolve-title">想解决什么问题</div>
          <div class="problems-resolve-box">
            <button
              :class="{active: item.isActive}"
              v-for="(item, idx) in buttonArr"
              :key="idx"
              @click="()=>{item.isActive = !item.isActive}"
            >{{item.text}}
            </button>
          </div>
        </div>
        <div class="problems-else">
          <div class="form-item">
            <div class="item-lable">其它补充</div>
            <input type="text" placeholder="请填写" v-model="supplement">
          </div>
        </div>
      </div>
      <div class="industry-more-btn">
        <button @click="newFactory">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {provinceList, cityList, areaList} from '_common/area/'
  import {company_category} from '_common/company_category/'
  import {NewFactory} from '_api/industry/'
  import {mapState} from 'vuex'

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
        selectIndustryPosition: [],
        options: company_category,
        industry: '',
        placeholder: '请选择入职时间',
        autoPop: false,
        disabled: false,
        company_name: '',
        region: '',
        contact_name: '',
        contact_phone: '',
        supplement: '',
        buttonArr: [
          {
            text: '数据可视化',
            value: 1,
            isActive: false
          },
          {
            text: '数据分析',
            value: 2,
            isActive: false
          },
          {
            text: '机器替代人工',
            value: 3,
            isActive: false
          },
          {
            text: '机器远程控制',
            value: 4,
            isActive: false
          },
          {
            text: '智能预测预警',
            value: 5,
            isActive: false
          },
        ]
      }
    },
    computed: {
      ...mapState({
        phoneReg: state => state.phoneReg
      })
    },
    mounted() {
      this.addressPicker = this.$createCascadePicker({
        title: '选择地址',
        data: addressData,
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
      // 选择行业
      chooiceIndustry() {
        this.industryPicker.show()
      },
      // 选择行业的回调
      selectIndustry(selectedVal, selectedIndex, selectedText) {
        this.industry = selectedText.join('')
      },
      // 选择地址
      chooiceAddress() {
        this.addressPicker.show()
      },
      selectAddress(selectedVal, selectedIndex, selectedText) {
        this.region = selectedText.join('')
      },
      newFactory() {
        // alert(this.industry)
        if (!this.company_name) {
          this.$toast('请输入公司名称')
          return
        }
        if (!this.industry) {
          this.$toast('请选择公司所属行业')
          return
        }
        if (!this.region) {
          this.$toast('请选择公司所在地区')
          return
        }
        if (!this.contact_name) {
          this.$toast('请输入公司联系人')
          return
        }
        if (!this.phoneReg.test(this.contact_phone)) {
          this.$toast('请正确输入公司联系电话')
          return
        }
        let arr = []
        this.buttonArr.forEach(item => {
          if (item.isActive === true) {
            arr.push(item.value + '')
          }
        })
        if (arr.length <= 0) {
          this.$toast('请选择想解决的问题')
          return
        }
        NewFactory({
          company_name: this.company_name,
          industry: this.industry,
          region: this.region,
          contact_name: this.contact_name,
          contact_phone: this.contact_phone,
          solve_problems: arr,
          supplement: this.supplement
        }, 'post').then(res => {
          if (parseInt(res.data.res) === 0) {
            this.$toast('提交成功');
            this.$router.go(-1);
          } else {
            this.$toast(res.data.errmsg);
          }
        }).catch(err => {
          this.$toast(err);
        })
      }
    },
  }
</script>

<style lang="stylus" scoped>
  #industry-more {
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
  }

  .industry-more-data {
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .industry-more-title {
    display: flex;
    padding: 16px 12px 2px 12px;
    font-size: 16px;
    color: #333333;
    font-weight: 500;
  }

  .industry-more-form {
    display: flex;
    flex-direction: column;
    padding: 0 10px;

    .form-item {
      display: flex;
      flex-direction: row;
      padding: 22px 0 8px 0;
      border-bottom: 1px solid #EEEEEE;
      font-size: 14px;

      .item-lable {
        margin-right: 16px;
      }

      .form_select {
        flex: 1;
        padding: 0;

        > span {
          color: #666;
        }

        &:after {
          content: '';
          /*border: none!important;*/
          display: none;
        }

        .cube-select-icon {
          display: none;
        }
      }

      input {
        flex: 1;
        color: #666;
      }

      img {
        display: flex;
        justify-content: flex-end;
        width: 20px;
        height: 20px;
      }
    }
  }

  .industry-more-problems {
    display: flex;
    flex-direction: column;
    padding: 14px 10px;

    .problems-resolve {
      display: flex;
      flex-direction: column;

      .problems-resolve-title {
        font-size: 14px;
        color: #333333;
        margin-bottom: 16px;
      }

      .problems-resolve-box {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        button {
          font-size: 14px;
          color: #A1A1A1;
          padding: 6px 10px;
          border: 1px solid rgba(238, 238, 238, 1);
          border-radius: 20px;
          margin-right: 24px;
          margin-bottom: 8px;

          &.active {
            background: #00CC66;
            color: #FFF;
          }
        }
      }
    }

    .problems-else {
      display: flex;
      flex-direction: row;

      .form-item {
        width: 100%;
        display: flex;
        flex-direction: row;
        padding: 14px 0 8px 0;
        border-bottom: 1px solid #EEEEEE;
        font-size: 14px;

        .item-lable {
          margin-right: 16px;
        }

        input {
          color: #A1A1A1;
        }
      }
    }
  }

  .industry-more-btn {
    display: flex;
    padding: 16px;

    button {
      width: 343px;
      height: 46px;
      line-height: 46px;
      background: #007AFF;
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      border-radius: 24px;
    }
  }
</style>
<style lang="stylus">

  .form_select {
    .cube-select-icon {
      display: none;
    }
  }
</style>

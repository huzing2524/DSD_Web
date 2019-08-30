<template lang="pug">
  .main.full_box
    .phone(v-if="type=='create'")
      .icon
        svg.ali_icon(aria-hidden="true")
          use(xlink:href="#iconicon_dianhua")
      input(v-model="listItem.phone" type="number" placeholder="填写管理员手机号")
    .rights
      .title
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_quanxian")
        span 选择权限
      .right_item(v-for="(item,index) in rightsList" :key="index")
        .name {{item.title}}
        .options
          .item(v-for="(items,indexs) in item.rights" :key="indexs" @click="confirmClick(item,items)")
            span(:class="items.flag?'checked':''")
            p {{items.label}}
    .save_btn
      button(v-if="type === 'edit'" @click="editClick") 修改
      button(v-else @click="saveClick") 保存
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {RightsOrgs, RightsNew, RightsModify} from '_api/rights'

  export default {
    data() {
      return {
        type: '',
        checkIndex: 0,
        listItem: {},
        checkList: [],
        rightsList: [
          {
            title: '订单',
            rights: [
              {
                label: '审批人',
                value: '33',
                flag: false
              },
              {
                label: '普通管理员',
                value: '3',
                flag: false
              }
            ]
          },
          {
            title: '采购',
            rights: [
              {
                label: '审批人',
                value: '55',
                flag: false
              },
              {
                label: '普通管理员',
                value: '5',
                flag: false
              }
            ]
          },
          {
            title: '生产',
            rights: [
              {
                label: '普通管理员',
                value: '7',
                flag: false
              }
            ]
          },
          {
            title: '仓库',
            rights: [
              {
                label: '审批人',
                value: '99',
                flag: false
              },
              {
                label: '普通管理员',
                value: '9',
                flag: false
              }
            ]
          },
          {
            title: '权限管理',
            rights: [
              {
                label: '普通管理员',
                value: '8',
                flag: false
              }
            ]
          },
        ],
        list: [],
        res: null,
      }
    },
    computed: {
      ...mapState('rights', {
        rightList: state => state.rightList
      })
    },
    mounted() {
      this.initData()
    },
    methods: {
      ...mapActions('rights', [
        'updateRightsDetail'
      ]),
      initData() {
        this.type = this.$route.query.type || ''
        this.listItem.phone = this.rightList.phone
        this.list = this.rightList.rightsItem || []
        this.rightsList.forEach(item => {
          item.rights.forEach(items => {
            if(this.list.indexOf(items.value)>-1){
              items.flag = true
            }
          })
        })
        RightsOrgs({}, 'get').then((res) => {
          this.res = res.data.res
          if (res.data.res === 0){
            this.rightsList.push({
            title: res.data.data.label,
            rights: [
              {
                label: '普通管理员',
                value: res.data.data.rights,
                flag: false
              }
            ]
          })
          }
          console.log(res.data)
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      confirmClick(item, items) {
        if (items.flag) {
          //
        } else {
          item.rights.forEach((_item) => {
            _item.flag = false
          })
        }
        items.flag = !items.flag
      },
      saveClick() {
        if (!this.listItem.phone || !(/^1[0-9]{10}$/.test(this.listItem.phone))) {
          this.$toast('请填写正确的手机号码')
          return
        }
        let arr = []
        this.rightsList.forEach((item) => {
          item.rights.forEach((items) => {
            if(items.flag){
              arr.push(items.value)
            }
          })
        })
        RightsNew({
          phone: this.listItem.phone,
          rights: arr,
        }, 'post').then((res) => {
          if (parseInt(res.data.res) === 0) {
            this.$toast(`新增成功`)
            this.$router.push(`/rights`)
          } else {
            this.$toast(res.data.errmsg)
          }
        }).catch(() => {
          this.$toast('新增失败')
        })
      },
      editClick() {
        let arr = []
        this.rightsList.forEach((item) => {
          item.rights.forEach((items) => {
            if(items.flag){
              arr.push(items.value)
            }
          })
        })
        RightsModify({
          phone: this.listItem.phone,
          rights: arr,
        }, 'put').then((res) => {
          if (parseInt(res.data.res) === 0) {
            this.$toast(`修改成功`)
            this.leavePage()
          } else {
            this.$toast(res.data.errmsg)
          }
        }).catch(() => {
          this.$toast('修改失败')
        })
      },
      leavePage() {
        this.isLoad = false
        this.updateRightsDetail()
        this.$router.replace(`/rights`)
      },
    },
  }
</script>

<style scoped lang="stylus">
  .main
    padding 10px 0 62px
    .phone
      display flex
      flex-direction row
      align-items center
      bgf()
      padding 14px
      margin-bottom 10px
      .icon
        wh 16px 22px
        margin-right 14px
      input
        flex 1
        fsc 14px #999999
    .rights
      display flex
      flex-direction column
      bgf()
      padding 15px 15px 5px
      .title
        display flex
        flex-direction row
        margin-bottom 20px
        align-items center
        .icon
          wh 20px 20px
          margin-right 10px
        span
          fsc 15px #545454
      .right_item
        display flex
        flex-direction column
        background #E9F5FF
        padding 15px 0 15px 15px
        margin-bottom 10px
        .name
          fsc 14px #545454
          margin-bottom 15px
        .options
          display flex
          flex-direction row
          .item
            display flex
            flex 1
            flex-direction row
            align-items center
            span
              wh 14px 14px
              bfg()
              border 1px solid #4DA8EE
              border-radius 7px
              margin-right 5px
              &.checked
                background #4DA8EE
            p
              fsc 14px #545454
    .save_btn
      display flex
      flex-direction row
      position fixed
      bottom 0
      width 100%
      height 62px
      justify-content flex-end
      align-items center
      bgf()
      button
        wh 92px 32px
        bgf()
        font-size 14px
        color #4DA8EE
        border 1px solid #4DA8EE
        border-radius 16px
        margin-right 15px
</style>

<style lang="stylus">
  .cube-radio-group
    width 100%
    background #E9F5FF
    &:after
      border 0 !important
    .cube-radio
      padding 15px 0 0 0 !important
      &.cube-radio_selected
        .cube-radio-ui
          background #4DA8EE
      &:after
        border 0
      .cube-radio-wrap
        padding 0
        justify-content flex-start
        .cube-radio-ui
        .cube-radio-label
          fsc 14px #545454
</style>

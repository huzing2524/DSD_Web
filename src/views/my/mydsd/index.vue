<template lang="pug">
  .mydsd.fbox
    .header
      p DSD
      p {{count | toFixedNum}}
    .record_list
      .record_list_item(v-for="(item, idx) in accountList" :key="idx")
        .record_list_item_title(@click="toggleShow(item, idx)")
          .record_list_item_title_left
            p {{item.year}}年{{item.month}}月
            p 收入：{{item.in}} 支出：{{item.out}}
          .record_list_item_title_right
            img(v-if="item.isShow" src="./arrow_up_icon.png")
            img(src="./arrow_down_icon.png" v-else)
        .record_list_item_list(v-if="item.isShow")
          .record_list_item_list_item(v-for="(items, idxs) in item.data" :key="idx + idxs")
            .record_list_item_list_item_left
              p {{items.type | getDesByType}}
              p {{items.time | timeMDHMFilter}}
            p.record_list_item_list_item_right(:class="items.count<0?'expend':'income'") {{items.count>0?'+':''}}{{items.count}}
</template>

<script>
  import {GetDSDLog, GetDSDAccount} from '_api/old/'

  export default {
    components: {},
    data() {
      return {
        count: 0,
        accountList: []
      }
    },
    computed: {},
    filters:{
      getDesByType(val){
        if(val === 'registe'){
          return '注册赠送';
        }else if(val === 'system'){
          return '系统赠送';
        }else if(val === 'invite') {
          return '邀请个人奖励';
        }else if(val === 'invite_ent'){
          return '邀请企业奖励';
        }else if(val === 'withdraw'){
          return '提现';
        }else if(val === 'withdraw_gas'){
          return '提现手续费';
        }else if(val === 'xd'){
          return '小D任务';
        }else if(val === 'auth'){
          return '实名认证奖励';
        }else if(val === 'ent_auth'){
          return '企业实名认证奖励';
        }else{
          return '挖矿';
        }
      },
      toFixedNum(val){
        return parseFloat(val).toFixed(2)
      }
    },
    mounted() {
      this.toGetDSDLog()
    },
    methods: {
      toGetDSDLog() {
        GetDSDLog().then(res => {
          this.accountList = res.list
          this.accountList.forEach((item, idx) => {
            item.isShow = false
            if (idx === 0) {
              item.isShow = true
            }
          })
        })
        GetDSDAccount().then(res => {
          this.count = res.count
        })
      },
      toggleShow(item, idx) {
        if (item.isShow) {
          this.$set(this.accountList, idx, Object.assign(item, {isShow: false}))
        } else {
          this.$set(this.accountList, idx, Object.assign(item, {isShow: true}))
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  $green := #009944
  $red := #FF3C00
  $linearGradient := linear-gradient(to left, rgba(129, 198, 218, 1), rgba(50, 117, 180, 1))
  $reverseLinearGradient := linear-gradient(to right, rgba(129, 198, 218, 1), rgba(50, 117, 180, 1))
  .mydsd
    bgf()
    .header
      bg $linearGradient
      wh 100% 110px
      flr()
      flex-direction column
      padding 15px
      p
        color #FFF
        font-weight 600
        &:nth-of-type(1)
          font-size 22px
        &:nth-of-type(2)
          font-size 25px
          margin-top 10px
    .record_list
      &_item
        &_title
          ftb()
          bg #f7f7f7
          justify-content space-between
          padding 15px 10px
          border-bottom 1px solid #EEEEEE
          &_left
            p
              &:nth-of-type(1)
                fsc 16px #333333
                font-weight 600
              &:nth-of-type(2)
                fsc 12px #A1A1A1
                margin-top 5px
          &_right
            wh 12px 7px
            img
              wh 100% 100%
        &_list
          bg
          &_item
            padding 15px 20px
            ftb()
            justify-content space-between
            &_left
              p
                &:nth-of-type(1)
                  fsc 16px #333
                &:nth-of-type(2)
                  fsc 12px #A1A1A1
                  margin-top 5px
            &_right
              fsc 14px #333
              &.income
                color #FFAE00
              &.expend
                color #333333
</style>

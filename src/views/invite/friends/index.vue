<template lang="pug">
  .friend
    .friend-banner
      .banner-rank 我的排名：{{rank > 99?rank+'+':rank}}
    .friend-content
      .friend-list-nav
        .list-rank(:class="selectedIndex===0?'active':''" @click="optionClick(0)") 排行榜
        .list-invite(:class="selectedIndex===1?'active':''" @click="optionClick(1)") 我邀请的
      .friend-rank-content(v-if="selectedIndex === 0")
        .friend-rank-header
          .header-rank 排名
          .header-name 昵称
          .header-invite 邀请好友
        ul.friend-rank-list
          li(v-for="(rankItem,index) in rankList" :key="index")
            span(:class="index<=2?'orange':''") {{rankItem.rn}}
            span {{rankItem.name}}
            span {{rankItem.count}}
      .friend-invite-box(v-else)
        .friend-invite-content(v-if="this.length>0")
          .friend-invite-header 总共邀请{{this.length}}位好友，获得{{award}}DSD奖励
          .friend-invite-nav
            .invite-name 昵称
            .invite-time 邀请时间

          ul.friend-invite-list
            li(v-for="(inviteItem,index) in inviteList" :key="index")
              span {{inviteItem.name}}
              span {{inviteItem.time}}
        .friend-invite-content(v-else)
          .friend-invite-header 还没邀请好友，每邀请1位好友将获得50DSD奖励
</template>


<script>
  import {GetInviteContent} from '_api/old/'

  export default {
    name: 'friends',
    data() {
      return {
        selectedIndex: 0,
        rank: 0,
        award: '',
        rankList: [],
        inviteList: [],
        length: 0,
      }
    },
    methods: {
      initInviteData() {
        GetInviteContent().then((res) => {
          this.award = res.award
          this.rank = res.rank
          this.inviteList = res['invite_list']
          this.length = this.inviteList.length
          this.rankList = res['rank_list']
        }).catch(() => {
        })
      },
      optionClick(index) {
        this.selectedIndex = index
      }
    },
    mounted() {
      this.initInviteData()
    },
  }
</script>

<style lang="stylus">
  .friend
    width 100%
    height 100%
    display flex
    flex-direction column

    .friend-banner
      display flex
      position relative
      background url(./invite_banner.jpg) no-repeat
      background-size 100% 100%
      height 173.5px

      .banner-rank
        height 35px
        line-height 35px
        position absolute
        bottom 20px
        left 20px
        justify-content center
        align-items center
        padding 0 10px
        color #fff
        border 1px solid #fff
        font-size 10px

    .friend-content
      display flex
      flex-direction column
      background #E5E5E5
      padding 10px
      flex 1

      .friend-list-nav
        display flex
        flex-direction row
        justify-content center
        align-items center
        text-align center

        .list-rank, .list-invite
          flex 1
          background #F5F5F5
          color #333333
          font-size 12px
          font-weight bold
          padding 13px 0 14px 0

          &.active
            background #585B66
            color #fff

      .friend-rank-content
        display flex
        flex-direction column
        background #fff
        flex 1
        padding 0 20px

        .friend-rank-header
          display flex
          flex-direction row
          justify-content center
          align-items center
          text-align center
          font-size 11px
          font-weight bold

          .header-rank, .header-name, .header-invite
            flex 1
            padding 10px

        .friend-rank-list
          flex-direction column
          flex 1
          overflow scroll

          li
            display flex
            flex-direction row
            justify-content center
            align-items center
            text-align center
            border-bottom 1px solid #E5E5E5
            padding 15px 0

            span
              flex 1
              font-size 11px

              &.orange
                color #ff9c00

      .friend-invite-box
        display flex
        flex-direction column
        background #fff
        flex 1
        padding 0 10px

        .friend-invite-content
          display flex
          flex 1
          padding 0 10px
          flex-direction column

          .friend-invite-header
            display flex
            align-content center
            justify-content center
            padding 11px 0 9px 0
            font-size 11px
            color #333333
            font-weight bold

          .friend-invite-nav
            display flex
            background #F5F5F5
            padding 11px 22px 9px 22px
            flex-direction row
            justify-content space-between
            align-items center
            font-size 11px
            color #333333
            font-weight bold

          .friend-invite-list
            flex 1
            flex-direction column
            overflow scroll
            font-size 11px

            li
              display flex
              flex-direction row
              justify-content space-between
              align-items center
              padding 15px 16px
              border-bottom 1px solid #E5E5E5

              span
                font-size 11px
</style>

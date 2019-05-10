<template lang="pug">
  .rights.full_box(v-if="isLoad")
    .list
      .item(v-for="(item,index) in listItem.master" :key="index")
        .left
          img(:src="item.image")
          .info
            span {{item.name?item.name:item.phone}}
            p {{item.desc}}
    .list
      .item(v-for="(item,index) in listItem.admins" :key="index" @click="toDetailClick(item)")
        .left
          img(:src="item.image")
          .info
            span {{item.name?item.name:item.phone}}
            p {{item.desc}}
        .right
          img(src="./arrow_right.png")
    NewIcon(to="/rights/create?type=create")
</template>

<script>
  import NewIcon from '_components/new_icon/'
  import { RightsList } from '_api/rights'
  export default {
    components: {
      NewIcon
    },
    data( ){
      return {
        isLoad:false,
        listItem:{},
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData(){
        RightsList({},'get').then((res) => {
          this.listItem = res.data
          this.isLoad = true
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      toDetailClick(item){
        this.$router.push(`/rights/detail?phone=${item.phone}`)
      }
    },
  }
</script>

<style scoped lang="stylus">
  fr()
    display flex
    flex-direction row
  fc()
    display flex
    flex-direction column
  .rights
    .list
      fc()
      bgf()
      padding-left 20px
      margin-bottom 10px
      .item
        fr()
        padding 20px 0
        border-bottom 1px solid rgba(216,216,216,0.3544)
        align-items center
        &:last-child
          border-bottom 0
        .left
          flex 1
          fr()
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          align-items center
          img
            fr()
            wh 46px 46px
            margin-right 12px
          .info
            flex 1
            fc()
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            span
              fsc 14px #545454
              margin-bottom 8px
            p
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              fsc 12px #999999
        .right
          fr()
          margin-right 20px
          img
            wh 8px 14px
</style>

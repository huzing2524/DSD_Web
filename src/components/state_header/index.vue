<template lang="pug">
  .state_header
    .menu
      .to_left(@click="scrollDecrease" v-show="scrollLeft > 0")
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_more_you")
      .list#scroll_list(@scroll="listScroll")
        .item(@click="itemClick(item)" v-for="(item, idx) in stateList" :key="idx")
          .icon
            svg.ali_icon(aria-hidden="true")
              use(:xlink:href="'#'+item.icon")
          p {{item.text}}
          .num(v-if="item.num") {{item.num}}
      .to_right(@click="scrollAdd" v-show="scrollLeft <= (scrollList.scrollWidth - 375)")
        .icon
          svg.ali_icon(aria-hidden="true")
            use(xlink:href="#iconicon_more")
    MaterialAddMask(
      v-show="isShowToBaCkMaterial"
      @closeClick="isShowToBaCkMaterial = false")
</template>

<script>
  import MaterialAddMask from '_components/product/material_add_mask/'

  export default {
    components: {
      MaterialAddMask
    },
    data() {
      return {
        scrollList: '',
        scrollLeft: 0,
        isShowToBaCkMaterial: false,
      }
    },
    props: ['stateList'],
    computed: {},
    mounted() {
      this.scrollList = document.getElementById('scroll_list')
    },
    methods: {
      listScroll(e) {
        this.scrollLeft = e.target.scrollLeft
      },
      scrollAdd() {
        this.scrollList.scrollLeft += 375
      },
      scrollDecrease() {
        this.scrollList.scrollLeft -= 375
      },
      itemClick(item) {
        if (item.path) {
          this.$router.push(item.path)
        } else if (item.toNext === 1) {
          this.isShowToBaCkMaterial = true
        }
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .state_header
    .menu
      width 100%
      position relative
      box-shadow 0px 1px 6px 0px rgba(35, 121, 191, 0.15)
      bgf()

      .to_left
        position absolute
        wh 14px 14px
        left 12px
        z-index 9
        tb()

        .icon
          wh 100% 100%

      .to_right
        position absolute
        wh 14px 14px
        right 12px
        z-index 9
        tb()

        .icon
          wh 100% 100%

      .list
        width 100%
        font-size 12px
        display flex
        overflow scroll
        padding 30px 38px 20px

        .item
          position relative
          height 100%
          display flex
          flex-direction column
          align-items center
          padding-right 40px

          .icon
            wh 26px 26px

          p
            width 4em
            display block
            margin-top 10px
            text-align center

          .num
            position absolute
            left 25px
            top -8px
            background #FF4452
            border-radius 10px
            padding 2px 4px
            color #FFF
            font-size 10px
</style>

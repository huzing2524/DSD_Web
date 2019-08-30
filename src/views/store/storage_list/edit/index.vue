<template lang="pug">
  .storage_edit(v-if="isLoad")
    .list(v-for="(item,index) in storageList" :key="index")
      .left(@click="toEditClick(item)") {{item.name}}
      .icon(@click="toDeleteClick(item)")
        svg.ali_icon(aria-hidden="true")
          use(xlink:href="#icondelete_")
</template>

<script>
  import { StoreStorageSelect } from '_api/store/'
  import {mapState, mapActions} from 'vuex'
  export default {
    data(){
      return {
        isLoad: false,
        storageList: [],
      }
    },
    computed: {
      ...mapState('store', {
        storage: state => state.storage
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
        this.getStirageList()
      },
      getStirageList(){
        StoreStorageSelect({},'get').then((res) => {
          this.storageList = res.data
          this.isLoad = true
        }).catch(() => {
          this.$toast('获取数据失败')
        })
      },
      toEditClick(item){
        this.storage.storageName = item.name
        this.$router.push(`/store/storage_list/new?id=${item.id}&state=edit`)
      },
      toDeleteClick(item){
        this.$createDialog({
          type: 'confirm',
          title: '',
          content: '确定删除该仓库吗，仓库的产品和物料会自动移入默认仓库',
          confirmBtn: {
            text: '删除',
            active: true,
            disabled: false,
            href: 'javascript:;',
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            StoreStorageSelect({
              id: item.id,
            },'delete').then((res) => {
              if (parseInt(res.data.res) === 0) {
                this.$toast(`删除成功`)
                this.getStirageList()
              } else {
                this.$toast(res.data.errmsg)
              }
            }).catch(() => {
              this.$toast('删除失败')
            })
          },
          onCancel: () => {

          }
        }).show()
      }
    },
  }
</script>

<style scoped lang="stylus">
  .storage_edit
    padding 0 10px 10px
    overflow-y scroll
    bgf()
    .list
      display flex
      flex-direction row
      justify-content space-between
      align-items center
      padding 20px 0
      border-bottom 1px solid #EEEEEE
      .left
        fsc 14px #545454
      .icon
        wh 20px 20px
</style>
<style lang="stylus">
  .cube-dialog-content
    margin 30px 0 28px 0
    .cube-dialog-content-def
      padding 0 20px
      line-height 20px
      p
        margin initial
        font-size 16px
        line-height 24px
        color #545454
  .cube-dialog-btns
    &:after
      border-right 0
    a:before
      border-top 0
    a:last-child
      color #0099FF
</style>

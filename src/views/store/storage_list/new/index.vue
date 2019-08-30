<template lang="pug">
  .storage_new.full_box
    div(v-doc-title="doctitle")
    .storage_name
      cube-input(type="text" :clearable="clearable" placeholder="填写仓库名称" v-model="listItem.name")
    .save
      button(@click="toNext") 保存
</template>

<script>
  import { StoreStorageSelect } from '_api/store/'
  import {mapState, mapActions} from 'vuex'
  export default {
  data( ){
      return {
        doctitle:'',
        state: '',
        id: '',
        clearable:{
          visible: true,
          blurHidden: false
        },
        listItem: {
          name:''
        },
      }
    },
    computed: {
      ...mapState('store', {
        storage: state => state.storage
      })
    },
    mounted() {
      if(this.$route.query.state === 'create'){
        this.doctitle = '新建仓库'
      }else {
        this.doctitle = '编辑仓库'
      }
      this.initData()
    },
    methods: {
      ...mapActions('store', [
        'updateStoreSub'
      ]),
      initData(){
        this.id = this.$route.query.id || ''
        this.state = this.$route.query.state || ''
        this.listItem.name = this.storage.storageName
      },
      toNext(){
        if(!this.listItem.name){
          this.$toast(`请填写仓库名`)
          return
        }
        if(this.state==='create'){
          StoreStorageSelect({
            name: this.listItem.name
          },'post').then((res) => {
            if (parseInt(res.data.res) === 0) {
              this.$toast(`新建成功`)
              this.$router.go(-1)
            } else {
              this.$toast(res.data.errmsg)
            }
          }).catch(() => {
            this.$toast('新建失败')
          })
        }
        if(this.state==='edit'){
          StoreStorageSelect({
            id: this.id,
            name: this.listItem.name
          },'put').then((res) => {
            if (parseInt(res.data.res) === 0) {
              this.$toast(`修改成功`)
              this.updateStoreSub()
              this.$router.go(-1)
            } else {
              this.$toast(res.data.errmsg)
            }
          }).catch(() => {
            this.$toast('修改失败')
          })
        }
      },
    },
  }
</script>

<style scoped lang="stylus">
  .storage_new
    padding 12px 10px
    .storage_name
      display flex
      flex-direction column
      margin-bottom 30px
    .save
      display flex
      justify-content center
      button
        wh 180px 48px
        line-height 48px
        background #1E9AFF
        fsc 16px #fff
        border-radius 24px
        border 0
</style>

<style scoped lang="stylus">
  .storage_name
    .cube-input
      padding 2px 0
      border-radius 6px
      flex 1
      .cube-input-field
        border 0
        outline 0
      &:after
        border 0
</style>


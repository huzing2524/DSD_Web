<template lang="pug">
  .main.full_box
    .content
      span 送达天数
      input(placeholder="填写送达天数" type="number" v-model="day" maxlength=60 v-only-input-number)
    .operator
      button(@click = "clickSubmit") 保存
</template>

<script>
  import {mapActions, mapState} from "vuex";

  export default {
    data() {
      return {
        day: '',
      }
    },
    computed: {
      ...mapState('purchase', {
        getData: state => state.supplierDetail
      }),
    },
    mounted() {
      console.log(this.purchaseDetail);
    },
    methods: {
      ...mapActions('purchase', [
        'updateSupplierMessage'
      ]),
      clickSubmit() {
        if(!this.day || parseInt(this.day) <= 0){
          this.$toast('请填写正确送达天数')
          return
        }
        this.getData.deliver_days = Number(this.day)
        this.updateSupplierMessage({
          ...this.getData
        })
        this.$router.push(`/purchase/supplier/create_supplier_add_material?id=${this.$route.query.id || ''}&type=add`)
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .main
    bg #E6EAED
    .content
      widows: 100%;
      display flex
      flex-direction row
      margin 10px
      border-radius 6px
      bgf()
      align-items center
      justify-content space-between
      padding 12px 10px
      span
        height:20px;
        font-size:14px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:20px;
        margin-right 10px
      input
        height:20px;
        font-size:14px;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:20px;
        text-align right
        flex 1
    .operator
      text-align center
      weight 48px
      margin-top 20px
      button
        border 0
        outline none
        border-radius 24px
        background rgba(30,154,255,1)
        fsc 14px white
        wh 180px 48px

</style>

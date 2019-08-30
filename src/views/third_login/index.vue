<template lang="pug">
  .third_login
</template>

<script>
  import {CasiCloud} from '_api/'

  export default {
    components: {},
    data() {
      return {
        access_token: ''
      }
    },
    computed: {},
    mounted() {
      this.access_token = (this.$route.hash).substring(1).split('&')[0].split('=')[1]
      this.getCasiCloud()
    },
    beforeDestroy() {
      window.shareDetail = null;
    },
    methods: {
      getCasiCloud() {
        CasiCloud({
          access_token: this.access_token || ''
        }).then(res => {
          window.shareDetail = () => {
            return res.data
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>

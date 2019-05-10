<template lang="pug">
  .next-step(@click="btnClick")
    p(:style="{...titleStyle}") {{title}}    
</template>

<script>
/**
  em:
    StepButton(title="保存" 
      class="step-button"
      @click="click")
    
    StepButton(title="保存"
      class="step-button"
      @click="click"
      titleStyle='{fontSize:40px}')
 */
export default {
  props: {
    titleStyle: {
      default:function() {
        return {
          fontSize: '15px',
          color: '#ffffff',
          fontWeight: 400,
        }
      }
    },
    title: {
      type: String,
      default: '下一步',
    }
  },
  methods: {
    btnClick() {
      this.$emit('click')
    }
  },
}
</script>

<style lang="stylus" scoped>
.next-step
  display flex
  justify-content center
  align-items center
  background-color rgba(30,154,255,1)
  border-radius 22px
  height 44px
  margin-top 40px
  p
    color white
</style>



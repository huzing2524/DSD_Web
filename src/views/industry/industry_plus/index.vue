<template>
  <div id="industry-plus">
    <div class="industry-plus-data">
      <div class="industry-plus-item">
        <div class="item-img">
          <img style="height: 256px;" class="bg1" src="./industry_bg1.png" alt="">
        </div>
      </div>
      <div class="industry-plus-item">
        <div class="item-img">
          <img style="height: 375px;" src="./industry_bg2.png" alt="">
        </div>
      </div>
      <div class="industry-plus-item industry-case1">
        <div class="item-describe">
          <h3>欣旺达-智能实时数据分析看板</h3>
          <p>欣旺达电子股份有限公司是以锂离子电池模组的研发、设计、生产及销售为主营业务的高新技术企业，是国内最大的锂离子电池模组解决方案及产品提供商，致力于为客户提供安全、轻便、持久的绿色能源产品。</p>
          <p>欣旺达客户有：苹果、华为、OPPO、vivo、小米、联想等</p>
          <p>大数点帮助欣旺达等锂电池制造企业实现了工厂、车间、产线的大数据运用---智能实时大数据看板，提升人均综合效率30%以上，降低损耗及事故成本 40%，在先进的设备与管理基础上进一步提高生产质量。企业通过对大数据的利用，每年可实现上亿元的价值提升。</p>
        </div>
        <div class="item-img" style="padding: 10px 8px 18px 8px;">
          <img style="height: 382px;" src="./industry_bg3.png" alt="">
        </div>
      </div>
      <div class="industry-plus-item industry-case2">
        <div class="item-describe">
          <h3>海滨医疗-远程控制、数据分析与智能服务</h3>
          <p>位于湛江经济技术开发区的海滨医疗器械有限公司是一家从事医用体外冲击波产品的研制、开发、生产、销售和售后服务的专业厂家，公司共有十多项专利技术，是一家创新能力过硬的医疗设备商。</p>
          <p>大数点帮助海滨医疗实现冲击波治疗仪等设备的物联网化与智能化，帮助其客户实现设备远程操控，并对设备和病人数据进行实时统计分析，实现设备的故障预测、安全监控与自动计费与收费，为医院提供对病人情况的智能分析与判断，同时数据分析还为海滨医疗自己产品的研发和营销方向提供指引，提升了企业决策的准确率。</p>
          <p>基于大数点技术，海滨医疗通过手机端就能实现对冲击波治疗仪的参数配置和调优，远程控制与售后服务极大的提升了效率，之前一两天工作量，现在只需1分钟就能完成。</p>
        </div>
        <div class="item-img" style="padding: 10px 8px 18px 8px;">
          <img style="height: 311px;" src="./industry_bg4.png" alt="">
        </div>
      </div>
    </div>
    <div class="industry-plus-btn">
      <button class="industry-test" @click="toIndustryTest">测测我的企业智能化程度</button>
      <button class="industry-more" @click="toIndustryMore">我想进一步了解</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      toIndustryTest(){
        this.$router.push(`/industry/test`)
      },
      toIndustryMore(){
        this.$router.push(`/industry/more`)
      }
    },
  }
</script>

<style lang="stylus" scoped>
  #industry-plus{
    width: 100%;
    height: 100%;
    background: #EFEEF4;
    display: flex;
    flex-direction: column;
  }
  .industry-plus-data{
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-bottom: 94px;
    -webkit-overflow-scrolling: touch;
  }
  .industry-plus-item{
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    position: relative;
    .item-describe{
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      h3{
        font-size: 16px;
        color: #333333;
        font-weight: 600;
        margin: 24px 0;
        text-align: center;
      }
      p{
        font-size: 14px;
        color: #333333;
        font-weight: 500;
        margin-bottom: 12px;
      }
    }
    .item-img{
      width: 100%;
      display: flex;
      flex-direction: row;
      img{
        width: 100%;
      }
    }
  }
  .industry-case1,.industry-case2{
    background: #fff;
  }
  .industry-case1::before{
     content:'案例1';
     display: block;
     width: 50px;
     height: 20px;
     line-height: 20px;
     text-align: center;
     background: #007AFF;
     color: #fff;
     font-size: 14px;
     position: absolute;
     left: 0;
     top: 0;
   }
  .industry-case2::before{
    content:'案例2';
    display: block;
    width: 50px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    background: #007AFF;
    color: #fff;
    font-size: 14px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .industry-plus-btn{
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    padding: 24px 10px;
    button{
      height: 46px;
      line-height: 46px;
      background: #007AFF;
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      border-radius:24px;
      box-shadow:0px 2px 4px 0px rgba(0,122,255,0.5);
    }
    .industry-test{
      width: 200px;
      margin-right: 19px;
    }
    .industry-more{
      width: 136px;
    }
  }
</style>

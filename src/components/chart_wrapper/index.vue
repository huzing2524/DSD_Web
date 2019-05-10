<template lang="pug">
  .chart_wrapper.full_box
    ve-ring(:data="chartData" :tooltip="chartTooltip" :settings="chartSettings" :legend="legendSettings" style="margin-top:-80px;")
    .chart_kind
      span {{desc}}
      p {{total}}
</template>

<script>
  export default {
    data() {
      this.chartTooltip = {
        show: false,
      }
      this.legendSettings = {
        icon: 'circle',
        itemWidth: 8,
        itemHeight: 8,
        bottom: 30,
        orient: 'vertical',
        formatter: function (v) {
          return v
        },
        selectedMode: false,
        selected: false,
        textStyle: {
          fontSize: 14,
          color: '#545454',
        },
      }
      this.chartSettings = {
        label: {
          show: false,
        },
        data: [
          {
            tooltip: {
              position: ['50%', '50%']
            }
          }
        ],
        silent: false,
        radius: ['70', '84'],
        hoverAnimation: false,
        stillShowZeroSum: false,
      }
      return {
        tabIdx: 0,
        total: 0,
        desc: '',
        chartData: {
          columns: ['name', 'percent'],
          rows: [
            {'name': '', 'percent': 0},
          ]
        },
      }
    },
    // dataList 格式
    //
    // {  total: 1,
    //     desc: '发货单',
    //   rows: [
    //   {'name': '准时交货', 'val': 0},
    //   {'name': '逾期发货', 'val': 0},
    //   {'name': '待发货', 'val': 0},
    // ]
    // },
    props: ['dataList'],
    mounted() {
      if(this.dataList){
        this.total = this.dataList.total;
        this.desc = this.dataList.desc;
        let sum = this.total;
        let data = [];
        for (let i = 0; i < this.dataList.rows.length; i++) {
          if(sum===0){
            let name = this.dataList.rows[i].name;
            data.push({'name': name + ' ' + '0.00%', 'percent': this.dataList.rows[i].val})
          }else {
            let percent = ((this.dataList.rows[i].val / sum) * 100).toFixed(2);
            let name = this.dataList.rows[i].name;
            data.push({'name': name + ' ' + percent + '%', 'percent': this.dataList.rows[i].val})
          }
        }
        this.chartData.rows = data
      }

    },
    methods: {}
  }
</script>

<style scoped lang="stylus">
  .chart_wrapper
    position relative
    .chart_kind
      width 100%
      display flex
      flex-direction column
      align-items center
      justify-content center
      position absolute
      top 30%
      span
        font-size 14px
        color #959A9D
        margin-bottom 10px
      p
        font-size 16px
        color #545454
</style>

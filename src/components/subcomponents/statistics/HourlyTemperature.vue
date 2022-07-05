<script setup>
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const chartStyle = {
  backgroundColor: '#fcfbfc',
  borderRadius: '5px',
}

const testData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
  datasets: [
    {
      label: 'Chart.js Line Chart',
      data: [30, 40, 60, 70, 50, 100, 50],
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    },
  ]
}
</script>

<template>
  <div class="avg-weekly-temp-container">
    <div class="avg-weekly-temp-wrapper">
      <h2>Daily Hourly Temperature</h2>
      <div class="chart-container">
        <LineChart :styles="chartStyle" ref="lineChart" :chartData="testData"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.avg-weekly-temp-container
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  padding-top: 40px
  .avg-weekly-temp-wrapper
    display: flex
    justify-content: center
    align-items: flex-start
    flex-direction: column
    width: 100%
    gap: 20px
    .chart-container
      width: 100%
canvas, #line-chart
  background-color: #fcfbfc
  border-radius: 5px
</style>
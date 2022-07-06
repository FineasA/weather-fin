<script setup>
import { computed } from 'vue'
import { format } from 'date-fns'
import { storeToRefs } from 'pinia'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

import { useCurrentWeatherStore } from '@/store/weather/currentWeather'
const { forecast, temp_mode } = storeToRefs(useCurrentWeatherStore())

const displayed_temp_mode = computed(() => temp_mode.value === 'c' ? 'temp_c' : 'temp_f')
const temperatures = computed(() => forecast.value.hourly_data.map(hourly_data => hourly_data[displayed_temp_mode.value]))
const times = computed(() => forecast.value.hourly_data.map(hourly_data => format(new Date(hourly_data.time), 'HH:mm')))

const chartStyle = {
  backgroundColor: '#fcfbfc',
  borderRadius: '5px',
  padding: '20px',
  width: '100%',
  height: '320px',
}

const testData = computed(() => ({
  labels: times.value,
  datasets: [
    {
      label: 'Temperature',
      data: temperatures.value,
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    },
  ]
}))
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
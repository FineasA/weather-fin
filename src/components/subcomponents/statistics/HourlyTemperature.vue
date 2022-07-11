<script setup>
import { computed, ref, onMounted } from 'vue'
import { format } from 'date-fns'
import { storeToRefs } from 'pinia'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

import { useCurrentWeatherStore } from '@/store/weather/currentWeather'
const { forecast, temp_mode } = storeToRefs(useCurrentWeatherStore())
const { setTemperatureMode } = useCurrentWeatherStore()

const displayed_temp_mode = computed(() => temp_mode.value === 'c' ? 'temp_c' : 'temp_f')
const temperatures = computed(() => forecast.value.hourly_data.map(hourly_data => hourly_data[displayed_temp_mode.value]))
const times = computed(() => forecast.value.hourly_data.map(hourly_data => format(new Date(hourly_data.time), 'HH:mm')))
const chartHeight = ref('320px')

const chartStyle = computed(() => ({
  backgroundColor: '#fcfbfc',
  borderRadius: '5px',
  padding: '20px',
  width: '100%',
  height: chartHeight.value,
}))

const weatherData = computed(() => ({
  labels: times.value,
  datasets: [
    {
      label: 'Temperature',
      data: temperatures.value,
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    },
  ]
}))

onMounted(() => {
  window.addEventListener('resize', () => {
    chartHeight.value = window.innerWidth < 380 ? 'unset' : '320px'
  })
})
</script>

<template>
  <div class="avg-weekly-temp-container">
    <div class="avg-weekly-temp-wrapper">
      <div class="row">
        <h2>Daily Hourly Temperature</h2>
        <div class="temp-controls">
          <button
            :class="{'active' : temp_mode === 'c'}"
            @click="setTemperatureMode('c')"
          >
            &deg;C
          </button>
          <button
            :class="{'active' : temp_mode === 'f'}"
            @click="setTemperatureMode('f')"
          >
            &deg;F
          </button>
        </div>
      </div>
      <div class="chart-container">
        <LineChart :styles="chartStyle" ref="lineChart" :chartData="weatherData"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.row
  display: flex
  justify-content: space-between
  align-self: center
  width: 100%
  gap: 10px
h2
  width: 100%
.temp-controls
  display: flex
  justify-content: flex-end
  align-items: center
  width: 100%
  max-width: 320px
  button:first-child
    border-top-left-radius: 5px
    border-bottom-left-radius: 5px
    border-right: none
  button:last-child
    border-top-right-radius: 5px
    border-bottom-right-radius: 5px
    border-left: none
  button
    display: flex
    justify-content: center
    align-items: center
    padding: 12px 15px
    height: 20px
    width: 60px
    background-color: #9eacc7
    border: none
    color: #fff
    cursor: pointer
    &.active
      background-color: #224c87

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

@media screen and (max-width: 910px)
  .row
    flex-direction: column
    justify-content: center
    align-items: center
  .temp-controls
    justify-content: center
</style>
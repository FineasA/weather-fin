<script setup>
import { storeToRefs } from 'pinia'
import { useCurrentWeatherStore } from '@/store/weather/currentWeather'
import { computed } from 'vue'

const { setTemperatureMode } = useCurrentWeatherStore()
const { temp_c, temp_f, temp_mode, condition } = storeToRefs(useCurrentWeatherStore())

const displayedTemp = computed(() => temp_mode.value === 'f' ? temp_f : temp_c)
</script>

<template>
  <div class="weather-display-container">
    <div class="weather-display-wrapper">
      <div class="weather-icon-row">
        <img :src="condition.icon" alt="">

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
      <div class="weather-display-row">
        <h2>{{ displayedTemp }}&deg;{{ temp_mode.toUpperCase() }}</h2>
        <div class="weather-type">
          <p>{{ condition.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.weather-display-container
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  margin-top: 60px
  margin-bottom: 20px
  color: #f2f7f9
  p
    font-size: 20px
    font-weight: 100
  h2
    font-size: 60px
    letter-spacing: 1.5px
    font-weight: 100
  .weather-display-wrapper
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    width: 100%
    .weather-icon-row
      display: flex
      justify-content: space-between
      align-items: center
      width: 100%
      img
        height: 45px
        width: 45px
      .temp-controls
        display: flex
        justify-content: center
        align-items: center
        max-width: 100px
        width: 100%
        button:first-child
          border-top-left-radius: 5px
          border-bottom-left-radius: 5px
        button:last-child
          border-top-right-radius: 5px
          border-bottom-right-radius: 5px
        button
          width: 70px
          height: 30px
          background-color: #3a5172
          border: 1px solid #5885ca
          color: #fff
          cursor: pointer
          &.active
            background-color: #224c87
    .weather-display-row
      display: flex
      justify-content: space-between
      align-items: center
      width: 100%
      .weather-type p
        text-align: right
        padding-top: 20px
</style>
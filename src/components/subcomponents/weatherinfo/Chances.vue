<script setup>
import { format } from 'date-fns'
import { storeToRefs } from 'pinia'
import { useCurrentWeatherStore } from '@/store/weather/currentWeather'

const { forecast } = storeToRefs(useCurrentWeatherStore())
</script>

<template>
  <div class="weather-chances-container">
    <div class="weather-chances-wrapper">
      <h2>Chances of rain</h2>
      <div
        class="chance-item"
        v-for="hour in forecast.hour"
      >
        <p>{{format(new Date(hour.time), 'HH a')}}</p>

        <div class="chance-bars">
          <div class="back-bar">
            <div :style="{width: hour['chance_of_rain'] + '%'}" class="actual-percentage-bar"></div>
          </div>
        </div>

        <p>{{hour['chance_of_rain']}} %</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.weather-chances-container
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  margin: 20px 0
  color: #f2f7f9
  .weather-chances-wrapper
    display: flex
    flex-direction: column
    justify-content: center
    gap: 10px
    width: 100%
    .chance-item
      display: flex
      justify-content: space-between
      align-items: center
      p
        font-size: 15px
      .chance-bars
        max-width: 220px
        width: 100%
        height: 30px
        .back-bar
          width: 100%
          background-color: #244366
          border-radius: 20px
          height: 100%
          .actual-percentage-bar
            width: 0%
            background-color: #81b3ff
            border-radius: 20px
            height: 100%
    h2
      text-align: left
</style>
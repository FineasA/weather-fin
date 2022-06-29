<script setup>
import { useCurrentWeatherStore } from '@/store/weather/currentWeather'
import { storeToRefs } from 'pinia'

const { formattedDate, formattedLocation } = storeToRefs(useCurrentWeatherStore())
</script>

<template>
  <div class="location-info-container">
    <div class="location-text">
      <h2>{{formattedLocation}}</h2>
    </div>

    <div class="location-time">
      <h2>{{ formattedDate.clockTime.toUpperCase() }}</h2>
    </div>
  </div>
</template>

<style scoped lang="sass">
.location-info-container
  display: flex
  justify-content: space-between
  align-items: center
  width: 100%
  color: #f2f7f9
  .location-text
    text-align: left
  .location-time
    h2
      letter-spacing: 1.5px
</style>
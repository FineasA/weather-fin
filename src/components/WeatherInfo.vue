<script setup>
import LocationInfo from '@/components/subcomponents/weatherinfo/LocationInfo'
import WeatherDisplay from '@/components/subcomponents/weatherinfo/WeatherDisplay'
import Chances from '@/components/subcomponents/weatherinfo/Chances'
</script>

<template>
  <div class="weather-info-container">
    <div class="weather-info-wrapper">
      <LocationInfo/>
      <WeatherDisplay/>
      <hr class="divider"/>
      <Chances/>
    </div>
  </div>
</template>

<style scoped lang="sass">
.weather-info-container
  display: flex
  flex-direction: column
  justify-content: flex-start
  gap: 20px
  align-items: center
  max-width: 400px
  min-height: 500px
  padding: 20px
  width: 100%
  background-color: #173656
  .weather-info-wrapper
    max-width: 320px
    width: 100%
    .divider
      border: 1px solid #2e4d6c
</style>
<script setup>
import LocationInfo from '@/components/subcomponents/weatherinfo/LocationInfo'
</script>

<template>
  <div class="weather-info-container">
    <LocationInfo/>
  </div>
</template>

<style scoped lang="sass">
.weather-info-container
  display: flex
  flex-direction: column
  justify-content: flex-start
  align-items: center
  max-width: 400px
  min-height: 500px
  padding: 20px
  width: 100%
  background-color: #173656
</style>
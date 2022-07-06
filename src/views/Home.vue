<script setup>
import Statistics from '@/components/Statistics.vue'
import WeatherInfo from '@/components/WeatherInfo.vue'
</script>

<template>
  <div class="container">
    <div class="wrapper statistics-wrapper">
      <Statistics/>
    </div>
    <WeatherInfo/>
  </div>
</template>

<style lang="sass">
@import "src/assets/styles/main"

.statistics-wrapper
  margin: 0 auto
  overflow: auto
  height: 100vh
</style>


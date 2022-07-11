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

/* width */
::-webkit-scrollbar
  width: 5px
  margin-left: 5px

/* Track */
::-webkit-scrollbar-track
  background: #f1f1f1

/* Handle */
::-webkit-scrollbar-thumb
  background: #244366

/* Handle on hover */
::-webkit-scrollbar-thumb:hover
  background: #81b3ff
</style>


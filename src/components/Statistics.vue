<script setup>
import SearchLocation from '@/components/subcomponents/statistics/SearchLocation.vue'
import TodayOverview from '@/components/subcomponents/statistics/TodayOverview.vue'
import HourlyTemperature from '@/components/subcomponents/statistics/HourlyTemperature.vue'
</script>

<template>
  <div class="statistics-container">
    <SearchLocation/>
    <hr class="divider"/>
    <TodayOverview/>
    <HourlyTemperature/>
  </div>
</template>

<style scoped lang="sass">
.statistics-container
  display: flex
  flex-direction: column
  align-items: center
  height: 100%
  width: 100%
</style>
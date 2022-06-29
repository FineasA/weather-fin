<script setup>
import SearchLocation from '@/components/subcomponents/statistics/SearchLocation.vue'
import TodayOverview from '@/components/subcomponents/statistics/TodayOverview.vue'
import AverageWeeklyTemp from '@/components/subcomponents/statistics/AverageWeeklyTemp.vue'
</script>

<template>
  <div class="statistics-container">
    <SearchLocation/>
    <hr class="divider"/>
    <TodayOverview/>
    <AverageWeeklyTemp/>
  </div>
</template>

<style scoped lang="sass">
.statistics-container
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  width: 100%
</style>
<script setup>
import SearchLocation from '@/components/subcomponents/statistics/SearchLocation'
</script>

<template>
  <div class="statistics-container">
    <SearchLocation/>
  </div>
</template>

<style scoped lang="sass">
.statistics-container
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  max-width: 800px
  width: 100%
</style>
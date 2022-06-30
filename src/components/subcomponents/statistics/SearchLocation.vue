<script setup>
import { ref, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useCurrentWeatherStore } from '@/store/weather/currentWeather'

const { requestCurrentWeather, setLocation } = useCurrentWeatherStore()
const { locationQuery, formattedDate } = storeToRefs(useCurrentWeatherStore())

const userQuery = ref('')

const search = () => {
  setLocation(userQuery.value)
  userQuery.value = ''
}

onBeforeMount(() => {
  requestCurrentWeather(locationQuery.value)
})
</script>

<template>
    <div class="search-location-container">
    <div class="search-location-wrapper">

      <div class="current-date-info">
        <h2 class="short-month-info">{{ formattedDate.monthAndYear }}</h2>
        <p class="month-muted">{{ formattedDate.fullDate }}</p>
      </div>

      <div class="info-container">
        <label>
          <input
            type="text"
            placeholder="Search location here"
            v-model="userQuery"
            @keyup.enter="search"
          />
        </label>

        <div class="nav-tool notifications">
          <img src="../../../assets/svg/bell.svg" alt="">
        </div>
        
        <div class="nav-tool user">
          <img src="../../../assets/svg/user.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "src/assets/styles/constants"
.search-location-container
  display: flex
  justify-content: flex-start
  align-items: center
  width: 100%
  padding-bottom: 20px
  .search-location-wrapper
    display: flex
    justify-content: space-between
    align-items: center
    gap: 10px
    width: 100%
    .current-date-info
      width: 33%
      text-align: left
      .short-month-info
        font-weight: 900
      .month-muted
        color: $muted-color
    .info-container
      width: 100%
      display: flex
      justify-content: flex-end
      align-items: center
      gap: 20px
      .nav-tool
        display: flex
        justify-content: center
        width: 45px
        img
          margin: 13px
          filter: invert(38%) sepia(0%) saturate(0%) hue-rotate(30deg) brightness(93%) contrast(92%)
      input, .nav-tool
        background-color: $faded-grey
        color: $main-color
        height: 45px
        border-radius: 5px
        border: none
      label
        position: relative
        margin-right: 40px
        max-width: 320px
        width: 100%
        input
          font-size: 16px
          width: 100%
          padding-left: 40px
      label::before
        content: ""
        position: absolute
        left: 10px
        top: 0
        bottom: 0
        width: 20px
        background: url("../../../assets/svg/search.svg") center / contain no-repeat
        filter: invert(38%) sepia(0%) saturate(0%) hue-rotate(30deg) brightness(93%) contrast(92%)
</style>
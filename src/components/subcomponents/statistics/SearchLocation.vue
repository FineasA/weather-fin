<script setup>
import axios from 'axios'
import { ref, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useCurrentWeatherStore } from '@/store/weather/currentWeather'
const { requestCurrentWeather } = useCurrentWeatherStore()
const { locationQuery, location } = storeToRefs(useCurrentWeatherStore())

let timer
const waitTime = 200
const arrowKeyCodes = [37, 38, 39, 40]

const userQuery = ref('')
const showAutoComplete = ref(false)
const searchResult = ref([])
const searchResultIndex = ref(0)

const search = (autoCompleteSearch) => {
  if (!showAutoComplete.value) return

  if (autoCompleteSearch) {
    console.log(searchResult.value)
    if (Object.keys(searchResult.value).length > 0) {
      userQuery.value = searchResult.value[searchResultIndex.value].name
    }
    showAutoComplete.value = false
    searchResultIndex.value = 0
  }

  requestCurrentWeather(userQuery.value)
  userQuery.value = ''
}

const searchAutocomplete = async () => {
  const requestParameter = 'search.json'
  const baseUrl = import.meta.env.VITE_WEATHER_BASE_URL
  const key = import.meta.env.VITE_WEATHER_API_KEY
  const requestUrl = `${baseUrl}/${requestParameter}?key=${key}`
  const q = `&q=${userQuery.value}`
  const url = requestUrl + q

  await axios.get(url)
    .then(({ data }) => {
      searchResult.value = data
      showAutoComplete.value = true
    })
}

const searchAutocompleteHandler = (e) => {
  if (arrowKeyCodes.includes(e.keyCode)) return
  searchResultIndex.value = 0
  showAutoComplete.value = false
  if (!userQuery.value.length) return

  clearTimeout(timer)

  timer = setTimeout(async () => {
    await searchAutocomplete()
  }, waitTime)
}

const searchAutoCompleteKeyHandler = (e) => {
  if (!arrowKeyCodes.includes(e.keyCode)) return

  switch(e.keyCode) {
    case 38: //up arrow
      searchResultIndex.value--
      break
    case 40: //down arrow
      searchResultIndex.value++
      break
  }

  if (searchResultIndex.value === searchResult.value.length) {
    searchResultIndex.value = 0
  }

  if (searchResultIndex.value < 0) {
    searchResultIndex.value = searchResult.value.length - 1
  }
}

onBeforeMount(() => {
  requestCurrentWeather(locationQuery.value)
})
</script>

<template>
    <div class="search-location-container">
    <div class="search-location-wrapper">
      <div class="current-date-info">
        <h2 class="short-month-info">{{ location.formattedDate.monthAndYear }}</h2>
        <p class="month-muted">{{ location.formattedDate.fullDate }}</p>
      </div>

      <div class="info-container">
        <div class="search-container">
          <label>
            <span class="auto-complete-container">
              <ul
                v-if="showAutoComplete"
                class="auto-complete-list"
              >
                <li
                  @click="search(result.name)"
                  v-for="(result, index) in searchResult"
                  :class="{'selected' : searchResultIndex === index}"
                >
                  {{result.name}}
                </li>
              </ul>
            </span>
            <input
              type="text"
              placeholder="Search location here"
              v-model="userQuery"
              @keyup.enter="search"
              @keyup="searchAutocompleteHandler($event)"
              @keyup.down.up="searchAutoCompleteKeyHandler"
            />
          </label>
        </div>

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
      .search-container
        width: 100%
        max-width: 320px
        margin-right: 40px
        position: relative
        .auto-complete-container
          width: 100%
          position: absolute
          top: 100%
          left: 0
          z-index: 2
          box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1)
          border-bottom-left-radius: 10px
          background-color: #fff
          border-bottom-right-radius: 10px
          ul
            li:nth-child(odd)
              background-color: #eee
            li
              display: flex
              justify-content: flex-start
              align-items: center
              list-style: none
              text-align: left
              height: 30px
              padding: 5px 10px
              cursor: pointer
              &.selected
                background-color: #d7d6d6
              &:hover
                background-color: #d7d6d6
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
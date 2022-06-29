import { defineStore } from 'pinia'
import axios from 'axios'

const requestParameter = 'current.json'
const baseUrl = process.env.VUE_APP_WEATHER_BASE_URL
const key = process.env.VUE_APP_WEATHER_API_KEY
console.log(process.env)
const requestUrl = `${baseUrl}/${requestParameter}?key=${key}`

export const useCurrentWeatherStore = defineStore('currentWeather', {
  state: () => ({
    data: {}
  }),
  actions: {
    async requestCurrentWeather(location) {
      const q = `&q=${location}`
      const url = requestUrl + q
      console.log('url:', url)
      this.data = await axios.get(url)
        .then(resp => {
          console.log('resp:', resp)
        })
    }
  }
})
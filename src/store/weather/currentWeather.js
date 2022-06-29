import { defineStore } from 'pinia'
import axios from 'axios'

const requestParameter = 'current.json'
const baseUrl = import.meta.env.VITE_WEATHER_BASE_URL
const key = import.meta.env.VITE_WEATHER_API_KEY
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
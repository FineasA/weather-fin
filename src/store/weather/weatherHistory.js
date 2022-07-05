import { defineStore } from 'pinia'
import { format } from 'date-fns'
import axios from 'axios'

const requestParameter = 'history.json'
const baseUrl = import.meta.env.VITE_WEATHER_BASE_URL
const key = import.meta.env.VITE_WEATHER_API_KEY
const requestUrl = `${baseUrl}/${requestParameter}?key=${key}`

export const useWeatherHistoryStore = defineStore('weatherHistory', {
  state: () => ({
    forecastdays: []
  }),
  actions: {
    async requestWeatherHistory(location) {
      const now = new Date()
      const one_week_ago = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)

      const q = `&q=${location}&dt=${format(one_week_ago, 'yyyy-MM-dd')}`
      const url = requestUrl + q

      await axios.get(url)
        .then((resp) => {
          console.log('resp:', resp)
        })
    }
  }
})
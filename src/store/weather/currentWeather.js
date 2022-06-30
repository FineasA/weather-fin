import { defineStore } from 'pinia'
import { format } from 'date-fns'
import axios from 'axios'

const requestParameter = 'current.json'
const baseUrl = import.meta.env.VITE_WEATHER_BASE_URL
const key = import.meta.env.VITE_WEATHER_API_KEY
const requestUrl = `${baseUrl}/${requestParameter}?key=${key}`

export const useCurrentWeatherStore = defineStore('currentWeather', {
  state: () => ({
    locationQuery: 'Chicago',
    temp_c: 0,
    temp_f: 0,
    uv: 0,
    wind_kph: 0,
    wind_mph: 0,
    pressure_in: 0,
    pressure_mb: 0,
    local_time: '',
    city: '',
    region: '',
    country: '',
    condition: {
      icon: '',
      text: ''
    },
    formattedDate: {
      clockTime: '',
      monthAndYear: '',
      fullDate: '',
    },
    formattedLocation: '',
    temp_mode: 'c'
  }),
  actions: {
    setTemperatureMode(mode) {
      this.temp_mode = mode
    },
    async setLocation(location) {
      this.locationQuery = location
      await this.requestCurrentWeather(this.locationQuery)
    },
    async requestCurrentWeather() {
      const q = `&q=${this.locationQuery}`
      const url = requestUrl + q
      console.log('url:', url)
      await axios.get(url)
        .then(({ data }) => {
          const { current, location } = data

          this.temp_c = current.temp_c
          this.temp_f = current.temp_f
          this.uv = current.uv
          this.wind_kph = current.wind_kph
          this.wind_mph = current.wind_mph
          this.pressure_in = current.pressure_in
          this.pressure_mb = current.pressure_mb
          this.condition.icon = current.condition.icon
          this.condition.text = current.condition.text

          this.local_time = location.localtime
          this.city = location.name
          this.region = location.region
          this.country = location.country

          //formatted local time and date
          const date = new Date(location.localtime)
          this.formattedDate.clockTime = format(date, "HH:mm aaaaa'm'")
          this.formattedDate.monthAndYear = format(date, 'MMMMMMM y')
          this.formattedDate.fullDate = format(date, 'eeee, MMM d, y')

          //format location
          console.log(location.name)
          this.formattedLocation = location.name + (location.region ? `, ${location.region}` : '')
        })
    }
  }
})
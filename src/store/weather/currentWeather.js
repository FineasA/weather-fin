import { defineStore } from 'pinia'
import { format, getHours } from 'date-fns'
import axios from 'axios'

const requestParameter = 'forecast.json'
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
    forecast: {
      astro: {
        sunrise: '',
        sunset: ''
      },
      hour: []
    },
    formattedLocation: '',
    temp_mode: 'c'
  }),
  actions: {
    setTemperatureMode(mode) {
      this.temp_mode = mode
    },
    async requestCurrentWeather(location) {
      const q = `&q=${location}`
      const url = requestUrl + q
      console.log('url:', url)
      await axios.get(url)
        .then(({ data }) => {
          const { current, location, forecast } = data

          //extract current temperature data
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

          //set date using localtime
          const date = new Date(location.localtime)
          const current_hour = getHours(date)

          //extract forecast data
          const { forecastday } = forecast
          const { astro, hour } = forecastday[0]

          this.forecast.astro.sunrise = astro.sunrise
          this.forecast.astro.sunset = astro.sunset

          //we only want to get all the hours that have not come to be (inclusive)
          this.forecast.hour = hour.splice(current_hour, hour.length, 0)

          //TODO: Find a minimum of forecast rows to display, if the forecast hour array is smaller than the minimum,
          // get the forecast for the next day...

          //formatted local time and date
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
import { defineStore } from 'pinia'
import { format, getHours, differenceInHours } from 'date-fns'
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
        sunset: '',
        sunrise_date: null,
        sunset_date: null,
        hours_to_sunrise: 0,
        hours_to_sunset: 0
      },
      hour: [
        {
          chance_of_rain: 0,
          chance_of_snow: 0,
          temp_c: 0,
          temp_f: 70.3,
          uv: 0,
          time: new Date()
        }
      ]
    },
    formattedLocation: '',
    temp_mode: 'c',
    wind_speed_mode: 'kmh',
    pressure_mode: 'pascal'
  }),
  actions: {
    setTemperatureMode(mode) {
      this.temp_mode = mode
    },
    setWindSpeedMode(mode) {
      this.wind_speed_mode = mode
    },
    setPressureMode(mode) {
      this.pressure_mode = mode
    },
    async requestCurrentWeather(location) {
      const q = `&q=${location}&days=2`
      const url = requestUrl + q
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

          //convert sunset and sunrise times to valid date objects
          const sunset_date_str = (forecastday[0].date + ' ' + astro.sunset).toString()
          const sunrise_date_str = (forecastday[0].date + ' ' + astro.sunrise).toString()
          this.forecast.astro.sunrise_date = new Date(sunrise_date_str)
          this.forecast.astro.sunset_date = new Date(sunset_date_str)

          this.forecast.astro.hours_to_sunrise = differenceInHours(this.forecast.astro.sunrise_date, date)
          this.forecast.astro.hours_to_sunset = differenceInHours(this.forecast.astro.sunset_date, date)

          //we only want to get all the hours that have not come to be (inclusive)
          this.forecast.hour = hour.splice(current_hour, hour.length, 0)

          //TODO: Find a minimum of forecast rows to display, if the forecast hour array is smaller than the minimum,
          // get the forecast for the next day...

          //formatted local time and date
          this.formattedDate.clockTime = format(date, "HH:mm aaaaa'm'")
          this.formattedDate.monthAndYear = format(date, 'MMMMMMM y')
          this.formattedDate.fullDate = format(date, 'eeee, MMM d, y')

          //format location
          this.formattedLocation = location.name + (location.region ? `, ${location.region}` : '')
        })
    }
  }
})
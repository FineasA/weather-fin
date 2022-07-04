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
    current: {
      temp_c: 0,
      temp_f: 0,
      uv: 0,
      wind_kph: 0,
      wind_mph: 0,
      pressure_in: 0,
      pressure_mb: 0,
      condition: {
        icon: '',
        text: ''
      },
    },
    location: {
      local_time: '',
      city: '',
      region: '',
      country: '',
      formattedDate: {
        clockTime: '',
        monthAndYear: '',
        fullDate: ''
      },
      formattedLocation: '',
    },
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
    temp_mode: 'c',
    wind_speed_mode: 'kmh',
    pressure_mode: 'pascal'
  }),
  getters: {
    getLocalTime: (state) => new Date(state.location.local_time)
  },
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
    setCurrentWeather({ temp_c, temp_f, uv, wind_kph, wind_mph, pressure_in, pressure_mb, condition }) {
      //extract current temperature data
      this.current.temp_c = temp_c
      this.current.temp_f = temp_f
      this.current.uv = uv
      this.current.wind_kph = wind_kph
      this.current.wind_mph = wind_mph
      this.current.pressure_in = pressure_in
      this.current.pressure_mb = pressure_mb
      this.current.condition.icon = condition.icon
      this.current.condition.text = condition.text
    },
    setLocationInfo({ localtime, name, region, country }) {
      this.location.local_time = localtime
      this.location.city = name
      this.location.region = region
      this.location.country = country

      //format location
      this.location.formattedLocation = name + (region ? `, ${region}` : '')
    },
    formatTime() {
      //formatted local time and date
      this.location.formattedDate.clockTime = format(this.getLocalTime, "HH:mm aaaaa'm'")
      this.location.formattedDate.monthAndYear = format(this.getLocalTime, 'MMMMMMM y')
      this.location.formattedDate.fullDate = format(this.getLocalTime, 'eeee, MMM d, y')
    },
    async requestCurrentWeather(location) {
      const q = `&q=${location}&days=2`
      const url = requestUrl + q
      await axios.get(url)
        .then(({ data }) => {
          const { current, location, forecast } = data

          this.setCurrentWeather(current)
          this.setLocationInfo(location)
          this.formatTime()

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

        })
    }
  }
})
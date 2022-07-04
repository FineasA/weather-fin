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
    daily: {
      avghumidity: 0,
      avgtemp_c: 0,
      avgtemp_f: 0,
      avgvis_km: 0,
      avgvis_miles: 0,
      daily_chance_of_rain: 0,
      daily_chance_of_snow: 0,
      daily_will_it_rain: 0,
      daily_will_it_snow: 0,
      maxtemp_c: 0,
      maxtemp_f: 0,
      maxwind_kph: 0,
      maxwind_mph: 0,
      mintemp_c: 0,
      mintemp_f: 0,
      totalprecip_in: 0,
      totalprecip_mm: 0,
      uv: 0
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
    async requestCurrentWeather(location) {
      const q = `&q=${location}&days=2`
      const url = requestUrl + q
      await axios.get(url)
        .then(({ data }) => {
          const { current, location, forecast } = data
          //extract forecast data
          const { forecastday } = forecast

          this.setCurrentWeather(current)
          this.setLocationInfo(location)
          this.formatTime()
          this.setForecast(forecastday)
          this.setDailyWeather(forecastday)
        })
    },
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
    setForecast(forecastday) {
      //set date using localtime
      const current_hour = getHours(this.getLocalTime)
      const { astro, hour, date } = forecastday[0]

      //get all hours from forecastday obj
      const hours = forecastday.map(forecast => forecast.hour)
      hours[0] = hours[0].splice(current_hour, hour.length, 0)

      this.setForecastAstro(astro, date)

      //we only want to get all the hours that have not come to be (inclusive)
      this.forecast.hour = hours
    },
    setForecastAstro(astro, date) {
      this.forecast.astro.sunrise = astro.sunrise
      this.forecast.astro.sunset = astro.sunset

      //convert sunset and sunrise times to valid date objects
      const sunset_date_str = (date + ' ' + astro.sunset).toString()
      const sunrise_date_str = (date + ' ' + astro.sunrise).toString()
      this.forecast.astro.sunrise_date = new Date(sunrise_date_str)
      this.forecast.astro.sunset_date = new Date(sunset_date_str)

      this.forecast.astro.hours_to_sunrise = differenceInHours(this.forecast.astro.sunrise_date, this.getLocalTime)
      this.forecast.astro.hours_to_sunset = differenceInHours(this.forecast.astro.sunset_date, this.getLocalTime)
    },
    setDailyWeather(forecastday) {
      const { day } = forecastday[0]

      const {
        avghumidity,
        avgtemp_c,
        avgtemp_f,
        avgvis_km,
        avgvis_miles,
        daily_chance_of_rain,
        daily_chance_of_snow,
        maxtemp_c,
        maxtemp_f,
        maxwind_kph,
        maxwind_mph,
        mintemp_c,
        mintemp_f,
        totalprecip_in,
        totalprecip_mm,
        uv,
      } = day

      this.daily.avghumidity = avghumidity
      this.daily.avgtemp_c = avgtemp_c
      this.daily.avgtemp_f = avgtemp_f
      this.daily.avgvis_km = avgvis_km
      this.daily.avgvis_m = avgvis_miles
      this.daily.daily_chance_of_rain = daily_chance_of_rain
      this.daily.daily_chance_of_snow = daily_chance_of_snow
      this.daily.maxtemp_c = maxtemp_c
      this.daily.maxtemp_f = maxtemp_f
      this.daily.maxwind_kph = maxwind_kph
      this.daily.maxwind_mph = maxwind_mph
      this.daily.mintemp_c = mintemp_c
      this.daily.mintemp_f = mintemp_f
      this.daily.totalprecip_in = totalprecip_in
      this.daily.totalprecip_mm = totalprecip_mm
      this.daily.uv = uv
    }
  }
})
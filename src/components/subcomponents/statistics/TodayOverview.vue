<script setup>
import { storeToRefs } from 'pinia'
import { useCurrentWeatherStore } from '@/store/weather/currentWeather'

const { setWindSpeedMode, setPressureMode } = useCurrentWeatherStore()
const {
  forecast,
  current,
  daily,
  wind_speed_mode,
  pressure_mode
} = storeToRefs(useCurrentWeatherStore())
</script>

<template>
  <div class="today-overview-container">
    <div class="today-overview-wrapper">
      <div class="first-overview-row">
        <h2>Today overview</h2>
        <div class="controls">
          <div class="metric-controls">
            <button
              :class="{'active' : wind_speed_mode === 'kmh'}"
              @click="setWindSpeedMode('kmh')"
            >
              kmh
            </button>
            <button
              :class="{'active' : wind_speed_mode === 'mph'}"
              @click="setWindSpeedMode('mph')"
            >
              mph
            </button>
          </div>

          <div class="metric-controls">
            <button
              :class="{'active' : pressure_mode === 'pascal'}"
              @click="setPressureMode('pascal')"
            >
              p
            </button>
            <button
              :class="{'active' : pressure_mode === 'mbar'}"
              @click="setPressureMode('mbar')"
            >
              mbar
            </button>
          </div>
        </div>
      </div>
      <div class="overview-grid">
        <div class="grid-item" id="wind-speed">
          <div class="grid-item-wrapper">
            <div class="icon"></div>
            <div class="stats">
              <h3 class="title">Wind Speed</h3>
              <h2>{{ wind_speed_mode === 'kmh' ? current.wind_kph + ' kmh' : current.wind_mph + ' mph' }}</h2>
            </div>
            <div class="stat-growth">
              <img class="down" src="../../../assets/svg/down-arrow.svg" alt="">
              <p>2km/h</p>
            </div>
          </div>
        </div>

        <div class="grid-item" id="rain-chance">
          <div class="grid-item-wrapper">
            <div class="icon"></div>
            <div class="stats">
              <h3 class="title">Rain Chance</h3>
              <h2>{{ daily.daily_chance_of_rain }}</h2>
            </div>
            <div class="stat-growth">
              <img src="../../../assets/svg/up-arrow.svg" alt="" class="up">
              <p>10%</p>
            </div>
          </div>
        </div>

        <div class="grid-item" id="pressure">
          <div class="grid-item-wrapper">
            <div class="icon"></div>
            <div class="stats">
              <h3 class="title">Pressure</h3>
              <h2>{{ pressure_mode === 'pascal' ? current.pressure_in + ' p' : current.pressure_mb + ' mbar' }}</h2>
            </div>
            <div class="stat-growth">
              <img src="../../../assets/svg/up-arrow.svg" alt="" class="up">
              <p>32 hpa</p>
            </div>
          </div>
        </div>

        <div class="grid-item" id="uv-index">
          <div class="grid-item-wrapper">
            <div class="icon"></div>
            <div class="stats">
              <h3 class="title">UV Index</h3>
              <h2>{{daily.uv}}</h2>
            </div>
            <div class="stat-growth">
              <img src="../../../assets/svg/down-arrow.svg" alt="" class="down">
              <p>0,3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
@import "src/assets/styles/constants"
.today-overview-container
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  padding-top: 40px
  .today-overview-wrapper
    display: flex
    justify-content: center
    align-items: flex-start
    flex-direction: column
    width: 100%
    gap: 20px
    .first-overview-row
      display: flex
      justify-content: space-between
      align-items: center
      width: 100%
      .controls
        display: flex
        justify-content: center
        align-items: center
        max-width: 320px
        width: 100%
        .metric-controls
          display: flex
          justify-content: flex-end
          align-items: center
          width: 100%
          button:first-child
            border-top-left-radius: 5px
            border-bottom-left-radius: 5px
            border-right: none
          button:last-child
            border-top-right-radius: 5px
            border-bottom-right-radius: 5px
            border-left: none
          button
            display: flex
            justify-content: center
            align-items: center
            padding: 15px
            height: 25px
            width: 60px
            background-color: #9eacc7
            border: none
            color: #fff
            cursor: pointer
            &.active
              background-color: #224c87
    .overview-grid
      display: grid
      grid-template-columns: repeat(2, 1fr)
      grid-template-rows: repeat(2, 1fr)
      grid-gap: 20px 40px
      width: 100%
      .grid-item
        display: flex
        justify-content: center
        align-items: center
        padding: 10px
        width: 100%
        height: 115px
        background-color: $faded-grey
        box-shadow: $box-shadow
        border-radius: 5px
        cursor: pointer
        transition: all 0.5s ease-in
        &:hover
          transform: translateY(-10px)
          transition: all 0.5s ease-out
          background-color: #fff
        .grid-item-wrapper
          display: flex
          justify-content: center
          align-items: center
          width: 100%
          max-width: 320px
          gap: 20px
          .icon
            width: 40px
            height: 40px
            filter: invert(38%) sepia(63%) saturate(4800%) hue-rotate(210deg) brightness(98%) contrast(87%)
          .stats
            text-align: left
            .title
              color: $muted-color
              font-weight: 300
              font-size: 16px
              letter-spacing: 2px
            h2
              font-size: 26px
              letter-spacing: 1.5px
          .stat-growth
            display: flex
            justify-content: center
            align-items: center
            align-self: flex-end
            margin-left: auto
            gap: 10px
            p
              color: $muted-color
              letter-spacing: 1.5px
            img
              height: 13px
              width: 13px
              &.down
                filter: invert(85%) sepia(54%) saturate(5777%) hue-rotate(300deg) brightness(117%) contrast(109%)
              &.up
                filter: invert(27%) sepia(63%) saturate(4007%) hue-rotate(214deg) brightness(102%) contrast(100%)
      .grid-item#wind-speed .icon
        background: url("../../../assets/svg/weather/wind.svg") center / contain no-repeat
      .grid-item#rain-chance .icon
        background: url("../../../assets/svg/weather/rain.svg") center / contain no-repeat
      .grid-item#pressure .icon
        background: url("../../../assets/svg/weather/pressure.svg") center / contain no-repeat
      .grid-item#uv-index .icon
        background: url("../../../assets/svg/weather/sun.svg") center / contain no-repeat

@media screen and (max-width: 1200px)
  .today-overview-container .today-overview-wrapper .overview-grid
    grid-template-columns: repeat(1, 1fr)
    grid-gap: 10px

@media screen and (max-width: 1080px)
  .today-overview-container .today-overview-wrapper .first-overview-row
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 10px
    .controls .metric-controls
      justify-content: center

@media screen and (max-width: 680px)
  .today-overview-container .today-overview-wrapper
    .overview-grid .grid-item
      height: unset
      .grid-item-wrapper
        flex-direction: column
        .stat-growth
          margin-left: unset
          align-self: unset
        .stats
          text-align: center

@media screen and (max-width: 300px)
  .today-overview-container .today-overview-wrapper .first-overview-row .controls
    flex-direction: column
    gap: 10px
</style>
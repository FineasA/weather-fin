<script setup>
</script>

<template>
  <div class="weather-display-container">
    <div class="weather-display-wrapper">
      <div class="weather-icon-row">
        <img src="../../../assets/svg/weather/rain-moon.svg" alt="">
      </div>
      <div class="weather-display-row">
        <h2>20&deg;C</h2>
        <div class="weather-type">
          <p>Dramatic</p>
          <p>Cloudy</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.weather-display-container
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  margin-top: 60px
  color: #f2f7f9
  p
    font-size: 20px
    font-weight: 100
  h2
    font-size: 60px
    letter-spacing: 1.5px
    font-weight: 100
  .weather-display-wrapper
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    width: 100%
    .weather-icon-row
      align-self: flex-start
      img
        height: 45px
        width: 45px
    .weather-display-row
      display: flex
      justify-content: space-between
      align-items: center
      width: 100%
      .weather-type
        text-align: right
</style>
<script setup>
</script>

<template>
<div class="sunrise-sunset-container">
  <div class="sunrise-sunset-wrapper">
    <h2>Sunrise & Sunset</h2>
    <div class="rise-set-items">
      <div class="rise-set-item">
        <img src="../../../assets/svg/weather/sun.svg" alt="">
        <div class="text">
          <p>Sunrise</p>
          <p class="time">4:20 AM</p>
        </div>

        <div class="time-estimation">
          <p>4 hours ago</p>
        </div>
      </div>

      <div class="rise-set-item">
        <img src="../../../assets/svg/weather/sunset.svg" alt="">
        <div class="text">
          <p>Sunset</p>
          <p class="time">5:50 PM</p>
        </div>

        <div class="time-estimation">in 9 hours</div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="sass">
.sunrise-sunset-container
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  margin: 20px 0
  color: #f2f7f9
  .sunrise-sunset-wrapper
    display: flex
    flex-direction: column
    justify-content: center
    gap: 10px
    width: 100%
    h2
      text-align: left
    .rise-set-items
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      gap: 10px
      width: 100%
      .rise-set-item
        display: flex
        justify-content: center
        align-items: center
        width: 100%
        gap: 10px
        padding: 0 10px
        border-radius: 5px
        border: 1px solid #5885ca
        background-color: #224c87
        height: 80px
        .text
          .time
            font-weight: 500
        img
          filter: invert(53%) sepia(41%) saturate(231%) hue-rotate(173deg) brightness(96%) contrast(88%)
          height: 35px
          width: 35px
        .time-estimation
          margin-left: auto

</style>
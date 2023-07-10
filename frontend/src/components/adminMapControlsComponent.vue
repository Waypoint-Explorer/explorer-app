<script lang="ts">
  import {defineComponent, ref} from "vue";
  import { Environment } from "../environment";
  import axios from "axios";
  import router from "../router";

  export default defineComponent({
    data() {
      return {
        isControlsExpanded: false,
        hour: ref(12),
        date: new Date(),
      };
    },
    mounted() {
    },
    methods: {
    },
    watch: {
      hour: function () {
        this.emitter.emit("filterByDate", {date: this.date, hour: this.hour})
      },
      date: function () {
        this.emitter.emit("filterByDate", {date: this.date, hour: this.hour})
      }
    }
  });
</script>

<template>
  <div class="controls-container" :class="{expanded: isControlsExpanded}">
    <button class="expand-button p-button p-component p-button-icon-only p-button-rounded" type="button" @click="isControlsExpanded = !isControlsExpanded">
      <span v-if="!isControlsExpanded" class="material-icons">expand_less</span>
      <span v-if="isControlsExpanded" class="material-icons">expand_more</span>
    </button>
    <div class="measures-selection-buttons">
      <button class="p-button p-component p-button-icon-only p-button-rounded" type="button" @click="this.emitter.emit('showTemperature')">
        <span class="material-symbols-outlined">thermometer</span>
      </button>
      <button class="p-button p-component p-button-icon-only p-button-rounded" type="button" @click="this.emitter.emit('showHumidity')">
        <span class="material-symbols-outlined">humidity_percentage</span>
      </button>
      <button class="p-button p-component p-button-icon-only p-button-rounded" type="button" @click="this.emitter.emit('showAtmosphericPressure')">
        <span class="material-icons-outlined">speed</span>
      </button>
      <button class="p-button p-component p-button-icon-only p-button-rounded" type="button" @click="this.emitter.emit('showAirQuality')">
        <span class="material-icons-outlined">co2</span>
      </button>
    </div>
    <div class="hours-slider-container">
      <sliderComp v-model="this.hour" :step="100/24"></sliderComp>
    </div>
    <div class="hours-marks-container">
      <p>00:00</p>
      <p>03:00</p>
      <p>07:00</p>
      <p>11:00</p>
      <p>14:00</p>
      <p>18:00</p>
      <p>23:00</p>
    </div>
    <div class="calendar-container">
      <calendarComp showIcon  v-model="this.date" dateFormat="dd/mm/yy"></calendarComp>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .controls-container {
    position: absolute;
    z-index: 1;
    bottom: 0;
    width: calc(100vw - 2 * 1.2rem);
    height: calc(2.488rem + 1.728rem + 1.2rem);
    padding: 1.728rem 1.2rem 1.2rem 1.2rem;
    margin: 0 1.2rem;
    border-radius: 25px 25px 0 0;
    background-color: var(--surface-a);
    transition-duration: 500ms;
    transition-timing-function: cubic-bezier(0.5,0.25,0,1);
  }
  .expand-button {
    height: 2.488rem;
    position: absolute;
    top: -1.244rem;
    left: calc(50% - 1.244rem);
  }
  .expanded {
    height: calc((1.728rem * 2) + 2.488rem + (1.440rem + 2.488rem) + 1rem + 4.2rem);
  }
  .measures-selection-buttons {
    height: 2.488rem;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: center;
  }
  .hours-slider-container {
    height: 1.440rem;
    display: flex;
    align-items: center;
    margin-top: 2.488rem;
    padding: 0 1.2rem;
  }
  .p-slider {
    width: 100%;
  }
  .hours-marks-container {
    display: flex;
    justify-content: space-between;
    font-size: 0.694rem;
  }
  .calendar-container {
    margin: 1.2rem 0 0 0;
    height: 3rem;
  }
</style>

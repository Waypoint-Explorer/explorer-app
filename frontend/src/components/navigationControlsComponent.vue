<script lang="ts">
  import {defineComponent} from "vue";
  import { Environment } from "../environment";
  import axios from "axios";
  import router from "../router";

  export default defineComponent({
    data() {
      return {
        suggestedItineraryCompleted: false
      };
    },
    mounted() {
      this.emitter.on("suggestedItineraryCompleted", () => {
        this.suggestedItineraryCompleted = true;
      });
    },
    methods: {
      visit() {
        this.emitter.emit("waypointVisited");
      }
    }
  });
</script>

<template>
  <div class="controls-container">
    <button class="p-button p-component p-button-icon-only p-button-rounded" type="button" @click="visit">
      <span class="material-icons-outlined">skip_next</span>
    </button>
    <button class="p-button p-component p-button-icon-only p-button-rounded" type="button" v-show="this.suggestedItineraryCompleted">
      <span class="material-icons-outlined">stop</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
  .controls-container {
    position: absolute;
    z-index: 1;
    bottom: 0;
    width: 100%;
    height: 3rem;
    padding: 0 1.728rem;
    margin: 1rem 0;
    align-items: center;
    justify-content: space-around;
    display: flex;
    flex-direction: row;
  }
</style>

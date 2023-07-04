<script lang="ts">
  import {defineComponent} from "vue";
  import { Environment } from "../environment";
  import axios from "axios";
  import router from "../router";

  export default defineComponent({
    data() {
      return {
      };
    },
    mounted() {
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
    <div class="details-controls">
      <button class="p-button p-component p-button-icon-only p-button-rounded" type="button" @click="visit">
        <span class="material-icons-outlined">skip_next</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .controls-container {
    position: absolute;
    z-index: 1;
    bottom: 0;
    height: 3rem;
    padding: 0 1.728rem;
    margin: 1rem 0;
    align-items: center;
    display: flex;
    flex-direction: row;
  }
  .details-controls {
    width: 100%;
    height: 3rem;
    align-items: center;
    display: flex;
    flex-direction: row;
  }
</style>

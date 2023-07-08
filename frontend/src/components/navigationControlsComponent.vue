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
    }
  });
</script>

<template>
  <div class="message-container" v-show="this.suggestedItineraryCompleted">
    <messageComp severity="success" icon="none" class="border-primary w-full justify-content-start">
      <div class="flex align-items-center">
        <span class="material-icons-outlined">emoji_events</span>
        <p id="message">Itinerario completato</p>
      </div>
    </messageComp>
  </div>
  <div class="controls-container">
    <button class="p-button p-component p-button-icon-only p-button-rounded" type="button" @click="this.emitter.emit('qrScannerToggle');">
      <span class="material-icons-outlined">qr_code_scanner</span>
    </button>
    <button class="p-button p-component p-button-icon-only p-button-rounded" type="button" @click="this.emitter.emit('stopItinerary')">
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

  .message-container {
    width: calc(100vw - 2.4rem);
    height: fit-content;
    position: absolute;
    bottom: 6rem;
    z-index: 1;
    margin: 0 1.2rem;
  }

  .p-message {
    margin: 0;
  }

  #message {
    margin: 0 1rem;
  }

</style>

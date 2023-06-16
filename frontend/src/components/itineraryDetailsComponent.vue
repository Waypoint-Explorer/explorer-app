<script lang="ts">
  import {defineComponent} from "vue";
  import axios from "axios";

  export default defineComponent({
    data() {
      return {
        isDetailsExpanded: false,
        itinerary: {
          name: "Percorso libero"
        }
      };
    },
    mounted() {
        this.emitter.on("itinerarySelected", (itinerary) => {
          this.itinerary = itinerary;
        });
    },
    methods: {
      selectItinerary(direction: string) {
        this.emitter.emit("selectItinerary", direction);
      },
    }
  });
</script>

<template>
  <div class="details-container" :class="{expanded: isDetailsExpanded}">
    <button id="expand-button" class="p-button p-component p-button-icon-only p-button-raised p-button-rounded" type="button" @click="isDetailsExpanded = !isDetailsExpanded">
      <span v-if="!isDetailsExpanded" class="material-icons">expand_less</span>
      <span v-if="isDetailsExpanded" class="material-icons">expand_more</span>
    </button>
    <div class="details-card">
      <button class="p-button p-component p-button-icon-only p-button-rounded p-button-transparent" type="button" @click="selectItinerary('previous')">
        <span class="material-icons">navigate_before</span>
      </button>
      <p>{{ this.itinerary.name }}</p>
      <button class="p-button p-component p-button-icon-only p-button-rounded p-button-transparent" type="button" @click="selectItinerary('next')">
        <span class="material-icons">navigate_next</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
  .details-container {
    position: absolute;
    z-index: 1;
    bottom: 0;
    width: 100vw;
    height: 6rem;
    padding: 0 1.728rem;
    align-items: center;
    display: flex;
    flex-direction: row;
    transition-duration: 500ms;
    transition-timing-function: cubic-bezier(0.5,0.25,0,1);
  }
  .expanded {
    height: 80vh;
  }
  #expand-button {
    height: 2.488rem;
    position: absolute;
    top: -1.244rem;
    left: calc(50% - 1.244rem);
  }
  .details-card {
    width: 100%;
    height: 100%;
    background-color: var(--surface-a);
    border-radius: 25px 25px 0 0;
    padding: 1.728rem 1.728rem 0 1.728rem;
    align-items: center;
    display: flex;
    flex-direction: row;
  }
  p {
    margin: 0;
    flex: 1;
    text-align: center;
  }
</style>

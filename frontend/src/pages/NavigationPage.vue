<script lang="ts">
  import { defineComponent } from "vue";
  import navigationMapComponent from "../components/navigationMapComponent.vue";
  import completedItinerarySummaryComponent from "../components/completedItinerarySummaryComponent.vue"
  import qrScannerComponent from "../components/qrScannerComponent.vue";
  import navigationControlsComponent from "../components/navigationControlsComponent.vue";

  export default defineComponent({
    components: { navigationMapComponent, qrScannerComponent, completedItinerarySummaryComponent, navigationControlsComponent },
    data() {
      return {
        searchValue: null,
      };
    },
  });
</script>

<template>
  <main>
    <navigationMapComponent></navigationMapComponent>
    <completedItinerarySummaryComponent></completedItinerarySummaryComponent>
    <qrScannerComponent></qrScannerComponent>
    <navigationControlsComponent></navigationControlsComponent>
  </main>
</template>

<style lang="scss" scoped>
  main {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
    z-index: -1;
  }
</style>
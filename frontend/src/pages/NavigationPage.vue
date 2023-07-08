<script lang="ts">
  import { defineComponent } from "vue";
  import minimalHeaderComp from "../components/minimalHeaderComp.vue";
  import navigationMapComponent from "../components/navigationMapComponent.vue";
  import navigationControlsComponent from "../components/navigationControlsComponent.vue";
  import qrScannerComponent from "../components/qrScannerComponent.vue";

  export default defineComponent({
    components: { minimalHeaderComp, navigationMapComponent, qrScannerComponent, navigationControlsComponent },
    data() {
      return {
        searchValue: null,
      };
    },
  });
</script>

<template>
  <minimalHeaderComp></minimalHeaderComp>
  <main>
    <navigationMapComponent></navigationMapComponent>
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
<script lang="ts">

  import { defineComponent } from "vue";
  import "leaflet/dist/leaflet.css";
  import L from "leaflet";
  import { Environment } from "../environment";

  export default defineComponent({
    data() {
      return {
        map: null,
      };
    },
    unmounted() {},
    mounted() {
      this.map = L.map('map', {
        zoomControl: false,
      }).setView([51.505, -0.09], 13);

      L.tileLayer(
          `https://api.mapbox.com/styles/v1/${Environment.MAP_STYLE}/tiles/{z}/{x}/{y}?access_token=${Environment.MAP_TOKEN}`, {
            tileSize: 512,
            zoomOffset: -1,
            attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }).addTo(this.map);
      var customPane = this.map.createPane("customPane");
      var canvasRenderer = L.canvas({ pane: "customPane" });
      customPane.style.zIndex = 399; // put just behind the standard overlay pane which is at 400
    },
    methods: {},
  });
</script>

<template>
  <main>
    <div id="map"></div>
  </main>
</template>

<style lang="scss" scoped>
  main {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 0 !important;
  }
  #map {
    width: 100vw;
    height: 100vh;
    z-index: 1;
  }

</style>

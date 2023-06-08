<script lang="ts">

  import { defineComponent } from "vue";
  import mapboxgl from 'mapbox-gl';
  import { Environment } from "../environment";

  export default defineComponent({
    data() {
      return {
      };
    },
    unmounted() {},
    mounted() {
      mapboxgl.accessToken = Environment.MAP_TOKEN;
      var map = new mapboxgl.Map({
        container: 'map-container',
        style: Environment.MAP_STYLE
      });
    },
    methods: {},
  });
</script>

<template>
  <div id="map-container"></div>
</template>

<style lang="scss">

</style>

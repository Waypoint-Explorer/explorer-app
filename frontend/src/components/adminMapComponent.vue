<script lang="ts">

import {defineComponent} from "vue";
import "leaflet/dist/leaflet.css";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import {Environment} from "../environment";
import axios from "axios";
import moment from "moment";

export default defineComponent({
    data() {
      return {
        map: null,
        minWeight: 20,
        maxWeight: 30,
        show: "showTemperature",
        measures: [],
        selectedMeasures: [],
        filteredMeasures: [],
      };
    },
    unmounted() {},
    mounted() {

      const markerIcon = `<svg width="100%" height="100%" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g id="background" transform="matrix(2.23526,0,0,1.03627,-9.64629,-3.25389)"><ellipse cx="15.053" cy="26.3" rx="8.947" ry="19.3" style="fill:rgb(203,221,209);"/></g>
    <path id="outer" d="M24.013,44C21.256,44 18.664,43.475 16.238,42.425C13.813,41.375 11.692,39.942 9.875,38.125C8.058,36.308 6.625,34.186 5.575,31.758C4.525,29.33 4,26.736 4,23.975C4,21.214 4.525,18.62 5.575,16.192C6.625,13.764 8.058,11.65 9.875,9.85C11.692,8.05 13.814,6.625 16.242,5.575C18.67,4.525 21.264,4 24.025,4C26.786,4 29.38,4.525 31.808,5.575C34.236,6.625 36.35,8.05 38.15,9.85C39.95,11.65 41.375,13.767 42.425,16.2C43.475,18.633 44,21.229 44,23.987C44,26.744 43.475,29.336 42.425,31.762C41.375,34.187 39.95,36.305 38.15,38.116C36.35,39.926 34.233,41.36 31.8,42.416C29.367,43.472 26.771,44 24.013,44ZM24.025,41C28.742,41 32.75,39.342 36.05,36.025C39.35,32.708 41,28.692 41,23.975C41,19.258 39.353,15.25 36.059,11.95C32.766,8.65 28.746,7 24,7C19.3,7 15.292,8.647 11.975,11.941C8.658,15.234 7,19.254 7,24C7,28.7 8.658,32.708 11.975,36.025C15.292,39.342 19.308,41 24.025,41Z" style="fill:rgb(124,169,133);fill-rule:nonzero;"/>
    </svg>`;

      mapboxgl.accessToken = Environment.MAP_TOKEN;
      var map = new mapboxgl.Map({
        container: "map",
        style: `${Environment.MAP_STYLE}`,
        center: [12.516667, 42.516667],
        zoom: 6,
        attributionControl: false,
      });

      map.on('load', () => {
        map.addSource("measureSource", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });

        map.addLayer({
          id: "measure-heat",
          type: "heatmap",
          source: "measureSource",
          paint: {
            'heatmap-weight': [
              'interpolate',
              ['linear'],
              ['get', 'value'],
              this.minWeight,
              0,
              this.maxWeight,
              1
            ],
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(0,0,0,0)',
              0.25,
              'rgb(95,147,192)',
              0.5,
              'rgb(96,142,50)',
              0.75,
              'rgb(239,153,6)',
              1,
              'rgb(157,51,13)'
            ],
            'heatmap-radius': [
              "interpolate",
              ["exponential", 1.25],
              ["zoom"],
              0,
              10,
              18,
              100
            ],
            'heatmap-opacity': 1,
          }
        });

        axios.get(`http://${Environment.BACKEND_HOST}/waypoints/`)
        .then((waypointsResponse) => {
          const waypoints = waypointsResponse.data;
            axios.get(`http://${Environment.BACKEND_HOST}/markers/`)
              .then((markersResponse) => {
                const markers = markersResponse.data;

                markers.forEach(marker => {
                  const element = document.createElement("div");
                  element.className = 'marker-small';
                  element.innerHTML = markerIcon;
                  const popupText = (marker) => {
                    switch (marker.status) {
                      case undefined:
                        return "sconosciuto";
                      case 0:
                        return "normale";
                      case 1:
                        return "batteria scarica";
                      default:
                        return "valore non valido";
                    }
                  }
                  const popup = new mapboxgl.Popup({ offset: 12 }).setText("stato: " + popupText(marker));
                  new mapboxgl.Marker(element).setLngLat([marker.coordinates.longitude, marker.coordinates.latitude]).setPopup(popup).addTo(map);
                });

                axios.get(`http://${Environment.BACKEND_HOST}/measures/`)
                  .then((measuresResponse) => {
                    this.measures = measuresResponse.data;
                    this.emitter.emit("filterByDate", { hour: new Date().getHours(), date: new Date()});
                });
          });
        });
        this.map = map;

      });

      this.emitter.on("locationSearch", (coordinates) => {
        this.map.flyTo(coordinates);
      });

      this.emitter.on("filterByDate", (selectedDate: { hour: number; date: Date; }) => {
        let filterDate = moment(new Date(selectedDate.date.setHours(Math.floor(-1*selectedDate.date.getTimezoneOffset()/60), 0, 0)));
        const filterHour = Math.floor((selectedDate.hour / 100) * 23);
        const startTimestamp = filterDate.unix() + (filterHour * 60 * 60);
        const endTimestamp = filterDate.unix() + ((filterHour + 1) * 60 * 60)

        this.filteredMeasures = this.measures.filter(measure =>  measure.timestamp >= startTimestamp && measure.timestamp <= endTimestamp);
        this.emitter.emit(this.show);
      });

      this.emitter.on("showTemperature", () => {
        this.show = "showTemperature";
        this.selectedMeasures = this.filteredMeasures.map(measure => { return { ...measure, value: measure.temperature } });
        this.showHeatmap();
      });
      this.emitter.on("showHumidity", () => {
        this.show = "showHumidity";
        this.selectedMeasures = this.filteredMeasures.map(measure => { return { ...measure, value: measure.humidity } });
        this.showHeatmap();
      });
      this.emitter.on("showAtmosphericPressure", () => {
        this.show = "showAtmosphericPressure";
        this.selectedMeasures = this.filteredMeasures.map(measure => { return { ...measure, value: measure.atmospheric_pressure } });
        this.showHeatmap();
      });
      this.emitter.on("showAirQuality", () => {
        this.show = "showAirQuality";
        this.selectedMeasures = this.filteredMeasures.map(measure => { return { ...measure, value: measure.air_quality } });
        this.showHeatmap();
      });
    },
    methods: {
      showHeatmap() {
        if (this.selectedMeasures.length > 0) {
          this.minWeight = Infinity;
          this.maxWeight = -Infinity;
          this.selectedMeasures.forEach(measure => {
            this.minWeight = Math.min(this.minWeight, measure.value);
            this.maxWeight = Math.max(this.maxWeight, measure.value);
          });

          this.map.setPaintProperty("measure-heat", "heatmap-weight", [
            'interpolate',
            ['linear'],
            ['get', 'value'],
            this.minWeight,
            0,
            this.maxWeight,
            1
          ]);
        }
        this.map.getSource("measureSource")._data.features = [];
        this.selectedMeasures.forEach((measure: { coordinates: { longitude: any; latitude: any; }; timestamp: any; value: any; }) => {
          this.map.getSource("measureSource")._data.features.push(
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [measure.coordinates.longitude, measure.coordinates.latitude],
                },
                properties: {
                  value: measure.value,
                }
              }
          );
        });
        this.map.getSource("measureSource").setData(this.map.getSource("measureSource")._data);
      },
    },
  });
</script>

<template>
    <div id="map"></div>
</template>

<style lang="scss" scoped>

</style>

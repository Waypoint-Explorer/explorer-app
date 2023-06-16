<script lang="ts">

  import { defineComponent } from "vue";
  import "leaflet/dist/leaflet.css";
  import L from "leaflet";
  import { Environment } from "../environment";
  import axios from "axios";

  import counterIconSVG from "../assets/icons/counter_0.svg"

  export default defineComponent({
    data() {
      return {
        map: null,
        itineraries: [],
      };
    },
    unmounted() {},
    mounted() {
      this.map = L.map('map', {
        zoomControl: false,
      }).setView([42.516667, 12.516667], 6);

      var counterIconSettings = {
        mapIconUrl: `<svg width="100%" height="100%" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
          <g id="background" transform="matrix(2.23526,0,0,1.03627,-9.64629,-3.25389)"><ellipse cx="15.053" cy="26.3" rx="8.947" ry="19.3" style="fill:rgb(214,237,255);"/></g>
          <path id="outer" d="M24.013,44C21.256,44 18.664,43.475 16.238,42.425C13.813,41.375 11.692,39.942 9.875,38.125C8.058,36.308 6.625,34.186 5.575,31.758C4.525,29.33 4,26.736 4,23.975C4,21.214 4.525,18.62 5.575,16.192C6.625,13.764 8.058,11.65 9.875,9.85C11.692,8.05 13.814,6.625 16.242,5.575C18.67,4.525 21.264,4 24.025,4C26.786,4 29.38,4.525 31.808,5.575C34.236,6.625 36.35,8.05 38.15,9.85C39.95,11.65 41.375,13.767 42.425,16.2C43.475,18.633 44,21.229 44,23.987C44,26.744 43.475,29.336 42.425,31.762C41.375,34.187 39.95,36.305 38.15,38.116C36.35,39.926 34.233,41.36 31.8,42.416C29.367,43.472 26.771,44 24.013,44ZM24.025,41C28.742,41 32.75,39.342 36.05,36.025C39.35,32.708 41,28.692 41,23.975C41,19.258 39.353,15.25 36.059,11.95C32.766,8.65 28.746,7 24,7C19.3,7 15.292,8.647 11.975,11.941C8.658,15.234 7,19.254 7,24C7,28.7 8.658,32.708 11.975,36.025C15.292,39.342 19.308,41 24.025,41Z" style="fill:rgb(0,120,215);fill-rule:nonzero;"/>
          <g id="number" transform="matrix(1,0,0,1,17.326,32.59)"><text x="0px" y="0px" style="font-family:'Arial-BoldMT', 'Arial', sans-serif;font-weight:700;font-size:24px;fill:rgb(0,120,215);">0</text></g>
        </svg>`
      }

      L.tileLayer(
        `https://api.mapbox.com/styles/v1/${Environment.MAP_STYLE}/tiles/{z}/{x}/{y}?access_token=${Environment.MAP_TOKEN}`, {
          tileSize: 512,
          zoomOffset: -1,
          attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);
        var customPane = this.map.createPane("customPane");
        var canvasRenderer = L.canvas({ pane: "customPane" });
        customPane.style.zIndex = 399; // put just behind the standard overlay pane which is at 400

        // zoom map to detected location
        this.map.locate({setView: true, maxZoom: 16});

        this.emitter.on("locationSearch", (coordinates) => {
          this.map.flyTo(coordinates);
        });

      axios.get(`http://${Environment.BACKEND_HOST}/itineraries`)
      .then((itinerariesResponse) => {
        this.itineraries = itinerariesResponse.data;
        axios.get(`http://${Environment.BACKEND_HOST}/waypoints/`)
        .then((waypointsResponse) => {
          const waypoints = waypointsResponse.data;
              axios.get(`http://${Environment.BACKEND_HOST}/markers/`)
                .then((markersResponse) => {
                  const markers = markersResponse.data;
                  this.itineraries.forEach(itinerary => {
                    itinerary.waypoints = waypoints.filter(waypoint => itinerary.waypoints.includes(waypoint._id));
                    if(itinerary.waypoints != undefined) {
                      itinerary.waypoints.forEach(waypoint => {
                        waypoint.marker = markers.find(marker => marker._id === waypoint.marker)
                      });
                    }
                  });

                  this.itineraries.forEach(itinerary => {
                    itinerary.waypoints.forEach(waypoint => {
                      var counterIcon = L.divIcon({
                        className: 'leaflet-counter-icon',
                        html: L.Util.template(counterIconSettings.mapIconUrl, counterIconSettings).replace(">0<", `>${itinerary.waypoints.indexOf(waypoint) + 1}<`),
                        iconSize: [30, 30],
                        iconAnchor: [15, 5]
                      });
                      var Lmarker = L.marker([waypoint.marker.coordinates.latitude, waypoint.marker.coordinates.longitude], {icon: counterIcon}).addTo(this.map);
                      Lmarker.bindPopup(waypoint.name);
                      waypoint.Lmarker = Lmarker;
                    });
                    const markersCoordinates = Array.from(itinerary.waypoints.map(waypoint => Array.from([waypoint.marker.coordinates.latitude, waypoint.marker.coordinates.longitude])));
                    console.log(`${markersCoordinates}`);
                    const polyline = L.polyline(markersCoordinates, {color: '#0078D7', weight: 5}).addTo(this.map);
                  });
              });
          });
      });

    },
    methods: {},
  });
</script>

<template>
    <div id="map"></div>
</template>

<style lang="scss" scoped>
  #map {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
  }
</style>

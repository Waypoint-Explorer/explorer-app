<script lang="ts">

  import { defineComponent } from "vue";
  import "leaflet/dist/leaflet.css";
  import mapboxgl from "mapbox-gl";
  import 'mapbox-gl/dist/mapbox-gl.css';
  import { Environment } from "../environment";
  import axios from "axios";

  export default defineComponent({
    data() {
      return {
        map: null,
        itineraries: [],
        selectedItineraryIndex: 0,
      };
    },
    unmounted() {},
    mounted() {

      const markerIcon = `<svg width="100%" height="100%" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
        <g id="background" transform="matrix(2.23526,0,0,1.03627,-9.64629,-3.25389)"><ellipse cx="15.053" cy="26.3" rx="8.947" ry="19.3" style="fill:rgb(214,237,255);"/></g>
        <path id="outer" d="M24.013,44C21.256,44 18.664,43.475 16.238,42.425C13.813,41.375 11.692,39.942 9.875,38.125C8.058,36.308 6.625,34.186 5.575,31.758C4.525,29.33 4,26.736 4,23.975C4,21.214 4.525,18.62 5.575,16.192C6.625,13.764 8.058,11.65 9.875,9.85C11.692,8.05 13.814,6.625 16.242,5.575C18.67,4.525 21.264,4 24.025,4C26.786,4 29.38,4.525 31.808,5.575C34.236,6.625 36.35,8.05 38.15,9.85C39.95,11.65 41.375,13.767 42.425,16.2C43.475,18.633 44,21.229 44,23.987C44,26.744 43.475,29.336 42.425,31.762C41.375,34.187 39.95,36.305 38.15,38.116C36.35,39.926 34.233,41.36 31.8,42.416C29.367,43.472 26.771,44 24.013,44ZM24.025,41C28.742,41 32.75,39.342 36.05,36.025C39.35,32.708 41,28.692 41,23.975C41,19.258 39.353,15.25 36.059,11.95C32.766,8.65 28.746,7 24,7C19.3,7 15.292,8.647 11.975,11.941C8.658,15.234 7,19.254 7,24C7,28.7 8.658,32.708 11.975,36.025C15.292,39.342 19.308,41 24.025,41Z" style="fill:rgb(0,120,215);fill-rule:nonzero;"/>
        <g id="number" transform="matrix(1,0,0,1,17.326,32.59)"><text x="0px" y="0px" style="font-family:'Arial-BoldMT', 'Arial', sans-serif;font-weight:700;font-size:24px;fill:rgb(0,120,215);">0</text></g>
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
        map.addSource("itineraryLineSource", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });

        map.addLayer({
          id: "itineraryLine",
          type: "line",
          source: "itineraryLineSource",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": [
              'match',
              ['get', 'type'],
              'CULTURAL', '#0078D7',
              'THEMED', '#DB1F1C',
              'NATURALISTIC', '#389F48',
              'TOURISTIC', '#FDA131',
              'FITNESS', '#784FCE',
              '#888',
            ],
            "line-width": 8,
            "line-opacity": [
              'match',
              ['get', 'selected'],
              'true',
              1,
              'false',
              0.3,
              0.3,
            ]
          },
          minzoom: 10,
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
                      const element = document.createElement("div");
                      element.className = 'marker';
                      element.innerHTML = markerIcon.replace(">0<", `>${itinerary.waypoints.indexOf(waypoint) + 1}<`);
                      new mapboxgl.Marker(element).setLngLat([waypoint.marker.coordinates.longitude, waypoint.marker.coordinates.latitude]).addTo(map);
                    });
                    const markersCoordinates = Array.from(itinerary.waypoints.map(waypoint => Array.from([waypoint.marker.coordinates.longitude, waypoint.marker.coordinates.latitude])));
                    map.getSource("itineraryLineSource")._data.features.push(
                        {
                          type: "Feature",
                          geometry: {
                            type: "LineString",
                            coordinates: markersCoordinates,
                          },
                          properties: {
                            id: itinerary._id,
                            name: itinerary.name,
                            type: itinerary.type,
                            selected: false,
                          }
                        }
                    );
                  });
                  map.getSource("itineraryLineSource").setData(map.getSource("itineraryLineSource")._data);
            });
          });
        });
        this.map = map;
      });

      this.emitter.on("locationSearch", (coordinates) => {
        this.map.flyTo(coordinates);
      });

      this.emitter.on("selectItinerary", (direction: string) => {
        if (this.itineraries != undefined) {
          if (direction === "previous") {
            this.selectedItineraryIndex = this.selectedItineraryIndex - 1;
            if (this.selectedItineraryIndex < 0) this.selectedItineraryIndex = this.itineraries.length - 1;
            this.emitter.emit("itinerarySelected", this.itineraries[this.selectedItineraryIndex]);
          } else if (direction === "next") {
            this.selectedItineraryIndex = this.selectedItineraryIndex + 1;
            if (this.selectedItineraryIndex >= this.itineraries.length) this.selectedItineraryIndex = 0;
            this.emitter.emit("itinerarySelected", this.itineraries[this.selectedItineraryIndex]);
          }
          map.getSource("itineraryLineSource")._data.features.forEach(feature => { feature.properties.selected = 'false' });
          map.getSource("itineraryLineSource")._data.features.find(feature => feature.properties.id === this.itineraries[this.selectedItineraryIndex]._id).properties.selected = 'true';
          map.getSource("itineraryLineSource").setData(map.getSource("itineraryLineSource")._data);
        }
      });

    },
    methods: {},
  });
</script>

<template>
    <div id="map"></div>
</template>

<style lang="scss" scoped>

</style>

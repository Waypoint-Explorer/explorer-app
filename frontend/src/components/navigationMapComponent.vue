<script lang="ts">

  import { defineComponent } from "vue";
  import "leaflet/dist/leaflet.css";
  import mapboxgl from "mapbox-gl";
  import 'mapbox-gl/dist/mapbox-gl.css';
  import { Environment } from "../environment";
  import axios from "axios";

  const visitedMarkerIcon = `<svg width="100%" height="100%" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(2.68246,0,0,1.24352,-16.3791,-8.70466)"><g id="background"><ellipse cx="15.053" cy="26.3" rx="8.947" ry="19.3" style="fill:rgb(242,242,242);"/></g></g>
    <g id="outer" transform="matrix(1.2,0,0,1.2,-4.8,-4.8)"><path d="M24.013,44C21.256,44 18.664,43.475 16.238,42.425C13.813,41.375 11.692,39.942 9.875,38.125C8.058,36.308 6.625,34.186 5.575,31.758C4.525,29.33 4,26.736 4,23.975C4,21.214 4.525,18.62 5.575,16.192C6.625,13.764 8.058,11.65 9.875,9.85C11.692,8.05 13.814,6.625 16.242,5.575C18.67,4.525 21.264,4 24.025,4C26.786,4 29.38,4.525 31.808,5.575C34.236,6.625 36.35,8.05 38.15,9.85C39.95,11.65 41.375,13.767 42.425,16.2C43.475,18.633 44,21.229 44,23.987C44,26.744 43.475,29.336 42.425,31.762C41.375,34.187 39.95,36.305 38.15,38.116C36.35,39.926 34.233,41.36 31.8,42.416C29.367,43.472 26.771,44 24.013,44ZM24.025,41C28.742,41 32.75,39.342 36.05,36.025C39.35,32.708 41,28.692 41,23.975C41,19.258 39.353,15.25 36.059,11.95C32.766,8.65 28.746,7 24,7C19.3,7 15.292,8.647 11.975,11.941C8.658,15.234 7,19.254 7,24C7,28.7 8.658,32.708 11.975,36.025C15.292,39.342 19.308,41 24.025,41Z" style="fill:rgb(102,102,102);fill-rule:nonzero;"/></g>
  </svg>`;

  const nearbyMarkerIcon = `<svg width="100%" height="100%" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(2.68246,0,0,1.24352,-16.3791,-8.70466)"><g id="background"><ellipse cx="15.053" cy="26.3" rx="8.947" ry="19.3" style="fill:rgb(203,221,209);"/></g></g>
    <g id="outer" transform="matrix(1.2,0,0,1.2,-4.8,-4.8)"><path d="M24.013,44C21.256,44 18.664,43.475 16.238,42.425C13.813,41.375 11.692,39.942 9.875,38.125C8.058,36.308 6.625,34.186 5.575,31.758C4.525,29.33 4,26.736 4,23.975C4,21.214 4.525,18.62 5.575,16.192C6.625,13.764 8.058,11.65 9.875,9.85C11.692,8.05 13.814,6.625 16.242,5.575C18.67,4.525 21.264,4 24.025,4C26.786,4 29.38,4.525 31.808,5.575C34.236,6.625 36.35,8.05 38.15,9.85C39.95,11.65 41.375,13.767 42.425,16.2C43.475,18.633 44,21.229 44,23.987C44,26.744 43.475,29.336 42.425,31.762C41.375,34.187 39.95,36.305 38.15,38.116C36.35,39.926 34.233,41.36 31.8,42.416C29.367,43.472 26.771,44 24.013,44ZM24.025,41C28.742,41 32.75,39.342 36.05,36.025C39.35,32.708 41,28.692 41,23.975C41,19.258 39.353,15.25 36.059,11.95C32.766,8.65 28.746,7 24,7C19.3,7 15.292,8.647 11.975,11.941C8.658,15.234 7,19.254 7,24C7,28.7 8.658,32.708 11.975,36.025C15.292,39.342 19.308,41 24.025,41Z" style="fill:rgb(124,169,133);fill-rule:nonzero;"/></g>
  </svg>`;

  const itineraryMarkerIcon = `<svg width="100%" height="100%" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(2.68246,0,0,1.24352,-16.3791,-8.70466)"><g id="background"><ellipse cx="15.053" cy="26.3" rx="8.947" ry="19.3" style="fill:rgb(214,237,255);"/></g></g>
    <g id="outer" transform="matrix(1.2,0,0,1.2,-4.8,-4.8)"><path d="M24.013,44C21.256,44 18.664,43.475 16.238,42.425C13.813,41.375 11.692,39.942 9.875,38.125C8.058,36.308 6.625,34.186 5.575,31.758C4.525,29.33 4,26.736 4,23.975C4,21.214 4.525,18.62 5.575,16.192C6.625,13.764 8.058,11.65 9.875,9.85C11.692,8.05 13.814,6.625 16.242,5.575C18.67,4.525 21.264,4 24.025,4C26.786,4 29.38,4.525 31.808,5.575C34.236,6.625 36.35,8.05 38.15,9.85C39.95,11.65 41.375,13.767 42.425,16.2C43.475,18.633 44,21.229 44,23.987C44,26.744 43.475,29.336 42.425,31.762C41.375,34.187 39.95,36.305 38.15,38.116C36.35,39.926 34.233,41.36 31.8,42.416C29.367,43.472 26.771,44 24.013,44ZM24.025,41C28.742,41 32.75,39.342 36.05,36.025C39.35,32.708 41,28.692 41,23.975C41,19.258 39.353,15.25 36.059,11.95C32.766,8.65 28.746,7 24,7C19.3,7 15.292,8.647 11.975,11.941C8.658,15.234 7,19.254 7,24C7,28.7 8.658,32.708 11.975,36.025C15.292,39.342 19.308,41 24.025,41Z" style="fill:rgb(0,120,215);fill-rule:nonzero;"/></g>
    <g transform="matrix(1,0,0,1,15.7676,34.5981)"><g id="number"><text x="0px" y="0px" style="font-family:'Arial-BoldMT', 'Arial', sans-serif;font-weight:700;font-size:30px;fill:rgb(0,120,215);">0</text></g></g>
  </svg>`;

  export default defineComponent({
    data() {
      return {
        map: null,
        markers: [],
        completedItinerary: {},
      };
    },
    unmounted() {},
    mounted() {


      mapboxgl.accessToken = Environment.MAP_TOKEN;
      var map = new mapboxgl.Map({
        container: "map",
        style: `${Environment.MAP_STYLE}`,
        center: [12.516667, 42.516667],
        zoom: 6,
        minPitch:45,
        pitch: 45,
        maxPitch: 45,
        attributionControl: false,
      });

      map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      }), 'top-right');

      map.on('load', () => {
        axios.get(`http://${Environment.BACKEND_HOST}/completed-itineraries/id/${this.$route.query.completedItineraryId}`).then((completedItineraryResponse) => {
            this.completedItinerary = completedItineraryResponse.data;
          axios.get(`http://${Environment.BACKEND_HOST}/waypoints/`).then((waypointsResponse) => {
            const waypoints = waypointsResponse.data;
            axios.get(`http://${Environment.BACKEND_HOST}/markers/`).then((markersResponse) => {
              const markers = markersResponse.data;
              waypoints.forEach(waypoint => {
                waypoint.marker = markers.find(marker => marker._id === waypoint.marker)
                const element = document.createElement("div");
                element.className = 'marker';
                  element.innerHTML = nearbyMarkerIcon;
                  const newMarker = new mapboxgl.Marker(element).setLngLat([waypoint.marker.coordinates.longitude, waypoint.marker.coordinates.latitude]);
                  newMarker.marker_id = waypoint.marker.marker_id;
                  newMarker.related_waypoint = waypoint._id;
                  newMarker.addTo(map);
                  this.markers.push(newMarker);
              });
              if (this.completedItinerary.hasOwnProperty("related_itinerary")) {
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
                    "line-color": '#0078D7',
                    "line-width": 8,
                  },
                  minzoom: 10,
                });
                axios.get(`http://${Environment.BACKEND_HOST}/itineraries/id/${this.completedItinerary.related_itinerary}`).then((itineraryResponse) => {
                  let itinerary = itineraryResponse.data;
                  this.completedItinerary.related_itinerary = itinerary;
                  const itineraryWaypoints = waypoints.filter(waypoint => itinerary.waypoints.includes(waypoint._id));
                  itineraryWaypoints.forEach(waypoint => {
                    this.markers.find(marker => marker.related_waypoint === waypoint._id)._element.innerHTML = itineraryMarkerIcon.replace(">0<", `>${itinerary.waypoints.indexOf(waypoint._id) + 1}<`);
                  });
                  const markersCoordinates = Array.from(itineraryWaypoints.map(waypoint => Array.from([waypoint.marker.coordinates.longitude, waypoint.marker.coordinates.latitude])));
                  map.getSource("itineraryLineSource")._data.features.push(
                      {
                        type: "Feature",
                        geometry: {
                          type: "LineString",
                          coordinates: markersCoordinates,
                        },
                      }
                  );
                  map.getSource("itineraryLineSource").setData(map.getSource("itineraryLineSource")._data);
                  this.highlightNextMarker();
                });
              }
            });
          });
        });
        this.map = map;
      });

      this.emitter.on("waypointVisited", (qrData) => {
        console.log(qrData);
        axios.post(`http://${Environment.BACKEND_HOST}/measures`, qrData).then((measuresResponse) => {
          axios.patch(`http://${Environment.BACKEND_HOST}/completed-itineraries/update/${this.completedItinerary._id}`, {
            visitedWaypoint: this.markers.find(marker => marker.marker_id === qrData.markerId).related_waypoint,
            dynamicCode: qrData.dynamicCode,
            status: qrData.status,
          }).then(updateResponse => {
            this.completedItinerary.visited_waypoints = updateResponse.data.visited_waypoints;
            this.disableVisitedMarkers();
            if (this.completedItinerary.related_itinerary !== undefined) {
              this.highlightNextMarker();
              if (this.getNextWaypoints().length <= 0) {
                this.emitter.emit("suggestedItineraryCompleted");
              }
            }
          });
        });
      });
      this.emitter.on("stopItineraryButtonPressed", () => {
        this.emitter.emit("stopItinerary", this.completedItinerary._id);
      });
    },
    methods: {
      getNextWaypoints(): Array<String> {
        return this.completedItinerary.related_itinerary.waypoints.filter(waypoint => !this.completedItinerary.visited_waypoints.includes(waypoint));
      },
      highlightNextMarker() {
        this.markers.forEach(marker => marker._element.classList.remove("next-waypoint"));
        const nextWaypoints = this.getNextWaypoints();
        if (nextWaypoints.length > 0) {
          this.markers.find(marker => marker.related_waypoint === nextWaypoints[0])._element.classList.add("next-waypoint");
        }
      },
      disableVisitedMarkers() {
        this.markers.filter(marker => this.completedItinerary.visited_waypoints.includes(marker.related_waypoint)).forEach(marker => {marker._element.innerHTML = visitedMarkerIcon});
      }
    },
  });
</script>

<template>
    <div id="map"></div>
</template>


<style lang="scss" scoped>

</style>

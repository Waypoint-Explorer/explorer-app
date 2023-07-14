<script lang="ts">
  import {defineComponent} from "vue";
  import { Environment } from "../environment";
  import axios from "axios";
  import router from "../router";

  export default defineComponent({
    data() {
      return {
        isDetailsExpanded: false,
        itinerary: {
          name: "Percorso libero",
          _id: null,
        }
      };
    },
    mounted() {
        this.emitter.on("filterButtonClicked", () => {
          this.isDetailsExpanded = false;
        });
        this.emitter.on("itinerarySelected", (itinerary) => {
          this.itinerary = itinerary;
        });
    },
    methods: {
      toggleDetails() {
        this.isDetailsExpanded = !this.isDetailsExpanded;
        this.emitter.emit("expandDetailsButtonClicked");
      },
      selectItinerary(direction: string) {
        this.emitter.emit("selectItinerary", direction);
      },
      startItinerary() {
        let data = {
          itineraryId: null,
          startDate: new Date(),
        };
        if (this.$cookies.isKey("user")){
          data.userId = this.$cookies.get("user").userId;
        }
        if (this.itinerary.hasOwnProperty("_id")) {
          data.itineraryId = this.itinerary._id;
        }
        axios
          .post(`http://${Environment.BACKEND_HOST}/completed-itineraries`, data)
          .then((response) => {
            router.replace({
              name: "navigationPage",
              query: {
                completedItineraryId: response.data.completedItinerary[0]._id,
              }
            });
          })
          .catch((error) => {
              console.log(error);
          });
      },
    }
  });
</script>

<template>
  <div class="details-container" :class="{expanded: isDetailsExpanded}">
    <button id="expand-button" class="p-button p-component p-button-icon-only p-button-raised p-button-rounded" type="button" @click="toggleDetails()">
      <span v-if="!isDetailsExpanded" class="material-icons">expand_less</span>
      <span v-if="isDetailsExpanded" class="material-icons">expand_more</span>
    </button>
    <div class="details-controls">
      <button class="p-button p-component p-button-icon-only p-button-rounded p-button-transparent" type="button" @click="selectItinerary('previous')">
        <span class="material-icons">navigate_before</span>
      </button>
      <h5 id="itinerary-name">{{ this.itinerary.name }}</h5>
      <button class="p-button p-component p-button-icon-only p-button-rounded p-button-transparent" type="button" @click="selectItinerary('next')">
        <span class="material-icons">navigate_next</span>
      </button>
    </div>
    <button id="start-button" class="p-button p-component p-button-raised p-button-rounded" type="button" @click="startItinerary">
      <p>Avvia</p>
      <span class="material-icons-outlined">navigation</span>
    </button>
    <div class="itinerary-details" :class="{'itinerary-details-expanded': isDetailsExpanded}">
      <scrollPanelComp id="itinerary-details-scroll-panel" :class="{'scroll-panel-expanded': isDetailsExpanded}">
        <tagComp v-if="this.itinerary.type" :class="this.itinerary.type" value="{{this.itinerary.type}}">
          {{this.itinerary.type}}
        </tagComp>
        <p v-if="this.itinerary.extra_points" class="text-small">Punti extra: {{ this.itinerary.extra_points }}</p>
        <p v-if="this.itinerary.description">{{ this.itinerary.description }}</p>
        <ul>
          <li v-for="waypoint in this.itinerary.waypoints" class="waypoint-details">
            <div>
              <p class="condensed">{{waypoint.name}}</p>
              <p v-if="waypoint.place" class="text-small">{{waypoint.place}}</p>
              <p v-if="!waypoint.place && waypoint.marker" class="text-small">lat:{{waypoint.marker.coordinates.latitude}}, lon:{{waypoint.marker.coordinates.longitude}}</p>
              <accordionComp>
                <accordionTabComp header="Informazioni aggiuntive" v-if="waypoint.description">
                  <p class="text-small condensed">{{waypoint.description}}</p>
                </accordionTabComp>
                <accordionTabComp header="Orari di apertura" v-if="waypoint.opening_hours">
                  <ul>
                    <li v-if="waypoint.opening_hours.monday_hours"><p v-for="shift in waypoint.opening_hours.monday_hours" class="text-small condensed">Lunedì: {{shift.shift_start}}-{{shift.shift_end}} </p></li>
                    <li v-if="waypoint.opening_hours.tuesday_hours"><p v-for="shift in waypoint.opening_hours.tuesday_hours" class="text-small condensed">Martedì: {{shift.shift_start}}-{{shift.shift_end}} </p></li>
                    <li v-if="waypoint.opening_hours.wednesday_hours"><p v-for="shift in waypoint.opening_hours.wednesday_hours" class="text-small condensed">Mercoledì: {{shift.shift_start}}-{{shift.shift_end}} </p></li>
                    <li v-if="waypoint.opening_hours.thursday_hours"><p v-for="shift in waypoint.opening_hours.thursday_hours" class="text-small condensed">Giovedì: {{shift.shift_start}}-{{shift.shift_end}} </p></li>
                    <li v-if="waypoint.opening_hours.friday_hours"><p v-for="shift in waypoint.opening_hours.friday_hours" class="text-small condensed">Venerdì: {{shift.shift_start}}-{{shift.shift_end}} </p></li>
                    <li v-if="waypoint.opening_hours.saturday_hours"><p v-for="shift in waypoint.opening_hours.saturday_hours" class="text-small condensed">Sabato: {{shift.shift_start}}-{{shift.shift_end}} </p></li>
                    <li v-if="waypoint.opening_hours.sunday_hours"><p v-for="shift in waypoint.opening_hours.sunday_hours" class="text-small condensed">Domenica: {{shift.shift_start}}-{{shift.shift_end}} </p></li>
                  </ul>
                </accordionTabComp>
                <accordionTabComp header="Prezzi visita" v-if="waypoint.price">
                  <p class="text-small condensed">{{waypoint.price.description}}: {{waypoint.price.price}} euro</p>
                </accordionTabComp>
                <accordionTabComp header="Informazioni accessibilità" v-if="waypoint.accessibility_info">
                  <p class="text-small condensed">{{waypoint.accessibility_info}}</p>
                </accordionTabComp>
              </accordionComp>
            </div>
          </li>
        </ul>
      </scrollPanelComp>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .details-container {
    position: absolute;
    z-index: 1;
    bottom: 0;
    width: calc(100vw - 2 * 1.2rem);
    height: 8.2rem;
    padding: 1.2rem 1.2rem 0 1.2rem;
    margin: 0 1.2rem;
    align-items: center;
    flex-direction: row;
    transition-duration: 500ms;
    transition-timing-function: cubic-bezier(0.5,0.25,0,1);
    background-color: var(--surface-a);
    border-radius: 25px 25px 0 0;
    box-sizing: border-box;
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
  #start-button {
    display: inline-flex;
    width: 50%;
    height: 2.488rem;
    border-radius: 2rem;
    margin: 0 25%;

  }
  #start-button p {
    margin: 0 0.579rem 0 0;
    font-size: 1.2rem;
  }
  .details-controls {
    width: 100%;
    height: 3rem;
    align-items: center;
    display: flex;
    flex-direction: row;
  }
  .itinerary-details-expanded {
    height: fit-content !important;
  }
  .itinerary-details {
    width: 100%;
    height: 0;
  }
  .scroll-panel-expanded {
    height: calc(80vh - 1.2rem - 3rem - 2.488rem) !important;
    padding: 1.728rem 0 !important;
  }
  #itinerary-details-scroll-panel {
    width: 100%;
    height: 0;
    padding: 0;
  }
  #itinerary-name {
    margin: 0;
    padding: 0 0.694rem;
    flex: 1;
    max-height: 1.2rem;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: clip;
    overflow-y: clip;
  }
  .waypoint-details {
    margin-top: 1.2rem;
    background-color: var(--surface-b);
    border-radius: 25px;
    padding: 1.2rem;
  }
  .condensed {
    margin: 0;
  }
  li {
    list-style-type: none;
  }
  #startButton {
    position: absolute;
    left: 35%;
  }
  .CULTURALE {
    background-color: var(--we-palette-blue);
  }
  .TEMATICO {
    background-color: var(--we-palette-red);
  }
  .NATURALISTICO {
    background-color: var(--we-palette-green);
  }
  .TURISTICO {
    background-color: var(--we-palette-yellow);
  }
  .FITNESS {
    background-color: var(--we-palette-purple);
  }
</style>

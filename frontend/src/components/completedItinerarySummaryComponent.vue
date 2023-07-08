<script lang="ts">
import {defineComponent} from "vue";
import {Environment} from "../environment";
import axios from "axios";

export default defineComponent({
    data() {
      return {
        isSummaryExpanded: false,
        completedItinerary: {
          points_earned: 0,
          start_date: new Date().toLocaleString('it-IT'),
          completion_date: new Date().toLocaleString('it-IT'),
        }
      };
    },
    mounted() {
      this.emitter.on("stopItinerary", (completedItineraryId: string) => {
          axios.patch(`http://${Environment.BACKEND_HOST}/completed-itineraries/stop/${completedItineraryId}`, {
            completionDate: new Date().toLocaleString("it-IT")
          }).then((completedItineraryResponse) => {
            axios.get(`http://${Environment.BACKEND_HOST}/waypoints`)
              .then((waypointsResponse) => {
                this.completedItinerary = completedItineraryResponse.data;
                this.completedItinerary.visited_waypoints = waypointsResponse.data.filter(waypoint => this.completedItinerary.visited_waypoints.includes(waypoint._id));
                this.isSummaryExpanded = true;
              });
          });
      });
    },
    methods: {
      closeNavigation() {
        this.$router.go(0);
      },
      computeTimeDiff(startDateString: string, completionDateString: string) {
        const startDate = new Date(new Date(startDateString).toLocaleString("it-IT"));
        const endDate = new Date(new Date(completionDateString).toLocaleString("it-IT"));
        const timeDiff = endDate.getTime() - startDate.getTime();
        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        return `${hours}h ${minutes}m ${seconds}s`
      },
    }
  });
</script>

<template>
  <div class="summary-container" :class="{expanded: isSummaryExpanded}">
    <div class="summary-details" v-show="isSummaryExpanded">
      <p>Punti ottenuti: {{this.completedItinerary.points_earned ?? 0}}</p>
      <p>Tempo trascorso: {{this.computeTimeDiff(this.completedItinerary.start_date, this.completedItinerary.completion_date)}}</p>
      <scrollPanelComp id="summary-details-scroll-panel">
        <ul v-if="this.completedItinerary.hasOwnProperty('visited_waypoints')">
          <li v-for="waypoint in this.completedItinerary.visited_waypoints" class="visited-waypoint-item">
            <p>{{waypoint.name}}</p>
          </li>
        </ul>
      </scrollPanelComp>
    </div>
    <div class="align-center" v-show="isSummaryExpanded">
      <button class="p-button p-component p-button-icon-only p-button-rounded" type="button" @click="closeNavigation">
        <span class="material-icons-outlined">home</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .summary-container {
    position: absolute;
    z-index: 1;
    bottom: 6rem;
    width: calc(100vw - 2 * 1.2rem);
    height: 0;
    padding: 0;
    margin: 0 1.2rem;
    align-items: center;
    flex-direction: row;
    transition-duration: 500ms;
    transition-timing-function: cubic-bezier(0.5,0.25,0,1);
    background-color: var(--surface-a);
    border-radius: 25px;
    box-sizing: border-box;
  }
  .expanded {
    height: calc(100vh - 2 * 5rem - 2rem);
    padding: 1.2rem;
  }
  .summary-details {
    width: 100%;
    height: calc(100% - 3rem);
  }
  #summary-details-scroll-panel {
    width: 100%;
    height: calc(100% - 6rem);
    padding-top: 1.728rem;
  }
  .visited-waypoint-item {

  }
  .align-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<script lang="ts">
import {defineComponent} from "vue";
import headerComp from "../components/headerComp.vue";
import axios from "axios";
import {Environment} from "../environment";
import moment from "moment";

export default defineComponent({
  components: {headerComp},
  data(){
    return {
      completedItinerariesNumber: 0,
      completedItineraries: [],
    }
  },
  mounted(){
    this.loadCompletedItineraries();
  },
  methods:{
    loadCompletedItineraries() {

      Promise.all([
        axios.get(`https://${Environment.BACKEND_HOST}/itineraries`,),
        axios.get(`https://${Environment.BACKEND_HOST}/waypoints`),
        axios.get(`https://${Environment.BACKEND_HOST}/completed-itineraries/user/${this.$cookies.get("user").userId}`)
      ]).then((response) => {
        const itineraries = response[0].data;
        const waypoints = response[1].data;
        this.completedItineraries = response[2].data;
        this.completedItinerariesNumber = this.completedItineraries.length;
        this.completedItineraries.forEach(completedItinerary => {
          if (completedItinerary.related_itinerary !== undefined) {
            completedItinerary.itinerary = Object.create(itineraries.find(itinerary => itinerary._id === completedItinerary.related_itinerary));
          } else {
            completedItinerary.itinerary = {
              name: "Percorso libero"
            };
          }
          completedItinerary.waypoints = [];
          completedItinerary.visited_waypoints.forEach(visitedWaypoint => {
            completedItinerary.waypoints.push(Object.create(waypoints.find(waypoint => waypoint._id === visitedWaypoint)));
          });
          completedItinerary.startDate = moment(completedItinerary.start_date).format("YYYY-MM-DD");
          completedItinerary.pointsEarned = completedItinerary.points_earned ?? 0;
        });
      });
    },
  }
});
</script>

<template>
  <headerComp></headerComp>
  <main>
    <h1>Storico Percorsi</h1>
    <h5>Totale itinerari completati: {{this.completedItinerariesNumber}}</h5>
    <div class="card">
      <cardComp v-for="completedItinerary in this.completedItineraries">
        <template #title>{{ completedItinerary.itinerary.name }}</template>
        <template #subtitle>data: {{ completedItinerary.startDate }}
          <br>punti ottenuti: {{completedItinerary.pointsEarned}}
        </template>
        <template #content>
          <p v-for="waypoint in completedItinerary.waypoints">{{waypoint.name}}</p>
        </template>
      </cardComp>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  .card {
    text-align: center;
  }
  p {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
  }
</style>
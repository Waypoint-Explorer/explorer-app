<script lang="ts">
import {defineComponent} from "vue";
import headerComp from "../components/headerComp.vue";
import axios from "axios";
import {Environment} from "../environment";

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
        axios.get(`http://${Environment.BACKEND_HOST}/completed-itineraries/user/${this.$cookies.get("user").userId}`)
          .then((completedItinerariesResponse) => {
            const completedItieneraries = completedItinerariesResponse.data;
            this.completedItinerariesNumber = completedItieneraries.length;
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
  </main>
</template>

<style lang="scss" scoped>

</style>
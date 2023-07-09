<script lang="ts">
  import { defineComponent } from "vue";
  import axios from "axios";
  import { Environment } from "../environment";

  export default defineComponent({
    data(){
      return {
        filter: false,
        completedItineraries: [],
        periods: [
          {name:"Ultima settimana", code:"sett"},
          {name:"Ultimo mese", code:"mese"},
          {name:"Ultimo anno", code:"anno"},
        ],
        selectedPeriod: "",
      }
    },
    mounted() {
      //this.allCompletedItineraries();
    },
    methods: {
      allCompletedItineraries(){
        axios.get(`http://${Environment.BACKEND_HOST}/completed-itineraries`)
            .then((response) => {
              this.completedItineraries = [];

              response.data.forEach((itinerary) =>{
                this.completedItineraries.push({
                  related_itinerary: `${itinerary.related_itinerary}`,
                  start_date: `${itinerary.start_date}`,
                  completion_date: `${itinerary.completion_date}`,
                });
              });
            })
            .catch((error) => {
              console.log(error);
            });
      },
    },
  });
</script>

<template>
  <h1>Statistiche</h1>
  <h2>Percorsi effettuati</h2>

  <div v-if="completedItineraries.length>0" style="padding: 1rem">
    <div class="filter">
      <dropdownComp v-model="selectedPeriod" :options="periods"
          optionLabel="name"
          optionValue="code"
          placeholder="Seleziona Periodo"
      />
      <buttonComp type="button" icon="pi pi-search" label="Filtra" @click.prevent="this.filter=true"/>
    </div>

    <div class="stats" v-if="filter">
      <h3 class="subtitle">Dati Relativi a </h3>
      <div class="p-chart">
        <chartComp chartComp="margin: 5px 0px 5px 0px" type="bar" :data="basicData" :options="horizontalOptions"/>
      </div>
    </div>
  </div>

  <div v-else>
    <p class="error">Nessun percorso effettuato dagli utenti</p>
  </div>
</template>

<style lang="scss">
  .error{
    text-align: center;
    font-style: italic;
  }
</style>
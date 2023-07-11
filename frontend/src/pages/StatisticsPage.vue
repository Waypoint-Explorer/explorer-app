<script lang="ts">
  import { defineComponent } from "vue";
  import axios from "axios";
  import { Environment } from "../environment";

  export default defineComponent({
    data(){
      return {
        filtered: false,
        completedItineraries: [],
        periods: [
          {name:"Ultima settimana", code:"week"},
          {name:"Ultimo mese", code:"month"},
          {name:"Ultimo anno", code:"year"},
        ],
        effectivePeriod: "",
        selectedPeriod: "",
        horizontalOptions: {
          plugins: {
            legend: {
              labels: {
                color: "#2c3e50",
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: "#495057",
              },
              grid: {
                color: "#ebedef",
              },
            },
            y: {
              ticks: {
                color: "#495057",
              },
              grid: {
                color: "#ebedef",
              },
            },
          },
        },
        basicData: {
          labels: [],
          datasets: [
            {
              label: "Numero percorsi",
              backgroundColor: "#FFA726",
              data: [],
            },
          ],
        },
        numCompletedItinerariesPeriod: 0,
        itinerariesPeriod: [],
        chartData: [],
      }
    },
    mounted() {
      this.allCompletedItineraries();
    },
    methods: {
      allCompletedItineraries(){
        axios.get(`http://${Environment.BACKEND_HOST}/completed-itineraries`)
            .then((response) => {
              this.completedItineraries = [];

              response.data.forEach((itinerary) =>{
                let related_itinerary = !!itinerary.related_itinerary ? itinerary.related_itinerary : "";
                let visited_waypoints = !!itinerary.visited_waypoints ? itinerary.visited_waypoints : "";
                let points_earned = !!itinerary.points_earned ? itinerary.points_earned : "";
                let completion_date = !!itinerary.completion_date ? new Date(itinerary.completion_date) : "";

                this.completedItineraries.push({
                  related_itinerary: `${related_itinerary}`,
                  visited_waypoints: `${visited_waypoints}`,
                  points_earned: `${points_earned}`,
                  start_date: new Date(itinerary.start_date),
                  completion_date: `${completion_date}`,
                });
              });
            })
            .catch((error) => {
              console.log(error);
            });
      },
      filter(){
        if (this.selectedPeriod != null) {
          this.basicData.datasets[0].data = [];
          this.basicData.labels = [];
          this.numCompletedItinerariesPeriod = 0;
          this.filtered = true;
          this.effectivePeriod = this.selectedPeriod['name'];

          switch (this.selectedPeriod['code']){
            case "week":
              this.setChartData(7);
              break;
            case "month":
              this.setChartData(30);
              break;
            case "year":
              this.setChartData(365);
              break;
          }
        }
      },
      setChartData(offset){
        var i: number;
        let today = new Date(Date.now());
        this.chartData = [];
        this.itinerariesPeriod = [];
        let offestDate = new Date();
        offestDate.setDate(today.getDate()-offset);

        this.completedItineraries.forEach((itinerary: any)=>{
          if(itinerary.start_date.getTime() >= offestDate.getTime() && itinerary.start_date.getTime() <= today.getTime()){
            this.numCompletedItinerariesPeriod+=1;
            this.itinerariesPeriod.push(itinerary);
          }
        });

        for (i = offset; i >= 0; i--) {
          let date = new Date();
          date.setDate(today.getDate()-i);
          this.chartData.push({
            label: date,
            visits: 0
          });
        }

        this.chartData.forEach((data: any)=>{
          this.itinerariesPeriod.forEach(itinerary => {
            if(itinerary.start_date.toLocaleDateString() === data['label'].toLocaleDateString()){
              data['visits'] +=1;
            }
          });
        });

        this.chartData.forEach((l: any) => {
          this.basicData.labels.push(l.label.toLocaleDateString());
          this.basicData.datasets[0].data.push(l.visits);
        });
      },
    },
  });
</script>

<template>
  <h1>Statistiche</h1>
  <h2>Percorsi effettuati</h2>

  <div v-if="completedItineraries.length>0">
    <div class="filter">
      <dropdownComp v-model="selectedPeriod" :options="periods" optionLabel="name" placeholder="Seleziona Periodo"/>
      <buttonComp type="button" icon="pi pi-search" label="Filtra" @click.prevent="filter" style="margin-top:1rem"/>
    </div>

    <div class="stats" v-if="filtered">
      <h3 class="subtitle">Dati Relativi a "{{this.effectivePeriod}}"</h3>
      <p class="info">Numero totale di percorsi effettuati: {{this.numCompletedItinerariesPeriod}}</p>
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
  .stats{
    margin-bottom: 5rem;
  }
  .info{
    text-align: center;
  }
</style>
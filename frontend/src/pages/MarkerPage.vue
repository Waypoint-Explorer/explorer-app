<script lang="ts">
  import {defineComponent} from "vue";
  import axios, {AxiosError} from "axios";
  import {Environment} from "../environment";

  export default defineComponent({
    data(){
      return {
        showMenu: false,
        success: false,
        marker_id: "",
        coordinates: {
          latitude: "",
          longitude: ""
        },
        marker_type: "",
        points: null,
        types: [],
        markers: [],
        formError: {
          cause: "",
          message: "",
        },
      }
    },
    mounted(){
      this.allMarkers();
    },
    methods:{
      allMarkers(){
        axios.get(`http://${Environment.BACKEND_HOST}/markers`)
            .then((response) => {
              this.markers = [];
              response.data.forEach((marker) =>{
                let points = !!marker.points ? marker.points : "";
                this.markers.push({
                  marker_id: `${marker.marker_id}`,
                  coordinates: {
                    latitude: `${marker.coordinates.latitude}`,
                    longitude: `${marker.coordinates.longitude}`,
                  },
                  type: `${marker.type}`,
                  points: `${points}`,
                });
              });
            })
            .catch((error) => {
              console.log(error);
            });
      },
      addMarker(){
        if(this.checkForm()){
          this.success = false;

          const newMarker = {
            marker_id: this.marker_id,
            coordinates: {
              latitude: this.coordinates.latitude,
              longitude: this.coordinates.longitude
            },
            type: this.marker_type['name'],
            points: this.points,
          };
          axios.post(`http://${Environment.BACKEND_HOST}/markers`, newMarker)
              .then(() => {
                this.showMenu=false;
                this.allMarkers();
                this.resetForm();
                this.success = true;
              })
              .catch(this.displayError);
        }
      },
      markerTypes(){
        axios.get(`http://${Environment.BACKEND_HOST}/markerTypes`)
            .then((response) => {
              this.types = [];
              response.data.types.forEach((type)=>{
                this.types.push({
                  name: `${type}`,
                  code: `${type}`,
                });
              });
            })
            .catch((error) => {
              console.log(error);
            });
      },
      arrangeForm(){
        this.showMenu = true;
        this.markerTypes();
      },
      checkForm() : boolean {
        if (this.marker_id === "") {
          this.formError.cause = "marker_id";
          this.formError.message = "L'id del marcatore è richiesto per l'inserimento.";
        } else if (this.coordinates.latitude === "") {
          this.formError.cause = "latitude";
          this.formError.message = "La latitudine del marcatore è richiesta per l'inserimento.";
        } else if (this.coordinates.longitude === "") {
          this.formError.cause = "longitude";
          this.formError.message = "La longitudine del marcatore è richiesta per l'inserimento.";
        } else if (this.marker_type === "") {
          this.formError.cause = "marker_type";
          this.formError.message = "La tipologia del marcatore è richiesta per l'inserimento.";
        } else {
          return true;
        }
        return false;
      },
      displayError(error: AxiosError) {
        switch (error.response?.data){
          case "There is already a marker with the same marker_id.":
            this.formError.cause = "marker_id";
            this.formError.message = "L'id del marcatore inserito è già presente su questo servizio.";
            return;
        }
        console.log("Add marker error: " + error.response + "\tMessage: " + error.response?.data);
      },
      resetForm(){
        this.marker_id="";
        this.coordinates = {
          latitude: "",
          longitude: ""
        };
        this.marker_type="";
        this.points=null;
        this.types = [];
        this.formError.cause = "";
        this.formError.message = "";
      },
    }
  });
</script>

<template>
  <h1>Marcatori</h1>
  <buttonComp v-if="showMenu!==true" class="confirm-button" type="button" label="Aggiungi marcatore" icon="pi pi-plus" @click.prevent="arrangeForm"/>

  <messageComp severity="success" v-if="success" :sticky=false :life=5000 :closable="false" style="text-align: left">Inserimento avvenuto con successo!</messageComp>

  <div v-if="showMenu===true" class="p-formgroup-inline">
    <div class="p-field">
      <label for="marker_id">Id marcatore *</label>
      <inputTextComp id="marker_id" v-model="marker_id" type="text" placeholder="Id marcatore *" :class="{'p-invalid': formError.cause === 'marker_id'}"/>
      <small v-if="formError.cause === 'marker_id'" class="p-error">{{ this.formError.message }}</small>
    </div>

    <div class="p-field">
      <label for="latitude">Latitudine *</label>
      <inputTextComp id="latitude" v-model="coordinates.latitude" type="text" placeholder="Latitudine *" :class="{'p-invalid': formError.cause === 'latitude'}"/>
      <small v-if="formError.cause === 'latitude'" class="p-error">{{ this.formError.message }}</small>
    </div>

    <div class="p-field">
      <label for="longitude">Longitudine *</label>
      <inputTextComp id="longitude" v-model="coordinates.longitude" type="text" placeholder="Longitudine *" :class="{'p-invalid': formError.cause === 'longitude'}"/>
      <small v-if="formError.cause === 'longitude'" class="p-error">{{ this.formError.message }}</small>
    </div>

    <div class="p-field">
      <label for="marker_type">Tipologia *</label>
      <dropdownComp id="marker_type" v-model="marker_type" :options="types" optionLabel="name" placeholder="Tipologia *" :class="{'p-invalid': formError.cause === 'marker_type'}"/>
      <small v-if="formError.cause === 'marker_type'" class="p-error">{{ this.formError.message }}</small>
    </div>

    <div v-if="marker_type['name']==='Device'" class="p-field">
      <label for="points">Punti</label>
      <inputNumberComp id="points" v-model="points" placeholder="Punti"/>
    </div>

    <buttonComp class="confirm-button" type="button" label="Aggiungi" @click.prevent="addMarker"/>
  </div>

  <div class="card">
    <cardComp v-for="marker in this.markers">
      <template #title> {{ marker.marker_id }} </template>
      <template #subtitle> {{ marker.type }}</template>
      <template #content>
        <p>coordinate: {{marker.coordinates.latitude}}, {{marker.coordinates.longitude}}</p>
        <p v-if="marker.points!==''">punti: {{marker.points}}</p>
      </template>
    </cardComp>
  </div>

</template>

<style lang="scss">
  .card{
    text-align: center;
  }
  p{
    margin: 0;
  }
</style>
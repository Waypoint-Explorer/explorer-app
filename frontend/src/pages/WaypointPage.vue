<script lang="ts">
import {defineComponent} from "vue";
import axios, {AxiosError} from "axios";
import {Environment} from "../environment";

export default defineComponent({
  data(){
    return {
      showMenu: false,
      success: false,
      name: "",
      description: "",
      place: "",
      accessibility_info: "",
      price: {
        description: "",
        price: ""
      },
      markers: [],
      selectedMarker: "",
      waypoints: [],
      formError: {
        cause: "",
        message: "",
      },
    }
  },
  mounted(){
    this.allWaypoints();
  },
  methods:{
    allMarkers(){
      axios.get(`http://${Environment.BACKEND_HOST}/markers`)
          .then((response) => {
            this.showMenu=true;
            this.markers = [];
            response.data.forEach((marker) =>{
              this.markers.push({
                _id: `${marker._id}`,
                name: `${marker.marker_id}, ${marker.type}`,
                id: `${marker.marker_id}`,
                coordinates: {
                  latitude: `${marker.coordinates.latitude}`,
                  longitude: `${marker.coordinates.longitude}`,
                },
                type: `${marker.type}`,
                points: `${marker.points}`,
              });
            });
          })
          .catch((error) => {
            console.log(error);
          });
    },
    allWaypoints(){
      axios.get(`http://${Environment.BACKEND_HOST}/waypoints`)
          .then((response) => {
            this.waypoints = [];
            response.data.forEach((waypoint) =>{
              let description = !!waypoint.description ? waypoint.description : "";
              let place = !!waypoint.place ? waypoint.place : "";
              let priceDescription = !!waypoint.price ? waypoint.price.description : "";
              let priceValue = !!waypoint.price ? waypoint.price.price : "";
              let accessibility = !!waypoint.accessibility_info ? waypoint.accessibility_info : "";
              let markerId = !!waypoint.marker ? waypoint.marker : "";

              this.waypoints.push({
                name: `${waypoint.name}`,
                description: `${description}`,
                place: `${place}`,
                price:{
                  description: `${priceDescription}`,
                  price: `${priceValue}`,
                },
                accessibility_info: `${accessibility}`,
                marker: `${markerId}`,
                opening_hours: !!waypoint.opening_hours ? this.formatOpeningHours(JSON.stringify(waypoint.opening_hours)) : "",
              });
            });
          })
          .catch((error) => {
            console.log(error);
          });
    },
    addWaypoint(){
      if(this.checkForm()){
        let newWaypoint: any = {
          name: this.name,
          marker: this.selectedMarker['_id'],
        };
        if (this.description!=="") { newWaypoint.description = this.description; }
        if (this.place!=="") { newWaypoint.place = this.place; }
        if (this.price.description!=="" && this.price.price!=="") { newWaypoint.price = this.price; }
        if (this.accessibility_info!=="") { newWaypoint.accessibility_info = this.accessibility_info; }
        axios.post(`http://${Environment.BACKEND_HOST}/waypoints`, newWaypoint)
            .then(() => {
              this.showMenu=false;
              this.allWaypoints();
              this.resetForm();
              this.success = true;
            })
            .catch(this.displayError);
      }
    },
    checkForm() : boolean {
      if (this.name === "") {
        this.formError.cause = "name";
        this.formError.message = "Il nome della tappa è richiesto per l'inserimento.";
      } else if(this.selectedMarker === ""){
        this.formError.cause = "marker";
        this.formError.message = "Il marcatore associato è richiesto per l'inserimento.";
      } else {
        return true;
      }
      return false;
    },
    displayError(error: AxiosError) {
      console.log("Add waypoint error: " + error.response + "\tMessage: " + error.response?.data);
    },
    resetForm(){
      this.markers=[];
      this.name="";
      this.description="";
      this.place="";
      this.accessibility_info="";
      this.price= {
        description: "",
        price: ""
      };
      this.selectedMarker="";
    },
    formatOpeningHours(openingHours){
      let data = openingHours.replaceAll("],"," | ");
      data = data.replaceAll("{","");
      data = data.replaceAll("\"","");
      data = data.replaceAll("}"," ");
      data = data.replaceAll("["," ");
      data = data.replaceAll("monday_hours","lunedì");
      data = data.replaceAll("tuesday_hours","martedì");
      data = data.replaceAll("wednesday_hours","mercoledì");
      data = data.replaceAll("thursday_hours","giovedì");
      data = data.replaceAll("friday_hours","venerdì");
      data = data.replaceAll("saturday_hours","sabato");
      data = data.replaceAll("sunday_hours","domenica");
      data = data.replaceAll("closing_days","giorni chiusura");
      data = data.replaceAll("shift_start:","dalle ");
      data = data.replaceAll("shift_end:","alle ");
      data = data.replaceAll(","," ");
      data = data.replaceAll(":","=>");
      data = data.replaceAll(" ]"," no");
      return data;
    },
  }
});
</script>

<template>
  <h1>Tappe</h1>
  <buttonComp v-if="showMenu!==true" class="confirm-button" type="button" label="Aggiungi tappa" icon="pi pi-plus" @click.prevent="allMarkers"/>

  <messageComp severity="success" v-if="success" :sticky=false :life=5000 :closable="false" style="text-align: left">Inserimento avvenuto con successo!</messageComp>

  <div v-if="showMenu===true" class="p-formgroup-inline">
    <div class="p-field">
      <label for="name">Nome *</label>
      <inputTextComp id="name" v-model="name" type="text" placeholder="Nome *" :class="{'p-invalid': formError.cause === 'name'}"/>
      <small v-if="formError.cause === 'name'" class="p-error">{{ this.formError.message }}</small>
    </div>

    <div class="p-field">
      <label for="marker">Marcatore associato *</label>
      <dropdownComp id="marker" v-model="selectedMarker" :options="markers" optionLabel="name" placeholder="Marcatore *" :class="{'p-invalid': formError.cause === 'marker'}"/>
      <small v-if="formError.cause === 'marker'" class="p-error">{{ this.formError.message }}</small>
    </div>

    <div class="p-field">
      <label for="description">Descrizione</label>
      <textareaComp id="description" v-model="description" autoResize rows="5" cols="30" :class="{'p-invalid': formError.cause === 'description'}"/>
      <small v-if="formError.cause === 'description'" class="p-error">{{ this.formError.message }}</small>
    </div>

    <div class="p-field">
      <label for="latitude">Luogo</label>
      <inputTextComp id="place" v-model="place" type="text" placeholder="Luogo" :class="{'p-invalid': formError.cause === 'place'}"/>
      <small v-if="formError.cause === 'place'" class="p-error">{{ this.formError.message }}</small>
    </div>

    <div class="p-field">
      <label for="price">Prezzo</label>
      <inputTextComp id="price" v-model="price.description" type="text" placeholder="Descrizione" :class="{'p-invalid': formError.cause === 'price'}"/>
      <small v-if="formError.cause === 'price'" class="p-error">{{ this.formError.message }}</small>

      <inputTextComp id="price" v-model="price.price" type="text" placeholder="Costo €" :class="{'p-invalid': formError.cause === 'price'}"/>
      <small v-if="formError.cause === 'price'" class="p-error">{{ this.formError.message }}</small>
    </div>

    <div class="p-field">
      <label for="accessibility">Accessibilità</label>
      <inputTextComp id="accessibility" v-model="accessibility_info" type="text" placeholder="Accessibilità" :class="{'p-invalid': formError.cause === 'accessibility'}"/>
      <small v-if="formError.cause === 'accessibility'" class="p-error">{{ this.formError.message }}</small>
    </div>

    <buttonComp class="confirm-button" type="button" label="Aggiungi" @click.prevent="addWaypoint"/>
  </div>

  <div class="card">
    <cardComp v-for="waypoint in this.waypoints">
      <template #title> {{ waypoint.name }} </template>
      <template #subtitle v-if="waypoint.description!==''"> {{ waypoint.description }}</template>
      <template #content>
        <p v-if="waypoint.place!==''">luogo: {{waypoint.place}}</p>
        <p v-if="waypoint.price.description!=='' && waypoint.price.price!==''">prezzo: {{waypoint.price.description}} {{waypoint.price.price}}</p>
        <p v-if="waypoint.opening_hours!==''">orari di apertura: {{waypoint.opening_hours}}</p>
        <p v-if="waypoint.accessibility_info!==''">accessibilità: {{waypoint.accessibility_info}}</p>
        <p v-if="waypoint.marker!==''">marcatore: {{waypoint.marker}}</p>
      </template>

      <template #footer>
        <buttonComp icon="pi pi-pencil" label="Modifica" severity="secondary" />
        <buttonComp icon="pi pi-trash" label="Cancella" severity="danger" style="margin-top: 0.25rem"/>
      </template>
    </cardComp>
  </div>

</template>

<style lang="scss">
  .card{
    text-align: center;
  }
  .p-card .p-card-subtitle{
    text-align: left;
    margin-bottom: 0;
  }
  .p-card .p-card-footer{
    padding: 0;
  }
  .p-card .p-card-content {
    text-align: left;
    padding: 0.25rem 0 1.25rem 0;
  }
  .p-card .p-card-title{
    text-align: left;
    margin-bottom: 0;
  }
  p{
    margin: 0;
  }
  @media screen and (min-width: 800px){
    .p-card{
      width: 40%;
      display: inline-block;
      margin: 0px 5px 10px 5px;
      padding: 0px 20px;
    }
  }
  @media screen and (min-width: 1250px){
    .p-card{
      width: 30%;
      display: inline-block;
      margin: 0px 5px 10px 5px;
      padding: 0px 20px;
    }
  }
</style>
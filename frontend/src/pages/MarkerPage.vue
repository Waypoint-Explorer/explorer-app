<script lang="ts">
  import {defineComponent} from "vue";
  import axios, {AxiosError} from "axios/index";
  import {Environment} from "../environment";

  export default defineComponent({
    data(){
      return {
        showMenu: false,
        marker_id: "46fgeydf",
        coordinates: {
          latitude: "157.85",
          longitude: "245.08"
        },
        marker_type: "",
        points: "15",
        types: [
          { name: 'Device', code: 'Dev' },
          { name: 'QRmarker', code: 'qr' },
        ],
        formError: {
          cause: "",
          message: "",
        },
      }
    },
    created(){
      this.allMarkers();
      this.markerTypes();
    },
    methods:{
      allMarkers(){
        axios.get(`http://${Environment.BACKEND_HOST}/markers`)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
      },
      markerTypes(){
        axios.get(`http://${Environment.BACKEND_HOST}/markerTypes`)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
      },
    }
  });
</script>

<template>
  <h1>Marcatori</h1>
  <buttonComp v-if="showMenu!==true" class="confirm-button" type="button" label="Aggiungi marcatore" icon="pi pi-plus" @click.prevent="this.showMenu=true"/>

  <div v-if="showMenu===true" class="p-formgroup-inline">
    <div class="p-field">
      <label for="marker_id">marker_id *</label>
      <inputTextComp id="marker_id" v-model="marker_id" type="text" placeholder="marker_id *" :class="{'p-invalid': formError.cause === 'marker_id'}"/>
      <small v-if="formError.cause === 'marker_id'" class="p-error">{{ this.formError.message }}</small>
    </div>

    <div class="p-field">
      <label for="latitude">latitude *</label>
      <inputTextComp id="latitude" v-model="coordinates.latitude" type="text" placeholder="latitude *" :class="{'p-invalid': formError.cause === 'latitude'}"/>
      <small v-if="formError.cause === 'latitude'" class="p-error">{{ this.formError.message }}</small>
    </div>

    <div class="p-field">
      <label for="longitude">longitude *</label>
      <inputTextComp id="longitude" v-model="coordinates.longitude" type="text" placeholder="longitude *" :class="{'p-invalid': formError.cause === 'longitude'}"/>
      <small v-if="formError.cause === 'longitude'" class="p-error">{{ this.formError.message }}</small>
    </div>

    <div class="p-field">
      <label for="marker_type">type *</label>
      <dropdownComp id="marker_type" v-model="marker_type" :options="types" optionLabel="marker_type" placeholder="type *" :class="{'p-invalid': formError.cause === 'marker_type'}"/>
      <small v-if="formError.cause === 'marker_type'" class="p-error">{{ this.formError.message }}</small>
    </div>

    <div class="p-field">
      <label for="points">points</label>
      <inputTextComp id="points" v-model="points" type="text" placeholder="points" :class="{'p-invalid': formError.cause === 'points'}"/>
      <small v-if="formError.cause === 'points'" class="p-error">{{ this.formError.message }}</small>
    </div>

    <buttonComp class="confirm-button" type="button" label="Aggiungi" @click.prevent="this.showMenu=false"/>
  </div>

  <div class="card">
    <cardComp>
      <template #title> {{ this.marker_id }} </template>
      <template #subtitle> {{ this.marker_type }}</template>
      <template #content>
        <p>{{this.coordinates.latitude}}, {{this.coordinates.longitude}}</p>
      </template>
      <template #footer>
        <buttonComp icon="pi pi-pencil" label="Modifica" severity="secondary" />
        <buttonComp icon="pi pi-trash" label="Cancella" severity="danger" style="margin-top: 0.25rem"/>
      </template>
    </cardComp>
  </div>


</template>

<style lang="scss">
  .p-card .p-card-subtitle{
    margin: 0;
  }
  .p-card .p-card-footer{
    padding: 0;
  }
</style>
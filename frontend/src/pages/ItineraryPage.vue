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
        selectedCategory: "",
        extraPoints: 0,
        categories: [],
        waypoints: [],
        selectedWaypoints: [],
        itineraries: [],
        formError: {
          cause: "",
          message: "",
        },
      }
    },
    mounted(){
      this.allItineraries();
    },
    methods:{
      allItineraries(){
        axios.get(`http://${Environment.BACKEND_HOST}/itineraries`)
            .then((response) => {
              this.itineraries = [];
                response.data.forEach((itinerary) =>{

                  this.itineraries.push({
                    name: `${itinerary.name}`,
                    type: `${itinerary.type}`,
                    extra_points: `${itinerary.extra_points}`,
                  });
                });
            })
            .catch((error) => {
              console.log(error);
            });
      },
      addItinerary(){
        if(this.checkForm()){
          this.success = false;
          let newItinerary: any = {
            name: this.name,
            type: this.selectedCategory['name'],
            extra_points: this.extraPoints,
          };
          if (this.description!=="") { newItinerary.description = this.description; }
          if (this.selectedWaypoints.length>0) {newItinerary.waypoints = this.selectedWaypoints;}
          axios.post(`http://${Environment.BACKEND_HOST}/itineraries`, newItinerary)
              .then(() => {
                this.showMenu=false;
                this.allItineraries();
                this.resetForm();
                this.success = true;
              })
              .catch(this.displayError);
        }
      },
      itineraryCategories(){
        axios.get(`http://${Environment.BACKEND_HOST}/itinerariesTypes`)
            .then((response) => {
              this.categories = [];
              response.data.types.forEach((type)=>{
                this.categories.push({
                  name: `${type}`,
                  code: `${type}`,
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
                this.waypoints.push({
                  id: `${waypoint._id}`,
                  name: `${waypoint.name}`,
                });
              });
            })
            .catch((error) => {
              console.log(error);
            });
      },
      arrangeForm(){
        this.showMenu = true;
        this.itineraryCategories();
        this.allWaypoints();
      },
      checkForm() : boolean {
        if (this.name === "") {
          this.formError.cause = "name";
          this.formError.message = "Il nome del percorso è richiesto per l'inserimento.";
        } else if (this.selectedCategory === "") {
          this.formError.cause = "category";
          this.formError.message = "La categoria del percorso è richiesta per l'inserimento.";
        } else if (this.extraPoints === "") {
          this.formError.cause = "points";
          this.formError.message = "I punti extra del percorso sono richiesti per l'inserimento.";
        } else {
          return true;
        }
        return false;
      },
      displayError(error: AxiosError) {
        console.log("Add itinerary error: " + error.response + "\tMessage: " + error.response?.data);
      },
      resetForm(){
        this.name= "";
        this.description= "";
        this.selectedCategory= "";
        this.extraPoints= 0;
        this.categories= [];
        this.waypoints= [];
        this.selectedWaypoints= [];
        this.itineraries= [];
        this.formError.cause = "";
        this.formError.message = "";
      },
    }
  });
</script>

<template>
  <h1>Percorsi</h1>
  <buttonComp v-if="showMenu!==true" class="confirm-button" type="button" label="Aggiungi percorso" icon="pi pi-plus" @click.prevent="arrangeForm"/>

  <messageComp severity="success" v-if="success" :sticky=false :life=5000 :closable="false" style="text-align: left">Inserimento avvenuto con successo!</messageComp>

  <div v-if="showMenu===true" class="p-formgroup-inline">
    <div class="p-field">
      <label for="name">Nome *</label>
      <inputTextComp id="name" v-model="name" type="text" placeholder="Nome *" :class="{'p-invalid': formError.cause === 'name'}"/>
      <small v-if="formError.cause === 'name'" class="p-error">{{ this.formError.message }}</small>
    </div>

    <div class="p-field">
      <label for="category">Categoria *</label>
      <dropdownComp id="category" v-model="selectedCategory" :options="categories" optionLabel="name" placeholder="Categoria *" :class="{'p-invalid': formError.cause === 'category'}"/>
      <small v-if="formError.cause === 'category'" class="p-error">{{ this.formError.message }}</small>
    </div>

    <div class="p-field">
      <label for="points">Punti Extra *</label>
      <inputNumberComp id="points" v-model="extraPoints" placeholder="Punti Extra *" :class="{'p-invalid': formError.cause === 'points'}"/>
      <small v-if="formError.cause === 'points'" class="p-error">{{ this.formError.message }}</small>
    </div>

    <div class="p-field">
      <label for="description">Descrizione</label>
      <textareaComp id="description" v-model="description" autoResize rows="5" cols="30"/>
    </div>

    <div class="p-field">
      <label for="waypoint">Tappe</label>
      <multiSelectComp v-model="selectedWaypoints" :options="waypoints" optionLabel="name" placeholder="Tappe"/>
    </div>

    <buttonComp class="confirm-button" type="button" label="Aggiungi" @click.prevent="addItinerary"/>
  </div>

  <div class="card">
    <cardComp v-for="itinerary in this.itineraries">
      <template #title> {{ itinerary.name }} </template>
      <template #subtitle> {{ itinerary.type }}</template>
      <template #content>
        <p>punti extra: {{itinerary.extra_points}}</p>
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
  .p-checkbox .p-checkbox-box.p-highlight,
  .p-checkbox .p-checkbox-box{
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
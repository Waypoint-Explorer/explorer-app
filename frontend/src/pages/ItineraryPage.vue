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
        selectedWaypoint: "",
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
        if(this.checkForm()){     //TODO
          axios.post(`http://${Environment.BACKEND_HOST}/`, )
              .then(() => {
              })
              .catch(this.displayError);
        }
      },
      itineraryCategories(){
        this.showMenu = true;
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
      checkForm() : boolean {     //TODO
        if (this.marker_id === "") {
          this.formError.cause = "marker_id";
          this.formError.message = "L'id del marcatore è richiesto per l'inserimento.";
        } else if (this.coordinates.latitude === "") {
          this.formError.cause = "latitude";
          this.formError.message = "La latitudine del marcatore è richiesto per l'inserimento.";
        } else if (this.coordinates.longitude === "") {
          this.formError.cause = "longitude";
          this.formError.message = "La longitudine del marcatore è richiesto per l'inserimento.";
        } else if (this.marker_type === "") {
          this.formError.cause = "marker_type";
          this.formError.message = "La tipologia del marcatore è richiesto per l'inserimento.";
        } else {
          return true;
        }
        return false;
      },
      displayError(error: AxiosError) {
        console.log("Add itinerary error: " + error.response + "\tMessage: " + error.response?.data);
      },
      resetForm(){
      },
    }
  });
</script>

<template>
  <h1>Percorsi</h1>
  <buttonComp v-if="showMenu!==true" class="confirm-button" type="button" label="Aggiungi percorso" icon="pi pi-plus" @click.prevent="itineraryCategories"/>

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
      <inputTextComp id="points" v-model="extraPoints" type="text" placeholder="Punti Extra *"/>
    </div>

    <div class="p-field">
      <label for="description">Descrizione</label>
      <textareaComp id="description" v-model="description" autoResize rows="5" cols="30"/>
    </div>

    <div class="p-field">
      <label for="waypoint">Tappe</label>
      <dropdownComp id="waypoint" v-model="selectedWaypoint" :options="waypoints" optionLabel="name" placeholder="Tappe" :class="{'p-invalid': formError.cause === 'waypoint'}"/>
      <small v-if="formError.cause === 'waypoint'" class="p-error">{{ this.formError.message }}</small>
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
<script lang="ts">
  import {defineComponent} from "vue";
  import axios, {AxiosError} from "axios";
  import {Environment} from "../environment";

  export default defineComponent({
    data(){
      return {
        showMenu: false,
        success: false,
        newSlot: false,
        name: "",
        description: "",
        place: "",
        accessibility_info: "",
        price: {
          description: "",
          price: null
        },
        selected_day: "",
        opening_hour: "",
        closing_hour: "",
        closed_days: null,
        days: [
          { name: 'Lunedì', code: 'lun' },
          { name: 'Martedì', code: 'mar' },
          { name: 'Mercoledì', code: 'mer' },
          { name: 'Giovedì', code: 'gio' },
          { name: 'Venerdì', code: 'ven' },
          { name: 'Sabato', code: 'sab' },
          { name: 'Domenica', code: 'dom' },
        ],
        opening_hours: {
          monday_hours: [],
          tuesday_hours: [],
          wednesday_hours: [],
          thursday_hours: [],
          friday_hours: [],
          saturday_hours: [],
          sunday_hours: [],
        },
        markers: [],
        selectedMarker: "",
        waypoints: [],
        formError: {
          cause: "",
          message: "",
        },
        opening_hours_formatted: {
          monday_hours: [],
          tuesday_hours: [],
          wednesday_hours: [],
          thursday_hours: [],
          friday_hours: [],
          saturday_hours: [],
          sunday_hours: [],
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
                let place = !!waypoint.place ? waypoint.place : "";
                let markerId = !!waypoint.marker ? waypoint.marker : "";

                this.waypoints.push({
                  name: `${waypoint.name}`,
                  place: `${place}`,
                  marker: `${markerId}`,
                });
              });
            })
            .catch((error) => {
              console.log(error);
            });
      },
      addWaypoint(){
        if(this.checkForm()){
          this.addTimeSlot(false);
          let newWaypoint: any = {
            name: this.name,
            marker: this.selectedMarker['_id'],
          };
          if (this.description!=="") { newWaypoint.description = this.description; }
          if (this.place!=="") { newWaypoint.place = this.place; }
          if (this.price.description!=="" && this.price.price!=="") { newWaypoint.price = this.price; }
          if (this.accessibility_info!=="") { newWaypoint.accessibility_info = this.accessibility_info; }
          if (this.opening_hours!==null) {newWaypoint.opening_hours = this.opening_hours;}
          if (this.closed_days!==null) {newWaypoint.opening_hours.closing_days = this.closed_days;}
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
        } else if((this.selected_day!=='') && (this.opening_hour!=='' && this.closing_hour==='')){
          this.formError.cause = "closing_hour";
          this.formError.message = "Inserire l'orario di chiusura.";
        } else if((this.selected_day!=='') && (this.opening_hour==='' && this.closing_hour!=='')){
          this.formError.cause = "opening_hour";
          this.formError.message = "Inserire l'orario di apertura.";
        } else if((this.selected_day!=='') && (this.opening_hour==='' && this.closing_hour==='')){
          this.formError.cause = "hours";
          this.formError.message = "Inserire gli orari.";
        } else if(this.price.description!=="" && this.price.price===null){
          this.formError.cause = "price";
          this.formError.message = "Inserire il prezzo.";
        }else if(this.price.description==="" && this.price.price!==null){
          this.formError.cause = "priceDescription";
          this.formError.message = "Inserire la descrizione del prezzo.";
        }
        else {
          return true;
        }
        return false;
      },
      addTimeSlot(newSlot){
        this.newSlot = newSlot;
        if(this.opening_hour!=='' && this.closing_hour!==''){
          switch (this.selected_day['code']) {
            case "lun": {
              this.opening_hours.monday_hours.push({shift_start: Number(this.opening_hour.replace(":","")), shift_end: Number(this.closing_hour.replace(":",""))});
              this.opening_hours_formatted.monday_hours.push(this.opening_hour+'-'+this.closing_hour);
              break;
            }
            case "mar": {
              this.opening_hours.tuesday_hours.push({shift_start: Number(this.opening_hour.replace(":","")), shift_end: Number(this.closing_hour.replace(":",""))});
              this.opening_hours_formatted.tuesday_hours.push(this.opening_hour+'-'+this.closing_hour);
              break;
            }
            case "mer": {
              this.opening_hours.wednesday_hours.push({shift_start: Number(this.opening_hour.replace(":","")), shift_end: Number(this.closing_hour.replace(":",""))});
              this.opening_hours_formatted.wednesday_hours.push(this.opening_hour+'-'+this.closing_hour);
              break;
            }
            case "gio": {
              this.opening_hours.thursday_hours.push({shift_start: Number(this.opening_hour.replace(":","")), shift_end: Number(this.closing_hour.replace(":",""))});
              this.opening_hours_formatted.thursday_hours.push(this.opening_hour+'-'+this.closing_hour);
              break;
            }
            case "ven": {
              this.opening_hours.friday_hours.push({shift_start: Number(this.opening_hour.replace(":","")), shift_end: Number(this.closing_hour.replace(":",""))});
              this.opening_hours_formatted.friday_hours.push(this.opening_hour+'-'+this.closing_hour);
              break;
            }
            case "sab": {
              this.opening_hours.saturday_hours.push({shift_start: Number(this.opening_hour.replace(":","")), shift_end: Number(this.closing_hour.replace(":",""))});
              this.opening_hours_formatted.saturday_hours.push(this.opening_hour+'-'+this.closing_hour);
              break;
            }
            case "dom": {
              this.opening_hours.sunday_hours.push({shift_start: Number(this.opening_hour.replace(":","")), shift_end: Number(this.closing_hour.replace(":",""))});
              this.opening_hours_formatted.sunday_hours.push(this.opening_hour+'-'+this.closing_hour);
              break;
            }
          }
          this.opening_hour="";
          this.closing_hour="";
          this.selected_day="";
        }else{
          this.formError.cause = "hours";
          this.formError.message = "Inserire gli orari";
        }
      },
      displayError(error: AxiosError) {
        console.log("Add waypoint error: " + error.response + "\tMessage: " + error.response?.data);
      },
      resetForm(){
        this.markers=[];
        this.selectedMarker="";
        this.name="";
        this.description="";
        this.place="";
        this.accessibility_info="";
        this.selected_day= "";
        this.opening_hour= "";
        this.closing_hour= "";
        this.closed_days= null;
        this.opening_hours= {
          monday_hours: [],
          tuesday_hours: [],
          wednesday_hours: [],
          thursday_hours: [],
          friday_hours: [],
          saturday_hours: [],
          sunday_hours: [],
        };
        this.price= {
          description: "",
          price: null
        };
        this.formError.cause = "";
        this.formError.message = "";
        this.opening_hours_formatted= {
          monday_hours: [],
          tuesday_hours: [],
          wednesday_hours: [],
          thursday_hours: [],
          friday_hours: [],
          saturday_hours: [],
          sunday_hours: [],
        };
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
      <textareaComp id="description" v-model="description" autoResize rows="5" cols="30"/>
    </div>

    <div class="p-field">
      <label for="place">Luogo</label>
      <inputTextComp id="place" v-model="place" type="text" placeholder="Luogo"/>
    </div>

    <div class="p-field">
      <label for="price">Prezzo</label>
      <inputTextComp id="price" v-model="price.description" type="text" placeholder="Descrizione" :class="{'p-invalid': formError.cause === 'priceDescription'}"/>
      <small v-if="formError.cause === 'priceDescription'" class="p-error">{{ this.formError.message }}</small>

      <inputNumberComp id="price" v-model="price.price" placeholder="Costo €" mode="currency" currency="EUR" :class="{'p-invalid': formError.cause === 'price'}"/>
      <small v-if="formError.cause === 'price'" class="p-error">{{ this.formError.message }}</small>
    </div>

    <div class="p-field">
      <label for="accessibility">Accessibilità</label>
      <inputTextComp id="accessibility" v-model="accessibility_info" type="text" placeholder="Accessibilità"/>
    </div>

    <div class="p-field">
      <label for="closed_days">Giorni di chiusura</label>
      <chipsComp id="closed_days" v-model="closed_days" separator="," />
    </div>

    <div class="p-field">
      <label for="opening">Giorno di apertura</label>
      <dropdownComp id="opening" v-model="selected_day" :options="days" optionLabel="name" placeholder="Giorno di apertura"/>

      <div v-if="selected_day" style="display:flex;justify-content: space-between;align-items: center">
        <div style="display: flex;flex-direction: column">
          <label v-if="selected_day" for="opening_hour">Dalle</label>
          <inputMaskComp id="opening_hour" v-model="opening_hour" mask="99:99" placeholder="99:99" style="width:6rem" :class="{'p-invalid': (formError.cause === 'opening_hour') || (formError.cause === 'hours')}"/>
        </div>

        <div style="display: flex;flex-direction: column">
          <label v-if="selected_day" for="closing_hour">Alle</label>
          <inputMaskComp id="closing_hour" v-model="closing_hour" mask="99:99" placeholder="99:99" style="width:6rem" :class="{'p-invalid': (formError.cause === 'closing_hour') || (formError.cause === 'hours')}"/>
        </div>

        <buttonComp class="confirm-button" icon="add" rounded raised @click.prevent="addTimeSlot(true)" style="padding:0;width:2.488rem;margin:0">
          <span class="material-icons">add</span>
        </buttonComp>
      </div>
      <small v-if="selected_day && (formError.cause === 'closing_hour' || formError.cause === 'opening_hour' || formError.cause === 'hours')" class="p-error">{{ this.formError.message }}</small>
    </div>

    <div class="p-field" v-if="newSlot">
      <label v-if="opening_hours.monday_hours.length>0" for="monday_time_slot">Lunedì</label>
      <chipsComp v-if="opening_hours.monday_hours.length>0" id="monday_time_slot" v-model="opening_hours_formatted.monday_hours" separator="," />

      <label v-if="opening_hours.tuesday_hours.length>0" for="tuesday_time_slot">Martedì</label>
      <chipsComp v-if="opening_hours.tuesday_hours.length>0" id="tuesday_time_slot" v-model="opening_hours_formatted.tuesday_hours" separator="," />

      <label v-if="opening_hours.wednesday_hours.length>0" for="wednesday_time_slot">Mercoledì</label>
      <chipsComp v-if="opening_hours.wednesday_hours.length>0" id="wednesday_time_slot" v-model="opening_hours_formatted.wednesday_hours" separator="," />

      <label v-if="opening_hours.thursday_hours.length>0" for="thursday_time_slot">Giovedì</label>
      <chipsComp v-if="opening_hours.thursday_hours.length>0" id="thursday_time_slot" v-model="opening_hours_formatted.thursday_hours" separator="," />

      <label v-if="opening_hours.friday_hours.length>0" for="friday_time_slot">Venerdì</label>
      <chipsComp v-if="opening_hours.friday_hours.length>0" id="friday_time_slot" v-model="opening_hours_formatted.friday_hours" separator="," />

      <label v-if="opening_hours.saturday_hours.length>0" for="saturday_time_slot">Sabato</label>
      <chipsComp v-if="opening_hours.saturday_hours.length>0" id="saturday_time_slot" v-model="opening_hours_formatted.saturday_hours" separator="," />

      <label v-if="opening_hours.sunday_hours.length>0" for="sunday_time_slot">Domenica</label>
      <chipsComp v-if="opening_hours.sunday_hours.length>0" id="sunday_time_slot" v-model="opening_hours_formatted.sunday_hours" separator="," />
    </div>

    <buttonComp class="confirm-button" type="button" label="Aggiungi" @click.prevent="addWaypoint"/>
  </div>

  <div class="card">
    <cardComp v-for="waypoint in this.waypoints">
      <template #title> {{ waypoint.name }} </template>
      <template #content>
        <p v-if="waypoint.place!==''">luogo: {{waypoint.place}}</p>
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
<script lang="ts">
  import {defineComponent} from "vue";
  import headerComp from "../components/headerComp.vue";
  import axios, {AxiosError} from "axios";
  import {Environment} from "../environment";

  export default defineComponent({
    components: {headerComp},
    data(){
      return {
        showMenu: false,
        success: false,
        title: "",
        business: "",
        description: "",
        points: null,
        coupons: [],
        formError: {
          cause: "",
          message: "",
        },
      }
    },
    mounted(){
      this.allCoupons();
    },
    methods:{
      allCoupons(){
        axios.get(`http://${Environment.BACKEND_HOST}/coupons`)
            .then((response) => {
              this.coupons = [];
              response.data.forEach((coupon) =>{
                this.coupons.push({
                  title: `${coupon.title}`,
                  business: `${coupon.business}`,
                  points: `${coupon.points}`,
                });
              });
            })
            .catch((error) => {
              console.log(error);
            });
      },
      addCoupon(){
        if(this.checkForm()){
          this.success = false;

          const newCoupon: any = {
            title: this.title,
            business: this.business,
            points: this.points,
          };
          if (this.description!=="") { newCoupon.description = this.description; }
          axios.post(`http://${Environment.BACKEND_HOST}/coupons`, newCoupon)
              .then(() => {
                this.showMenu=false;
                this.allCoupons();
                this.resetForm();
                this.success = true;
              })
              .catch(this.displayError);
        }
      },
      arrangeForm(){
        this.showMenu = true;
      },
      checkForm() : boolean {
        if (this.title === "") {
          this.formError.cause = "title";
          this.formError.message = "Il titolo del coupon è richiesto per l'inserimento.";
        } else if (this.business === "") {
          this.formError.cause = "business";
          this.formError.message = "L'attività commerciale del coupon è richiesto per l'inserimento.";
        } else if (this.points === null) {
          this.formError.cause = "points";
          this.formError.message = "I punti per ottenere il coupon sono richiesti per l'inserimento.";
        } else {
          return true;
        }
        return false;
      },
      displayError(error: AxiosError) {
        console.log("Add coupon error: " + error.response + "\tMessage: " + error.response?.data);
      },
      resetForm(){
        this.title="";
        this.business = "";
        this.description="";
        this.points=null;
        this.coupons = [];
        this.formError.cause = "";
        this.formError.message = "";
      },
    }
  });
</script>

<template>
  <headerComp></headerComp>
  <main>
    <h1>Coupon</h1>
    <buttonComp v-if="showMenu!==true" class="confirm-button" type="button" label="Aggiungi coupon" icon="pi pi-plus" @click.prevent="arrangeForm"/>

    <messageComp severity="success" v-if="success" :sticky=false :life=5000 :closable="false" style="text-align: left">Inserimento avvenuto con successo!</messageComp>

    <div v-if="showMenu===true" class="p-formgroup-inline">
      <div class="p-field">
        <label for="title">Titolo *</label>
        <inputTextComp id="title" v-model="title" type="text" placeholder="Titolo *" :class="{'p-invalid': formError.cause === 'title'}"/>
        <small v-if="formError.cause === 'title'" class="p-error">{{ this.formError.message }}</small>
      </div>

      <div class="p-field">
        <label for="business">Attività commerciale *</label>
        <inputTextComp id="business" v-model="business" type="text" placeholder="Attività commerciale *" :class="{'p-invalid': formError.cause === 'business'}"/>
        <small v-if="formError.cause === 'business'" class="p-error">{{ this.formError.message }}</small>
      </div>

      <div class="p-field">
        <label for="points">Punti per ottenerlo *</label>
        <inputNumberComp id="points" v-model="points" placeholder="Punti per ottenerlo *" :class="{'p-invalid': formError.cause === 'points'}"/>
        <small v-if="formError.cause === 'points'" class="p-error">{{ this.formError.message }}</small>
      </div>

      <div class="p-field">
        <label for="description">Descrizione</label>
        <textareaComp id="description" v-model="description" autoResize rows="5" cols="30"/>
      </div>

      <buttonComp class="confirm-button" type="button" label="Aggiungi" @click.prevent="addCoupon"/>
    </div>

    <div class="card">
      <cardComp v-for="coupon in this.coupons">
        <template #title> {{ coupon.title }} </template>
        <template #subtitle> {{ coupon.business }}</template>
        <template #content>
          <p>punti: {{coupon.points}}</p>
        </template>
      </cardComp>
    </div>
  </main>
</template>

<style lang="scss">
  .card{
    text-align: center;
  }
  p{
    margin: 0;
  }
</style>

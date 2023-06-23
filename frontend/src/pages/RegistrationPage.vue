<script lang="ts">
  import router from "../router";
  import { defineComponent } from "vue";
  import axios, {AxiosError} from "axios";
  import headerComp from "../components/headerComp.vue";
  import countryDropdownComp from "../components/countryDropdownComp.vue";
  import cityDropdownComp from "../components/cityDropdownComp.vue";
  import { Environment } from "../environment";
  import {FieldDescriptions, FieldRegexs} from "../services/FieldRegexs";

  export default defineComponent({
    components: { headerComp, countryDropdownComp, cityDropdownComp },
    data() {
      return {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        minDate: null,
        maxDate: null,
        country: "",
        city: "",
        birth_year: "",
        formError: {
          cause: "",
          message: "",
        },
        success: false,
      }
    },
    created() {
      this.setLimitYears();
    },
    mounted() {
      this.emitter.on("city", (city) => {
        this.city = city;
      });
      this.emitter.on("country", (country) => {
        this.country = country;
      });
    },
    methods: {
      registerUser() {
        if(this.checkForm()){
          const newUser = {
            name: this.name,
            email: this.email,
            password: this.password,
            role: "user",
            country: this.country,
            city: this.city,
            birth_year: this.birth_year,
          };
          axios.post(`http://${Environment.BACKEND_HOST}/users`, newUser)
              .then(() => {
                console.log("Registrazione avvenuta con successo!");
                this.resetForm();
                this.displaySuccess();
              })
              .catch(this.displayError);
        }
      },
      displayError(error: AxiosError) {
        switch (error.response?.data){
          case "A user with this username has already been registered.":
            this.formError.cause = "name";
            this.formError.message = "Il nome utente inserito è già registrato su questo servizio.";
            return;
        }
        console.log("Registration error: " + error.response + "\tMessage: " + error.response?.data);
      },
      checkForm() : boolean {
        if (this.name === "") {
          this.formError.cause = "name";
          this.formError.message = "Il nome utente è richiesto per la registrazione.";
        } else if (!this.name.match(FieldRegexs.username)) {
          this.formError.cause = "name";
          this.formError.message = FieldDescriptions.username;
        } else if (this.email === "") {
          this.formError.cause = "email";
          this.formError.message = "L'email è richiesta per la registrazione.";
        } else if (!this.email.match(FieldRegexs.email)) {
          this.formError.cause = "email";
          this.formError.message = "L'email inserita non ha un formato valido.";
        }else if(this.country === ""){
          this.formError.cause = "country";
          this.formError.message = "Il Paese di residenza è richiesto per la registrazione.";
        }else if (this.password === ""){
          this.formError.cause = "password";
          this.formError.message = "La password è richiesta per la registrazione.";
        } else if (!this.password.match(FieldRegexs.password)) {
          this.formError.cause = "password";
          this.formError.message = FieldDescriptions.password;
        } else if (this.password != this.confirmPassword) {
          this.formError.cause = "confirmPassword";
          this.formError.message = "Le due password inserite non sono uguali."
        } else {
          return true;
        }
        return false;
      },
      setLimitYears(){
        let today = new Date();
        let year = today.getFullYear();
        let prevYear = 1920;
        let nextYear = year - 15;

        this.minDate = new Date();
        this.minDate.setFullYear(prevYear);
        this.maxDate = new Date();
        this.maxDate.setFullYear(nextYear);
      },
      resetForm(){
        this.name= "";
        this.email= "";
        this.password= "";
        this.confirmPassword= "";
        this.minDate= null;
        this.maxDate= null;
        this.country= "";
        this.city= "";
        this.birth_year= "";
        this.formError.cause= "";
        this.formError.message = "";
        this.setLimitYears();
      },
      displaySuccess(){
        this.success = true;
      },
      toHomePage(){
        router.push({ name: 'home' });
      }
    },
  });
</script>

<template>
  <headerComp></headerComp>
  <main>
    <h1>Registrazione</h1>

    <messageComp severity="success" v-if="success" @click="toHomePage">Registrazione avvenuta con successo!</messageComp>

    <div class="p-formgroup-inline">
      <div class="p-field">
        <label for="name">Nome Utente *</label>
        <inputTextComp id="name" v-model="name" type="text" placeholder="Nome Utente *" :class="{'p-invalid': formError.cause === 'name'}"/>
        <small v-if="formError.cause === 'name'" class="p-error">{{ this.formError.message }}</small>
      </div>

      <div class="p-field">
        <label for="e-mail">E-mail *</label>
        <inputTextComp id="e-mail" v-model="email" type="email" placeholder="E-mail *" :class="{'p-invalid': formError.cause === 'email'}"/>
        <small v-if="formError.cause === 'email'" class="p-error">{{ this.formError.message }}</small>
      </div>

      <div class="p-field">
        <label for="country">Paese di Residenza *</label>
        <countryDropdownComp :class="{'p-invalid': formError.cause === 'country'}"></countryDropdownComp>
        <small v-if="formError.cause === 'country'" class="p-error">{{ this.formError.message }}</small>
      </div>

      <div class="p-field">
        <label for="city">Città di Residenza</label>
        <cityDropdownComp ></cityDropdownComp>
      </div>

      <div class="p-field">
        <label for="calendar">Anno di Nascita</label>
        <calendarComp id="calendar" v-model="birth_year" view="year" dateFormat="yy" :minDate="minDate" :maxDate="maxDate" :manualInput="false" placeholder="yyyy" showIcon />
      </div>

      <div class="p-field">
        <label for="password">Password *</label>
        <passwordComp id="password" v-model="password"  placeholder="Password *" toggleMask :feedback="false" :class="{'p-invalid': formError.cause === 'password'}"/>
        <small v-if="formError.cause === 'password'" class="p-error">{{ this.formError.message }}</small>
      </div>

      <div class="p-field">
        <label for="confirmPassword">Conferma Password *</label>
        <passwordComp id="confirmPassword" v-model="confirmPassword" placeholder="Conferma Password *" toggleMask :feedback="false" :class="{'p-invalid': formError.cause === 'confirmPassword'}"/>
        <small v-if="formError.cause === 'confirmPassword'" class="p-error">{{ this.formError.message }}</small>
      </div>

      <buttonComp class="confirm-button" type="button" label="Conferma" @click.prevent="registerUser"/>
    </div>
  </main>
</template>

<style lang="scss">
  .p-formgroup-inline{
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
  }
  .p-field {
    margin-top: 5px;
    text-align: left;
    display: flex;
    flex-direction: column;
  }
  p{
    text-align: left;
  }
  .p-password{
    width: 100%;
  }
  .p-inputtext {
    width: 100%;
  }
  .p-button{
    width: 100%;
  }
  .p-input-icon-left{
    size: auto;
  }
  .p-hidden-accessible{
    display: none;
  }
  .p-dropdown{
    width: 100%;
  }
  .p-calendar{
    min-width: 100%;
  }
  .confirm-button{
    margin: 1rem 0;
  }
</style>
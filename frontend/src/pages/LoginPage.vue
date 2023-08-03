<script lang="ts">
  import router from "../router";
  import {defineComponent} from "vue";
  import axios, {AxiosError} from "axios";
  import { Environment } from "../environment";
  import {FieldRegexs} from "../services/FieldRegexs";

  export default defineComponent({
    data(){
      return {
        name: "",
        password: "",
        formError: {
          cause: "",
          message: "",
        },
      }
    },
    mounted() {
      if (this.isLoggedIn()) {
        axios.get(`https://${Environment.BACKEND_HOST}/logout`);
        this.$cookies.keys().forEach(key => this.$cookies.remove(key, null, Environment.SERVICE_DOMAIN));
      }
    },
    methods:{
      isLoggedIn() : boolean { return this.$cookies.isKey("user"); },
      login(){
        if (this.checkForm()) {
          axios.post(`https://${Environment.BACKEND_HOST}/login`, {name: this.name,password: this.password})
              .then(() => {
                this.resetForm();
                router.replace({name: "home"}); })
              .catch(this.displayError);
        }
      },
      displayError(error: AxiosError) {
        switch (error.response?.data){
          case "Wrong username.":
            this.formError.cause = "name";
            this.formError.message = "Il nome utente inserito non è registrato su questo servizio.";
            return;
          case "Wrong password.":
            this.formError.cause = "password";
            this.formError.message = "La password inserita è errata.";
            return;
        }
        console.log("Login error: " + error.response + "\tMessage: " + error.response?.data);
      },
      checkForm() : boolean {
        if (this.name === ""){
          this.formError.cause = "name";
          this.formError.message = "Il nome utente è richiesto per eseguire l'accesso.";
        } else if (!this.name.match(FieldRegexs.username)){
          this.formError.cause = "name";
          this.formError.message = "Il nome utente inserito non ha un formato valido.";
        } else if (this.password === ""){
          this.formError.cause = "password";
          this.formError.message = "La password è richiesta per eseguire l'accesso.";
        } else {
          return true;
        }
        return false;
      },
      resetForm(){
        this.name= "";
        this.password= "";
        this.formError.cause = "";
        this.formError.message = "";
      },
    },
  });
</script>

<template>
  <h1>Accesso</h1>

  <div class="p-formgroup-inline">
    <div class="p-field">
      <label for="username">Nome Utente *</label>
      <inputTextComp id="username" v-model="name" type="text" placeholder="Nome Utente *" :class="{'p-invalid': formError.cause === 'name'}"/>
      <small v-if="formError.cause === 'name'" class="p-error">{{ this.formError.message }}</small>
    </div>

    <div class="p-field">
      <label for="password">Password *</label>
      <passwordComp id="password" v-model="password"  placeholder="Password *" toggleMask :feedback="false" :class="{'p-invalid': formError.cause === 'password'}"/>
      <small v-if="formError.cause === 'password'" class="p-error">{{ this.formError.message }}</small>
    </div>

    <buttonComp class="confirm-button" type="button" label="Accedi" @click.prevent="login"/>
  </div>
</template>

<style lang="scss">

</style>
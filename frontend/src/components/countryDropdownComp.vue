<script  lang="ts">
  import {defineComponent} from "vue";
  import axios from "axios";

  export default defineComponent({
    data() {
      return {
        selectedCountry: null,
        countries: []
      };
    },
    created() {
      axios.get(`https://restcountries.com/v3.1/all`)
          .then((response) => {
            response.data.forEach((c: any) => {
              this.countries.push({
                name: `${c.name.common}`,
                code: `${c.cca2}`,
              });
            });
            this.countries.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
          })
          .catch((error) => {
            console.log(error);
          });
    },
  });
</script>

<template>
    <dropdownComp id="country" v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Seleziona il tuo Paese *"  @change="this.emitter.emit('country',selectedCountry['name'])"/>
</template>

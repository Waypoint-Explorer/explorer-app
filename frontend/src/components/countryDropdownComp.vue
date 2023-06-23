<script  lang="ts">
  import {defineComponent} from "vue";

  export default defineComponent({
    data() {
      return {
        selectedCountry: null,
        countries: [
          { name: 'Australia', code: 'AU' },
          { name: 'Brazil', code: 'BR' },
          { name: 'China', code: 'CN' },
          { name: 'Egypt', code: 'EG' },
          { name: 'France', code: 'FR' },
          { name: 'Germany', code: 'DE' },
          { name: 'India', code: 'IN' },
          { name: 'Japan', code: 'JP' },
          { name: 'Spain', code: 'ES' },
          { name: 'United States', code: 'US' }
        ]
      };
    }
  });
</script>

<template>
    <dropdownComp id="country" v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Seleziona il tuo Paese *"/>
</template>

<script  lang="ts">
  import {defineComponent} from "vue";

  export default defineComponent({
    data() {
      return {
        selectedCity: null,
        cities: [
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
    <dropdownComp id="city" v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Seleziona la tua Città"/>
</template>

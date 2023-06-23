<script  lang="ts">
  import {defineComponent} from "vue";

  export default defineComponent({
    data() {
      return {
        selectedCity: null,
        cities: [
          { name: 'Ravenna', code: 'RA' },
          { name: 'Cesena', code: 'FC' },
          { name: 'Roma', code: 'RO' },
          { name: 'Rimini', code: 'RN' },
          { name: 'Bologna', code: 'BO' },
          { name: 'Fano', code: 'PU' }
        ]
      };
    },
  });
</script>

<template>
    <dropdownComp id="city" v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Seleziona la tua Città" @change="this.emitter.emit('city',selectedCity['name'])"/>
</template>

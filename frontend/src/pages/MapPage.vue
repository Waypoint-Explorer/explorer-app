<script lang="ts">
  import { defineComponent } from "vue";
  import mapHeaderComp from "../components/mapHeaderComp.vue"
  import mapComponent from "../components/mapComponent.vue";
  import itineraryDetailsComponent from "../components/itineraryDetailsComponent.vue";
  import filterComponent from "../components/filterComponent.vue";

  export default defineComponent({
    components: { mapHeaderComp, mapComponent, itineraryDetailsComponent, filterComponent},
    data() {
      return {
        searchValue: null,
      };
    },
  });
</script>

<template>
  <mapHeaderComp></mapHeaderComp>
  <main>
    <filterComponent></filterComponent>
    <mapComponent></mapComponent>
    <itineraryDetailsComponent></itineraryDetailsComponent>
  </main>
</template>

<style lang="scss" scoped>
  main {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
  }
</style>
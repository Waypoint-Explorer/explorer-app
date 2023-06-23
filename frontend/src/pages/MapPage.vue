<script lang="ts">
  import { defineComponent } from "vue";
  import mapHeaderComp from "../components/mapHeaderComp.vue"
  import mapComponent from "../components/mapComponent.vue";

  export default defineComponent({
    components: { mapHeaderComp, mapComponent },
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
    <mapComponent></mapComponent>
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
    z-index: -1;
  }
</style>
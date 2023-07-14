<script lang="ts">
  import { defineComponent } from "vue";
  import headerComp from "../components/headerComp.vue"
  import adminMapComponent from "../components/adminMapComponent.vue";
  import adminMapControlsComponent from "../components/adminMapControlsComponent.vue";

  export default defineComponent({
    components: { headerComp, adminMapComponent, adminMapControlsComponent },
    data() {
      return {
        searchValue: null,
      };
    },
  });
</script>

<template>
  <headerComp></headerComp>
  <main>
    <adminMapComponent></adminMapComponent>
    <adminMapControlsComponent></adminMapControlsComponent>
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
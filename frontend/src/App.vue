<script lang="ts">
  import { defineComponent } from "vue";
  import MapComponent from "./components/MapComponent.vue"
  import headerComp from "./components/headerComp.vue"

  export default defineComponent({
    components: { MapComponent, headerComp },
  });
</script>

<template>
  <headerComp/>
  <main>
    <p>Hello</p>
  </main>

</template>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  main{
    padding: 0rem 1.728rem;
  }
</style>
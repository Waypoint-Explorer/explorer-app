<script lang="ts">
  import { defineComponent } from "vue";
  import mapComponent from "../components/mapComponent.vue";

  export default defineComponent({
    components: { mapComponent },
  });
</script>

<template>
  <mapComponent></mapComponent>
</template>

<style lang="scss" scoped>
  main {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
  }
</style>
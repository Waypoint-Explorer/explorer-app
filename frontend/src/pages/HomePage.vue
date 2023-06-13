<script lang="ts">
  import { defineComponent } from "vue";
  import headerComp from "../components/headerComp.vue";

  export default defineComponent({
    components: { headerComp },
  });
</script>

<template>
  <headerComp></headerComp>
  <main>
    <h1>HomePage</h1>
    <p>Hello World!</p>
  </main>
</template>

<style lang="scss">

</style>
<style lang="scss" scoped>
  main{
    padding: 0rem 1.728rem;
  }
</style>
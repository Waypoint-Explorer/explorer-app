<script lang="ts">
  import { defineComponent } from "vue";
  import router from "./router";
  import headerComp from "./components/headerComp.vue";

  export default defineComponent({
    components: { headerComp },
    mounted() {
      router.replace({ name: "home" });
    }
  });
</script>

<template>
  <headerComp/>

  <main>
    <RouterView />
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
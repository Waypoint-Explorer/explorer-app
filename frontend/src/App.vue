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
  <RouterView />
</template>

<style lang="scss">
  @import 'material-icons/iconfont/material-icons.css';
  @import 'material-symbols';
  * {
    margin: 0;
    padding: 0;
  }
  main {
    position: relative;
    padding: 0rem 1.2rem;
  }
  header{
    height: 3rem;
    padding: 0rem 1.728rem;
    margin: 1rem 0;
    align-items: center;
    display: flex;
    flex-direction: row;
    z-index: 1;
  }
</style>

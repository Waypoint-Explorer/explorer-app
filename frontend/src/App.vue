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
  <RouterView />
</template>

<style lang="scss">
  @import 'material-icons/iconfont/material-icons.css';
  * {
    margin: 0;
    padding: 0;
  }
  main {
    position: relative;
    z-index: -1;
  }
</style>

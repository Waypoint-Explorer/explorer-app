<script lang="ts">
  import {defineComponent} from "vue";
  import menuComp from "./menuComp.vue";

  export default defineComponent({
    components: { menuComp },
  });
</script>

<template>
  <header>
    <img src="src/assets/images/logo/logo.svg" alt="Waypoint Explorer Logo">
    <div class="header_divider"></div>
    <buttonComp icon="menu" rounded raised @click="this.emitter.emit('showMenu')">
      <span class="material-icons">menu</span>
    </buttonComp>

    <menuComp></menuComp>
  </header>
</template>

<style lang="scss">
  img {
    height: 2.488rem;
  }
  .header_divider {
    flex: 1;
  }
</style>

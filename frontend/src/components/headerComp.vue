<script>
  import {defineComponent} from "vue";

  export default defineComponent({
    data() {
      return {
        visible: false,
      };
    },
  });
</script>

<template>
  <header>
    <img src="src/assets/images/logo/logo.svg" alt="Waypoint Explorer Logo">
    <div class="header_divider"></div>
    <buttonComp icon="menu" rounded raised @click="visible = true">
      <span class="material-icons">menu</span>
    </buttonComp>

    <div class="card flex justify-content-center">
      <sidebarComp v-model:visible="this.visible" position="right">
        <nav>
          <i class="pi pi-home"></i>
          <RouterLink to="/" @click="visible = false">Home</RouterLink>
          <br />
          <i class="pi pi-directions"></i>
          <RouterLink to="/mapPage" @click="visible = false">Map Page</RouterLink>
        </nav>
      </sidebarComp>
    </div>
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

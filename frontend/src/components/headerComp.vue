<script>
  import {defineComponent} from "vue";

  export default defineComponent({
    name: "headerComp",
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
    <buttonComp icon="pi pi-bars" rounded outlined @click="visible = true"/>

    <div class="card flex justify-content-center">
      <sidebarComp v-model:visible="this.visible" position="right">
        <h2>Sidebar</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </sidebarComp>
    </div>
  </header>
</template>

<style lang="scss">
  header{
    height: 3rem;
    padding: 0rem 1.728rem;
    align-items: center;
    display: flex;
    flex-direction: row;
  }
  img {
    height: 2.488rem;
  }
  .header_divider{
    flex: 1;
  }
</style>

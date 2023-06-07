<script setup lang="ts">
import MapComponent from "./components/MapComponent.vue"
</script>

<template>
  <div class="card flex justify-content-center">
    <sidebarComp v-model:visible="visible">
        <h2>Sidebar</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </sidebarComp>
    <Button icon="pi pi-arrow-right" @click="visible = true" />
</div>
  <MapComponent/>
  <p>Hello</p>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
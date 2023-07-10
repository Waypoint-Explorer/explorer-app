<script lang="ts">
  import {defineComponent} from "vue";
  import headerComp from "../components/headerComp.vue";
  import MarkerPage from "./MarkerPage.vue";
  import WaypointPage from "./WaypointPage.vue";
  import ItineraryPage from "./ItineraryPage.vue";

  export default defineComponent({
    components: {MarkerPage, headerComp, WaypointPage, ItineraryPage },
  });
</script>

<template>
  <headerComp></headerComp>
  <main>
    <div class="card">
      <tabViewComp>
        <tabPanelComp header="Marcatori">
          <MarkerPage></MarkerPage>
        </tabPanelComp>

        <tabPanelComp header="Tappe">
          <WaypointPage></WaypointPage>
        </tabPanelComp>

        <tabPanelComp header="Percorsi">
          <ItineraryPage></ItineraryPage>
        </tabPanelComp>

      </tabViewComp>
    </div>
  </main>
</template>

<style lang="scss">

</style>
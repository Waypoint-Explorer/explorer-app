<script lang="ts">
  import {defineComponent} from "vue";
  import headerComp from "../components/headerComp.vue";
  import MarkerPage from "./MarkerPage.vue";

  export default defineComponent({
    components: {MarkerPage, headerComp },
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
        </tabPanelComp>

        <tabPanelComp header="Percorsi">
        </tabPanelComp>

      </tabViewComp>
    </div>
  </main>
</template>

<style lang="scss">

</style>
<script lang="ts">
  import {defineComponent} from "vue";
  import RegistrationPage from "./RegistrationPage.vue";
  import LoginPage from "./LoginPage.vue";
  import headerComp from "../components/headerComp.vue";

  export default defineComponent({
    components: { headerComp, RegistrationPage, LoginPage },
  });
</script>

<template>
  <headerComp></headerComp>
  <main>
  <div class="card">
    <tabViewComp>
      <tabPanelComp header="Accesso">
        <LoginPage></LoginPage>
      </tabPanelComp>

      <tabPanelComp header="Registrazione">
        <RegistrationPage></RegistrationPage>
      </tabPanelComp>

    </tabViewComp>
  </div>
  </main>
</template>

<style lang="scss">

</style>
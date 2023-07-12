<script lang="ts">
  import { defineComponent } from "vue";
  import headerComp from "../components/headerComp.vue";
  import StatisticsPage from "./StatisticsPage.vue";
  import footerComp from "../components/footerComp.vue";

  export default defineComponent({
    components: { headerComp, footerComp, StatisticsPage },
    methods:{
      isLoggedIn() : boolean { return this.$cookies.isKey("user"); },
      isUser() : boolean {
        return (this.$cookies.isKey("user") && this.$cookies.get("user").role === "user");
      },
    },
  });
</script>

<template>
  <headerComp></headerComp>

  <!-- admin home page -->
  <main v-if="isLoggedIn() && !isUser()">
    <StatisticsPage></StatisticsPage>
  </main>

  <!-- others home page -->
  <main v-else class="home">
    <div class="info">
      <img class="bigLogo" src="src/assets/images/logo/logo_bg.svg" alt="Waypoint Explorer Logo">
      <h1>Waypoint Explorer</h1>
      <h2>Un nuovo modo per esplorare il territorio di Ravenna</h2>
      <buttonComp class="confirm-button" type="button" label="INIZIA" @click="$router.push('/mapPage')"/>
    </div>

    <dividerComp></dividerComp>

    <div class="guide">
      <h3>Come esplorare?</h3>

      <div class="card">
        <cardComp class="steps">
          <template #title> 1. Scegli un percorso</template>
        </cardComp>

        <cardComp class="steps">
          <template #title> 2. Raggiungi una delle tappe indicate</template>
        </cardComp>

        <cardComp class="steps">
          <template #title> 3. Scansiona il codice QR che troverai</template>
        </cardComp>

        <cardComp class="steps">
          <template #title> 4. Termina il percorso quando preferisci</template>
        </cardComp>
      </div>
    </div>
  </main>

  <footerComp v-if="!isLoggedIn() || (isLoggedIn() && isUser())"></footerComp>

</template>

<style lang="scss">
  .bigLogo{
    height: 10rem;
  }
  .home{
    padding: 0rem 1.728rem 0.5rem 1.728rem;
  }
  h2{
    margin-top: 0.75rem;
    color: #32624b;
    font-size: 1.728rem;
  }
  .info, .guide{
    text-align:center;
  }
  @media screen and (min-width: 600px) {
    .info, .guide{
      margin-left: 10%;
      margin-right: 10%;
    }
  }
  @media screen and (min-width: 800px) {
    .steps {
      height: 9rem;
      vertical-align: top;
    }
  }
</style>
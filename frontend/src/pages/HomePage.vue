<script lang="ts">
  import { defineComponent } from "vue";
  import headerComp from "../components/headerComp.vue";
  import StatisticsPage from "./StatisticsPage.vue";

  export default defineComponent({
    components: { headerComp, StatisticsPage },
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
  </main>

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
  .info{
    text-align:center;
  }
  @media screen and (min-width: 600px) {
    .info{
      margin-left: 10%;
      margin-right: 10%;
    }
  }
</style>
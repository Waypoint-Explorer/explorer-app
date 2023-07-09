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
  <main v-else>
    <h1>HomePage</h1>
    <p>Hello World!</p>
  </main>

</template>

<style lang="scss">
  main{
    padding: 0rem 1.728rem;
  }
</style>
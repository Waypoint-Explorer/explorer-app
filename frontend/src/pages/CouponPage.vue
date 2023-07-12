<script lang="ts">
  import {defineComponent} from "vue";
  import headerComp from "../components/headerComp.vue";
  import axios from "axios";
  import {Environment} from "../environment";

  export default defineComponent({
    components: {headerComp},
    data(){
      return {
        userPoints: 0,
        coupons: [],
      }
    },
    mounted(){
      this.getUserPoints();
      // this.allCoupons();
    },
    methods:{
      getUserPoints() {
        if (this.$cookies.isKey("user")){
          axios.get(`http://${Environment.BACKEND_HOST}/completed-itineraries/user/${this.$cookies.get("user").userId}`)
            .then((completedItinerariesResponse) => {
              completedItinerariesResponse.data.forEach(completedItinerary => {
                if (completedItinerary.hasOwnProperty('points_earned')) {
                  this.userPoints = this.userPoints + completedItinerary.points_earned;
                }
              });
          });
        }
      },
      allCoupons(){
        axios.get(`http://${Environment.BACKEND_HOST}/coupons`)
          .then((response) => {
            this.coupons = [];
            response.data.forEach((coupon) =>{
              this.coupons.push({
                title: `${coupon.title}`,
                business: `${coupon.business}`,
                points: `${coupon.points}`,
              });
            });
          })
          .catch((error) => {
            console.log(error);
          });
      },
    }
  });
</script>

<template>
  <headerComp></headerComp>
  <main>
    <h1>Coupon</h1>
    <h5>Totale punti: {{this.userPoints}}</h5>
    <div class="card">
      <cardComp v-for="coupon in this.coupons">
        <template #title>{{ coupon.title }}</template>
        <template #subtitle>{{ coupon.business }}</template>
        <template #content>
          <p>punti: {{coupon.points}}</p>
        </template>
      </cardComp>
    </div>
  </main>
</template>

<style lang="scss">
.card {
  text-align: center;
}
p {
  margin: 0;
}
</style>
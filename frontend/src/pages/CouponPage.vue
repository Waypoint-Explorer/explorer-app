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
        redeemedCoupons: [],
        coupons: [],
      }
    },
    mounted(){
      this.getUserPoints();
      this.loadCoupons();
    },
    methods:{
      getUserPoints() {
        if (this.$cookies.isKey("user")){
          axios.get(`http://${Environment.BACKEND_HOST}/users/${this.$cookies.get("user").userId}`)
            .then((userResponse) => {
              console.log(userResponse.data);
              this.userPoints = userResponse.data.current_points;
          });
        }
      },
      loadCoupons() {
        axios.get(`http://${Environment.BACKEND_HOST}/coupons`)
          .then((response) => {
            this.coupons = response.data;
            axios.get(`http://${Environment.BACKEND_HOST}/redeemed-coupons/user/${this.$cookies.get("user").userId}`)
              .then((redeemedCouponResponse) => {
                const userRedeemedCoupons = redeemedCouponResponse.data;
                this.redeemedCoupons = [];
                userRedeemedCoupons.forEach((userRedeemedCoupon) => {
                  const relatedCoupon = Object.create(this.coupons.find(coupon => coupon._id === userRedeemedCoupon.related_coupon));
                  relatedCoupon.code = userRedeemedCoupon._id;
                  this.redeemedCoupons.push(relatedCoupon);
                })
              });
          });
      },
      redeemCoupon(couponId) {
        axios.post(`http://${Environment.BACKEND_HOST}/redeemed-coupons`, {
          userId: this.$cookies.get("user").userId,
          relatedCouponId: couponId,
        }).then(() => {
          this.getUserPoints();
          this.loadCoupons();
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
    <ul class="user-coupons" v-if="this.redeemedCoupons.length">
      <h5 class="redeemed-coupon-title">Coupon riscattati</h5>
      <li v-for="redeemedCoupon in this.redeemedCoupons">
        <p>{{redeemedCoupon.title}}</p>
        <p class="redeemed-coupon-code">{{redeemedCoupon.code}}</p>
      </li>
    </ul>
    <div class="card">
      <cardComp v-for="coupon in this.coupons">
        <template #title>{{ coupon.title }}</template>
        <template #subtitle>{{ coupon.business }}</template>
        <template #content>
          <div class="coupon-buy">
            <p>punti: {{coupon.points}}</p>
            <button class="p-button p-component p-button-icon-only p-button-rounded" type="button" @click="this.redeemCoupon(coupon._id)">
              <span class="material-icons-outlined">redeem</span>
            </button>
          </div>
        </template>
      </cardComp>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  .user-coupons {
    list-style: none;
    background-color: var(--surface-b);
    border-radius: 25px;
    padding: 1.2rem;
    margin-bottom: 2.488rem;
  }
  .redeemed-coupon-title {
    margin: 0 0 1.2rem 0;
  }
  .redeemed-coupon-code {
    color: var(--text-color-secondary);
  }
  .card {
    text-align: center;
  }
  p {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
  }
  .coupon-buy {
    display: flex;
    justify-content: space-between;
  }
</style>
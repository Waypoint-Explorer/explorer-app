<script lang="ts">
  import {defineComponent} from "vue";

  export default defineComponent({
    data() {
      return {
        visible: false,
      };
    },
    mounted() {
      this.emitter.on('showMenu', ()=>{this.visible = !this.visible});
    },
    methods:{
      isLoggedIn() : boolean { return this.$cookies.isKey("user"); },
      isUser() : boolean {
        return (this.$cookies.isKey("user") && this.$cookies.get("user").role === "user");
      },
    },
  });
</script>

<template>
  <div class="card flex justify-content-center">
    <sidebarComp v-model:visible="this.visible" position="right">
      <nav>
        <div class="alignment">
          <span class="material-icons-outlined">home</span>
          <RouterLink to="/" @click="visible = false">Home</RouterLink>
        </div>

        <div v-if="!isLoggedIn() || isUser()">
          <div class="alignment">
            <span class="material-icons-outlined">directions</span>
            <RouterLink to="/mapPage" @click="visible = false">Mappa</RouterLink>
          </div>
        </div>

        <!-- admin menu -->
        <div v-if="isLoggedIn() && !isUser()">
          <div class="alignment">
            <span class="material-icons-outlined">explore</span>
            <RouterLink to="/adminMapPage" @click="visible = false">Mappa</RouterLink>
          </div>

          <div class="alignment">
            <span class="material-icons-outlined">edit</span>
            <RouterLink to="/managementPage" @click="visible = false">Gestione</RouterLink>
          </div>

          <div class="alignment">
            <span class="material-icons-outlined">local_activity</span>
            <RouterLink to="/couponManagementPage" @click="visible = false">Coupon</RouterLink>
          </div>

        </div>

        <!-- explorer menu -->
        <div v-if="isLoggedIn() && isUser()">
          <div class="alignment">
            <span class="material-icons-outlined">history</span>
            <RouterLink to="/historyPage" @click="visible = false">Cronologia</RouterLink>
          </div>

          <div class="alignment">
            <span class="material-icons-outlined">local_activity</span>
            <RouterLink to="/couponPage" @click="visible = false">Coupon</RouterLink>
          </div>
        </div>

        <div class="alignment" v-if="!isLoggedIn()">
          <span class="material-icons-outlined">person</span>
          <RouterLink to="/accessPage" @click="visible = false">Accesso</RouterLink>
        </div>

        <div class="alignment" v-else>
          <span class="material-icons-outlined">person</span>
          <RouterLink to="/accessPage" @click="visible = false">Logout</RouterLink>
        </div>

      </nav>
    </sidebarComp>
  </div>
</template>

<style lang="scss">
  .alignment{
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  .alignment span{
    margin-right: 0.75rem;
  }
  a {
    text-decoration: none;
    font-weight: bold;
    color: #214132;
  }
</style>
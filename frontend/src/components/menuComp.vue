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
    },
  });
</script>

<template>
  <div class="card flex justify-content-center">
    <sidebarComp v-model:visible="this.visible" position="right">
      <nav>
        <i class="pi pi-home"></i>
        <RouterLink to="/" @click="visible = false">Home</RouterLink>
        <br />

        <i class="pi pi-directions"></i>
        <RouterLink to="/mapPage" @click="visible = false">Map Page</RouterLink>
        <br />

        <i class="pi pi-pencil"></i>
        <RouterLink to="/managementPage" @click="visible = false">Management Page</RouterLink>
        <br />

        <i class="pi pi-user"></i>
        <RouterLink v-if="!isLoggedIn()" to="/accessPage" @click="visible = false">Accesso</RouterLink>
        <RouterLink v-if="isLoggedIn()" to="/accessPage" @click="visible = false">Logout</RouterLink>
      </nav>
    </sidebarComp>
  </div>
</template>
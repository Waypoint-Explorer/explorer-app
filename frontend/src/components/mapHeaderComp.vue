<script lang="ts">
  import {defineComponent} from "vue";
  import axios from "axios";

  export default defineComponent({
    data() {
      return {
        visible: false,
        searchValue: ""
      };
    },
    mounted() {
    },
    methods: {
      search() {
        let query = `[out:json];(node[name='${this.searchValue}'][place~"city|town|village|hamlet"];);out geom;`;
        let lat: number;
        let lon: number;
        axios
            .post("https://overpass.kumi.systems/api/interpreter", query, {
              withCredentials: false,
            })
            .then((overpassResponse) => {
              console.log(overpassResponse);
              if (overpassResponse.data.elements.length) {
                lat = overpassResponse.data.elements[0].lat;
                lon = overpassResponse.data.elements[0].lon;
                this.emitter.emit("locationSearch", {lat:lat, lng:lon});
              }
            });
      }
    }
  });
</script>

<template>
  <header>
    <buttonComp icon="pi-filter" rounded raised @click="this.emitter.emit('filterButtonClicked');">
      <span class="material-icons">filter_alt</span>
    </buttonComp>
    <div class="p-inputgroup flex-1" id="search-bar">
      <inputTextComp v-model="searchValue" id="search-input-text" placeholder="Search"/>
      <buttonComp id="search-button" icon="pi pi-search" @click="search">
        <span class="material-icons">search</span>
      </buttonComp>
    </div>
    <buttonComp icon="menu" rounded raised @click="visible = true">
      <span class="material-icons">menu</span>
    </buttonComp>
    <div class="card flex justify-content-center">
      <sidebarComp v-model:visible="this.visible" position="right">
        <nav>
          <i class="pi pi-home"></i>
          <RouterLink to="/" @click="visible = false">Home</RouterLink>
          <br />
          <i class="pi pi-directions"></i>
          <RouterLink to="/mapPage" @click="visible = false">Map Page</RouterLink>
        </nav>
      </sidebarComp>
    </div>
  </header>
</template>

<style lang="scss">
  img {
    height: 2.488rem;
  }
  #search-bar {
    justify-content: center;
    align-items: center;
    display: flex;
    margin: 0 1.2rem;
  }
  #search-input-text, #search-button {
    height: 2.488rem;
    z-index: 3;
  }
  #search-input-text {
    border-radius: 100px 0 0 100px;
    width: 80%;
  }
  #search-button {
    border-radius: 0 100px 100px 0;
  }
</style>

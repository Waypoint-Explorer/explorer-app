<script lang="ts">
  import {defineComponent} from "vue";

  export default defineComponent({
    data() {
      return {
        isFiltersExpanded: false,
        itineraryTypeSelected: {
          "CULTURAL": true,
          "THEMED": true,
          "NATURALISTIC": true,
          "TOURISTIC": true,
          "FITNESS": true,
        },
      };
    },
    mounted() {
        this.emitter.on("filterButtonClicked", () => {
          this.isFiltersExpanded = !this.isFiltersExpanded;
        });
        this.emitter.on("expandDetailsButtonClicked", () => {
          this.isFiltersExpanded = false;
        });
    },
    methods: {
    },
    watch: {
      itineraryTypeSelected: {
        handler() {
          this.emitter.emit("filterSelected", this.itineraryTypeSelected);
        },
        deep: true,
      }
    }
  });
</script>

<template>
  <div class="filters-container" :class="{expanded: isFiltersExpanded}">
      <buttonComp outlined label="Culturale" class="filter-button" :class="{'button-expanded': isFiltersExpanded, CULTURAL: this.itineraryTypeSelected.CULTURAL}" @click="this.itineraryTypeSelected.CULTURAL = !this.itineraryTypeSelected.CULTURAL"></buttonComp>
      <buttonComp outlined label="Tematico" class="filter-button" :class="{'button-expanded': isFiltersExpanded, THEMED: this.itineraryTypeSelected.THEMED}" @click="this.itineraryTypeSelected.THEMED = !this.itineraryTypeSelected.THEMED"></buttonComp>
      <buttonComp outlined label="Naturalistico" class="filter-button" :class="{'button-expanded': isFiltersExpanded, NATURALISTIC: this.itineraryTypeSelected.NATURALISTIC}" @click="this.itineraryTypeSelected.NATURALISTIC = !this.itineraryTypeSelected.NATURALISTIC"></buttonComp>
      <buttonComp outlined label="Turistico" class="filter-button" :class="{'button-expanded': isFiltersExpanded, TOURISTIC: this.itineraryTypeSelected.TOURISTIC}" @click="this.itineraryTypeSelected.TOURISTIC = !this.itineraryTypeSelected.TOURISTIC"></buttonComp>
      <buttonComp outlined label="Fitness" class="filter-button" :class="{'button-expanded': isFiltersExpanded, FITNESS: this.itineraryTypeSelected.FITNESS}" @click="this.itineraryTypeSelected.FITNESS = !this.itineraryTypeSelected.FITNESS"></buttonComp>
  </div>
</template>

<style lang="scss" scoped>
  .filters-container {
    position: absolute;
    z-index: 2;
    top: calc(3rem + 2rem);
    width: calc(100vw - 2 * 1.2rem);
    height: 0;
    padding: 0;
    margin: 0 1.2rem;
    align-items: center;
    transition-duration: 500ms;
    transition-timing-function: cubic-bezier(0.5,0.25,0,1);
    background-color: var(--surface-a);
    border-radius: 25px;
    box-sizing: border-box;
  }
  .expanded {
    height: fit-content;
    padding: 1rem;
  }
  .filter-button.button-expanded {
    font-size: 1rem;
    padding: 0.694rem 1.2rem;
    border: 1px solid;
  }
  .filter-button {
    display: inline-block;
    width: fit-content;
    font-size: 0;
    padding: 0;
    border: 0;
    margin: 0.2rem;
    box-sizing: border-box;
  }
  .CULTURAL, .THEMED, .NATURALISTIC, .TOURISTIC, .FITNESS {
    color: #fff;
  }
  .CULTURAL {
    background-color: var(--we-palette-blue);
  }
  .THEMED {
    background-color: var(--we-palette-red);
  }
  .NATURALISTIC {
    background-color: var(--we-palette-green);
  }
  .TOURISTIC {
    background-color: var(--we-palette-yellow);
  }
  .FITNESS {
    background-color: var(--we-palette-purple);
  }
</style>

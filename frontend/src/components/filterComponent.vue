<script lang="ts">
  import {defineComponent} from "vue";

  export default defineComponent({
    data() {
      return {
        isFiltersExpanded: false,

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
    }
  });
</script>

<template>
  <div class="filters-container" :class="{expanded: isFiltersExpanded}">

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
    flex-direction: row;
    transition-duration: 500ms;
    transition-timing-function: cubic-bezier(0.5,0.25,0,1);
    background-color: var(--surface-a);
    border-radius: 25px;
    box-sizing: border-box;
  }
  .expanded {
    height: 9rem;
    padding: 1.2rem 1.2rem 0 1.2rem;
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

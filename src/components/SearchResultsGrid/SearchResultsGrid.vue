<template>
  <div v-if="items">
    <GridHeader title="Search Results" @clicked="showAllClicked()" />
    <div class="collectionWrapper">
      <div v-for="(item, index) in items" :key="index" class="smallSlotWrapper">
        <div class="smallSlot">
          <RecipeItem gridStyle="square" size="small" :item="item" @clicked="handleItemClick(item.id)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GridHeader from "../GridHeader";
import RecipeItem from "../RecipeItem";

export default {
  components: { GridHeader, RecipeItem },
  name: "SearchResultsGrid",
  props: ["items"],
  created() {
    console.log('dwadaw', this.items )
  },
  methods: {
    showAllClicked(event) {
      this.$emit('showAll', event);
    },
     handleItemClick(id) {
      this.$router.push(`/recipe/${id}`);
    },
  }
};
</script>

<style scoped>
.collectionWrapper {
  display: flex;
  flex-direction: row;
  flex-basis: 50%;
  height: 100%;
  flex-wrap: wrap;
  margin: 10px;
}

.smallSlot {
  margin: 10px;
  position: relative;
}

.smallSlotWrapper {
  flex-basis: 25%;
}

.smallSlot::before {
  display: block;
  content: "";
  padding-bottom: 100%;
}
</style>
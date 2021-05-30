<template>
  <div v-if="items">
    <GridHeader :title="title" @clicked="showAllClicked(title)" />
    <div class="fourGridWrapper">
      <div class="rowWrapper">
        <div class="bigSlot" >
          <RecipeItem  @addToFavourites="$emit('addToFavourites', items[0].id)" @clicked="$emit('itemClicked', items[0].id)" :item="items[0]"/>
        </div>
        <div class="smallSlot">
          <RecipeItem @addToFavourites="$emit('addToFavourites', items[1].id)" @clicked="$emit('itemClicked', items[1].id)" size="small"  :item="items[1]" />
        </div>
      </div>
      <div class="rowWrapper">
        <div class="smallSlot">
          <RecipeItem @addToFavourites="$emit('addToFavourites', items[2].id)" @clicked="$emit('itemClicked', items[2].id)" size="small"  :item="items[2]" />
        </div>
        <div class="bigSlot"><RecipeItem @addToFavourites="$emit('addToFavourites', items[3].id)" @clicked="$emit('itemClicked', items[3].id)"  :item="items[3]"/></div>
      </div>
    </div>
  </div>
</template>

<script>
import GridHeader from "../GridHeader";
import RecipeItem from "../RecipeItem";

export default {
  components: { GridHeader, RecipeItem },
  name: "FourGrid",
  props: ["items", "title"],
  methods: {
    showAllClicked(event) {
      this.$emit("showAll", event);
    },
  },
};
</script>

<style scoped>
.fourGridWrapper {
  display: flex;
  flex-direction: row;
}

.rowWrapper {
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
  margin: 20px;
  height: 100%;
}

.rowWrapper:nth-child(2) {
  margin-top: 0;
}

.rowWrapper:nth-of-type(2n) {
  margin-left: 0;
}

.bigSlot {
  height: 100%;
  min-height: 75%;
  width: 100%;
  position: relative;
}

.bigSlot::before {
  display: block;
  content: "";
  padding-top: 50%;
}

.smallSlot {
  margin-top: 20px;
  position: relative;
}

.smallSlot:nth-child(1) {
  margin-bottom: 20px;
}

.smallSlot::before {
  display: block;
  content: "";
  padding-bottom: 25%;
}
</style>
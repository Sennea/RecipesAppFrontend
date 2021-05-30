<template>
  <div v-if="items">
    <GridHeader :title="title" @clicked="showAllClicked(title)" />
    <div class="bigSmallGridWrapper">
      <div class="rowWrapper">
        <div class="bigSlot">
          <RecipeItem @addToFavourites="$emit('addToFavourites', items[0].id)" @clicked="$emit('itemClicked', items[0].id)" gridStyle="square" :item="items[0]"/>
        </div>
      </div>
      <div class="rowWrapper">
        <div class="smallSlot">
          <RecipeItem @addToFavourites="$emit('addToFavourites', items[1].id)" @clicked="$emit('itemClicked', items[1].id)" size="small" :item="items[1]" />
        </div>
        <div class="smallSlot">
          <RecipeItem @addToFavourites="$emit('addToFavourites', items[2].id)" @clicked="$emit('itemClicked', items[2].id)" size="small" :item="items[2]" />
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
  name: "BigSmallGrid",
  props: ["items", "title"],
  methods: {
    showAllClicked(event) {
      this.$emit('showAll', event);
    }
  }
};
</script>
n
<style scoped>
.bigSmallGridWrapper {
  display: flex;
  flex-direction: row;
}

.rowWrapper {
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
  margin: 20px;
}

.rowWrapper:nth-of-type(2n) {
  margin-left: 0;
}

.bigSlot {
  height: 100%;
  width: 100%;
  position: relative;
}

.bigSlot::before {
  display: block;
  content: "";
  padding-top: 50%;
}

.smallSlot {
  height: 100%;
  width: 100%;
  margin-bottom: 20px;
  position: relative;
}

.smallSlot:last-of-type {
  margin-bottom: 0;
}

.smallSlot::before {
  display: block;
  content: "";
  padding-top: 25%;
}
</style>
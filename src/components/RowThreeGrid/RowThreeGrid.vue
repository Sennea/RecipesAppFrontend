<template>
<div v-if="items">
    <GridHeader :title="title" @clicked="showAllClicked(title)" />
    <div class="rowThreeGridWrapper">
            <div class="slot">
                <RecipeItem @addToFavourites="$emit('addToFavourites', items[0].id)" @clicked="$emit('itemClicked', items[0].id)" gridStyle="square"  :item="items[0]"/>
            </div>
            <div class="slot">
                <RecipeItem @addToFavourites="$emit('addToFavourites', items[1].id)" @clicked="$emit('itemClicked', items[1].id)" gridStyle="square"  :item="items[1]"/>
            </div>
            <div class="slot">
                <RecipeItem @addToFavourites="$emit('addToFavourites', items[2].id)" @clicked="$emit('itemClicked', items[2].id)" gridStyle="square"  :item="items[2]"/>
            </div>
    </div>
    
</div>
</template>

<script>
import GridHeader from "../GridHeader"
import RecipeItem from "../RecipeItem"

export default {
    components: { GridHeader, RecipeItem },
    name: 'RowThreeGrid',
    props: ['items', 'title'],
    methods: {
    showAllClicked(event) {
      this.$emit('showAll', event);
    }
  }
}
</script>

<style scoped>
    .rowThreeGridWrapper {
        display: flex;
        flex-direction: row;
    }

    .slot {
        flex-basis: 33.33333%;
        margin: 20px 20px 20px 0;
  position: relative;
    }

    .slot:nth-of-type(1) {
        margin-left: 20px;
    }

    .slot::before{
        display: block;
        content: '';
        padding-top: 100%
    }
</style>
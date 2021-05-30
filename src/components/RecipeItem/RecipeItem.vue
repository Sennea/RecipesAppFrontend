<template>
  <div v-if="item" :class="['wrapper', itemHovered && 'wrapperDarker']" @click="manageItemClick()">
    <div
      :class="[
        'recipeItemWrapper',
        gridStyle === 'square' && 'squareItemWrapper',
      ]"
    >
      <div
        :class="[
          'imageWrapper',
          gridStyle === 'square' && 'imageWrapperSquare',
        ]"
      >
        <img
          class="image"
          v-if="gridStyle === 'square'"
          :src="item.imageUrl"
        />
        <img
          class="image"
          v-if="gridStyle !== 'square'"
           :src="item.imageUrl"
        />
      </div>
      <div
        :class="[
          'itemInfoWrapper',
          'smallFont',
          gridStyle === 'square' && 'squareItemFont',
          size === 'big' && 'bigFont',
        ]"
      >
        <h2 class="title" @mouseenter="manageItemHover()" @mouseleave="manageItemHover()">
          {{item.title}}
        </h2>
        <div
          @mouseenter="manageHeartHover()"
          @mouseleave="manageHeartHover()"
          @click="manageHeartClick()"
          :class="[heartActive? 'heartWhite' : (heartHovered || item.user_favourite ? 'heartWhite' : 'heartDark')]"
        >
          <HeartFull />
        </div>
      </div>
    </div>

    <div
      @mouseenter="manageItemHover()"
      @mouseleave="manageItemHover()"
      :class="[
        'overlay',
        gridStyle === 'square' && !itemHovered && 'overlaySquare',
        gridStyle === 'square' && itemHovered && 'overlaySquareHovered',
        gridStyle !== 'square' && !itemHovered && 'overlayRectangle',
        gridStyle !== 'square' && itemHovered && 'overlayRectangleHovered',
      ]"
    ></div>
  </div>
</template>

<script>
import HeartFull from "../icons/HeartFull";

export default {
  name: "RecipeItem",
  props: ["size", "gridStyle", "item",],
  components: { HeartFull },
  data() {
    return {
      heartHovered: false,
      itemHovered: false,
      heartActive: false
    };
  },
  created() {
    console.log('JDWJODADwa', this.item);
  },
  methods: {
    manageHeartClick() {
      this.heartActive = true;
      this.$emit('addToFavourites')
    },
    manageItemClick() {
      if(!this.heartHovered){
        this.$emit('clicked')
      }
    },
    manageHeartHover() {
      this.heartHovered = !this.heartHovered;
      this.itemHovered = this.heartHovered;
    },
    manageItemHover() {
      this.itemHovered = !this.itemHovered;
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 20px rgb(0, 44, 33);
  top: 0;
  left: 0;
  position: absolute;
}

.wrapperDarker {
  box-shadow: 0 0 30px rgb(0, 20, 15);
  min-width: 102%;
  min-height: 102%;
  overflow: hidden;
  cursor: pointer;
  margin: -2px
}

.recipeItemWrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background: white
}

.squareItemWrapper {
  flex-direction: column;
}

.imageWrapper {
  flex-basis: 60%;
  min-width: 60%;
  position: relative;
}

.imageWrapperSquare {
  max-height: 70%;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.itemInfoWrapper {
  display: flex;
  flex-basis: 45%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 10px;
  padding: 0 5px;
   white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.additionalInfoWrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  font-size: 10px;
}

.title {
 white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis
  }

.additionalInfoItem {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: baseline;
}

.squareItemFont {
  font-size: 10px;
}

.smallFont {
  font-size: 8px;
}

.bigFont {
  font-size: 20px;
}

.overlay {
  z-index: 2;
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}

.overlayRectangle {
  background: linear-gradient(
    to right,
    rgba(0, 206, 155, 0) 55%,
    white 60%
  );
}

.overlayRectangleHovered {
  background: linear-gradient(
    to right,
    rgba(23, 238, 184, 0) 10%,
    white 50%
  );
}

.overlaySquare {
  background: linear-gradient(
    to bottom,
    rgba(0, 206, 155, 0) 55%,
    white 60%
  );
}

.overlaySquareHovered {
  background: linear-gradient(
    to bottom,
    rgba(180, 74, 255, 0) 10%,
        white 50%

  );
}

.heartWhite {
  fill: rgb(250, 182, 255);
  z-index: 3;
}

.heartDark {
  fill: #2c3e50;
  z-index: 3;
}

h2,
h3,
h4,
h5 {
  margin: 0;
  z-index: 3;
}
</style>
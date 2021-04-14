<template>
  <div class="categoryItemWrapper" @click="$emit('clicked', event)">
    <h4 class="title">{{ title }}</h4>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: ["title", "icon"],
};
</script>

<style scoped>
.categoryItemWrapper {
  display: flex;
  flex-direction: row;
  padding: 5px;
  border-radius: 25em;
  align-items: center;
  margin: 20px;
  overflow: hidden;
  cursor: pointer;
  background: white;
 box-shadow: 0 0 20px rgb(0, 20, 15);
  text-align: center;

}

.categoryItemWrapper:hover {
  background: rgb(248, 249, 255);
  box-shadow: 0 0 30px rgb(0, 20, 15);
  margin: 18px;
}

.title {
  font-size: 12px;
  font-weight: bold;
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 5px;
}
</style>
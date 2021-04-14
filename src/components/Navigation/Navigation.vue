<template>
<div v-if="categories" class="navigationWrapper">
    <h3>Categories</h3>
    <Category v-for="(category, index) in categories" :key="index" :title="category" @clicked="categoryClicked(category)"/>
</div>
</template>

<script>
import Category from '../Category'
export default {
  components: { Category },
name: "Navigation",
props: ["categories"],
created() {
},
methods: {
  categoryClicked(event){
    this.$emit('categoryClicked', event)
  }
}
}
</script>

<style scoped>
     .navigationWrapper {
         padding: 10px;
         height: 100%;
     }
</style>
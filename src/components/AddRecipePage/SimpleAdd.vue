<template>
  <div class="simpleWrapper">
    <p v-if="showTitle" class="title">{{title}}</p>
    <input @change="emitEvent($event)" class="fill" v-if="input" />
    <select @change="emitEvent($event)" class="fill" v-if="select">
      <option v-for="(option, index) in options" :key="index">{{
        option
      }}</option>
    </select>
    <textarea @change="emitEvent($event)" class="fill" v-if="textarea" />
    <button v-if="button" @click="emitEvent($event)" >+</button>
  </div>
</template>

<script>
export default {
  name: "SimpleAdd",
  props: ["title", "select", "input", "options", "textarea", "index", "button", "amount", "showTitle"],
  created() {
    console.log('AAAMOUNT ', this.showTitle);
  },
  methods: {
      emitEvent(event){
          this.$emit('fieldChanged', {title: this.title, event: event && event.target.value, index: this.index})
      }
  }
};
</script>

<style scoped>
.simpleWrapper {
    padding: 5px;
    width: 100%;
}
.title {
    margin-bottom: 0;
    padding-bottom: 0;
}
.addPageWrapper {
  margin-top: 150px;
}

.fill {
    width: 100%;
}
</style>

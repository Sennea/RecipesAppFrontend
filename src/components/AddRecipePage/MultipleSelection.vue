<template>
<div>
    <h2 class="title">{{title}}</h2> 
    <div class="multipleSelectionWrapper" v-for="index in Array.from(Array(amount).keys())" :key="index" >
      <div class="single">
      <SimpleAdd
        @fieldChanged="emitChange($event)"
        v-for="(field, i) in fields"
        :key="i"
        :title="field.title"
        :input="field.input"
        :select="field.select"
        :textarea="field.textarea"
        :options="field.options"
        :button="field.button"
        :showTitle="index === 0"
        :index="index"
      />
      </div>
    </div>
    </div>
</template>

<script>
import SimpleAdd from "./SimpleAdd.vue";
export default {
  name: "MultipleSelection",
  components: { SimpleAdd },
  props: ["title", "fields", "index", "amount"],
  created() {
    console.log("Fields", this.fields[0]);
    console.log("Amount", this.amount);
  },
  methods: {
      emitChange(e) {
        this.$emit('fieldChanged', e)
      }
  }
};
</script>

<style scoped>
.title {
  margin-bottom: 0;
  padding-bottom: 0;
}

.single {
  display: flex;
  flex-direction: row;
}

.multipleSelectionWrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
</style>

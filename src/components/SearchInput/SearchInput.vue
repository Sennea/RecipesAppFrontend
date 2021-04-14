<template>
  <div>
    <div :class="['inputWrapper', focused && 'inputWrapperFocused']">
      <div class="inputLabel">{{ label }}</div>
      <input
        class="input"
        @focus="focused = true"
        @blur="focused = false"
        v-model="value"
        :type="type"
        @change="$emit('change', e)"
      />
    </div>
    <p class="inputError" :v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: ["label", "type", "error"],
};
</script>

<style scoped>
.inputWrapper {
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  width: 40%;
  overflow: hidden;
  margin: 0 auto 10px;
}

.inputWrapperFocused {
  border: 2px solid blue;
}

.inputLabel {
  background-color: palegreen;
  color: blueviolet;
  font-size: 12px;
  flex-basis: 30%;
  min-width: 30%;
  padding: 6px;
}

.input {
  background-color: rebeccapurple;
  flex-basis: 70%;
  border: 0;
  outline: none;
  padding: 6px;
}

.inputError {
  margin-top: -8px;
  font-size: 8px;
  color: red;
}
</style>
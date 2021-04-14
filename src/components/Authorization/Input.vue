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
      <div v-if="label === 'Search'" class="hint">🔎</div>
    </div>
    <p class="inputError" :v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: ["label", "type", "error"],
  data() {
    return {
      focused: false
    }
  }
};
</script>

<style scoped>
.inputWrapper {
  display: flex;
  flex-direction: row;
 box-shadow: 0 0 10px rgb(0, 44, 33);
  border-radius: 5px;
  overflow: hidden;
  margin: 0 auto 10px;
}

.hint {
  cursor: pointer;
  align-content: center;
  background: rgb(45, 115, 182);
  display: flex;
  align-items: center;
  padding: 5px;
}

.inputWrapperFocused {
  box-shadow: 0 0 20px rgb(0, 20, 15);
  margin: 0 auto 9px;
}

.inputLabel {
  background: rgb(45, 115, 182);
  font-size: 12px;
  flex-basis: 30%;
  min-width: 30%;
  padding: 6px;
  font-weight: bold;

}

.input {
  background-color: white;
  flex-basis: 70%;
  border: 0;
  outline: none;
  padding: 6px;
}

.inputError {
  margin-top: -8px;
  font-size: 12px;
  font-weight: bold;
  color: rgb(0, 20, 15)
}
</style>
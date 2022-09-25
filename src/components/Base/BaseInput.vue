<template>
    <input
        :value="modelValue"
        @input="updateInput"
        class="base-input"
        type="text"
    >
</template>

<script>
export default {
  name: 'base-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.base-input {
    box-sizing: border-box;
    width: 100%;
    border: 1px solid teal;
    padding: 5px 7px;
    margin: 10px 0;
}

</style>

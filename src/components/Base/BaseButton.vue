<template>
  <button class="base-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'base-button'
}
</script>

<style scoped>
.base-button {
  padding: 5px 5px;
  background: none;
  color: rgb(0, 0, 0);
  border: 1px solid rgb(0, 0, 0);
}
</style>

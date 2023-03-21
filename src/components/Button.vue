<template>
  <button class="custom-button" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Button',
});
</script>

<style lang="scss">
.custom-button {
  @apply text-white px-4 py-2 rounded-full shadow pl-8 pr-8;

  &:hover {
    @apply opacity-60;
  }
}
</style>

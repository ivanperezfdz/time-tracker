<template>
  <div class="dropdown" @mouseenter="isOpen = true" @mouseleave="isOpen = false">
    <slot name="avatar"></slot>
    <div class="ml-4">
      <slot name="name" :opened="isOpen"></slot>
    </div>
    <transition name="fade">
      <div v-if="isOpen" class="dropdown-menu">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      isOpen: false,
    };
  },
});
</script>

<style lang="scss">
.dropdown {
  @apply cursor-pointer relative inline-flex items-center;

  &-menu {
    @apply absolute bg-white text-gray-700 rounded-2xl shadow-md top-14 right-0 w-64 z-10;

    li {
      @apply h-16 flex justify-center items-center;

      &:hover {
        @apply text-green-400;

        ul {
          @apply text-gray-700;
        }
      }

      &.item-menu {
        @apply relative;

        .arrow {
          @apply absolute left-4 top-1/2 transform -translate-y-1/2;
        }
      }

    }
  }
}

.fade {
  &-enter-active, &-leave-active {
    @apply transition-opacity duration-500 ease-in-out;
  }

  &-enter, &-leave-to {
    @apply opacity-0;
  }
}
</style>

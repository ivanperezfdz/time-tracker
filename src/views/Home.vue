<template>
  <div class="home">
    <TimeTracker class="main" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TimeTracker from '@/components/TimeTracker.vue';

export default Vue.extend({
  components: {
    TimeTracker,
  },
});
</script>

<style lang="scss">
 .home {
  @apply min-h-screen bg-gray-100 flex items-start justify-center pt-32;

  .main {
    @apply w-full sm:w-full md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-full pl-6 pr-6 pt-3 pb-3;
  }
 }
</style>

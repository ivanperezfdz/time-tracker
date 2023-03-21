<template>
  <div class="avatar">
    <div class="status-indicator" :class="[getStatusClass]"></div>
    <img :src="gravatarUrl" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CryptoJS from 'crypto-js';

export default Vue.extend({
  props: {
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      validator: (value: string) => {
        return ['online', 'offline', 'paused'].indexOf(value) !== -1;
      },
      default: 'offline'
    }
  },
  computed: {
    gravatarUrl(): string {
      const hash = CryptoJS.MD5(this.email.trim().toLowerCase()).toString();
      return `https://www.gravatar.com/avatar/${hash}?s=48&d=identicon`;
    },
    getStatusClass(): string {
      switch (this.status) {
        case 'online':
          return 'bg-green-500';
        case 'offline':
          return 'bg-red-500';
        case 'paused':
          return 'bg-gray-500';
        default:
          return '';
      }
    },
  },
});
</script>

<style lang="scss">
.avatar {
  @apply relative inline-block w-10 h-10;

  img {
    @apply object-cover w-full h-full rounded-full;
  }
}

.status-indicator {
  @apply absolute top-0 right-0 w-3 h-3 rounded-full;
}
</style>

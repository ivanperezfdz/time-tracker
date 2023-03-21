<template>
  <div class="name">
    <span class="text">{{ name }}</span>
		<span class="arrow">
			<i class="fas fa-chevron-down"></i>
		</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
    },
    opened: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style lang="scss">
.name {
	@apply text-lg;

	.text {
		@apply mr-2 font-semibold;
	}

	.arrow {
		@apply inline-flex items-center justify-center w-6 h-6 rounded-3xl;
	}
}

.fa-chevron-down:before {
  content: "\f078";
}

</style>

<template>
	<transition class="fade">
		<ul :class="isSubmenuItem(menuItems[0]) ? 'dropdown-submenu' : ''">
			<li
			v-for="(item, index) in menuItems"
			:key="index"
			:class="item.class"
			@click="item.action"
			@mouseenter="openSubmenu(item)"
			@mouseleave="closeSubmenu(item)"
			>
			<template v-if="!isSubmenuItem(item)">
				{{ item.text }}
				<span v-if="item.arrow" class="arrow">
					<i :class="item.arrowClass"></i>
				</span>
				<DropdownMenu v-if="item.isOpen" :menuItems="submenuItems" />
			</template>
			<template v-else>
				<div class="dropdown-submenu-wrapper">
					<img :src="item.img">
					<div class="text">
						<div class="text-main"><span>{{ item.boldText }}</span>{{ item.text }}</div>
						<span class="text-foot">{{ item.footText }}</span>
					</div>
				</div>
			</template>
		</li>
  </ul>
</transition>
</template>

<script lang="ts">
import Vue from "vue";
import { MenuItem, SubmenuItem } from "@/interfaces/common";

export default Vue.extend({
	name: "DropdownMenu",
	data() {
		return {
			openSubmenuIndex: -1
		};
	},
  props: {
    menuItems: {
      type: Array as () => Array<MenuItem | SubmenuItem>,
      default: () => [],
    },
		submenuItems: {
			type: Array as () => SubmenuItem[],
			default: () => [],
			required: false
		}
  },
	computed: {
		isItemWithSubmenu() {
			return this.submenuItems;
		}
	},
  methods: {
    isSubmenuItem(item: MenuItem | SubmenuItem): boolean {
      return 'boldText' in item && 'footText' in item;
    },
		openSubmenu(item: MenuItem) {
			if (item.class === 'item-menu') {
				item.isOpen = true;
			}
		},
		closeSubmenu(item: MenuItem) {
			if (item.isOpen) {
				item.isOpen = false;
			}
		},
  },
});
</script>

<style lang="scss">
.dropdown-submenu {
	@apply absolute -left-full transform -translate-x-3 top-0 bg-white shadow-md rounded-2xl overflow-hidden;

	&-wrapper {
		@apply flex items-center py-3 px-6;

		img {
			@apply rounded-full h-10 border border-gray-600;
		}

		.text {
			@apply flex flex-col ml-6;

			&-main {
				@apply flex;

				span {
					@apply font-bold mr-3;
				}
			}

			&-foot {
				@apply text-sm text-gray-500;
			}
		}
	}
}
</style>

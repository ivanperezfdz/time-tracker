<template>
  <div class="time-tracker">
    <div class="timer-clock">
      <div>
        {{ elapsedTime }}
        <span v-if="workStatus === 'online'" class="text-gray-400"> / {{ totalTime }}</span>
      </div>
    </div>

    <div class="timer-buttons">
      <div v-if="workStatus === 'offline'">
        <Button @click="clockIn" :class="'bg-green-500'">Entrar</Button>
      </div>
      <div v-else-if="workStatus === 'online'">
        <Button :class="'bg-gray-300 mr-1'">Pausar</Button>
        <Button @click="clockOut" :class="'bg-red-300 ml-1'">Salir</Button>
      </div>
    </div>

    <div class="separator"></div>

    <Dropdown>
      <template #avatar>
        <InfoAvatar :email="user.email" :status="workStatus" />
      </template>
      <template #name>
        <InfoName :name="user.name" :opened="false" />
      </template>
      <ul>
        <DropdownMenu :menuItems="menuItems" :submenuItems="submenuItems" />
      </ul>
    </Dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import InfoAvatar from '@/components/Info/InfoAvatar.vue';
import InfoName from '@/components/Info/InfoName.vue';
import Button from '@/components/Button.vue';
import Dropdown from '@/components/Dropdown/Dropdown.vue';
import DropdownMenu from '@/components/Dropdown/DropdownMenu.vue';
import { mapActions, mapGetters } from 'vuex';
import { getFormattedTime } from '@/utils';

export default Vue.extend({
  components: {
    InfoAvatar,
    InfoName,
    Button,
    Dropdown,
    DropdownMenu,
  },
  data() {
    return {
      intervalId: 0,
      totalTime: '08:00:00'
    };
  },
  computed: {
    ...mapGetters({
      user: 'employee/user',
      workStatus: 'employee/workStatus',
      workEntryIn: 'employee/workEntryIn',
      workTotalSecs: 'employee/workTotalSecs',
      menuItems: 'menu/menuItems',
      submenuItems: 'menu/submenuItems'
    }),
    elapsedTime() {
      return getFormattedTime(this.workTotalSecs);
    }
  },
  methods: {
    ...mapActions({
      fetchWorkStatus: `employee/fetchWorkStatus`,
      clockIn: `employee/clockIn`,
      clockOut: `employee/clockOut`,
      updateWorkTotalSecs: `employee/updateWorkTotalSecs`
    })
  },
  created() {
    this.fetchWorkStatus();
  },
  watch: {
    workStatus: function (this: Vue & { intervalId: number, updateWorkTotalSecs: () => Promise<void> }, status: string): void {
      if (status === "online") {
        this.intervalId = setInterval(async () => {
          await this.updateWorkTotalSecs();
        }, 1000);
      } else {
        clearInterval(this.intervalId);
      }
    }
  }
});
</script>

<style lang="scss">
.time-tracker {
  @apply bg-white p-4 rounded shadow-md flex items-center justify-between;

  .timer-buttons {
    @apply flex items-center;
  }

  .separator {
    @apply block h-8 w-px bg-gray-300;
  }
}
</style>

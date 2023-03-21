import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { RootState } from '@/interfaces/common';
import TimeTracker from '@/components/TimeTracker.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('TimeTracker.vue', () => {
  let store: Store<RootState>;
  let employeeModule;
  let menuModule;

  beforeEach(() => {
    employeeModule = {
      namespaced: true,
      getters: {
        user: () => ({
          name: 'Ivan',
          email: 'ivanperezn27@gmail.com',
        }),
        workStatus: () => 'offline',
        workEntryIn: () => '2023-03-21T08:00:00.000Z',
        workTotalSecs: () => 0,
      },
      actions: {
        fetchWorkStatus: jest.fn(),
        clockIn: jest.fn(),
        clockOut: jest.fn(),
        updateWorkTotalSecs: jest.fn(),
      },
    };

    menuModule = {
      namespaced: true,
      getters: {
        menuItems: () => [],
        submenuItems: () => [],
      },
    };

    store = new Store<RootState>({
      modules: {
        employee: employeeModule,
        menu: menuModule
      },
    });
  });

  it('renders without crashing', () => {
    const wrapper = shallowMount(TimeTracker, { store, localVue });
    expect(wrapper.exists()).toBeTruthy();
  });

  it('displays the elapsed time', () => {
    const wrapper = shallowMount(TimeTracker, { store, localVue });
    const timerClock = wrapper.find('.timer-clock div');
    expect(timerClock.text()).toContain('00:00:00');
  });
});

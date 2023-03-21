import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { EmployeeModule } from './modules/employee';
import { MenuModule } from './modules/menu';
import { RootState } from '@/interfaces/common';

Vue.use(Vuex);

export default new Store<RootState>({
  modules: {
    employee: EmployeeModule,
    menu: MenuModule
  },
});

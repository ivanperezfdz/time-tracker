import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { RootState } from '@/interfaces/common';
import { EmployeeState } from '@/interfaces/employee';
import { WorkEntry } from '@/interfaces/common';
import { axiosInstance } from '@/utils';

const state: EmployeeState = {
  user: {
    id: '',
    email: '',
    name:''
  },
  workStatus: 'offline',
  workEntryIn: '',
  workTotalSecs: 0
};

const getters: GetterTree<EmployeeState, RootState> = {
  user: (state) => state.user,
  workStatus: (state) => state.workStatus,
  workEntryIn: (state) => state.workEntryIn,
  workTotalSecs: (state) => state.workTotalSecs
};

const mutations: MutationTree<EmployeeState> = {
  setUser(state, user: {id: string, email: string, name: string}) {
    state.user = user;
  },
  setWorkStatus(state, workStatus: string) {
    state.workStatus = workStatus;
  },
  setWorkEntryIn(state, workEntryIn: string) {
    state.workEntryIn = workEntryIn;
  },
  setWorkTotalSecs(state, workTotalSecs: number) {
    state.workTotalSecs = workTotalSecs;
  }
};

const actions: ActionTree<EmployeeState, RootState> = {
  async fetchWorkStatus({ commit, dispatch }: ActionContext<EmployeeState, RootState>): Promise<void> {
    try {
      const response = await axiosInstance.get('/schedule/v1/work-entries');
      const employees = response.data.data;
      if (employees.length) {
        // const randomIndex = Math.floor(Math.random() * employees.length);
        // Podría hacer un randomIndex para hacerlo sobre un usuario en específico
        // cada vez que recargo, lo hago con 0 ya que de la API viene un único empleado
        const randomIndex = 0;
        const employee = employees[randomIndex];
        const id = employee.employee.id;
        const email = employee.employee.email;
        const name = `${employee.employee.firstName} ${employee.employee.lastName}`;

        // Se podría hacer de manera más sencilla con la biblioteca luxon o moment
        // pero opto en este caso por mostrar una implementación a partir del tipo
        // de dato Date
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let workTotalSecs = 0;
        employees.map((entry: WorkEntry) => {
          const entryInDate = new Date(entry.workEntryIn.date);
          if (entryInDate >= today) {
            const entryOutDate = entry.workEntryOut ? new Date(entry.workEntryOut.date): new Date();
            const entryDurationSecs = (entryOutDate.getTime() - entryInDate.getTime()) / 1000;
            workTotalSecs += entryDurationSecs;
            return entryInDate;
          }
        });
        
        const workStatus = employee.employee.workStatus;
        const workEntryIn = employee.workEntryIn;
        
        commit('setUser', {id, email, name});
        commit('setWorkStatus', workStatus);
        commit('setWorkEntryIn', workEntryIn);
        commit('setWorkTotalSecs', workTotalSecs);
        dispatch('menu/updateSubmenuItems', employees, {root: true});
      }
    } catch(error) {
      console.error(error);
    }
  },

  async clockIn({ commit, state }: ActionContext<EmployeeState, RootState>) {
    const response = await axiosInstance.post(
      '/schedule/v1/work-entries/clock-in',
      {
        employeeId: state.user.id,
        workEntryIn: {
            latitude: 0,
            longitude: 0
        }
      },
    );

    const employee = response.data.data;
    const workStatus = employee.employee.workStatus;
    const workEntryIn = employee.workEntryIn;

    commit('setWorkStatus', workStatus);
    commit('setWorkEntryIn', workEntryIn);
  },

  async clockOut({ commit, state }: ActionContext<EmployeeState, RootState>) {
    const response = await axiosInstance.post(
      '/schedule/v1/work-entries/clock-out',
      {
        employeeId: state.user.id,
        workEntryOut: {
            latitude: 0,
            longitude: 0
        }
      },
    );

    const employee = response.data.data;
    const workStatus = employee.employee.workStatus;
    commit('setWorkStatus', workStatus);
  },
  updateWorkTotalSecs({ commit, state }: ActionContext<EmployeeState, RootState>) {
    commit('setWorkTotalSecs', state.workTotalSecs + 1);
  }
};

export const EmployeeModule: Module<EmployeeState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

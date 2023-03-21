import { ActionContext, ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { RootState, MenuItem, SubmenuItem, WorkEntry } from '@/interfaces/common';
import { createSubMenuItemsFromData } from '@/utils';

interface MenuState {
  menuItems: MenuItem[];
	submenuItems: SubmenuItem[];
}

const state: MenuState = {
  menuItems: [
    {
      text: "Mis cuentas",
      class: "item-menu",
			isOpen: false,
      arrow: true,
      arrowClass: "fas fa-chevron-left",
      action: () => console.log("Mis cuentas clicked"),
    },
    {
      text: "Vista empleado",
      action: () => console.log("Vista empleado clicked"),
    },
    {
      text: "Mi perfil",
      action: () => console.log("Mi perfil clicked"),
    },
    {
      text: "Cerrar sesión",
      action: () => console.log("Cerrar sesión clicked"),
    },
  ],
	submenuItems: []
};


const mutations: MutationTree<MenuState> = {
	setSubmenuItems(state, submenuItems: SubmenuItem[]) {
		state.submenuItems = submenuItems;
	},
};

const actions: ActionTree<MenuState, RootState> = {
	updateSubmenuItems({ commit }: ActionContext<MenuState, RootState>, entries: WorkEntry[]): void {
    const submenuItems: SubmenuItem[] = createSubMenuItemsFromData(entries);
    commit("setSubmenuItems", submenuItems);
  },
};

const getters: GetterTree<MenuState, RootState> = {
	menuItems: (state: MenuState): MenuItem[] => state.menuItems,
	submenuItems: (state: MenuState): SubmenuItem[] => state.submenuItems,
};

export const MenuModule: Module<MenuState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

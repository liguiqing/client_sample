import { Module } from 'vuex';
export const elementuiStore: Module<any, any> = {
  state: {
    loginDialogVisible: false,
  },
  getters: {
    loginDialogVisible: state => state.loginDialogVisible,
  },
  mutations: {
    hideLoginDialog(state) {
      state.loginDialogVisible = false;
    },
    showLoginDialog(state) {
      state.loginDialogVisible = true;
    },
  },
};

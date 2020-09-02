import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import VueI18n from 'vue-i18n';
import SampleFormatter from './formatter';
import { setupAxiosInterceptors } from '@/shared/config/axios-interceptor';

import VueCookie from 'vue-cookie';
import Vuelidate from 'vuelidate';
import Vue2Filters from 'vue2-filters';

import * as filters from '@/shared/date/filters';
import { accountStore } from '@/shared/config/store/account-store';
import { alertStore } from '@/shared/config/store/alert-store';
import { translationStore } from '@/shared/config/store/translation-store';
import { elementuiStore } from '@/shared/config/store/elementui-store';

const dateTimeFormats = {
  'zh-cn': {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    },
    medium: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
};

export function initVueApp(vue) {
  vue.use(VueCookie);
  vue.use(Vuelidate);
  vue.use(Vue2Filters);
  setupAxiosInterceptors(() => console.log('Unauthorized!'));
  filters.initFilters();
}

export function initI18N(vue) {
  vue.use(VueI18n);
  return new VueI18n({
    dateTimeFormats,
    silentTranslationWarn: true,
    formatter: new SampleFormatter(),
  });
}

export function initVueXStore(vue) {
  vue.use(Vuex);
  return new Vuex.Store({
    modules: {
      accountStore,
      alertStore,
      translationStore,
      elementuiStore,
    },
    plugins: [
      createPersistedState({
        storage: window.sessionStorage,
      }),
    ],
  });
}

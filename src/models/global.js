import { bell } from '@/services/api';
import { emptyBell } from '@/services/user';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    count: 0,
    identity: 2,
  },

  effects: {
    *fetchBell(_, { call, put }) {
      const response = yield call(bell);
      yield put({
        type: 'saveBell',
        payload: response.data || { num: 0 },
      });
    },
    *clearBell(_, { call }) {
      yield call(emptyBell);
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveBell(state, { payload }) {
      const { num } = payload;
      return {
        ...state,
        count: num,
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

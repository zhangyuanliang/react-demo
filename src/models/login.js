import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { login, logout } from '@/services/api';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { setAuthority } from '@/utils/authority';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    token: null,
    code: null,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      const {
        code,
        data: { token, auth },
      } = response;
      yield put({
        type: 'changeLoginStatus',
        payload: {
          token: token || null,
          code: payload.account || null,
          currentAuthority: auth,
        },
      });
      // Login successfully
      if (code === 'A00000') {
        localStorage.setItem('code', payload.account);
        localStorage.setItem('access-token', token);
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            redirect = null;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    // *getCaptcha({ payload }, { call }) {
    //   yield call(getFakeCaptcha, payload);
    // },

    *logout({ payload }, { call, put }) {
      if (payload.type) {
        yield call(logout);
      }
      yield put({
        type: 'changeLoginStatus',
        payload: {
          token: null,
          code: null,
          currentAuthority: 'user',
        },
      });
      reloadAuthorized();
      // redirect
      if (window.location.pathname !== '/user/login') {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      if (payload.currentAuthority) {
        setAuthority(payload.currentAuthority);
      }
      if (!payload.token) {
        localStorage.setItem('access-token', '');
        localStorage.setItem('code', '');
      }
      return {
        ...state,
        token: payload.token,
        code: payload.code,
      };
    },
  },
};

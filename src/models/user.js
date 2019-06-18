import {
  query as queryUsers,
  note as queryNote,
  queryCurrent,
  roleList,
  addOperator,
  editOperator,
  delOperator,
  logList as getLogList,
  forget,
} from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { message } from 'antd';

export default {
  namespace: 'user',

  state: {
    operatorList: [],
    currentUser: {},
    roleList: [],
    logList: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUsers, payload);
      yield put({
        type: 'save',
        payload: response.data || {},
      });
      return response;
    },
    *note({ payload }, { call }) {
      const response = yield call(queryNote, payload);
      if (response.code === 'A00000') {
        message.success(response.msg);
      }
      return response;
    },
    *submit({ payload }, { call }) {
      const response = yield call(forget, payload);
      if (response.code === 'A00000') {
        message.success(response.msg);
      }
    },
    *fetchLog({ payload }, { call, put }) {
      const response = yield call(getLogList, payload);
      yield put({
        type: 'saveLog',
        payload: response.data || {} || {},
      });
      return response;
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data || {},
      });
      if (response.code === 'A00000') {
        reloadAuthorized();
      }
    },
    *fetchRole({ payload }, { call, put }) {
      const response = yield call(roleList, payload);
      yield put({
        type: 'saveRole',
        payload: response.data || {},
      });
      return response;
    },
    *addUser({ payload }, { call }) {
      const response = yield call(addOperator, payload);
      if (response.code === 'A00000') {
        message.success(response.msg);
      }
      return response;
    },
    *editUser({ payload }, { call }) {
      const response = yield call(editOperator, payload);
      if (response.code === 'A00000') {
        message.success(response.msg);
      }
      return response;
    },
    *delete({ payload }, { call }) {
      const response = yield call(delOperator, payload);
      if (response.code === 'A00000') {
        message.success(response.msg);
      }
      return response;
    },
  },
  reducers: {
    save(state, { payload }) {
      const { operatorListVo = [] } = payload;
      return {
        ...state,
        operatorList: operatorListVo,
      };
    },
    saveLog(state, { payload }) {
      const { logListVo = [] } = payload;
      return {
        ...state,
        logList: logListVo,
      };
    },
    saveCurrentUser(state, { payload }) {
      const { auth = [] } = payload;
      setAuthority(auth);
      return {
        ...state,
        currentUser: payload || {},
      };
    },
    saveRole(state, { payload }) {
      const { roleListVo = [] } = payload;
      return {
        ...state,
        roleList: roleListVo,
      };
    },
  },
};

import {
  query as queryCustomer,
  queryLogs,
  queryCustomerInfo,
  isDisabled,
  addCustomer,
  editCustomer,
  getSysdict,
  queryMediaAccountList,
  isMediaDisabled,
  addMediaAccount,
  editMediaAccount,
  queryMediaAccountInfo,
  queryMemberList,
  loginCommand,
  authMediaAccount,
} from '@/services/customer';
// import { message } from 'antd';

export default {
  namespace: 'customer',

  state: {
    customerList: [],
    logList: [],
    editingCustomer: null,
    advertisersType: [],
    mediaAccountList: [],
    acountTypeList: [],
    platformChannels: [],
    editingMediaAccount: null,
    memberList: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryCustomer, payload);
      yield put({
        type: 'save',
        payload: response.data || {},
      });
      return response;
    },
    *fetchLogList({ payload }, { call, put }) {
      const response = yield call(queryLogs, payload);
      yield put({
        type: 'saveLog',
        payload: response.data || {},
      });
      return response;
    },
    *fetchCustomerInfo({ payload }, { call, put }) {
      const response = yield call(queryCustomerInfo, payload);
      yield put({
        type: 'setEditingCustomer',
        payload: response.data,
      });
      return response;
    },
    *emptyEditingCustomer(_, { put }) {
      yield put({
        type: 'setEditingCustomer',
        payload: null,
      });
    },
    *handleIsDisabled({ payload }, { call }) {
      const response = yield call(isDisabled, payload);
      // message.success(response.msg);
      return response;
    },
    *handleAddCustomer({ payload }, { call }) {
      const response = yield call(addCustomer, payload);
      // message.success(response.msg);
      return response;
    },
    *handleEditCustomer({ payload }, { call }) {
      const response = yield call(editCustomer, payload);
      // message.success(response.msg);
      return response;
    },
    *fetchAdvertisersType({ payload }, { call, put }) {
      const response = yield call(getSysdict, payload);
      yield put({
        type: 'setAdvertisersType',
        payload: response.data || [],
      });
      return response;
    },
    *fetchMediaAccountList({ payload }, { call, put }) {
      const response = yield call(queryMediaAccountList, payload);
      yield put({
        type: 'setMediaAccountList',
        payload: response.data || {},
      });
      return response;
    },
    *handleIsMediaDisabled({ payload }, { call }) {
      const response = yield call(isMediaDisabled, payload);
      // message.success(response.msg);
      return response;
    },
    *handleAddMediaAccount({ payload }, { call }) {
      const response = yield call(addMediaAccount, payload);
      // message.success(response.msg);
      return response;
    },
    *handleEditMediaAccount({ payload }, { call }) {
      const response = yield call(editMediaAccount, payload);
      // message.success(response.msg);
      return response;
    },
    *fetchAcountTypeList({ payload }, { call, put }) {
      const response = yield call(getSysdict, payload);
      yield put({
        type: 'setAcountTypeList',
        payload: response.data || [],
      });
      return response;
    },
    *fetchPlatformChannels({ payload }, { call, put }) {
      const response = yield call(getSysdict, payload);
      yield put({
        type: 'setPlatformChannels',
        payload: response.data || [],
      });
      return response;
    },
    *fetchMediaAccountInfo({ payload }, { call, put }) {
      const response = yield call(queryMediaAccountInfo, payload);
      yield put({
        type: 'setEditingMediaAccount',
        payload: response.data,
      });
      return response;
    },
    *emptyEditingMediaAccount(_, { put }) {
      yield put({
        type: 'setEditingMediaAccount',
        payload: null,
      });
    },
    *fetchMemberList({ payload }, { call, put }) {
      const response = yield call(queryMemberList, payload);
      yield put({
        type: 'saveMemberList',
        payload: response.data || {},
      });
    },
    *fetchQrImg({ payload }, { call }) {
      const response = yield call(loginCommand, payload);
      return response;
    },
    *handleAuthMediaAccount({ payload }, { call }) {
      const response = yield call(authMediaAccount, payload);
      return response;
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        customerList: action.payload.customerVosList || [],
      };
    },
    saveLog(state, action) {
      return {
        ...state,
        logList: action.payload.customerLogInfoVo || [],
      };
    },
    setEditingCustomer(state, { payload }) {
      return {
        ...state,
        editingCustomer: payload,
      };
    },
    setAdvertisersType(state, { payload }) {
      return {
        ...state,
        advertisersType: payload,
      };
    },
    setMediaAccountList(state, { payload }) {
      return {
        ...state,
        mediaAccountList: payload.mediaListVo || [],
      };
    },
    setAcountTypeList(state, { payload }) {
      return {
        ...state,
        acountTypeList: payload,
      };
    },
    setPlatformChannels(state, { payload }) {
      return {
        ...state,
        platformChannels: payload,
      };
    },
    setEditingMediaAccount(state, { payload }) {
      return {
        ...state,
        editingMediaAccount: payload,
      };
    },
    saveMemberList(state, { payload }) {
      return {
        ...state,
        memberList: payload.memberListVo || [],
      };
    },
  },
};

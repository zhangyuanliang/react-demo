import { 
  queryCities, 
  download, 
  generate, 
  exportFailPolicyNoOrder, 
  haveFailPolicyNoOrder, 
  queryHistory, 
  downloadItem, 
  deleteItem 
} from '@/services/home';
import { message } from 'antd';

export default {
  namespace: 'home',

  state: {
    cities: [],
    historyList: []
  },

  effects: {
    *fetchCities({ payload }, { call, put }) {
      const response = yield call(queryCities, payload);
      yield put({
        type: 'setCities',
        payload: response.data || [],
      });
      return response;
    },
    *generateReport({ payload }, { call}) {
      const response = yield call(generate, payload);
      return response;
    },
    *downloadReport({ payload }, { call}) {
      const response = yield call(download, payload);
      return response;
    },
    *export({ payload }, { call}) {
      const response = yield call(exportFailPolicyNoOrder, payload);
      return response;
    },
    *hasErrorInfo({ payload }, { call}) {
      const response = yield call(haveFailPolicyNoOrder, payload);
      return response;
    },

    *fetchHistory({ payload }, { call, put }) {
      const response = yield call(queryHistory, payload);
      yield put({
        type: 'setHistory',
        payload: response.data || [],
      });
      return response;
    },
    *downItem({ payload }, { call}) {
      const response = yield call(downloadItem, payload);
      return response;
    },
    *delItem({ payload }, { call}) {
      const response = yield call(deleteItem, payload);
      return response;
    },

  },

  reducers: {
    setCities(state, { payload }) {
      return {
        ...state,
        cities: payload,
      };
    },
    setHistory(state, { payload }) {
      return {
        ...state,
        historyList: payload,
      };
    },
  },
};

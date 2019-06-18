import request from '@/utils/request';

export async function queryHistory(param) {
  return request('/api/report/getHistoryRecordList', {
    method: 'POST',
    body: {
      ...param
    },
  });
}

export async function downloadItem(params) {
  return request('/api/report/getHistoryPackage', {
    method: 'POST',
    body: {
      ...params
    },
    Accept: 'application/json, */*',
    responseType: 'blob',
    timeout: 100000,
  });
}

export async function deleteItem(params) {
  return request('/api/report/deleteHistoryRecord', {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function queryCities() {
  return request('/api/report/getCity', {
    method: 'POST',
    body: {},
  });
}

export async function generate(params) {
  return request('/api/report/getCheckCarReport', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function download(params) {
  return request('/api/report/getCarReportPackage', {
    method: 'POST',
    body: {
      ...params
    },
    Accept: 'application/json, */*',
    responseType: 'blob',
    timeout: 6000000,
  });
}

export async function exportFailPolicyNoOrder(params) {
  return request('/api/report/exportFailPolicyNoOrder', {
    method: 'POST',
    body: {
      ...params
    },
    Accept: 'application/json, */*',
    responseType: 'blob',
    timeout: 6000000,
  });
}

export async function haveFailPolicyNoOrder() {
  return request('/api/report/haveFailPolicyNoOrder', {
    method: 'POST',
    body: {},
  });
}
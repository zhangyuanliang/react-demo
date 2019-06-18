import request from '@/utils/request';

export async function query(params) {
  return request('/api/platform/customer/getAllCustomerList', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryLogs(params) {
  return request('/api/platform/customer/customerLogInfo', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryCustomerInfo(params) {
  return request('/api/platform/customer/customerInfo', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function isDisabled(params) {
  return request('/api/platform/customer/isDisabled', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function addCustomer(params) {
  return request('/api/platform/customer/addCustomer', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function editCustomer(params) {
  return request('/api/platform/customer/editCustomer', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function getSysdict(params) {
  return request('/api/platform/customer/getSysdict', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryMediaAccountList(params) {
  return request('/api/platform/mediaAccount/mediaAccountList', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function isMediaDisabled(params) {
  return request('/api/platform/mediaAccount/isMediaDisabled', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function addMediaAccount(params) {
  return request('/api/platform/mediaAccount/addMediaAccount', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function editMediaAccount(params) {
  return request('/api/platform/mediaAccount/editMediaAccount', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryMediaAccountInfo(params) {
  return request('/api/platform/mediaAccount/mediaAccountInfo', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryMemberList(params) {
  return request('/api/user/team/memberList', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function loginCommand() {
  return request('/api/platform/mp/loginCommand', {
    method: 'POST',
    body: {},
  });
}

export async function authMediaAccount(params) {
  return request('/api/platform/mediaAccount/authMediaAccount', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

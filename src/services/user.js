import request from '@/utils/request';

export async function query(params) {
  return request('/api/user/user/operatorList', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 忘记密码
export async function forget(params) {
  return request('/api/user/user/editPassword', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function note(params) {
  return request('/api/user/user/note', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryCurrent() {
  return request('/api/user/user/userInfo', {
    method: 'POST',
  });
}

// 角色列表
export async function roleList(params) {
  return request('/api/user/role/roleList', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 注册用户
export async function addOperator(params) {
  return request('/api/user/user/addOperator', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 编辑用户
export async function editOperator(params) {
  return request('/api/user/user/editOperator', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 删除用户
export async function delOperator(params) {
  return request('/api/user/user/delOperator', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 用户日志列表
export async function logList(params) {
  return request('/api/user/user/logList', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 清除成员铃铛数量
export async function emptyBell(params) {
  return request('/api/platform/message/emptyBell', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 删除和角色变更 有无副作用
export async function fetchCheck(params) {
  return request('/api/user/user/check', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

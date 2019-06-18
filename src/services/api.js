import request from '@/utils/request';

// 登录 登出
export async function logout() {
  return request('/api/user/user/logout', {
    method: 'POST',
  });
}

export async function login(params) {
  return request('/api/user/user/login', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function teamList(params) {
  return request('/api/user/team/teamList', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function memberList(params) {
  return request('/api/user/team/memberList', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function delTeam(params) {
  return request('/api/user/team/delTeam', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function teamInfo(params) {
  return request('/api/user/team/teamInfo', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function editTeam(params) {
  return request('/api/user/team/editTeam', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function addTeam(params) {
  return request('/api/user/team/addTeam', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 转交列表
export async function transferList(params) {
  return request('/api/platform/message/transferList', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 接收媒体账号
export async function accept(params) {
  return request('/api/platform/message/accept', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 当前用户可转交对象
export async function getMembersByManage(params) {
  return request('/api/user/team/transferMembers', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
// 转交媒体账号
export async function transfer(params) {
  return request('/api/platform/message/transfer', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 铃铛轮询接口
export async function bell(params) {
  return request('/api/platform/message/bell', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

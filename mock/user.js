// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 登录
  'POST /api/user/user/login': (req, res) => {
    const { password, account } = req.body;
    if (password === '123456' && account === 'admin') {
      res.send({
        code: 'A00000',
        msg: 'ok',
        data: 'token',
      });
      return;
    }
    res.send({
      code: 'A00002',
      msg: 'error',
      data: null,
    });
  },
  // 登出
  'POST /api/user/user/logout': {
    code: 'A00000',
    msg: 'ok',
    data: null,
  },
  // 忘记密码
  'POST /api/user/user/editPassword': (req, res) => {
    const { account, code, password } = req.body;
    if (account === '13735076899' && code === '123456' && password === '123456') {
      res.send({
        code: 'A00000',
        msg: 'ok',
        data: null,
      });
      return;
    }
    res.send({
      code: 'A00002',
      msg: 'error',
      data: null,
    });
  },

  // 用户信息
  'POST /api/user/user/userInfo': {
    code: 'A00000',
    msg: 'ok',
    data: {
      operatorId: 1,
      name: 'caogu',
      account: 'admin',
      roleId: 2,
      roleName: '运营负责人',
      isQuery: 1,
      auth: ['admin', 'manageCustomer', 'OperatingCustomer'],
    },
  },
  'POST /api/user/user/operatorList': {
    code: 'A00000',
    msg: 'ok',
    data: {
      totalCount: 15,
      operatorListVo: [
        {
          operatorId: 1,
          operatorName: 'xs',
          account: '12345678909',
          password: '123456',
          roleId: 1,
          roleName: '运营部负责人',
          createTime: '2019-04-02 04:09:09',
        },
        {
          operatorId: 2,
          operatorName: 'xs2',
          account: '12345678909',
          password: '123456',
          roleId: 1,
          roleName: '运营部负责人',
          createTime: '2019-04-02 04:09:09',
        },
        {
          operatorId: 3,
          operatorName: 'xs3',
          account: '12345678909',
          password: '123456',
          roleId: 1,
          roleName: '运营部负责人',
          createTime: '2019-04-02 04:09:09',
        },
        {
          operatorId: 4,
          operatorName: 'xs4',
          account: '12345678909',
          password: '123456',
          roleId: 1,
          roleName: '运营部负责人',
          createTime: '2019-04-02 04:09:09',
        },
        {
          operatorId: 5,
          operatorName: 'xs5',
          account: '12345678909',
          password: '123456',
          roleId: 1,
          roleName: '运营部负责人',
          createTime: '2019-04-02 04:09:09',
        },
        {
          operatorId: 6,
          operatorName: 'xs6',
          account: '12345678909',
          password: '123456',
          roleId: 1,
          roleName: '运营部负责人',
          createTime: '2019-04-02 04:09:09',
        },
        {
          operatorId: 7,
          operatorName: 'xs7',
          account: '12345678909',
          password: '123456',
          roleId: 1,
          roleName: '运营部负责人',
          createTime: '2019-04-02 04:09:09',
        },
        {
          operatorId: 8,
          operatorName: 'xs8',
          account: '12345678909',
          password: '123456',
          roleId: 1,
          roleName: '运营部负责人',
          createTime: '2019-04-02 04:09:09',
        },
        {
          operatorId: 9,
          operatorName: 'xs9',
          account: '12345678909',
          password: '123456',
          roleId: 1,
          roleName: '运营部负责人',
          createTime: '2019-04-02 04:09:09',
        },
        {
          operatorId: 10,
          operatorName: 'xs10',
          account: '12345678909',
          password: '123456',
          roleId: 1,
          roleName: '运营部负责人',
          createTime: '2019-04-02 04:09:09',
        },
      ],
    },
  },
  // 获取用户角色列表
  'POST /api/user/role/roleList': {
    code: 'A00000',
    msg: 'ok',
    data: {
      totalCount: 1,
      roleListVo: [
        {
          roleId: 1,
          roleName: '运营管理员',
        },
        {
          roleId: 2,
          roleName: '运营负责人',
        },
      ],
    },
  },
  // 注册用户
  'POST /api/user/user/addOperator': {
    code: 'A00000',
    msg: 'ok',
    data: null,
  },
  // 编辑用户
  'POST /api/user/user/editOperator': {
    code: 'A00000',
    msg: 'ok',
    data: null,
  },
  // 删除用户
  'POST /api/user/user/delOperator': {
    code: 'A00000',
    msg: 'ok',
    data: null,
  },
  // 获取用户日志
  'POST /api/user/user/logList': {
    code: 'A00000',
    msg: 'ok',
    data: {
      totalCount: 1,
      logListVo: [
        {
          logId: 6,
          createTime: '2019-04-02 04:09:09',
          ip: '12.12.12.12',
          content: '12wee',
        },
      ],
    },
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};

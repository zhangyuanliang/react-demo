export default {
  'POST /api/user/role/menuList': {
    code: 'A00000',
    msg: 'ok',
    data: {
      menuListVo: [
        {
          isCheck: 1,
          menuId: 1,
          menuListVo: [],
          menuName: '客户管理',
          menuUrl: '/1',
        },
        {
          isCheck: 0,
          menuId: 2,
          menuListVo: [],
          menuName: '运营管理台',
          menuUrl: '/2',
        },
        {
          isCheck: 0,
          menuId: 3,
          menuListVo: [
            {
              isCheck: 0,
              menuId: 7,
              menuListVo: [],
              menuName: '我的客户',
              menuUrl: '/7',
            },
            {
              isCheck: 0,
              menuId: 8,
              menuListVo: [],
              menuName: '所有客户',
              menuUrl: '/8',
            },
          ],
          menuName: '运营客户',
          menuUrl: '/3',
        },
        {
          isCheck: 0,
          menuId: 4,
          menuListVo: [],
          menuName: '团队管理',
          menuUrl: '/4',
        },
        {
          isCheck: 0,
          menuId: 5,
          menuListVo: [],
          menuName: '权限管理',
          menuUrl: '/5',
        },
        {
          isCheck: 0,
          menuId: 6,
          menuListVo: [],
          menuName: '账号管理',
          menuUrl: '/6',
        },
      ],
    },
  },
  'POST /api/user/role/addMenuRole': {
    code: 'A00000',
    msg: 'ok',
    data: null,
  },
};

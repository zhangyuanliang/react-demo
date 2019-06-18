export default {
  'POST /api/platform/mediaAccount/mediaAccountInfo': {
    msg: '操作成功',
    code: 'A00000',
    data: {
      acountType: 'ACOUNT_TYPE_01',
      advertisingAccountCode: '100199322581',
      advertisingAccountName: '杭州飞马网络有限公司-创彩商城-A',
      appKey: null,
      appSecret: null,
      isToParaphrase: 0,
      mediaAccountId: 1,
      operatorId: 2,
      passWord: 'Hzfm!201806',
      platformChannels: 'PLATFORM_CHANNELS_03',
      userName: '2137625798@qq.com',
    },
  },
  'POST /api/platform/mediaAccount/editMediaAccount': {
    msg: '操作成功',
    code: 'A00000',
    data: null,
  },
  'POST /api/platform/mediaAccount/addMediaAccount': {
    msg: '操作成功',
    code: 'A00000',
    data: null,
  },
  'POST /api/platform/mediaAccount/isMediaDisabled': {
    msg: '操作成功',
    code: 'A00000',
    data: null,
  },
  'POST /api/platform/mediaAccount/mediaAccountList': {
    msg: '操作成功',
    code: 'A00000',
    data: {
      totalCount: 1,
      mediaListVo: [
        {
          mediaAccountId: 6,
          platformChannels: '头条1',
          createTime: '2019-04-05 09:09:09',
          advertisingAccountCode: '1234',
          advertisingAccountName: '123456',
          userName: '账户名1',
          operatorName: '13454567656',
          synchro: 1,
          mediaStatus: 1,
          disabled: 0,
        },
        {
          mediaAccountId: 7,
          platformChannels: '头条2',
          createTime: '2019-04-05 09:09:09',
          advertisingAccountCode: '1234',
          advertisingAccountName: '123456',
          userName: '账户名2',
          operatorName: '13454567656',
          synchro: 0,
          mediaStatus: 0,
          disabled: 1,
        },
      ],
    },
  },
  'POST /api/platform/customer/getSysdict': {
    msg: '操作成功',
    code: 'A00000',
    data: [
      { paramKey: 0, paramValue: '普通付费签约' },
      { paramKey: 1, paramValue: 'VIP1付费用户' },
      { paramKey: 2, paramValue: 'VIP2付费用户' },
      { paramKey: 3, paramValue: 'VIP3付费用户' },
      { paramKey: 4, paramValue: '关系户免费签约' },
      { paramKey: 5, paramValue: '自主广告投放' },
      { paramKey: 6, paramValue: '自营供货客户' },
    ],
  },
  'POST /api/platform/customer/editCustomer': {
    msg: '操作成功',
    code: 'A00000',
    data: null,
  },
  'POST /api/platform/customer/addCustomer': {
    msg: '操作成功',
    code: 'A00000',
    data: null,
  },
  'POST /api/platform/customer/isDisabled': {
    msg: '操作成功',
    code: 'A00000',
    data: null,
  },
  'POST /api/platform/customer/getAllCustomerList': {
    code: 'A00000',
    msg: '操作成功',
    data: {
      totalCount: 2,
      customerList: [
        {
          id: 1,
          customerCode: 'S15287',
          companyName: '深圳市凰朝科技有限公司1',
          advertisersType: '关系户免费签约',
          advertiser: '袁月华',
          customerName: '邱总',
          customerPhone: '15565656565',
          disabled: 0,
        },
        {
          id: 2,
          customerCode: 'S15288',
          companyName: '深圳市凰朝科技有限公司2',
          advertisersType: '关系户免费签约',
          advertiser: '袁月华',
          customerName: '邱总',
          customerPhone: '15565656565',
          disabled: 1,
        },
      ],
    },
  },
  'POST /api/platform/customer/customerLogInfo': {
    msg: '操作成功',
    code: 'A00000',
    data: {
      customerLogInfoVo: [
        {
          content: '新增客户 公司名称',
          createTime: '2019-04-15 11:44:17',
          id: 1,
          operatorName: 'zyc',
        },
        {
          content: '新增客户 公司名称2',
          createTime: '2019-04-16 11:44:17',
          id: 2,
          operatorName: 'zyc',
        },
      ],
      totalCount: 1,
    },
  },
  'POST /api/platform/customer/customerInfo': {
    msg: '操作成功',
    code: 'A00000',
    data: {
      customerId: 1,
      advertiser: '袁月华',
      advertisersType: 1,
      companyName: '深圳市凰朝科技有限公司test',
      shopName: '商铺',
      customerName: '邱总',
      customerPhone: '15565656565',
      wxServiceAccount: 'wxServiceAccount',
      wxPublicAccount: 'wxPublicAccount',
      havaPlatform: 1,
      afterSalesName: 'afterSalesName',
      afterSalesPhone: 'afterSalesPhone',
      afterSalesAddress: 'afterSalesAddress',
      technicalDirector: 'technicalDirector',
      technicalDirectorPhone: 'technicalDirectorPhone',
      operationDirector: 'operationDirector',
      operationDirectorPhone: 'operationDirectorPhone',
      remark: 'remark',
    },
  },
};

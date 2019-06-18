export default {
  'POST /api/report/getHistory': {
    code: 'A00000',
    msg: 'ok',
    data: [
      {
        id: '1',
        name: 'John Brown',
      },
      {
        id: '2',
        name: 'Jim Green',
      },
      {
        id: '3',
        name: 'Joe Black',
      },
    ]
  },

  'POST /api/report/downloadItem': {
    code: 'A00000',
    msg: 'ok',
    data: {}
  },

  'POST /api/report/deleteItem': {
    code: 'A00000',
    msg: 'ok',
    data: {}
  },

  'POST /api/report/getCarReportPackage': {
    code: 'A00000',
    msg: 'ok',
    data: {}
  },

  'POST /api/report/getChecCarReport': {
    code: 'A00000',
    msg: 'ok',
    data: {}
  },

  'POST /api/report/getCity': {
    code: 'A00000',
    msg: 'ok',
    data: [
      {
        id: 'zhejiang',
        cityName: 'Zhejiang',
        items: [
          {
            id: 'hangzhou',
            cityName: 'Hangzhou',
            items: [
              {
                id: 'xihu',
                cityName: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        id: 'jiangsu',
        cityName: 'Jiangsu',
        items: [
          {
            id: 'nanjing',
            cityName: 'Nanjing',
            items: [
              {
                id: 'zhonghuamen',
                cityName: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ],
  },
};

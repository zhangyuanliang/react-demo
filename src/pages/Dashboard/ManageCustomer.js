import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Table, Form, Input, Select, Modal, Divider, message, Card, Tooltip } from 'antd';
import moment from 'moment';
// import { Debounce, Bind } from 'lodash-decorators';
import debounce from 'lodash/debounce';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CustomerModal from '@/components/CustomerModal/index';
import IconFont from '@/components/IconFont';

import styles from './ManageCustomer.less';

const FormItem = Form.Item;
const { Search } = Input;
const InputGroup = Input.Group;
const { Option } = Select;
const { confirm } = Modal;

@connect(({ customer }) => ({
  customerList: customer.customerList,
  logList: customer.logList,
  editingCustomer: customer.editingCustomer,
  advertisersType: customer.advertisersType,
  mediaAccountList: customer.mediaAccountList,
  acountTypeList: customer.acountTypeList,
  platformChannels: customer.platformChannels,
  editingMediaAccount: customer.editingMediaAccount,
  memberList: customer.memberList,
}))
@Form.create()
class ManageCustomer extends Component {
  yesOrNo = [{ key: 0, value: '否' }, { key: 1, value: '是' }];

  columns = [
    {
      title: '客户ID',
      dataIndex: 'customerCode',
      key: 'customerCode',
      width: '12.5%',
    },
    {
      title: '公司名称',
      dataIndex: 'companyName',
      key: 'companyName',
      width: '12.5%',
    },
    {
      title: '广告客户类型',
      dataIndex: 'advertisersTypeStr',
      key: 'advertisersTypeStr',
      width: '12.5%',
    },
    {
      title: '广告销售人',
      dataIndex: 'advertiser',
      key: 'advertiser',
      width: '12.5%',
    },
    {
      title: '客户姓名',
      dataIndex: 'customerName',
      key: 'customerName',
      width: '12.5%',
    },
    {
      title: '客户电话',
      dataIndex: 'customerPhone',
      key: 'customerPhone',
      width: '12.5%',
    },
    {
      title: '广告渠道',
      dataIndex: 'adChannels',
      key: 'adChannels',
      width: '12.5%',
      render: arr => {
        return (
          <div>
            {arr.map(it => {
              return <div>{it}</div>;
            })}
          </div>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: '12.5%',
      render: (text, record) => {
        const { expandedRowKey } = this.state;
        return (
          <div>
            <div className={styles.flexV}>
              <div onClick={() => this.editCustomer(record)} className={styles.iconWrap}>
                <Tooltip placement="top" title="编辑" mouseEnterDelay={0.5}>
                  <a>
                    <IconFont type="icon-edit" />
                  </a>
                </Tooltip>
              </div>
              <Divider type="vertical" />
              <div onClick={() => this.lockModal(record)} className={styles.iconWrap}>
                <Tooltip
                  placement="top"
                  title={record.disabled ? '解锁' : '锁定'}
                  mouseEnterDelay={0.5}
                >
                  <a>
                    <IconFont
                      style={{ color: record.disabled ? 'red' : 'grey' }}
                      type="icon-unlock-noc"
                      className={styles.hoverCss}
                    />
                  </a>
                </Tooltip>
              </div>
            </div>
            <div>
              {expandedRowKey[0] === record.id ? (
                <a onClick={() => this.setExpandedState(false, record)} className={styles.upArrow}>
                  媒体账户
                </a>
              ) : (
                <a
                  onClick={() => this.setExpandedState(true, record)}
                  className={styles.rArrow}
                  style={{ color: '#303133' }}
                >
                  媒体账户
                </a>
              )}
            </div>
          </div>
        );
      },
    },
  ];

  childColumns = [
    {
      title: '平台渠道',
      dataIndex: 'platformChannels',
      key: 'platformChannels',
      width: '10%',
      render: key => {
        return <span style={{ fontSize: 13 }}>{this.getPlatformChannelsStr(key)}</span>;
      },
    },
    {
      title: '媒体账号',
      width: '16%',
      render: (text, record) => {
        const isMP = record.platformChannels === 'PLATFORM_CHANNELS_02';
        let el;
        if (isMP) {
          el = (
            <div style={{ fontSize: 13 }}>
              <div style={{ display: 'flex' }}>
                <span style={{ fontSize: 11, minWidth: 62 }}>服务商名：</span>
                <span>{record.agencyName}</span>
              </div>
              <div style={{ display: 'flex' }}>
                <span style={{ fontSize: 11, minWidth: 62 }}>原始ID：</span>
                <span>{record.wxOriginalId}</span>
              </div>
              <div style={{ display: 'flex' }}>
                <span style={{ fontSize: 11, minWidth: 62 }}>APP ID：</span>
                <span>{record.wxAppId}</span>
              </div>
              <div style={{ display: 'flex' }}>
                <span style={{ fontSize: 11, minWidth: 62 }}>微信号：</span>
                <span>{record.wxCode}</span>
              </div>
            </div>
          );
        } else {
          el = (
            <div style={{ fontSize: 13 }}>
              <div style={{ display: 'flex' }}>
                <span style={{ fontSize: 11, minWidth: 72 }}>广告账户名：</span>
                <span>{record.advertisingAccountName}</span>
              </div>
              <div style={{ display: 'flex' }}>
                <span style={{ fontSize: 11, minWidth: 72 }}>广告账户ID：</span>
                <span>{record.advertisingAccountCode}</span>
              </div>
              <div style={{ display: 'flex' }}>
                <span style={{ fontSize: 11, minWidth: 72 }}>广告账户：</span>
                <span>{record.userName}</span>
              </div>
            </div>
          );
        }
        return el;
      },
    },
    {
      title: '绑定时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: '12%',
      render: time => {
        return <span style={{ fontSize: 13 }}>{moment(time).format('YYYY-MM-DD')}</span>;
      },
    },
    {
      title: '广告运营人',
      dataIndex: 'operatorName',
      key: 'operatorName',
      width: '12%',
      render: text => {
        return <span style={{ fontSize: 13 }}>{text}</span>;
      },
    },
    // {
    //   title: '微信号',
    //   dataIndex: 'wxCode',
    //   key: 'wxCode',
    //   width: '8%',
    //   render: text => {
    //     return <span style={{ fontSize: 13 }}>{text}</span>;
    //   },
    // },
    {
      title: '状态显示',
      width: '13%',
      render: (text, record) => {
        const isSycFun = () => {
          let status = '';
          switch (record.platformChannels) {
            // case 'PLATFORM_CHANNELS_02': // MP
            //   status = '';
            //   break;
            case 'PLATFORM_CHANNELS_04': // 鲁班
              status = '已同步';
              break;
            default:
              status = record.refreshToken ? '已同步' : '未同步';
              break;
          }
          return status;
        };
        return (
          <div style={{ fontSize: 13 }}>
            <div>
              <span style={{ fontSize: 11 }}>订单同步：</span>
              <span>{isSycFun()}</span>
            </div>
            <div>
              <span style={{ fontSize: 11 }}>媒体状态：</span>
              <span>{isSycFun()}</span>
            </div>
          </div>
        );
      },
    },
    {
      title: '使用状态',
      dataIndex: 'disabled',
      key: 'disabled',
      width: '12%',
      render: text => {
        return text ? (
          <span style={{ color: '#E02C2D' }}>已停用</span>
        ) : (
          <span style={{ color: '#FFB41F' }}>已启用</span>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: '11%',
      render: (text, record) => {
        // const notMP = record.platformChannels !== 'PLATFORM_CHANNELS_02';
        const isLB = record.platformChannels === 'PLATFORM_CHANNELS_04';
        const isAuthorization = record.refreshToken !== null;
        return (
          <Fragment>
            <div>
              {record.disabled ? (
                <a onClick={() => this.isMediaDisabled(record, 0)} style={{ color: '#202020' }}>
                  启用
                </a>
              ) : (
                <a onClick={() => this.isMediaDisabled(record, 1)} style={{ color: '#202020' }}>
                  停用
                </a>
              )}
              <Divider type="vertical" />
              <a onClick={() => this.showBindAccount(false, record)} style={{ color: '#202020' }}>
                编辑
              </a>
            </div>
            {!isLB ? (
              <div>
                <a onClick={() => this.authorization(record)} style={{ color: '#E02C2D' }}>
                  {isAuthorization ? '已授权' : '授权'}
                </a>
              </div>
            ) : (
              ''
            )}
          </Fragment>
        );
      },
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      customerModalTitle: '',
      customerOrMedia: '1',
      searchField: '',
      selectedType: '',
      expandedRowKey: [],
      expandedCustomer: {},
      showCustModal: false,
      showBindAccountModal: false,
      isAddCustomer: false,
      isAddMediaAccount: false,
      bindSelectedPlatform: '',
      showQrModal: false,
      QrImg: '',
      loading: true,
      pagination: {
        showTotal: total => `共${total}条`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
      },
      logPagination: {
        total: 0,
        showTotal: total => `共${total || 0}条`,
        showSizeChanger: true,
        pageSize: 10,
        current: 1,
      },
    };
    this.bindAccountOk = debounce(this.bindAccountOk, 300);
  }

  componentDidMount() {
    this.getList();
    this.getAdvertisersType();
    this.getAcountTypeList();
    this.getPlatformChannels();
    this.getMemberList();
  }

  getAdverType = paramKey => {
    const { advertisersType } = this.props;
    const item = advertisersType.find(it => {
      return it.paramKey === paramKey;
    });
    return item.paramValue;
  };

  // 获取列表
  getList = () => {
    const { dispatch } = this.props;
    const {
      customerOrMedia,
      selectedType,
      searchField,
      pagination: { current: pageIndex, pageSize },
    } = this.state;
    const listQuery = {
      advertisersType: selectedType,
      // searchConditions: searchField,
      customerField: '',
      isOrderByNum: 0,
      mediaField: '',
      pageSize,
      pageIndex,
    };
    if (customerOrMedia === '1') {
      listQuery.customerField = searchField;
    } else {
      listQuery.mediaField = searchField;
    }

    dispatch({
      type: 'customer/fetch',
      payload: {
        ...listQuery,
      },
    }).then(res => {
      if (res.code === 'A00000') {
        const { pagination } = this.state;
        this.setState({
          pagination: {
            ...pagination,
            total: res.data.totalCount,
          },
          loading: false,
        });
      }
    });
  };

  getAdvertisersType = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/fetchAdvertisersType',
      payload: {
        keyType: 'ADVERTISERS_TYPE',
      },
    });
  };

  getAcountTypeList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/fetchAcountTypeList',
      payload: {
        keyType: 'ACOUNT_TYPE',
      },
    });
  };

  getPlatformChannels = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/fetchPlatformChannels',
      payload: {
        keyType: 'PLATFORM_CHANNELS',
      },
    });
  };

  getMemberList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/fetchMemberList',
      payload: {},
    });
  };

  getQrImg = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/fetchQrImg',
      payload: {},
    }).then(() => {
      setTimeout(() => {
        this.setState({
          QrImg: '/static/webWeixinQr.jpg',
          showQrModal: true,
        });
      }, 500);
    });
  };

  toggleCustModalState = isShow => {
    this.setState({
      showCustModal: isShow,
    });
  };

  handleTableChange = pagination => {
    this.setState(
      {
        pagination,
      },
      () => {
        this.getList();
      }
    );
  };

  queryMediaAccountList = record => {
    const { dispatch } = this.props;
    const { searchField, customerOrMedia } = this.state;
    // const searchConditions = searchField.trim() === '' ? null : searchField.trim();
    const listQuery = {
      customerId: record.id,
      // searchConditions,
    };
    if (customerOrMedia === '2') {
      listQuery.mediaField = searchField;
    } else {
      listQuery.mediaField = '';
    }
    dispatch({
      type: 'customer/fetchMediaAccountList',
      payload: listQuery,
    });
  };

  setExpandedState = (expanded, record) => {
    if (expanded) {
      this.queryMediaAccountList(record);
      this.setState({
        expandedRowKey: [record.id],
        expandedCustomer: record,
      });
    } else {
      this.setState({
        expandedRowKey: [],
        expandedCustomer: {},
      });
    }
  };

  expandedRowRender = () => {
    const { mediaAccountList } = this.props;
    return (
      <Card style={{ margin: '28px 0 0' }} bordered={false} bodyStyle={{ padding: 0 }}>
        <Table
          columns={this.childColumns}
          dataSource={mediaAccountList}
          pagination={false}
          rowKey={record => record.mediaAccountId}
          scroll={{ y: 240 }}
          style={{ wordBreak: 'break-all' }}
        />
        <div className={styles.bindAccount}>
          <button
            type="button"
            onClick={() => this.showBindAccount(true)}
            className={styles.bindBtn}
          >
            绑定账户
          </button>
        </div>
      </Card>
    );
  };

  handleSearch = e => {
    e.preventDefault();
  };

  emptyEditingCustomer = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/emptyEditingCustomer',
      payload: null,
    });
  };

  // 新增客户
  addCustomer = () => {
    this.emptyEditingCustomer();
    this.setState({
      customerModalTitle: '新增客户',
      showCustModal: true,
      isAddCustomer: true,
    });
  };

  // 编辑客户
  editCustomer = record => {
    this.getCustomerInfo(record.id);
    this.queryLogs(record.id);
    this.setState({
      customerModalTitle: record.companyName,
      showCustModal: true,
      isAddCustomer: false,
    });
  };

  getCustomerInfo = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/fetchCustomerInfo',
      payload: {
        customerId: id,
      },
    });
  };

  // 新增、编辑客户
  addOrUpdate = (values, modalForm) => {
    const { dispatch, editingCustomer } = this.props;
    const { isAddCustomer } = this.state;
    let type = 'customer/handleAddCustomer';
    const param = {
      ...values,
    };
    if (!isAddCustomer) {
      type = 'customer/handleEditCustomer';
      param.customerId = editingCustomer.customerId;
    }
    dispatch({
      type,
      payload: {
        ...param,
      },
    }).then(res => {
      if (res.code === 'A00000') {
        message.success(res.msg);
        this.setState({
          showCustModal: false,
        });
        this.getList();
        modalForm.resetFields();
      }
    });
  };

  queryLogs = customerId => {
    const { dispatch } = this.props;
    const { logPagination } = this.state;
    const listQuery = {
      customerId,
      pageIndex: logPagination.current,
      pageSize: logPagination.pageSize,
    };
    dispatch({
      type: 'customer/fetchLogList',
      payload: {
        ...listQuery,
      },
    }).then(res => {
      logPagination.total = res.data.totalCount;
      this.setState({
        logPagination,
      });
    });
  };

  handleTypesChange = value => {
    const { pagination } = this.state;
    this.setState(
      {
        selectedType: value,
        pagination: {
          ...pagination,
          pageSize: 10,
          current: 1,
        },
      },
      () => {
        this.getList();
      }
    );
  };

  onSearch = value => {
    this.setState(
      {
        searchField: value,
      },
      () => {
        this.getList();
      }
    );
  };

  handleSearchChange = e => {
    e.persist();
    clearTimeout(this.timeoutId);
    const { pagination } = this.state;
    const searchField = e.currentTarget.value.trim();
    this.setState(
      {
        searchField,
        pagination: {
          ...pagination,
          pageSize: 10,
          current: 1,
        },
      },
      () => {
        this.timeoutId = setTimeout(() => {
          this.getList();
        }, 500);
      }
    );
  };

  handleChange = e => {
    this.setState(
      {
        customerOrMedia: e,
        searchField: '',
      },
      () => {
        this.getList();
      }
    );
  };

  getFormSearch = () => {
    const { advertisersType = [] } = this.props;
    const { customerOrMedia, searchField } = this.state;
    return (
      <Form style={{ display: 'flex' }}>
        <Select
          allowClear
          onChange={this.handleTypesChange}
          placeholder="广告客户类型"
          className={styles.selectWidth}
        >
          {advertisersType.map(it => {
            return (
              <Option value={it.paramKey} key={it.paramKey}>
                {it.paramValue}
              </Option>
            );
          })}
        </Select>
        {/* <Search
          onSearch={this.onSearch}
          onChange={this.handleSearchChange}
          allowClear
          placeholder="搜索"
          className={styles.inputWidth}
        /> */}
        <InputGroup compact style={{ width: 350 }}>
          <Select defaultValue={customerOrMedia} onChange={this.handleChange}>
            <Option value="1">客户信息</Option>
            <Option value="2">媒体信息</Option>
          </Select>
          <Search
            onSearch={this.onSearch}
            onChange={this.handleSearchChange}
            value={searchField}
            allowClear
            placeholder="搜索"
            className={styles.inputWidth}
          />
        </InputGroup>
        <div>
          <a style={{ cursor: 'pointer' }} onClick={this.addCustomer} className={styles.plusImg}>
            <IconFont type="icon-add" />
            <span>新增客户</span>
          </a>
        </div>
      </Form>
    );
  };

  lockModal = record => {
    const { dispatch } = this.props;
    const that = this;
    const content = record.disabled ? '解锁' : '锁定';
    confirm({
      title: `${content}客户`,
      content: `确定要${content}${record.companyName}吗？`,
      okText: '确认',
      cancelText: '取消',
      centered: true,
      onOk() {
        dispatch({
          type: 'customer/handleIsDisabled',
          payload: {
            customerId: record.id,
            disabled: record.disabled === 1 ? 0 : 1,
          },
        }).then(res => {
          if (res.code === 'A00000') {
            message.success(res.msg);
            that.getList();
            const { expandedCustomer } = that.state;
            if (JSON.stringify(expandedCustomer) !== '{}') {
              that.setState({
                expandedRowKey: [],
              });
              // that.queryMediaAccountList(expandedCustomer);
            }
          }
        });
      },
      onCancel() {},
    });
  };

  changeBindPlatform = value => {
    this.getInfoByUserName(value);
    this.setState({
      bindSelectedPlatform: value,
    });
  };

  getMediaAccountInfo = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/fetchMediaAccountInfo',
      payload: {
        mediaAccountId: id,
      },
    });
  };

  emptyEditingMediaAccount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/emptyEditingMediaAccount',
      payload: null,
    });
  };

  // 新建、编辑媒体账户对话框
  showBindAccount = (isAdd = true, record = null) => {
    const { form } = this.props;
    if (this.isCustomerDisabled()) {
      message.warning('该媒体账户已锁定');
      return;
    }
    if (!isAdd) {
      this.changeBindPlatform(record.platformChannels);
      this.getMediaAccountInfo(record.mediaAccountId);
    } else {
      form.resetFields();
    }
    this.setState({
      showBindAccountModal: true,
      isAddMediaAccount: isAdd,
      // editingMediaAccount: record,
    });
  };

  // 新建、编辑媒体账户
  // @Bind()
  // @Debounce(500)
  bindAccountOk = e => {
    e.persist();
    const { form, dispatch } = this.props;
    const {
      expandedCustomer: { id },
      isAddMediaAccount,
    } = this.state;
    const { editingMediaAccount } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const param = {
          customerId: id,
          ...values,
        };
        let type = 'customer/handleAddMediaAccount';
        if (!isAddMediaAccount) {
          type = 'customer/handleEditMediaAccount';
          param.mediaAccountId = editingMediaAccount.mediaAccountId;
        }
        dispatch({
          type,
          payload: {
            ...param,
          },
        }).then(res => {
          if (res.code === 'A00000') {
            message.success(res.msg);
            this.setState({
              showBindAccountModal: false,
              bindSelectedPlatform: null,
            });
            form.resetFields();
            const { expandedCustomer } = this.state;
            this.queryMediaAccountList(expandedCustomer);
            this.emptyEditingMediaAccount();
          }
        });
      }
    });
  };

  bindAccountCancel = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      showBindAccountModal: false,
      bindSelectedPlatform: null,
    });
    this.emptyEditingMediaAccount();
  };

  // 启用、停用媒体账户
  isMediaDisabled = (record, disabled) => {
    if (this.isCustomerDisabled()) {
      message.warning('该媒体账户已锁定');
      return;
    }
    const { dispatch } = this.props;
    const { expandedCustomer } = this.state;
    const that = this;
    const content = record.disabled ? '启用' : '停用';
    const isMP = record.platformChannels === 'PLATFORM_CHANNELS_02';
    const name = isMP ? record.agencyName : record.advertisingAccountName;
    confirm({
      title: `${content}媒体账户`,
      content: `确定要${content}${name}账户吗？`,
      okText: '确认',
      cancelText: '取消',
      centered: true,
      onOk() {
        dispatch({
          type: 'customer/handleIsMediaDisabled',
          payload: {
            customerId: expandedCustomer.id,
            mediaAccountId: record.mediaAccountId,
            disabled,
          },
        }).then(res => {
          if (res.code === 'A00000') {
            message.success(res.msg);
            that.queryMediaAccountList(expandedCustomer);
          }
        });
      },
      onCancel() {},
    });
  };

  isCustomerDisabled = () => {
    const { expandedCustomer } = this.state;
    return expandedCustomer.disabled === 1;
  };

  handleChangePage = logPagination => {
    const { editingCustomer } = this.props;
    this.setState(
      {
        logPagination,
      },
      () => {
        this.queryLogs(editingCustomer.customerId);
      }
    );
  };

  getPlatformChannelsStr = key => {
    const obj = {
      PLATFORM_CHANNELS_01: '广点通',
      PLATFORM_CHANNELS_02: 'MP',
      PLATFORM_CHANNELS_03: '头条(巨量引擎)',
      PLATFORM_CHANNELS_04: '头条(鲁班)',
    };
    return obj[key];
  };

  authorization = record => {
    if (record.refreshToken) {
      message.warning('已授权');
      return;
    }
    let url = '';
    switch (record.platformChannels) {
      case 'PLATFORM_CHANNELS_01': // 广点通
        url =
          'https://developers.e.qq.com/oauth/authorize?client_id=1106503935&redirect_uri=http://bopsapi.madaomall.com/api/platform/qq/callback';
        break;
      case 'PLATFORM_CHANNELS_02': // MP
        this.wxCode = record.wxCode;
        this.getQrImg();
        break;
      case 'PLATFORM_CHANNELS_03': // 巨量引擎
        url =
          'https://ad.toutiao.com/openapi/audit/oauth.html?app_id=1629880193722376&state=your_custom_params&scope=%5B1%2C2%2C4%5D&redirect_uri=http%3A%2F%2Fbopsapi.madaomall.com%2Fapi%2Fplatform%2Foauth2%2Fcallback';
        break;
      case 'PLATFORM_CHANNELS_04': // 头条(鲁班)
        break;
      default:
        break;
    }
    if (url) {
      window.open(url);
    }
  };

  bindQrOk = () => {
    const { expandedCustomer } = this.state;
    // this.setExpandedState(true, expandedCustomer);
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/handleAuthMediaAccount',
      payload: {
        wxCode: this.wxCode,
      },
    }).then(() => {
      this.setExpandedState(true, expandedCustomer);
    });

    this.setState({
      showQrModal: false,
      QrImg: '',
    });
  };

  bindQrCancel = () => {
    // const { expandedCustomer } = this.state;
    // this.setExpandedState(true, expandedCustomer);
    this.setState({
      showQrModal: false,
      QrImg: '',
    });
  };

  getInfoByUserName = () => {
    const { form, dispatch } = this.props;
    const userName = form.getFieldProps('userName').value;
    const platformChannels = form.getFieldProps('platformChannels').value;
    if (platformChannels === 'PLATFORM_CHANNELS_02') {
      // MP
      dispatch({
        type: 'customer/fetchMediaAccountInfo',
        payload: {
          userName,
        },
      });
    }
  };

  render() {
    const {
      showCustModal,
      pagination,
      expandedRowKey,
      isAddCustomer,
      logPagination,
      loading,
      customerModalTitle,
    } = this.state;

    const { customerList, logList, editingCustomer, advertisersType } = this.props;

    const getBindAccountForm = () => {
      const { bindSelectedPlatform, isAddMediaAccount } = this.state;
      const {
        form: { getFieldDecorator },
        platformChannels,
        acountTypeList,
        memberList,
      } = this.props;
      let { editingMediaAccount } = this.props;
      editingMediaAccount = editingMediaAccount || {};
      const styleObj = { display: 'inline-block', width: 'calc(48% - 12px)' };
      const notMP = bindSelectedPlatform !== 'PLATFORM_CHANNELS_02';
      const isGDT = bindSelectedPlatform === 'PLATFORM_CHANNELS_01';
      // const isEditingMp = editingMediaAccount.platformChannels === 'PLATFORM_CHANNELS_02';
      // const disableOperatorId = isEditingMp && bindSelectedPlatform === 'PLATFORM_CHANNELS_02';
      const getAppItem = () => {
        let appItem = '';
        if (bindSelectedPlatform === 'PLATFORM_CHANNELS_04') {
          appItem = (
            <Fragment>
              <FormItem label="Appkey" style={styleObj}>
                {getFieldDecorator('appKey', {
                  rules: [{ required: true, message: '请输入!' }],
                  initialValue: editingMediaAccount.appKey,
                })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
              </FormItem>
              <FormItem label="Appsecret" style={styleObj}>
                {getFieldDecorator('appSecret', {
                  rules: [{ required: true, message: '请输入!' }],
                  initialValue: editingMediaAccount.appSecret,
                })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
              </FormItem>
            </Fragment>
          );
        }
        return appItem;
      };
      const getAccountItems = () => {
        let accountItems = '';
        if (notMP) {
          accountItems = (
            <Fragment>
              <FormItem label="广告账户ID" style={styleObj}>
                {getFieldDecorator('advertisingAccountCode', {
                  rules: [{ required: notMP, message: '请输入!' }],
                  initialValue: editingMediaAccount.advertisingAccountCode,
                })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
              </FormItem>
              <FormItem label="广告账户" style={styleObj}>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入!' }],
                  initialValue: editingMediaAccount.userName,
                })(
                  <Input
                    // onBlur={() => this.getInfoByUserName()}
                    allowClear
                    placeholder="请输入"
                    style={{ width: 180 }}
                  />
                )}
              </FormItem>
              <FormItem label="账户密码" style={styleObj}>
                {getFieldDecorator('passWord', {
                  rules: [{ required: !isGDT && notMP, message: '请输入!' }],
                  initialValue: editingMediaAccount.passWord,
                })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
              </FormItem>
              <FormItem label="广告账户名" style={styleObj}>
                {getFieldDecorator('advertisingAccountName', {
                  rules: [{ required: true, message: '请输入!' }],
                  initialValue: editingMediaAccount.advertisingAccountName,
                })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
              </FormItem>
            </Fragment>
          );
        } else {
          // 服务商名、原始ID、APPID
          accountItems = (
            <Fragment>
              <FormItem label="服务商名" style={styleObj}>
                {getFieldDecorator('agencyName', {
                  rules: [{ required: true, message: '请输入!' }],
                  initialValue: editingMediaAccount.agencyName,
                })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
              </FormItem>
              <FormItem label="原始ID" style={styleObj}>
                {getFieldDecorator('wxOriginalId', {
                  rules: [{ required: true, message: '请输入!' }],
                  initialValue: editingMediaAccount.wxOriginalId,
                })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
              </FormItem>
              <FormItem label="APP ID" style={styleObj}>
                {getFieldDecorator('wxAppId', {
                  rules: [{ required: true, message: '请输入!' }],
                  initialValue: editingMediaAccount.wxAppId,
                })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
              </FormItem>
            </Fragment>
          );
        }
        return accountItems;
      };
      return (
        <Form layout="inline" labelCol={{ span: 9 }} wrapperCol={{ span: 14 }}>
          <FormItem label="平台渠道" style={styleObj}>
            {getFieldDecorator('platformChannels', {
              rules: [{ required: true, message: '请输入!' }],
              initialValue: editingMediaAccount.platformChannels,
            })(
              <Select
                allowClear
                onChange={this.changeBindPlatform}
                disabled={!isAddMediaAccount}
                placeholder="请选择"
                style={{ width: 180 }}
              >
                {platformChannels.map(it => {
                  return (
                    <Option value={it.paramKey} key={it.paramKey}>
                      {it.paramValue}
                    </Option>
                  );
                })}
              </Select>
            )}
          </FormItem>
          {getAppItem()}
          {getAccountItems()}
          {notMP ? (
            ''
          ) : (
            <FormItem label="微信号" style={styleObj}>
              {getFieldDecorator('wxCode', {
                rules: [{ required: true, message: '请输入!' }],
                initialValue: editingMediaAccount.wxCode,
              })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
            </FormItem>
          )}
          <FormItem label="账户类型" style={styleObj}>
            {getFieldDecorator('acountType', {
              rules: [{ required: true, message: '请选择!' }],
              initialValue: editingMediaAccount.acountType,
            })(
              <Select allowClear placeholder="请选择" style={{ width: 180 }}>
                {acountTypeList.map(it => {
                  return (
                    <Option value={it.paramKey} key={it.paramKey}>
                      {it.paramValue}
                    </Option>
                  );
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="广告运营人" style={styleObj}>
            {getFieldDecorator('operatorId', {
              rules: [{ required: false, message: '请选择!' }],
              initialValue: editingMediaAccount.operatorId,
            })(
              <Select
                // disabled={disableOperatorId}
                allowClear
                placeholder="请选择"
                style={{ width: 180 }}
              >
                {memberList.map(it => {
                  return (
                    <Option value={it.operatorId} key={it.operatorId}>
                      {it.operatorName}
                    </Option>
                  );
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="是否套户" style={styleObj}>
            {getFieldDecorator('isToParaphrase', {
              rules: [{ required: true, message: '请选择!' }],
              initialValue: editingMediaAccount.isToParaphrase,
            })(
              <Select allowClear placeholder="请选择" style={{ width: 180 }}>
                <Option value={0} key={0}>
                  未套户
                </Option>
                <Option value={1} key={1}>
                  套户
                </Option>
              </Select>
            )}
          </FormItem>
        </Form>
      );
    };

    // 绑定媒体账户
    const getBindAccountModal = () => {
      const { showBindAccountModal, isAddMediaAccount } = this.state;
      return (
        <Modal
          title={isAddMediaAccount ? '绑定账户' : '修改账户'}
          centered
          visible={showBindAccountModal}
          onOk={this.bindAccountOk}
          onCancel={this.bindAccountCancel}
          width={662}
        >
          {getBindAccountForm()}
        </Modal>
      );
    };

    // MP授权
    const getQr = () => {
      const { showQrModal, QrImg } = this.state;
      return (
        <Modal
          title="二维码"
          centered
          visible={showQrModal}
          onOk={this.bindQrOk}
          onCancel={this.bindQrCancel}
          width={662}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={QrImg} alt="" style={{ width: 250, height: 250 }} />
          </div>
        </Modal>
      );
    };

    return (
      <PageHeaderWrapper hiddenBreadcrumb wrapperClassName="noTitle" content={this.getFormSearch()}>
        <Card style={{ margin: '28px 0 0' }} bordered={false} bodyStyle={{ padding: 0 }}>
          <Table
            dataSource={customerList}
            columns={this.columns}
            rowKey={record => record.id}
            expandedRowRender={this.expandedRowRender}
            expandedRowKeys={expandedRowKey}
            // onExpandedRowsChange={this.expandedRowsChange}
            // onExpand={(expanded, record) => this.expandedRowsChange(record)}
            pagination={pagination}
            onChange={this.handleTableChange}
            onShowSizeChange={this.handleTableChange}
            loading={loading}
          />
        </Card>
        <CustomerModal
          title={customerModalTitle}
          showCustModal={showCustModal}
          isAddCustomer={isAddCustomer}
          changeState={this.toggleCustModalState}
          handleOk={this.addOrUpdate}
          customerObj={editingCustomer}
          logList={logList}
          advertisersType={advertisersType}
          logPagination={logPagination}
          changePage={this.handleChangePage}
          // sizeChange={this.handleSizeChange}
        />
        {getBindAccountModal()}
        {getQr()}
      </PageHeaderWrapper>
    );
  }
}

export default ManageCustomer;

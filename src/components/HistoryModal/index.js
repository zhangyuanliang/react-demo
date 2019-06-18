import React, { PureComponent, Component } from 'react';
import { connect } from 'dva';
import { Modal, Pagination, Table, Divider, DatePicker, Input, Button, Spin, message } from 'antd';

import moment from 'moment';

const { confirm } = Modal;
const { RangePicker } = DatePicker;

@connect(({ home }) => ({
  historyList: home.historyList,
}))
class HistoryModal extends Component {

  columns = [
    {
      title: '文件名',
      dataIndex: 'zipName',
      key: 'zipName',
      render: text => <span>{text}</span>,
    },
    {
      title: '导入人',
      dataIndex: 'importPeople',
      key: 'importPeople',
      render: text => <span>{text}</span>,
    },
    {
      title: '创建日期',
      dataIndex: 'createTime',
      key: 'createTime',
      render: time => <span>{moment(new Date(Date.parse(time))).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={(e) => this.download(record)}>下载</a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={(e) => this.delItem(record)}>删除</a>
        </span>
      ),
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      endTime: null,
      searchField: null,
      modalLoading: false,
      pagination: {
        showTotal: total => `共${total}条`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
      },
    }
  }

  componentDidMount() {
    // this.getHistoryData();
  }

  getHistoryData = () => {
    const { dispatch } = this.props;
    const {
      searchField: importPeople,
      startTime,
      endTime,
      pagination: { current: pageIndex, pageSize },
    } = this.state;
    const listQuery = {
      importPeople: importPeople === '' ? null : importPeople,
      startTime: startTime === '' ? null : startTime,
      endTime: endTime === '' ? null : endTime,
      pageSize,
      pageIndex,
    };
    dispatch({
      type: 'home/fetchHistory',
      payload: {
        ...listQuery
      },
    });
  }

  download = (record) => {
    const { dispatch } = this.props;
    this.setState({
      modalLoading: true,
    })
    dispatch({
      type: 'home/downItem',
      payload: {
        id: record.id
      },
    }).then(blob => {
      if (blob instanceof Blob) {
        const a = document.createElement('a');
        const fileName = `车检报告${moment(new Date()).format('YYYY-MM-DD')}`;
        a.href = URL.createObjectURL(blob);
        a.download = `${fileName}.zip`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
      this.setState({
        modalLoading: false,
      })
    })
  }

  delItem = (record) => {
    const { dispatch } = this.props;
    const _this = this
    confirm({
      title: `确认`,
      content: `确定要删除${record.zipName}吗？`,
      okText: '确认',
      cancelText: '取消',
      centered: true,
      onOk() {
        dispatch({
          type: 'home/delItem',
          payload: {
            id : record.id
          },
        }).then(res => {
          if (res.code === 'A00000') {
            message.success('删除成功')
            _this.getHistoryData()
          }
        })
      },
      onCancel() {},
    });
  }

  handleTableChange = pagination => {
    this.setState(
      {
        pagination,
      },
      () => {
        this.getHistoryData();
      }
    );
  };

  onChangeDate = (date, dateString) => {
    this.setState(
      {
        startTime: `${dateString[0]} 00:00:00`,
        endTime: `${dateString[1]} 23:59:59`,
      }
    );
  };

  changeSearchField = (e) => {
    this.setState({ 
      searchField: e.currentTarget.value.trim(),
    });
  }



  addOk = e => {
    const { toggleModal } = this.props
    toggleModal()
    this.setState(
      {
        startTime: null,
        endTime: null,
        searchField: undefined
      },
    );
    
  };

  addCancel = () => {
    const { toggleModal } = this.props
    toggleModal()
    this.setState(
      {
        startTime: null,
        endTime: null,
        searchField: undefined
      },
    );
  };

  render() {
    const { showHistoryModal, historyList } = this.props
    const { pagination, searchField, modalLoading } = this.state
    return (
      <Modal
        title="历史数据"
        centered
        visible={showHistoryModal}
        onOk={this.addOk}
        onCancel={this.addCancel}
        destroyOnClose={true}
        width={700}
      >
        <Spin tip="下载中，请稍后..." spinning={modalLoading}>
          <RangePicker onChange={(date, dateString) => this.onChangeDate(date, dateString)} style={{marginBottom: 20, marginRight: 20}}/>
          <Input 
            placeholder="导入人"
            value={searchField}
            onChange={this.changeSearchField} 
            style={{width: 180, marginRight: 20}}
            allowClear
          />
          <Button onClick={() => this.getHistoryData()} type="primary">搜索</Button>
          <Table 
            columns={this.columns} 
            dataSource={historyList} 
            rowKey={record => record.id}
            pagination={pagination}
            onChange={this.handleTableChange}
            onShowSizeChange={this.handleTableChange}
          />
        </Spin>
      </Modal>
    );
  }
}

export default HistoryModal;

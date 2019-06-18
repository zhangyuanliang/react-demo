import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import Bind from 'lodash-decorators/bind';
import Debounce from 'lodash-decorators/debounce';

import styles from './Home.less';
import { Cascader, Upload, message, Button, Icon, DatePicker, Select, Form, Spin, Alert, Input, Modal,
  Pagination, Table, Divider } from 'antd';

import PercentageItem from '@/components/PercentageItem';
import HistoryModal from '@/components/HistoryModal/index';

@connect(({ home }) => ({
  cities: home.cities,
}))
@Form.create()
class Home extends Component {

  columns = [
    {
      title: '文件名',
      dataIndex: 'zipName',
      key: 'zipName',
      render: text => <a href="javascript:;">{text}</a>,
    },
    {
      title: '导入人',
      dataIndex: 'importPeople',
      key: 'importPeople',
      render: text => <a href="javascript:;">{text}</a>,
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
      city: undefined,
      hasGenerate: false,
      canExport: false,
      loading: false,
      spanTip: '',
      disabledBtn: false,
      uploadInfo: '',
      uploadProps: {
        name: 'file',
        accept: '.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        fileList: [],
        data: {
          cityId: null,
          importPeople: null
        },
      },
      arr: [
        { date: null, percentage: 1 },
      ],
      showHistoryModal: false,
      importPeople: null,

      startTime: null,
      endTime: null,
      searchField: null,
      pagination: {
        showTotal: total => `共${total}条`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
      },
    };
  }

  componentDidMount() {
    this.getCities();
  }

  checkCity = () => {
    const { city, importPeople } = this.state
    if (!importPeople) {
      message.warn('请填写导入人')
      return false
    }
    if (!city) {
      message.warn('请选择城市')
      return false
    }
  }

  changeFile = (info) => {
    const { city, uploadProps } = this.state
    let fileList = []
    if (!city) {
      message.error(`请选择城市`);
    } else {
      fileList = [info.file]
      this.setState({
        uploadProps: {
          ...uploadProps,
          fileList
        }
      }, () => {
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 文件上传成功`);
          this.setState({
            canExport: true,
            hasGenerate: false,
            uploadInfo: info.file.response.data.msg,
            reportVersion: info.file.response.data.reportVersion
          })
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 文件上传失败`);
        }
      })
    }
  }

  exportXls = () => {
    this.hasErrorInfo().then(() => {
      const { dispatch } = this.props;
      dispatch({
        type: 'home/export',
        payload: {},
      }).then(blob => {
        if (blob instanceof Blob) {
          const a = document.createElement('a');
          const fileName = `错误数据${moment(new Date()).format('YYYY-MM-DD')}`;
          a.href = URL.createObjectURL(blob);
          a.download = `${fileName}.xls`;
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          a.remove();
        }
      })
    })
  }

  removeFile = (file) => {
    const { uploadProps } = this.state
    this.setState({
      uploadProps: {
        ...uploadProps,
        fileList: [],
      },
      uploadInfo: ''
    })
  }

  getCities = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetchCities',
      payload: {},
    });
  }

  changeCity = (value) => {
    const { uploadProps, importPeople } = this.state
    this.setState({ 
      city: value.length ? value : undefined,
      uploadProps: {
        ...uploadProps,
        data: {
          cityId: value,
          importPeople
        }
      }
    });
  }

  changeImportPeople = (e) => {
    const { city, uploadProps } = this.state
    const importPeople = e.currentTarget.value.trim()
    this.setState({ 
      importPeople,
      uploadProps: {
        ...uploadProps,
        data: {
          cityId: city,
          importPeople
        }
      }
    });
  }

  isFull = () => {
    const { arr } = this.state
    let percentage = 0
    arr.forEach(it => {
      percentage += it.percentage
    })
    return percentage >= 100
  }

  changeIsFull = (index, val) => {
    let percentage = 0
    const { arr } = this.state
    arr.forEach((it, i) => {
      percentage += index === i ? val : it.percentage
    })
    return percentage > 100
  }

  addArr = () => {
    const { arr } = this.state
    if (!this.isFull()) {
      this.setState({
        arr: [
          ...arr,
          { date: null, percentage: 1 },
        ]
      })
    } else {
      message.warn('比例超出100%')
    }
  }

  removeArr = (index) => {
    const { arr } = this.state
    if (arr.length !== 1) {
      arr.splice(index, 1)
      this.setState({
        arr
      })
    }
  }

  changePer = (index, val) => {
    if (!this.changeIsFull(index, val)) {
      const { arr } = this.state
      arr[index].percentage = val || 1
      this.setState({
        arr
      })
    } else {
      message.warn('比例超出100%')
    }
  }

  hasDate = val => {
    const { arr } = this.state
    return arr.find(it => {
      return moment(it.date).format('YYYY:MM:DD') === moment(val).format('YYYY:MM:DD')
    })
  }

  changDate = (index, val) => {
    if (this.hasDate(val)) {
      message.warn('日期已存在')
    } else {
      const { arr } = this.state
      arr[index].date = val
      this.setState({
        arr
      })
    }
  }

  validate = () => {
    const { arr } = this.state
    const noDate = arr.find(it => {
      return !it.date
    })
    if (noDate) {
      message.warn('请填写日期')
      return false
    }
    const full = this.isFull()
    if (!full) {
      message.warn('比例不足100%')
      return false
    }
    return true
  }

  toReport = () => {
    if (this.validate()) {
      this.setState({
        loading: true
      })
      const { dispatch } = this.props;
      const { arr, reportVersion } = this.state
      const list = arr.map(it => {
        return {
          checkTime: moment(it.date).format('YYYY-MM-DD'),
          proportion: it.percentage
        }
      })
      dispatch({
        type: 'home/generateReport',
        payload: {
          checkReportRequestList: list,
          reportVersion
        },
      }).then(res => {
        if (res.code === 'A00000') {
          message.success('已生成报告')
          this.setState({
            hasGenerate: true,
            reportVersion: res.data.reportVersion
          })
        }
        this.setState({
          loading: false
        })
      })
    }
  }

  @Bind()
  @Debounce(2000)
  downReport() {
    const { dispatch } = this.props;
    const { importPeople, reportVersion } = this.state
    this.setState({
      loading: true,
      disabledBtn: true,
      spanTip: '下载中，请稍后...'
    }, () => {
      dispatch({
        type: 'home/downloadReport',
        payload: {
          importPeople,
          reportVersion
        },
      }).then(blob => {
        this.setState({
          loading: false,
          disabledBtn: false,
          spanTip: '',
          hasGenerate: false
        })
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
        location.reload()
      });
    })
  }

  hasErrorInfo() {
    return new Promise(resolve => {
      const { dispatch } = this.props;
      dispatch({
        type: 'home/hasErrorInfo',
        payload: {},
      }).then(res => {
        if (res.code === 'A00003') {
          message.warn(res.msg)
        }
        if (res.code === 'A00000') {
          resolve(true)
        }
      })
    })
  }

  getHistoryListInit = () => {
    const { dispatch } = this.props;
    const listQuery = {
      importPeople: null,
      startTime: null,
      endTime: null,
      pageSize: 10,
      pageIndex: 1,
    };
    dispatch({
      type: 'home/fetchHistory',
      payload: {
        ...listQuery
      },
    });
  }

  showHistory() {
    this.setState({
      showHistoryModal: true
    }, () => {
      this.getHistoryListInit()
    })
  }

  toggleHistoryModal = () => {
    const { showHistoryModal } = this.state
    this.setState({
      showHistoryModal: !showHistoryModal
    })
  }

  render() {
    const { 
      cities, 
      historyList,
      form: { getFieldDecorator },
    } = this.props
    const { 
      fileList, 
      uploadProps, 
      arr, 
      hasGenerate, 
      city, 
      canExport, 
      loading, 
      disabledBtn, 
      spanTip, 
      uploadInfo, 
      showHistoryModal,
      importPeople,
    } = this.state

    return (
      <Spin spinning={loading} delay={500} tip={spanTip}>
        <div className={styles.content}>
          <div style={{marginLeft: 200, width: 800}}>
            <div style={{marginBottom: 10, width: '74%', fontSize: 13, color: 'red'}}>{uploadInfo}</div>
            <Form>
              <div className={styles.line} style={{width: 800}}>
                <div className={styles.item} style={{position: 'relative'}}>
                  <span style={{position: 'absolute', top: 6, left: -8, color: 'red', marginRight: 4}}>*</span>导入人：
                  <Input 
                    placeholder="请输入"
                    value={importPeople}
                    onChange={this.changeImportPeople} 
                    style={{width: 180}}
                    allowClear
                  />
                </div>
                <div className={styles.item} style={{position: 'relative'}}>
                  <span style={{position: 'absolute', top: 6, left: -8, color: 'red', marginRight: 4}}>*</span>城市：
                  <Cascader
                    fieldNames={{ label: 'cityName', value: 'id', children: 'items' }}
                    options={cities}
                    value={city}
                    onChange={this.changeCity}
                    placeholder="选择城市"
                    style={{width: 180}}
                    allowClear
                  />
                </div>
                <div style={{position: 'relative', width: 225}}>
                  <Upload disabled={city === undefined || importPeople === ''} fileList={fileList} onChange={this.changeFile} onRemove={this.removeFile} {...uploadProps}>
                    <Button onClick={() => this.checkCity()}>
                      <Icon type="upload" /> 上传文件
                    </Button>
                  </Upload>
                  {
                    canExport? (
                      <span style={{position: 'absolute', top: 0, right: -23}}>
                        <Button onClick={this.exportXls} type="primary">下载错误数据</Button>
                      </span>
                    ) : ''
                  }
                </div>
              </div>
            </Form>
            {
              arr.map((it, index) => {
                return (
                  <PercentageItem
                    item={it}
                    index={index}
                    handleChangeDate={this.changDate}
                    handleChange={this.changePer}
                    handleAdd={this.addArr} 
                    handleRemove={this.removeArr}
                    showAdd={arr.length - 1 === index}
                    onlyOne={arr.length === 1}
                    key={index.toString()}
                  ></PercentageItem>
                )
              })
            }
            <div className={styles.line}>
              <div style={{marginTop: 20, marginRight: 20}}>
                <Button onClick={() => this.showHistory()} type="primary">历史报告</Button>
              </div>
              
              <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: 20}}>
                {
                  hasGenerate ? (
                    <Button disabled={disabledBtn} onClick={() => this.downReport()} type="primary">下载报告</Button>
                  ) : (
                    <Button onClick={this.toReport} type="primary">生成报告</Button>
                  )
                }
              </div>
            </div>
          </div>
        </div>
        <HistoryModal 
          showHistoryModal={showHistoryModal}
          toggleModal={() => this.toggleHistoryModal()}
        ></HistoryModal>
      </Spin>
    );
  }
}

export default Home;

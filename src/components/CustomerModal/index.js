import React, { PureComponent } from 'react';
import { Form, Modal, Tabs, Input, Select, Divider, Pagination } from 'antd';
import debounce from 'lodash/debounce';
import LogList from '../LogList/index';

// import { Debounce, Bind } from 'lodash-decorators';

const { TabPane } = Tabs;
const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

@Form.create()
class CustomerModal extends PureComponent {
  isPlatform = [{ key: 0, value: '是' }, { key: 1, value: '否' }];

  constructor(props) {
    super(props);
    this.addOk = debounce(this.addOk, 300);
  }

  // @Bind()
  // @Debounce(500)
  addOk = e => {
    e.persist();
    e.preventDefault();
    const { form, handleOk } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        handleOk(values, form);
      }
      // if (isAddCustomer) {
      // form.resetFields();
      // }
      // setTimeout(() => {
      //   form.resetFields();
      // }, 1000);
    });
  };

  addCancel = () => {
    const { changeState } = this.props;
    const { form } = this.props;
    form.resetFields();
    changeState(false);
  };

  onChangePage = (page, pageSize) => {
    const { changePage, logPagination } = this.props;
    logPagination.current = page;
    logPagination.pageSize = pageSize;
    changePage(logPagination);
  };

  onShowSizeChange = (current, pageSize) => {
    const { changePage, logPagination } = this.props;
    logPagination.current = 1;
    logPagination.pageSize = pageSize;
    changePage(logPagination);
  };

  render() {
    const {
      form: { getFieldDecorator },
      logList,
      showCustModal,
      title,
      isAddCustomer = false,
      advertisersType = [],
    } = this.props;
    let { customerObj } = this.props;
    customerObj = customerObj || {};

    const getFormContent = () => {
      const styleObj = { display: 'inline-block', width: 'calc(48% - 12px)' };
      return (
        <Form layout="inline" labelCol={{ span: 9 }} wrapperCol={{ span: 14 }}>
          <FormItem label="广告销售人" style={styleObj}>
            {getFieldDecorator('advertiser', {
              rules: [{ required: true, message: '请输入!' }],
              initialValue: customerObj.advertiser,
            })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
          </FormItem>
          <FormItem label="广告客户类型" style={styleObj}>
            {getFieldDecorator('advertisersType', {
              rules: [{ required: true, message: '请输入!' }],
              initialValue: customerObj.advertisersType,
            })(
              <Select allowClear placeholder="请选择" style={{ width: 180 }}>
                {advertisersType.map(it => {
                  return (
                    <Option value={it.paramKey} key={it.paramKey}>
                      {it.paramValue}
                    </Option>
                  );
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="公司名称" style={styleObj}>
            {getFieldDecorator('companyName', {
              rules: [{ required: true, message: '请输入!' }],
              initialValue: customerObj.companyName,
            })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
          </FormItem>
          <FormItem label="商铺名称" style={styleObj}>
            {getFieldDecorator('shopName', {
              rules: [{ required: true, message: '请输入!' }],
              initialValue: customerObj.shopName,
            })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
          </FormItem>
          <FormItem label="客户名称" style={styleObj}>
            {getFieldDecorator('customerName', {
              rules: [{ required: true, message: '请输入!' }],
              initialValue: customerObj.customerName,
            })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
          </FormItem>
          <FormItem label="客户电话" style={styleObj}>
            {getFieldDecorator('customerPhone', {
              rules: [{ required: true, message: '请输入!' }],
              initialValue: customerObj.customerPhone,
            })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
          </FormItem>
          <Divider dashed />
          <FormItem label="微信客服账号" style={styleObj}>
            {getFieldDecorator('wxServiceAccount', {
              initialValue: customerObj.wxServiceAccount,
            })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
          </FormItem>
          {/* <FormItem label="App ID" style={styleObj}>
            {getFieldDecorator('wxAppId', {
              initialValue: customerObj.wxAppId,
            })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
          </FormItem>
          <FormItem label="原始ID" style={styleObj}>
            {getFieldDecorator('wxOriginalId', {
              initialValue: customerObj.wxOriginalId,
            })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
          </FormItem> */}
          {/* <FormItem label="京东商家编码" style={styleObj}>
            {getFieldDecorator('wxOriginalId', {
              initialValue: customerObj.wxOriginalId,
            })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
          </FormItem> */}
          <FormItem label="售后联系人姓名" style={styleObj}>
            {getFieldDecorator('afterSalesName', {
              initialValue: customerObj.afterSalesName,
            })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
          </FormItem>
          <FormItem label="售后联系人电话" style={styleObj}>
            {getFieldDecorator('afterSalesPhone', {
              initialValue: customerObj.afterSalesPhone,
            })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
          </FormItem>
          <FormItem label="售后退货地址" style={styleObj}>
            {getFieldDecorator('afterSalesAddress', {
              initialValue: customerObj.afterSalesAddress,
            })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
          </FormItem>
          <FormItem label="是否有平台" style={styleObj}>
            {getFieldDecorator('havaPlatform', {
              rules: [{ required: false, message: '请选择' }],
              initialValue: customerObj.havaPlatform,
            })(
              <Select allowClear placeholder="请选择" style={{ width: 180 }}>
                {this.isPlatform.map(it => {
                  return (
                    <Option value={it.key} key={it.key}>
                      {it.value}
                    </Option>
                  );
                })}
              </Select>
            )}
          </FormItem>
          <Divider dashed />
          <FormItem label="技术负责人" style={styleObj}>
            {getFieldDecorator('technicalDirector', {
              initialValue: customerObj.technicalDirector,
            })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
          </FormItem>
          <FormItem label="技术负责人电话" style={styleObj}>
            {getFieldDecorator('technicalDirectorPhone', {
              initialValue: customerObj.technicalDirectorPhone,
            })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
          </FormItem>
          <FormItem label="运营负责人" style={styleObj}>
            {getFieldDecorator('operationDirector', {
              initialValue: customerObj.operationDirector,
            })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
          </FormItem>
          <FormItem label="运营负责人电话" style={styleObj}>
            {getFieldDecorator('operationDirectorPhone', {
              initialValue: customerObj.operationDirectorPhone,
            })(<Input allowClear placeholder="请输入" style={{ width: 180 }} />)}
          </FormItem>
          <FormItem layout="horizontal">
            {getFieldDecorator('remark', {
              initialValue: customerObj.remark,
            })(
              <TextArea
                placeholder="备注"
                className="custom"
                style={{ width: 1000, height: 50, marginTop: 22, marginLeft: 20 }}
              />
            )}
          </FormItem>
        </Form>
      );
    };

    const getModalContent = () => {
      const { logPagination } = this.props;
      return isAddCustomer ? (
        getFormContent()
      ) : (
        <div style={{ marginTop: '-24px' }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="客户信息" key="1">
              {getFormContent()}
            </TabPane>
            <TabPane tab="操作日志" key="2">
              <LogList list={logList} />
              <div style={{ padding: 10, float: 'right' }}>
                <Pagination
                  {...logPagination}
                  onChange={this.onChangePage}
                  onShowSizeChange={this.onShowSizeChange}
                />
              </div>
            </TabPane>
          </Tabs>
        </div>
      );
    };
    return (
      <Modal
        title={title}
        centered
        visible={showCustModal}
        onOk={this.addOk}
        onCancel={this.addCancel}
        width={700}
      >
        {getModalContent()}
      </Modal>
    );
  }
}

export default CustomerModal;

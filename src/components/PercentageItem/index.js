import React, { PureComponent, Component } from 'react';

import styles from './index.less';
import { Button, Icon, DatePicker, Select, InputNumber } from 'antd';

const { Option } = Select;

export default class PercentageItem extends Component {

  percentage = [
    { key: 10, value: '10%' },
    { key: 20, value: '20%' },
    { key: 30, value: '30%' },
    { key: 40, value: '40%' },
    { key: 50, value: '50%' },
    { key: 60, value: '60%' },
    { key: 70, value: '70%' },
    { key: 80, value: '80%' },
    { key: 90, value: '90%' },
    { key: 100, value: '100%' },
  ]

  constructor(props) {
    super(props);
    this.state = {
      // val: undefined
    }
  }

  changeDate = (value) => {
    const { index, handleChangeDate } = this.props
    handleChangeDate(index, value)
  }
  
  isDisabledDate = (current) => {
    // const now = Date.now();
    // return current._d && (current._d.getTime() < now);
  }

  changeSelect = (value) => {
    const { index, handleChange, item } = this.props
    handleChange(index, value)
  }

  clickAdd = () => {
    const { handleAdd } = this.props
    handleAdd()
  }

  clickRemove = () => {
    const { handleRemove, index } = this.props
    handleRemove(index)
  }
  
  render() {
    const { item, index, showAdd, onlyOne } = this.props;
    return (
      <div className={styles.line}>
        <div style={{display: 'flex'}}>
          <div className={styles.item}>
            <span style={{display: 'inline-block', width: 56}}>日期：</span>
            <DatePicker value={item.date} onChange={this.changeDate} disabledDate={this.isDisabledDate} style={{ width: 180 }} allowClear />
          </div>
          <div>
            比例：
            {/* <Select value={item.percentage} onChange={this.changeSelect} placeholder="请选择" style={{ width: 180 }}>
              {
                this.percentage.map(it => {
                  return (
                    <Option value={it.key} key={it.key.toString()}>{it.value}</Option>
                  )
                })
              }
            </Select> */}
            <InputNumber
              value={item.percentage}
              min={1}
              max={100}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
              onChange={this.changeSelect}
            />
          </div>
        </div>
        {
          onlyOne ?  '' : (
            <div className={styles.removeBtn}>
              <Button onClick={this.clickRemove} shape="circle" icon="minus" size="small" />
            </div>
          )
        }
        {
          showAdd ? (
            <div className={styles.addBtn}>
              <Button onClick={this.clickAdd} type="primary" shape="circle" icon="plus" size="small" />
            </div>
          ) : ''
        }
      </div>
    );
  }
}

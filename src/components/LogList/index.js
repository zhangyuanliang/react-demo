import React, { PureComponent } from 'react';
import { List } from 'antd';
import moment from 'moment';

export default class LogList extends PureComponent {
  render() {
    const { list } = this.props;
    return (
      <div style={{ height: 480, overflowY: 'auto' }}>
        <List
          itemLayout="horizontal"
          dataSource={list}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title={
                  <div>
                    <span>操作人：</span>
                    <span>{item.operatorName}</span>
                  </div>
                }
                description={
                  <div>
                    <span>操作事件：</span>
                    <span>{item.content}</span>
                  </div>
                }
              />
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  color: 'rgba(0, 0, 0, 0.4)',
                  padding: '0 20px',
                }}
              >
                <div>操作时间：</div>
                <div>{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</div>
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

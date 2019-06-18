import React, { PureComponent } from 'react';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { Spin, Menu, Icon, Badge } from 'antd';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export default class GlobalHeaderRight extends PureComponent {
  changeReadState = clickedItem => {
    const { id } = clickedItem;
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeNoticeReadState',
      payload: id,
    });
  };

  render() {
    const { currentUser, onMenuClick, onBellClick, theme, count } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        <span className={`${styles.action} ${styles.bell}`} onClick={onBellClick}>
          <Badge count={count} style={{ boxShadow: 'none' }} className={styles.badge}>
            <Icon type="bell" className={styles.icon} />
          </Badge>
        </span>
        {currentUser.name ? (
          <HeaderDropdown overlay={menu} trigger={['click']}>
            <span className={`${styles.action} ${styles.account}`}>
              <Icon type="user" className={styles.userIcon} />
              <span className={styles.name}>MaDao_{currentUser.name}</span>
            </span>
          </HeaderDropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
        {/* <SelectLang className={styles.action} /> */}
      </div>
    );
  }
}

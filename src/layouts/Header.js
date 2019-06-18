import React, { Component } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Layout, message } from 'antd';
import Animate from 'rc-animate';
import { connect } from 'dva';
import router from 'umi/router';
import GlobalHeader from '@/components/GlobalHeader';
import TopNavHeader from '@/components/TopNavHeader';
import styles from './Header.less';

const { Header } = Layout;

class HeaderView extends Component {
  state = {
    visible: true,
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.autoHideHeader && !state.visible) {
      return {
        visible: true,
      };
    }
    return null;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handScroll, { passive: true });
    this.getBellRing();
    this.bell = setInterval(this.getBellRing, 10000);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handScroll);
    clearInterval(this.bell);
  }

  getBellRing = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/fetchBell',
    });
  };

  getHeadWidth = () => {
    const { isMobile, collapsed, setting } = this.props;
    const { fixedHeader, layout } = setting;
    if (isMobile || !fixedHeader || layout === 'topmenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
  };

  handleNoticeClear = type => {
    message.success(
      `${formatMessage({ id: 'component.noticeIcon.cleared' })} ${formatMessage({
        id: `component.globalHeader.${type}`,
      })}`
    );
    const { dispatch } = this.props;
    dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  };

  handleMenuClick = ({ key }) => {
    const { dispatch } = this.props;
    if (key === 'logout') {
      dispatch({
        type: 'login/logout',
        payload: {
          type: true,
        },
      });
    }
  };

  handleBellClick = () => {
    const {
      dispatch,
      currentUser: { roleName },
    } = this.props;
    if (roleName === '运营部组长' || roleName === '运营部成员') {
      dispatch({
        type: 'global/clearBell',
      });
      router.push('/dashboard/operating-customer');
    } else if (roleName === '运营部负责人' || roleName === '运营部主管') {
      router.push('/messages');
    }
  };

  handScroll = () => {
    const { autoHideHeader } = this.props;
    const { visible } = this.state;
    if (!autoHideHeader) {
      return;
    }
    const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => {
        if (this.oldScrollTop > scrollTop) {
          this.setState({
            visible: true,
          });
        } else if (scrollTop > 300 && visible) {
          this.setState({
            visible: false,
          });
        } else if (scrollTop < 300 && !visible) {
          this.setState({
            visible: true,
          });
        }
        this.oldScrollTop = scrollTop;
        this.ticking = false;
      });
    }
  };

  render() {
    const { isMobile, setting, handleMenuCollapse } = this.props;
    const { navTheme, layout, fixedHeader } = setting;
    const { visible } = this.state;
    const isTop = layout === 'topmenu';
    const width = this.getHeadWidth();
    const HeaderDom = visible ? (
      <Header style={{ padding: 0, width }} className={fixedHeader ? styles.fixedHeader : ''}>
        {isTop && !isMobile ? (
          <TopNavHeader
            theme={navTheme}
            mode="horizontal"
            onCollapse={handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
            onBellClick={this.handleBellClick}
            {...this.props}
          />
        ) : (
          <GlobalHeader
            onCollapse={handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
            onBellClick={this.handleBellClick}
            {...this.props}
          />
        )}
      </Header>
    ) : null;
    return (
      <Animate component="" transitionName="fade">
        {HeaderDom}
      </Animate>
    );
  }
}

export default connect(({ user, setting, global }) => ({
  currentUser: user.currentUser,
  setting,
  count: global.count,
}))(HeaderView);

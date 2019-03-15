import * as React from 'react';
import { Layout, Icon, Dropdown, Avatar, Menu, Breadcrumb } from 'antd';
import styles from './index.less';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withRouter, RouteComponentProps } from 'react-router';
import Link from 'umi/link';
import { MENU } from '@/config';

const { Header } = Layout;

interface HeaderProps extends State.AppState, ReduxComponentProps, RouteComponentProps {}

@connect(state => state.app)
class MyHeader extends React.Component<HeaderProps, {}> {
  onToggleMenuCollasped = () => {
    this.props.dispatch({
      type: 'app/save',
      payload: { menuCollapsed: !this.props.menuCollapsed },
    });
  };

  logout = () => {
    console.log('logout!');
  };

  getBreadcrumbForPath = (pathname, routes) => {
    for (let route of routes) {
      if (route.path === pathname) {
        return (
          <Breadcrumb.Item key={route.path}>
            <Link to={route.path}>{route.name}</Link>
          </Breadcrumb.Item>
        );
      } else if (route.subMenu) {
        let ret = this.getBreadcrumbForPath(pathname, route.subMenu);
        if (ret) return ret;
      }
    }
  };

  getBread = () => {
    const { location } = this.props;
    const pathname = location.pathname;
    const pathArr = pathname.split('/');
    const bCrumbs = [];

    for (let i = 2; i <= pathArr.length; i++) {
      const currentPath = pathArr.slice(0, i).join('/');
      bCrumbs.push(this.getBreadcrumbForPath(currentPath, MENU));
    }

    return <Breadcrumb>{bCrumbs}</Breadcrumb>;
  };

  render() {
    const { menuCollapsed, isMobile } = this.props;

    const { getBread: Bread } = this;

    return (
      <Header className={styles.container}>
        <div className={styles.left}>
          <Icon
            className={styles.trigger}
            type={menuCollapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.onToggleMenuCollasped}
          />
          <Bread />
        </div>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={this.logout}>
                <Icon type="logout" />
                退出登录
              </Menu.Item>
            </Menu>
          }
        >
          <div
            className={classNames(styles.user, {
              [styles.userMobile]: isMobile,
            })}
          >
            <Avatar size="small" icon="user" />
            {!isMobile && <span className={styles.name}>管理员</span>}
          </div>
        </Dropdown>
      </Header>
    );
  }
}

export default withRouter(MyHeader);

import * as React from 'react';
import { Layout, Icon, Menu, Drawer } from 'antd';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { MENU, USER_LAYOUT_CONFIG } from '@/config';
import Link from 'umi/link';
import Header from '@/components/Header';
import styles from './PageLayout.less';

const { Sider, Content } = Layout;

function getMenu(menu: MenuItem[]) {
  return menu.map(item =>
    item.subMenu ? (
      <Menu.SubMenu
        key={item.path}
        title={
          <span>
            <Icon type={item.icon} />
            <span>{item.name}</span>
          </span>
        }
      >
        {getMenu(item.subMenu)}
      </Menu.SubMenu>
    ) : (
      <Menu.Item key={item.path}>
        <Link to={item.path}>
          <span>
            <Icon type={item.icon} />
            <span>{item.name}</span>
          </span>
        </Link>
      </Menu.Item>
    )
  );
}

interface PageLayoutProps extends State.AppState, ReduxComponentProps {
  location: Location;
}

@connect(state => state.app)
export default class PageLayout extends React.Component<PageLayoutProps, {}> {
  onToggleMenuCollasped = () => {
    this.props.dispatch({
      type: 'app/save',
      payload: { menuCollapsed: !this.props.menuCollapsed },
    });
  };

  onClose = () => {
    this.props.dispatch({
      type: 'app/save',
      payload: {
        menuCollapsed: false,
      },
    });
  };

  get keys() {
    const {
      location: { pathname },
    } = this.props;
    const findItemByPathname = (menu: MenuItem[], parentPath) => {
      for (let item of menu) {
        if (item.path === pathname) {
          return { path: item.path, parentPath };
        } else if (item.subMenu) {
          const ret = findItemByPathname(item.subMenu, item.path);
          if (ret) return ret;
        }
      }
    };
    const ret = findItemByPathname(MENU, null);
    return {
      selectedKeys: [ret ? ret.path : ''],
      openKeys: [ret ? ret.parentPath : ''],
    };
  }

  renderLogo() {
    return (
      <div className={styles.logo}>
        <img src={require('../assets/logo.svg')} />
        <span>{USER_LAYOUT_CONFIG.title}</span>
      </div>
    );
  }

  renderMobileLayout() {
    const { menuCollapsed, children, location } = this.props;
    return (
      <Layout className={styles.container}>
        <Header />
        <Drawer
          bodyStyle={{
            padding: 0,
            height: '100vh',
          }}
          width={200}
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={menuCollapsed}
        >
          <div className={styles.siderMobile}>
            {this.renderLogo()}
            <Menu
              className={styles.menu}
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[location.pathname]}
            >
              {getMenu(MENU)}
            </Menu>
          </div>
        </Drawer>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    );
  }

  render() {
    const { menuCollapsed, children, isMobile } = this.props;
    if (isMobile) {
      return this.renderMobileLayout();
    }

    return (
      <Layout className={styles.container}>
        <Sider className={styles.sider} trigger={null} collapsible={true} collapsed={menuCollapsed}>
          {this.renderLogo()}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={this.keys.selectedKeys}
            defaultOpenKeys={this.keys.openKeys}
          >
            {getMenu(MENU)}
          </Menu>
        </Sider>
        <Layout
          className={classNames(styles.rightLayout, {
            [styles.rightLayoutCollapsed]: menuCollapsed,
          })}
        >
          <Header />
          <Content className={styles.content}>{children}</Content>
        </Layout>
      </Layout>
    );
  }
}

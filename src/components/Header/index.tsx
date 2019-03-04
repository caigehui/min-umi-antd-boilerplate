import * as React from 'react';
import { Layout, Icon, Dropdown, Avatar, Menu } from 'antd';
import styles from './index.less';
import { connect } from 'react-redux';
import classNames from 'classnames';

const { Header } = Layout;

interface HeaderProps extends State.AppState, ReduxComponentProps {}

@connect(state => state.app)
export default class MyHeader extends React.Component<HeaderProps, {}> {
  onToggleMenuCollasped = () => {
    this.props.dispatch({
      type: 'app/save',
      payload: { menuCollapsed: !this.props.menuCollapsed },
    });
  };

  logout = () => {
    console.log('logout!');
  };

  render() {
    const { menuCollapsed, isMobile } = this.props;
    return (
      <Header className={styles.container}>
        <Icon
          className={styles.trigger}
          type={menuCollapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.onToggleMenuCollasped}
        />
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

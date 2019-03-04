import * as React from 'react';
import Link from 'umi/link';
import { Icon } from 'antd';
import { GlobalFooter } from 'ant-design-pro';
import styles from './UserLayout.less';
import { USER_LAYOUT_CONFIG } from '@/config';

const links = [
  {
    key: 'help',
    title: '帮助',
    href: '',
  },
  {
    key: 'privacy',
    title: '隐私',
    href: '',
  },
  {
    key: 'terms',
    title: '条款',
    href: '',
  },
];

const copyright = (
  <React.Fragment>
    Copyright <Icon type="copyright" /> {USER_LAYOUT_CONFIG.copyright}
  </React.Fragment>
);

const UserLayout: React.FC<{}> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={require('../assets/logo.svg')} />
              <span className={styles.title}>{USER_LAYOUT_CONFIG.title}</span>
            </Link>
          </div>
          <div className={styles.desc}>{USER_LAYOUT_CONFIG.subtitle}</div>
        </div>
        {children}
      </div>
      <GlobalFooter links={links} copyright={copyright} />
    </div>
  );
};

export default UserLayout;

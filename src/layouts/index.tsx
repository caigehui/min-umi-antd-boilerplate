import * as React from 'react';
import { USER_LAYOUT_ROUTES } from '@/config';
import UserLayout from './UserLayout';
import PageLayout from './PageLayout';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

interface MainLayoutProps {
  location?: Location;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, location, ...restProps }) => {
  if (USER_LAYOUT_ROUTES.some(pathname => location.pathname.toLowerCase() === pathname)) {
    return <UserLayout {...restProps}>{children}</UserLayout>;
  }
  return (
    <PageLayout location={location} {...restProps}>
      {children}
    </PageLayout>
  );
};

export default props => (
  <LocaleProvider locale={zhCN}>
    <MainLayout {...props} />
  </LocaleProvider>
);

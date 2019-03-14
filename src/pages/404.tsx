import React from 'react';
import Link from 'umi/link';
import { Exception } from 'ant-design-pro';

export default () => (
  <Exception type="404" linkElement={Link} desc="您访问的页面不存在" backText="返回" />
);

export const USER_LAYOUT_ROUTES: string[] = ['/login'];

export const USER_LAYOUT_CONFIG: { [key: string]: string } = {
  title: 'example web',
  subtitle: 'min-umi-boilerplate是antd-pro的最小化模板',
  copyright: '2019 caigehui',
};

export const MENU: MenuItem[] = [
  {
    path: '/analysis',
    name: '分析',
    icon: 'solution',
  },
  {
    path: '/mall',
    name: '商城管理',
    icon: 'shop',
    subMenu: [
      {
        path: '/mall/product',
        name: '商品管理',
        icon: 'shopping-cart',
      },
      {
        path: '/mall/category',
        name: '分类管理',
        icon: 'tags',
      },
      {
        path: '/admin/mall/design',
        name: '店铺装修',
        icon: 'gold',
      },
    ],
  },
  {
    path: '/settings',
    name: '系统设置',
    icon: 'setting',
  },
];

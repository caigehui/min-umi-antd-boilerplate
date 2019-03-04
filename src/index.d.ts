interface MenuItem {
  path: string;
  name: string;
  icon: string;
  subMenu?: MenuItem[];
}

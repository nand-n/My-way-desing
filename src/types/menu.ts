export type Menu = {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  subsvg:[];
  submenu?: Menu[];
};

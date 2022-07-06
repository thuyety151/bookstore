export default interface SideBar {
  id: string;
  name: string;
  // path = category +id
  children?: SideBarChildren[];
}

export interface SideBarChildren {
  id: string;
  name: string;
  path: string;
  isLogOut: boolean;
}

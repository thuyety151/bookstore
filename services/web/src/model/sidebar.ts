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
}
export interface Language {
  id: string;
  name: string;
}
export interface Currency {
  id: string;
  name: string;
}

export default interface ISideBar {
  id: string;
  name: string;
  // path = category +id
  children?: ISideBarChildren[];
}

export interface ISideBarChildren {
  id: string;
  name: string;
  path: string;
}
export interface ILanguage {
  id: string;
  name: string;
}
export interface ICurrency {
  id: string;
  name: string;
}

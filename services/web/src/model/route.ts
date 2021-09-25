export interface ISpecificRouteType {
  path: string;
  name: string;
  exact: boolean;
  component: any;
  props?: any;
}



export default interface IRoute{
  path: string;
  name: string;
  exact: boolean;
  redirect?:string;
  component: any;
  props?: any;
  children?:ISpecificRouteType[]
}

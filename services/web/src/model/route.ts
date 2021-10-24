export interface SpecificRouteType {
  path: string;
  name: string;
  exact: boolean;
  component: any;
  props?: any;
}



export default interface Route{
  path: string;
  name: string;
  exact: boolean;
  redirect?:string;
  component: any;
  props?: any;
  children?:SpecificRouteType[]
}

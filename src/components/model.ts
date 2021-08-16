export interface IHeaderTypes{
    name:string,
    isShow:boolean,
    child:IHeaderChildType[]
}
export interface IHeaderChildType{
    name:string,
    path:string
}
export interface ICategoryType{
    icon:string,
    title:string,
    description:string,
    path:string,
    color:string,
    icon_color:string
}
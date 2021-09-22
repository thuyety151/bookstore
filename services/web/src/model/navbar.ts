export interface IHeaderTypes{
    name:string,
    isShow:boolean,
    path?:string,
    child?:IHeaderChildType[]
}
export interface IHeaderChildType{
    id:string,
    name:string,
    path:string
}
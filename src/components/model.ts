export interface IHeaderTypes{
    name:string,
    isShow:boolean,
    child:IHeaderChildType[]
}
export interface IHeaderChildType{
    name:string,
    path:string
}
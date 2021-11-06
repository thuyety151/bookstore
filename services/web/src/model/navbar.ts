export interface HeaderTypes{
    name:string,
    isShow:boolean,
    path?:string,
    child?:HeaderChildType[]
}
export interface HeaderChildType{
    id:string,
    name:string,
    path:string
}
import React from "react";
import { IHeaderTypes } from "../model";
import {  ExpandLess, ExpandMore } from "@material-ui/icons";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Box, Collapse, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles= makeStyles((theme)=>({
    headerExpandContainer:{
        position: "absolute",
        top: "4rem",    
        backgroundColor:"#fff",
        borderColor:"#000",
        borderWidth:"4px",
        display:"content",
        width:"10rem"
      },
      headerItem :{
        fontWeight:"bold",
        '&:hover': {
            color:"red"
         },
      }
}))
const headerItems:IHeaderTypes[]=[
    {name:"Home",
    isShow:false,
    child:[
        {name:"Home 1", path:""},
        {name:"Home 2", path:""},
    ]},
    {name:"Category", 
    isShow:false,
    child:[
        {name:"Category 1", path:""},
        {name:"Category 2", path:""},
    ]},
    {name:"Shop", 
    isShow:false,
    child:[
        {name:"Shop 1", path:""},
        {name:"Shop 2", path:""},
    ]},
    {name:"Blogs", 
    isShow:false,
    child:[
        {name:"Blog 1", path:""},
        {name:"Blog 2", path:""},
    ]},
    {name:"Others", 
    isShow:false,
    child:[
        {name:"Other 1", path:""},
        {name:"Other 2", path:""},
    ]},
]
function ListItemRender(){
    const classes=useStyles()
    // to re-render
    const [render, setRender] = React.useState(false);
    const handleMouseOver = (index:number):void=> {
        headerItems.forEach((item,id)=>{
            if(id!==index){
                item.isShow=false
            }else{
                item.isShow=true
            }
        })
        setRender(!render);
    };
    const handleMouseOut = ():void=> {
        headerItems.forEach((item)=>{
            item.isShow=false
        })
        setRender(!render);
    };
    const headers: any = headerItems.map((item,index) => {
        return (
            <div key={index}>
                <div>
                <ListItem button 
                onMouseOver={()=>handleMouseOver(index)} 
                onMouseOut={()=>handleMouseOut()}
                className={classes.headerItem} 
                >
                    <ListItemText primary={item.name} />
                        {item.isShow ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                </div>
                <div 
                    onMouseOver={()=>handleMouseOver(index)} 
                    onMouseOut={()=>handleMouseOut()}
                    >
                    <Collapse in={item.isShow} 
                    timeout={300} 
                    className={classes.headerExpandContainer}
                    >      
                    <Box border={1}> 
                        <List component="div" disablePadding >
                        {
                            item.child.map((child)=>{
                                return (
                                    <ListItem button key={child.name}>
                                        {child.name}
                                    </ListItem>
                                )
                            })
                        }
                        </List>
                    </Box>
                    </Collapse>
                </div>
            </div>
        )
    }); 
    return headers 
}

export default ListItemRender
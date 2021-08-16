import {  IconButton } from "@material-ui/core";
import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { AppBar } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { List } from "@material-ui/core";
import React from "react";
import ListItemRender from "./ListItemRender";
import logo from "../../assets/book-worm.png"

const useStyles= makeStyles((theme)=>({
    menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
        display:"flex",
        backgroundColor:"#f6f5f3"
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color:"#a0938f",
      },
      inputRoot: {
        color: '#7c6e65;',
        width:"20rem",
        padding:"5px",
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
        "&::placeholder":{
            color:"#000"
        }
      },
      nested: {
        paddingLeft: theme.spacing(4),
        display:"inline",
      },
      rootList: {
        width: '100%',
        color:'#000',
        display:"flex"
      },
      root: {
        flexGrow: 1,
        color:"red",
      },
      header:{
          color:"#000",
          backgroundColor:"#fff",
          height:"64px",
          boxShadow: "none",
          maxHeight:"64px"
          
      },
      listItem:{
          display:"flex"
      },
      inline:{
          display:"inline",
      },
      toolbar:{
          justifyContent: "space-between",
      },
      
}))

function Header(){
    const classes= useStyles()
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    const hanleSearch=(key:any)=>{
        console.log(key)
    }
    return(
        <div className={classes.root}>
            <AppBar position="static" className={classes.header}>
                <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                >
                    <MenuIcon />
                </IconButton>
                <img src={logo} style={{height:64}}/>
                
                <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.rootList} //
                >
                    <ListItemRender/>
                </List>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase
                    placeholder="Search by Keywords"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onKeyPress={(e)=>hanleSearch(e)}
                    />
                </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default Header
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {ICategoryType} from "./model"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 200,
      width: 200,
      boxShadow:"none",
      display: "grid",
      alignItems: "center",
      textAlign:"left",
      cursor:"pointer"
    },
    control: {
      padding: theme.spacing(3),
    },
    container:{
        display:"grid",
        padding: "2rem",
    },
    subHeader:{
        display:"flex",
        justifyContent:"space-around",
    },
    allCategory:{
        display:'flex',
        alignItems:'center',
        "&:hover":{
            color:"red",
            cursor:"pointer"
        }
    }
  }),
);

const dataCategories :ICategoryType[]=[
    {icon:"perm_media", title:"Arts & Photos", description:"Shop ",path:"",color:"#faf1ff",icon_color:"#a200fc"},
    {icon:"lunch_dining", title:"Food & Drink", description:"Food & Drink",path:"",color:"#faf4eb",icon_color:"#f79400"},
    {icon:"favorite_border", title:"Romance", description:"Romance",path:"",color:"#f4e6e5",icon_color:"#f01000"},
    {icon:"health_and_safety", title:"Health", description:"Health",path:"",color:"#e6f2f4",icon_color:"#00cdef"},
    {icon:"assignment", title:"Biography", description:"Biography",path:"",color:"#fff6f6",icon_color:"#ff8e8e"},
]
function Categories() {
  const [spacing, setSpacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();

  return (
      <div>
        <Grid container className={classes.root} spacing={3}>
            <Grid item xs={12} style={{padding:0}}>
                <div className={classes.subHeader}>
                    <h1 style={{fontWeight:500}}> 
                        Featured Categories
                    </h1>
                    <span className={classes.allCategory}>
                        <span>All Categories</span>
                        <i className="material-icons-outlined" style={{fontSize:'20px'}}>arrow_forward_ios</i>
                    </span>
                </div>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={spacing}>
                    {
                        dataCategories.map((value,index)=>(
                            <Grid key={index} item >
                                <Paper className={classes.paper} style={{backgroundColor:`${value.color}`}}  >
                                    <div className={classes.container}>
                                        <i className="material-icons-outlined" style={{color:`${value.icon_color}`,fontSize:45}}>
                                            {value.icon}
                                        </i>
                                        <h3>{value.title}</h3>
                                        <span>{value.description}</span>
                                    </div>
                                    
                                </Paper>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </Grid>
    </div>
  );
}
export default  Categories
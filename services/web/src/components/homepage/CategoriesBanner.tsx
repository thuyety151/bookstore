import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { dataCategories, color } from "./type";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 200,
      width: 250,
      boxShadow: "none",
      display: "grid",
      alignItems: "center",
      textAlign: "left",
      cursor: "pointer",
    },
    control: {
      padding: theme.spacing(3),
    },
    container: {
      display: "grid",
      padding: "2rem",
    },
    subHeader: {
      display: "flex",
      justifyContent: "space-between",
    },
    allCategory: {
      display: "flex",
      alignItems: "center",
      "&:hover": {
        color: "red",
        cursor: "pointer",
      },
    },
  })
);

function Categories() {
  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        className={classes.root}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={9}>
          <div className={classes.subHeader}>
            <h1 style={{ fontWeight: 400 }}>Featured Categories</h1>
            <span className={classes.allCategory}>
              <span>All Categories</span>
              <i
                className="material-icons-outlined"
                style={{ fontSize: "20px" }}
              >
                arrow_forward_ios
              </i>
            </span>
          </div>
        </Grid>
        <Grid item xs={9}>
          <Grid container justifyContent="space-between" >
            {dataCategories.map((value, index) => (
              <Grid key={index} item>
                <Paper
                  className={classes.paper}
                  style={{ backgroundColor: `${color[index]}` }}
                >
                  <div className={classes.container}>
                    <i
                      className="material-icons-outlined"
                      style={{ color: `${value.icon_color}`, fontSize: 45 }}
                    >
                      {value.icon}
                    </i>
                    <h3 style={{ fontWeight: 400 }}>{value.title}</h3>
                    <span>{value.description}</span>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default Categories;

import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import Slider from "./Slider";
import { Book } from "../../../model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 500,
      maxHeight: 300,
      textAlign: "left",
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
    attribute: {
      color: "red",
      "&:hover": {
        color: "red",
        cursor: "pointer",
        fontWeight: 700,
      },
    },
  })
);

interface Props {
  item: Book;
}
export default function DealItem({ item }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item container xs={4} alignItems="stretch">
            <ButtonBase>
              <img className={classes.img} alt="complex" src={item.imageUrl} />
            </ButtonBase>
          </Grid>
          <Grid item xs={8} container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="overline"
                  className={classes.attribute}
                >
                  {item.attribute}
                </Typography>
                <Typography gutterBottom variant="h5">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.author}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                  ${item.regularPrice}
                </Typography>
              </Grid>
              <Grid
                item
                container
                direction="row"
                justifyContent="space-between"
                spacing={2}
              >
                <Typography gutterBottom variant="subtitle2">
                  Already Sold: 11
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  Available: 3
                </Typography>
                <Slider />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

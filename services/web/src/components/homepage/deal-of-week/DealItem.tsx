import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import Slider from "./Slider";
import { Book } from "../../../model";
import { generatePath, useHistory } from "react-router-dom";
import { ROUTE_BOOK_DETAIL } from "../../../routers/types";
import "./styles.scss"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 500,
      minHeight: 300,
      textAlign: "left",
    },
    itemContainer: {
      position: 'relative',
    },
    available: {
      position: 'absolute',
      top: 200,
      right: 5,
      left: 5
    },
    img: {
      // margin: "auto",
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
  const history = useHistory();

  const handleNavBook = () => {
    if (item?.id) {
      history.push(
        generatePath(ROUTE_BOOK_DETAIL, {
          bookId: item?.id,
          attributeId: item?.attributeId,
        })
      );
    } else {
      history.push(`/book`);
    }
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item container xs={5} alignItems="stretch">
            <ButtonBase onClick={handleNavBook}>
              <img
                className={classes.img}
                alt="complex"
                src={item.pictureUrl}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={7} container spacing={1} className={classes.itemContainer}>
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
                  ${item.price}
                </Typography>
              </Grid>
              <Grid
                item
                container
                direction="row"
                justifyContent="space-between"
                spacing={2}
                className = {classes.available}
              >
                <Typography gutterBottom variant="subtitle2" align="center">
                  Available: {item.totalStock}
                </Typography>
                <Slider value={item.totalStock} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

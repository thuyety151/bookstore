import {
    ButtonBase,
    createStyles,
    Grid,
    makeStyles,
    Paper,
    Theme,
    Typography,
  } from "@material-ui/core";
  import React from "react";
  import { Book } from "../../../model";
  import { FavoriteBorderOutlined } from "@material-ui/icons";
  import { useHistory } from "react-router-dom";

  const BookItem: React.FC<{ item: Book }> = (item) => {
    const classes = useStyles();
    const history= useHistory()
    const handleNavBook=(id?:string)=>{
      if(id){
        history.push(`/book/${id}`)
      } else {
        history.push(`/book`)
      }
    }
    return (
      <div className={classes.root}>
        <Paper className={classes.paper} variant="outlined" square>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <ButtonBase className={classes.image} onClick={()=>handleNavBook(item.item.id)}>
                <img
                  className={classes.image}
                  src={item.item.imageUrl}
                  alt="img"
                />
              </ButtonBase>
            </Grid>
            <Grid item xs container direction="column">
              <Grid item>
                <Typography
                  gutterBottom
                  variant="overline"
                  className={classes.atribute}
                >
                  {item.item.attribute}
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  className={classes.name}
                  onClick={()=>handleNavBook(item.item.id)}
                >
                  {item.item.name}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  className={classes.author}
                >
                  {item.item.author}
                </Typography>
              </Grid>
              {item.item.salePrice === "" ? (
                <Grid item>
                  <Typography
                    variant="subtitle1"
                    className={classes.currentPrice}
                  >
                    {item.item.regularPrice}
                  </Typography>
                </Grid>
              ) : (
                <Grid item className={classes.rootPrice}>
                  <Typography
                    variant="subtitle1"
                    className={classes.currentPrice}
                  >
                    {item.item.salePrice}
                  </Typography>
                  <Typography variant="subtitle1" className={classes.salePrice}>
                    {item.item.regularPrice}
                  </Typography>
                </Grid>
              )}
              <Grid item className={classes.extension}>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  className={classes.name}
                >
                  ADD TO CARD
                </Typography>
                <FavoriteBorderOutlined className={classes.favorite} />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  };
  
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      image: {
        width: 200,
        height: 200,
      },
      paper: {
        padding: theme.spacing(2),
        margin: "auto",
        // maxWidth: 500,
        textAlign: "left",
        "&:hover": {
          borderColor: "#000",
        },
      },
      name: {
        fontWeight: 700,
      },
      author: {
        color: "gray",
        "&:hover": {
          color: "red",
          cursor: "pointer",
          fontWeight: 700,
        },
      },
      salePrice: {
        textDecorationLine: "line-through",
        color: "gray",
        fontSize: 13,
        paddingLeft: "5px",
      },
      currentPrice: {
        fontWeight: 700,
      },
      rootPrice: {
        alignItems: "center",
        display: "flex",
      },
      atribute: {
        color: "red",
        "&:hover": {
          color: "red",
          cursor: "pointer",
          fontWeight: 700,
  
        },
      },
      extension: {
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
      },
      favorite: {
        "&:hover": {
          color: "red",
          cursor: "pointer",
        },
      },
    })
  );
  
  export default BookItem;
  
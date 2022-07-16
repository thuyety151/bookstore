import React, { useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { color } from "../../../model/category";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../../redux/store";
import { Skeleton } from "@material-ui/lab";
import "./styles.scss";
import clsx from "clsx";
import { ROUTE_BOOKS_FOR_SALE } from "../../../routers/types";
import { getCategoriesForHomepage } from "../../../redux/actions/category/getAction";

function Categories() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const rootCategoryState = useSelector((state: RootStore) => state.category);

  const handleNavigateToCate = (id: string) => {
    history.push({
      pathname: ROUTE_BOOKS_FOR_SALE,
      state: {
        categoryId: id,
      },
    });
  };
  useEffect(() => {
    dispatch(getCategoriesForHomepage());
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Grid
        container
        className={clsx(classes.root, "category")}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <div className={classes.subHeader}>
            <h1 style={{ fontWeight: 400 }}>Featured Categories</h1>
            <span
              className={classes.allCategory}
              onClick={() => history.push(ROUTE_BOOKS_FOR_SALE)}
            >
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
        <Grid container style={{ gap: "10px" }}>
          {/* <Grid container justifyContent="space-between"> */}
          {rootCategoryState.requesting
            ? new Array(4).map((value, index) => (
                <Skeleton variant="rect" width={210} height={118} />
              ))
            : rootCategoryState.data.homepage.map((value, index) => (
                <Paper
                  key={`key-category-${index}`}
                  className={clsx(classes.paper, "category__contents")}
                  style={{ backgroundColor: `${color[index]}` }}
                  onClick={() => handleNavigateToCate(value.id)}
                >
                  <div className={classes.container}>
                    <img
                      className={classes.icon}
                      src={value.media ? value.media.url : null}
                      alt=""
                    />
                    <h3 style={{ fontWeight: 500 }}>{value.name}</h3>
                  </div>
                </Paper>
              ))}
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
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
    icon: {
      height: "4rem",
      width: "4rem",
    },
  })
);
export default Categories;

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import { Avatar, Typography } from "@material-ui/core";
import { RootStore } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRoot } from "../../../redux/actions/category/getAction";

const MiniCategory = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const rootCategoryState = useSelector((state: RootStore) => state.category);

  useEffect(() => {
    dispatch(getRoot());
  }, [dispatch]);

  const handleNavigateToCate = (id?: string) => {
    if (id) {
      history.push(`/category/${id}`);
    } else {
      history.push(`/category`);
    }
  };
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
            <span
              className={classes.allCategory}
              onClick={() => handleNavigateToCate()}
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
        <Grid item xs={9}>
          <Grid container justifyContent="space-between">
            {rootCategoryState.requesting
              ? new Array(6).map((value, index) => (
                  <div className={classes.skeleton}>
                    <Skeleton variant="circle">
                      <Avatar sizes="5rem" />
                    </Skeleton>
                    <Skeleton style={{ marginTop: "1rem", height: "1.5rem" }}>
                      <Typography>.</Typography>
                    </Skeleton>
                  </div>
                ))
              : rootCategoryState.data.root.slice(0, 6)?.map((value, index) => (
                  <div
                    className={classes.skeleton}
                    key={index}
                    onClick={() => handleNavigateToCate(value.id)}
                  >
                    <Avatar
                      sizes="5rem"
                      src="https://firebasestorage.googleapis.com/v0/b/internship-august-2021-b1566.appspot.com/o/park_black_24dp.svg?alt=media&token=3f80e4eb-7b94-41c5-9ada-9a16b0f71c72"
                      // src={value.media ? value.media.url : null}
                      className={classes.avatar}
                    />
                    <Typography align="center">{value.name}</Typography>
                  </div>
                ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      "& .MuiSkeleton-heightAuto": {
        height: "5rem",
        width: "5rem",
      },
      "& .MuiSkeleton-fitContent": {
        maxWidth: "none",
      },
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
    skeleton: {
      display: "grid",
    },
    avatar: {
      height: "5rem",
      width: "5rem",
      justifySelf: "center",
      marginBottom: "1rem",
    },
  })
);

export default MiniCategory;

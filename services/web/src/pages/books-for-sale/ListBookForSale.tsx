import {
  Backdrop,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import BestSellerComponent from "../../components/homepage/bestseller/BestSellerBanner";
import { getBooksForSale } from "../../redux/actions/books/getAction";
import { RootStore } from "../../redux/store";
import emptySearchResultImage from "../../assets/images/empty_result.webp";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./styles.scss";
import defaultBookUrl from "../../assets/images/default.jpeg";

export const sortValue = [
  {
    predicate: "",
    description: "Default sorting",
  },
  {
    predicate: "popular",
    description: "Sort by popularity",
  },
  {
    predicate: "newest",
    description: "Sort by newest",
  },
  {
    predicate: "low-price",
    description: "Sort by price: low to high",
  },
  {
    predicate: "high-price",
    description: "Sort by price: high to low",
  },
];

export const itemPerPage = [
  {
    value: 10,
    description: "Show 10",
  },
  {
    value: 15,
    description: "Show 15",
  },
  {
    value: 20,
    description: "Show 20",
  },
  {
    value: 25,
    description: "Show 25",
  },
  {
    value: 30,
    description: "Show 30",
  },
];

const defaultItems = [
  <img className="image" src={defaultBookUrl} alt="img" />,
  <img className="image" src={defaultBookUrl} alt="img" />,
  <img className="image" src={defaultBookUrl} alt="img" />,
  <img className="image" src={defaultBookUrl} alt="img" />,
  <img className="image" src={defaultBookUrl} alt="img" />,
  <img className="image" src={defaultBookUrl} alt="img" />,
  <img className="image" src={defaultBookUrl} alt="img" />,
  <img className="image" src={defaultBookUrl} alt="img" />,
];

const ListBookForSale: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const booksState = useSelector((state: RootStore) => state.books);
  const isLoading = useSelector((state: RootStore) => state.books.requesting);
  const pagination = useSelector((state: RootStore) => state.books.pagination);
  const [pageIndex, setPageIndex] = useState(1);
  const { predicate } = useParams() as any;
  const [sortType, setSortType] = useState(
    sortValue.find((x) => x.predicate === predicate) || sortValue[0]
  );

  const rowsPerPage = () => {
    let itemInfo = pagination.pageIndex * pagination.pageSize;

    if (booksState.data.length < pagination.pageSize * pagination.pageIndex) {
      itemInfo =
        (pagination.pageIndex - 1) * pagination.pageSize +
        booksState.data.length;
    }
    return `Showing of ${
      (pagination.pageIndex - 1) * pagination.pageSize + 1
    } - ${itemInfo} ${pagination.totalCount} results`;
  };

  useEffect(() => {
    dispatch(
      getBooksForSale(sortType.predicate, undefined, {
        ...pagination,
        pageIndex: pageIndex,
      })
    );

    // eslint-disable-next-line
  }, [dispatch, pageIndex, sortType]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageIndex(value);
  };

  const handleSort = (event: React.ChangeEvent<{ value: any }>) => {
    setSortType(event.target.value as any);
  };

  return (
    <div className={classes.rightSection}>
      <Grid container>
        <Grid container direction="row">
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <span>{rowsPerPage()}</span>
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortType}
                  onChange={handleSort}
                >
                  {sortValue.map((x, index) => {
                    return (
                      <MenuItem key={index} value={x as any}>
                        {x.description}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {isLoading ? (
            <div>
              <Backdrop className={classes.backdrop} open>
                <CircularProgress color="secondary" />
              </Backdrop>
              {booksState.data.length === 0 ? (
                <Grid
                  container
                  justifyContent="flex-start"
                  style={{ gap: "5px" }}
                >
                  {defaultItems.map((book, index) => {
                    return (
                      <Grid item className="books-for-sale-item" key={index}>
                        <Paper
                          className={classes.paper}
                          variant="outlined"
                          square
                        >
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={3}
                          >
                            <Grid item>{book}</Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>
              ) : (
                <Grid
                  container
                  justifyContent="flex-start"
                  style={{ gap: "5px" }}
                >
                  {booksState.data.map((book, index) => {
                    return (
                      <Grid item className="books-for-sale-item" key={index}>
                        <BestSellerComponent item={book} />
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </div>
          ) : (
            <div>
              {booksState.data.length > 0 ? (
                <Grid
                  container
                  justifyContent="flex-start"
                  style={{ gap: "5px" }}
                >
                  {booksState.data.map((book, index) => {
                    return (
                      <Grid item className="books-for-sale-item" key={index}>
                        <BestSellerComponent item={book} />
                      </Grid>
                    );
                  })}
                </Grid>
              ) : (
                <img
                  src={emptySearchResultImage}
                  alt="empty-result"
                  className={classes.emptyImg}
                ></img>
              )}
            </div>
          )}
          <Grid
            container
            justifyContent="center"
            className={classes.pagination}
          >
            <Pagination
              className={classes.pages}
              count={pagination.totalPage}
              shape="rounded"
              page={pageIndex}
              onChange={handleChangePage}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    pagination: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: theme.spacing(5),
    },
    pages: {
      "& .Mui-selected": {
        backgroundColor: "#000 !important",
        color: "#fff",
      },
    },
    rightSection: {
      margin: "0px 20px",
      position: "relative",
    },
    emptyImg: {
      height: 500,
      [theme.breakpoints.down("sm")]: {
        height: 300,
      },
    },
    paper: {
      padding: theme.spacing(1, 2),
      margin: theme.spacing(1, 1),
      textAlign: "left",
      height: "100%",
      "&:hover": {
        borderColor: "#000",
        zIndex: 1,
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);
export default ListBookForSale;

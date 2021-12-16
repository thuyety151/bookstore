import { FormControl, Grid, MenuItem, Select } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import BestSellerComponent from "../../components/homepage/bestseller/BestSellerBanner";
import { getBooksForSale } from "../../redux/actions/books/getAction";
import { RootStore } from "../../redux/store";

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

const ListBookForSale: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const booksState = useSelector((state: RootStore) => state.books);
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
                  style={{ width: "500px" }}
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
              {/* <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={pageSize.value}
                  onChange={(e) => handleChange(e)}
                >
                  {itemPerPage.map((x, index) => {
                    return <MenuItem value={x.value}>{x.description}</MenuItem>;
                  })}
                </Select>
              </FormControl> */}
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="flex-start"
            // className={classes.grid}
          >
            {booksState.data.map((book, index) => {
              return (
                <Grid item className="featured-book-item" key={index}>
                  <BestSellerComponent item={book} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid container justifyContent="center" className={classes.pagination}>
          <Pagination
            className={classes.pages}
            count={pagination.totalPage}
            shape="rounded"
            page={pageIndex}
            onChange={handleChangePage}
          />
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
      margin: "0px 20px"
    }
  })
);
export default ListBookForSale;



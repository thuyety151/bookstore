import {
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Autocomplete } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { generatePath, useHistory } from "react-router-dom";
import { booksContant } from "../../../redux/constants/books/actionTypes";
import { Predicate, ROUTE_BOOKS_FOR_SALE } from "../../../routers/types";
import {
  getKeywords,
  removeKeywords,
  saveKeywords,
} from "../../../model/search";
import { useEffect, useState } from "react";
import React from "react";

const SearchProduct: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [key, setKey] = useState(new Date().getTime().toString());
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!history.location.pathname.includes("books-for-sale")) {
      getNewKey();
      dispatch({
        type: booksContant.SET_KEYWORDS,
        data: null,
      });
    }
  }, [dispatch, history.location.pathname]);

  const onSearch = (e: any) => {
    if (e.key === "Enter") {
      dispatch({
        type: booksContant.SET_KEYWORDS,
        data: e.target.value.toString(),
      });
      saveKeywords(e.target.value.toString());
      setValue(e.target.value.toString());
      if (!history.location.pathname.includes("books-for-sale")) {
        history.push(
          generatePath(ROUTE_BOOKS_FOR_SALE, {
            predicate: Predicate.Popular,
          })
        );
      }
    }
  };

  const onChangeOpt = (e: any) => {
    setValue(e.target.textContent.toString());
    dispatch({
      type: booksContant.SET_KEYWORDS,
      data: e.target.textContent.toString(),
    });

    if (!history.location.pathname.includes("books-for-sale")) {
      history.push(
        generatePath(ROUTE_BOOKS_FOR_SALE, {
          predicate: Predicate.Popular,
        })
      );
    }
  };

  const getNewKey = () => {
    setKey(new Date().getTime().toString());
    setValue("");
  };

  const remove = (value: string) => {
    getNewKey();
    removeKeywords(value);
  };

  return (
    <div key={key}>
      <Autocomplete
        freeSolo
        key={getKeywords().length}
        className={classes.search}
        id="grouped-demo"
        options={getKeywords() as []}
        value={value}
        renderOption={(option) => (
          <Grid container direction="row" justifyContent="space-between">
            <Grid item onClick={onChangeOpt} xs={10}>
              {option}
            </Grid>
            <span className={classes.icon} onClick={() => remove(option)}>
              <CloseIcon fontSize="small" />
            </span>
          </Grid>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search by Keywords"
            classes={{
              root: classes.inputInput,
            }}
            variant="standard"
            onKeyDown={onSearch}
            style={{ paddingLeft: 8, width: 380 }}
            value={value}
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,
              startAdornment: (
                <>
                  <InputAdornment
                    position="start"
                    className={classes.searchIcon}
                  >
                    <SearchIcon />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default SearchProduct;

const useStyles = makeStyles((theme: Theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    display: "flex",
    backgroundColor: "#f6f5f3",
    "& .MuiInput-underline:before": {
      border: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      border: "none",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: "100%",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#a0938f",
  },
  inputRoot: {
    color: "#7c6e65;",
    width: "20rem",
    padding: "5px",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "20ch",
      },
    },
    "&::placeholder": {
      color: "#000",
    },
  },
  icon: {
    color: "#a0938f",
    size: "16px",
  },
}));

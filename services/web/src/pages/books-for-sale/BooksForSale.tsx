import {
  AppBar,
  Button,
  Collapse,
  Dialog,
  Fab,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Slide,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootStore } from "../../redux/store";
import ListBookForSale from "./ListBookForSale";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CloseIcon from "@material-ui/icons/Close";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import { TransitionProps } from "@material-ui/core/transitions";
import { getLanguages } from "../../redux/actions/language/getAction";
import {
  getCategories,
  getFlattenCategories,
} from "../../redux/actions/category/getAction";
import { getAllAuthor } from "../../redux/actions/author/getActions";
import { getAttributes } from "../../redux/actions/attribute/getAction";
import {
  filterParams,
  getBooksForSale,
} from "../../redux/actions/books/getAction";
import FilterChips from "./components/FilterChips";
import SelectedFilters from "./components/SelectedFilters";
import PriceFilter from "./components/PriceFilter";
import ReviewFilter from "./components/ReviewFilter";
import CategorySelectTreeView from "./components/CategorySelectTreeView";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export type chipParam = {
  key: string;
  label: string;
};

export type filterChips = {
  authorChips: chipParam[];
  languageChips: chipParam[];
  attributeChips: chipParam[];
  ratesChips: chipParam[];
  categoryChips: chipParam[];
};

const BooksForSalePage: React.FunctionComponent<{}> = (props) => {
  /*-------------------------------Desktop Filter--------------------------------*/
  const classes = useStyles();
  const dispatch = useDispatch();
  const { predicate, categoryId } = useParams() as any;
  //Selector
  const categories = useSelector((state: RootStore) => state.categoryBfs.data);
  const languages = useSelector((state: RootStore) => state.languages.data);
  const authours = useSelector((state: RootStore) => state.author.data);
  const attributes = useSelector((state: RootStore) => state.attributes.data);
  const pagination = useSelector((state: RootStore) => state.books.pagination);
  const flattenCategories = useSelector(
    (state: RootStore) => state.flattenCategories.data
  );
  const { keywords } = useSelector((state: RootStore) => state.books);

  //State
  const [isOpen, setOpen] = useState({
    category: true,
    author: true,
    language: false,
    format: false,
    price: false,
    review: false,
    feature: false,
  });

  const initBookFilterParams: filterParams = {
    categoryIds: categoryId || "",
    authorIds: "",
    languageIds: "",
    attributeIds: "",
    minPrice: 0,
    maxPrice: 500,
    rates: "",
  };
  const [bookFilterParams, setBookFilterParams] = useState(
    initBookFilterParams
  );

  const initChipFilterParams: filterChips = {
    authorChips: [],
    languageChips: [],
    attributeChips: [],
    ratesChips: [],
    categoryChips: [],
  };

  const initCheckedCategory: string [] = categoryId ? [categoryId] : [];

  const [checkedCategory, setCheckedCategory] = useState(initCheckedCategory);

  const [chipFilterParams, setChipFilterParams] = useState(
    initChipFilterParams
  );

  const [authorsCheckedState, setAuthorsCheckedState] = useState(
    new Array(authours.length).fill(false)
  );

  const [languagesCheckedState, setLanguagesCheckedState] = useState(
    new Array(languages.length).fill(false)
  );

  const [attributesCheckedState, setAttributesCheckedState] = useState(
    new Array(attributes.length).fill(false)
  );

  const rates = [1, 2, 3, 4, 5];

  const [ratesCheckedState, setRatesCheckedState] = useState(
    new Array(rates.length).fill(false)
  );

  //Function

  function handleLanguageChange(position: string) {
    const updatedLanguagesCheckState = languagesCheckedState.map(
      (item, index) => (index === parseInt(position) ? !item : item)
    );

    setLanguagesCheckedState(updatedLanguagesCheckState);

    const languageIds = updatedLanguagesCheckState.reduce(
      (ids, currentState, index) => {
        if (currentState === true) {
          return [...ids, languages[index].id];
        }
        return ids;
      },
      []
    );

    const languageChips = updatedLanguagesCheckState.reduce(
      (languageChips, currentState, index) => {
        if (currentState === true) {
          return [
            ...languageChips,
            { key: index, label: languages[index].name },
          ];
        }
        return languageChips;
      },
      [] as chipParam[]
    );

    setBookFilterParams({
      ...bookFilterParams,
      languageIds: languageIds.join(),
    });
    setChipFilterParams((prev) => {
      return {
        ...prev,
        languageChips: [...languageChips],
      };
    });
  }

  function handleCategoryChange(checked: string[]) {
    setCheckedCategory(checked);

    var categoryIds = checked.join();
    const categoriesFilter = flattenCategories.reduce(
      (prevCategory, category, index) => {
        if (categoryIds.includes(category.value)) {
          return [
            ...prevCategory,
            { key: category.value, label: category.label },
          ];
        }
        return prevCategory;
      },
      [] as any[]
    );

    setBookFilterParams({
      ...bookFilterParams,
      categoryIds: categoryIds,
    });
    setChipFilterParams((prev) => {
      return {
        ...prev,
        categoryChips: [...categoriesFilter],
      };
    });
  }

  function handleRemoveCategoryChip(key: string) {
    var checked = checkedCategory.filter((value) => value !== key);
    handleCategoryChange(checked);
  }

  function handleAuthorChange(position: string) {
    const updatedAuthorsCheckState = authorsCheckedState.map((item, index) =>
      index === parseInt(position) ? !item : item
    );

    setAuthorsCheckedState(updatedAuthorsCheckState);

    const authorIds = updatedAuthorsCheckState.reduce(
      (ids, currentState, index) => {
        if (currentState === true) {
          return [...ids, authours[index].id];
        }
        return ids;
      },
      []
    );

    const authorChips = updatedAuthorsCheckState.reduce(
      (authorChips, currentState, index) => {
        if (currentState === true) {
          return [...authorChips, { key: index, label: authours[index].name }];
        }
        return authorChips;
      },
      [] as chipParam[]
    );

    setBookFilterParams({
      ...bookFilterParams,
      authorIds: authorIds.join(),
    });

    setChipFilterParams((prev) => {
      return {
        ...prev,
        authorChips: [...authorChips],
      };
    });
  }

  function handleAttributeChange(position: string) {
    const updatedAttributesCheckState = attributesCheckedState.map(
      (item, index) => (index === parseInt(position) ? !item : item)
    );

    setAttributesCheckedState(updatedAttributesCheckState);

    const attributeIds = updatedAttributesCheckState.reduce(
      (ids, currentState, index) => {
        if (currentState === true) {
          return [...ids, attributes[index].id];
        }
        return ids;
      },
      []
    );

    const attributeChips = updatedAttributesCheckState.reduce(
      (attributeChips, currentState, index) => {
        if (currentState === true) {
          return [
            ...attributeChips,
            { key: index, label: attributes[index].name },
          ];
        }
        return attributeChips;
      },
      [] as chipParam[]
    );

    setBookFilterParams({
      ...bookFilterParams,
      attributeIds: attributeIds.join(),
    });

    setChipFilterParams((prev) => {
      return {
        ...prev,
        attributeChips: [...attributeChips],
      };
    });
  }

  const handleRateChange = (position: string) => {
    const updatedRatesCheckState = ratesCheckedState.map((item, index) =>
      index === parseInt(position) ? !item : item
    );

    setRatesCheckedState(updatedRatesCheckState);

    const rateIds = updatedRatesCheckState.reduce(
      (ids, currentState, index) => {
        if (currentState === true) {
          return [...ids, rates[index]];
        }
        return ids;
      },
      []
    );

    const rateChips = updatedRatesCheckState.reduce(
      (rateChips, currentState, index) => {
        if (currentState === true) {
          return [
            ...rateChips,
            { key: index, label: rates[index].toString() + " star" },
          ];
        }
        return rateChips;
      },
      [] as chipParam[]
    );
    setBookFilterParams({
      ...bookFilterParams,
      rates: rateIds.join(),
    });

    setChipFilterParams((prev) => {
      return {
        ...prev,
        ratesChips: [...rateChips],
      };
    });
  };

  //useEffect
  useEffect(() => {
    dispatch(getLanguages());
    dispatch(getCategories());
    dispatch(getAllAuthor());
    dispatch(getFlattenCategories());
    dispatch(
      getAttributes({
        onSuccess: () => {},
        onFailure: () => {},
      })
    );
    handleCategoryChange(checkedCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(
      getBooksForSale(predicate || "popular", bookFilterParams, {
        ...pagination,
        pageIndex: 1,
      })
    );
    // eslint-disable-next-line
  }, [bookFilterParams, keywords]);

  const handleChangePrice = (event: any, newValue: number | number[]) => {
    const price = newValue as number[];
    setBookFilterParams({
      ...bookFilterParams,
      minPrice: price[0],
      maxPrice: price[1],
    });
  };

  const handleClearAllFilter = () => {
    setBookFilterParams(initBookFilterParams);

    setAttributesCheckedState(Array(attributes.length).fill(false));
    setAuthorsCheckedState(Array(authours.length).fill(false));
    setLanguagesCheckedState(Array(languages.length).fill(false));
    setRatesCheckedState(Array(rates.length).fill(false));
    setChipFilterParams(initChipFilterParams);
    setCheckedCategory([]);
  };

  /*-------------------------------Mobile Filter--------------------------------*/
  const [openFilter, setOpenFilter] = React.useState(false);

  const handleClickOpen = () => {
    setOpenFilter(true);
  };

  const handleClose = () => {
    setOpenFilter(false);
  };

  return (
    <div>
      <Grid container direction="row">
        {/*-------------------------------Desktop Filter--------------------------------*/}
        <Grid item md={4} className={classes.desktop}>
          <Grid container>
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              style={{ marginLeft: "110px" }}
              onClick={handleClearAllFilter}
            >
              Clear all filter
            </Button>
            <Grid container direction="column" className={classes.grid}>
              <Collapse in={isOpen.category} collapsedSize={82}>
                <Paper variant="outlined" className={classes.paper}>
                  <div className={classes.filterTitle}>
                    <h3>Category</h3>
                    <span
                      className="curso r-pointer icon"
                      onClick={() =>
                        setOpen({ ...isOpen, category: !isOpen.category })
                      }
                    >
                      {isOpen.category ? <RemoveIcon /> : <AddIcon />}
                    </span>
                  </div>
                  <CategorySelectTreeView
                    categories={categories}
                    handleCategoryChange={handleCategoryChange}
                    checked={checkedCategory}
                  />
                </Paper>
              </Collapse>
              <Collapse in={isOpen.author} collapsedSize={82}>
                <Paper variant="outlined" className={classes.paper}>
                  <div className={classes.filterTitle}>
                    <h3>Author</h3>
                    <span
                      className="curso r-pointer icon"
                      onClick={() =>
                        setOpen({ ...isOpen, author: !isOpen.author })
                      }
                    >
                      {isOpen.author ? <RemoveIcon /> : <AddIcon />}
                    </span>
                  </div>
                  <SelectedFilters
                    key={0}
                    data={authours}
                    bookFilterParams={bookFilterParams}
                    handleChange={handleAuthorChange}
                    checkedState={authorsCheckedState}
                  />
                </Paper>
              </Collapse>

              <Collapse in={isOpen.language} collapsedSize={82}>
                <Paper variant="outlined" className={classes.paper}>
                  <div className={classes.filterTitle}>
                    <h3>Language</h3>
                    <span
                      className="curso r-pointer icon"
                      onClick={() =>
                        setOpen({ ...isOpen, language: !isOpen.language })
                      }
                    >
                      {isOpen.language ? <RemoveIcon /> : <AddIcon />}
                    </span>
                  </div>
                  <SelectedFilters
                    key={1}
                    data={languages}
                    bookFilterParams={bookFilterParams}
                    handleChange={handleLanguageChange}
                    checkedState={languagesCheckedState}
                  />
                </Paper>
              </Collapse>

              <Collapse in={isOpen.format} collapsedSize={82}>
                <Paper variant="outlined" className={classes.paper}>
                  <div className={classes.filterTitle}>
                    <h3>Format</h3>
                    <span
                      className="curso r-pointer icon"
                      onClick={() =>
                        setOpen({ ...isOpen, format: !isOpen.format })
                      }
                    >
                      {isOpen.format ? <RemoveIcon /> : <AddIcon />}
                    </span>
                  </div>
                  <SelectedFilters
                    key={2}
                    data={attributes}
                    bookFilterParams={bookFilterParams}
                    handleChange={handleAttributeChange}
                    checkedState={attributesCheckedState}
                  />
                </Paper>
              </Collapse>

              <Collapse in={isOpen.price} collapsedSize={82}>
                <Paper variant="outlined" className={classes.paper}>
                  <div className={classes.filterTitle}>
                    <h3>Filter by price</h3>
                    <span
                      className="curso r-pointer icon"
                      onClick={() =>
                        setOpen({ ...isOpen, price: !isOpen.price })
                      }
                    >
                      {isOpen.price ? <RemoveIcon /> : <AddIcon />}
                    </span>
                  </div>
                  <PriceFilter
                    bookFilterParams={bookFilterParams}
                    handleChange={handleChangePrice}
                  />
                </Paper>
              </Collapse>

              <Collapse in={isOpen.review} collapsedSize={82}>
                <Paper variant="outlined" className={classes.paper}>
                  <div className={classes.filterTitle}>
                    <h3>By Reivew</h3>
                    <span
                      className="curso r-pointer icon"
                      onClick={() =>
                        setOpen({ ...isOpen, review: !isOpen.review })
                      }
                    >
                      {isOpen.review ? <RemoveIcon /> : <AddIcon />}
                    </span>
                  </div>
                  <ReviewFilter
                    data={rates}
                    bookFilterParams={bookFilterParams}
                    handleChange={handleRateChange}
                    checkedState={ratesCheckedState}
                  />
                </Paper>
              </Collapse>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid item xs={12} style={{ display: "flex", flexWrap: "wrap" }}>
            {chipFilterParams.categoryChips.length > 0 ? (
              <FilterChips
                filterData={chipFilterParams.categoryChips}
                handleDelete={handleRemoveCategoryChip}
              />
            ) : null}
            {chipFilterParams.authorChips.length > 0 ? (
              <FilterChips
                filterData={chipFilterParams.authorChips}
                handleDelete={handleAuthorChange}
              />
            ) : null}
            {chipFilterParams.languageChips.length > 0 ? (
              <FilterChips
                filterData={chipFilterParams.languageChips}
                handleDelete={handleLanguageChange}
              />
            ) : null}
            {chipFilterParams.attributeChips.length > 0 ? (
              <FilterChips
                filterData={chipFilterParams.attributeChips}
                handleDelete={handleAttributeChange}
              />
            ) : null}
            {chipFilterParams.ratesChips.length > 0 ? (
              <FilterChips
                filterData={chipFilterParams.ratesChips}
                handleDelete={handleRateChange}
              />
            ) : null}
          </Grid>
          {/*-------------------------------List Books For Sale--------------------------------*/}
          <ListBookForSale />
        </Grid>
      </Grid>

      <div className={classes.mobile}>
        <Fab
          variant="extended"
          size="medium"
          color="secondary"
          aria-label="add"
          onClick={handleClickOpen}
        >
          <FilterListRoundedIcon className={classes.extendedIcon} />
          Filter
        </Fab>
      </div>

      {/*-------------------------------MobileFilter--------------------------------*/}
      <Dialog
        fullScreen
        open={openFilter}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Filter
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Button
          variant="contained"
          color="secondary"
          size="medium"
          style={{ width: 200, textTransform: "none" }}
          onClick={handleClearAllFilter}
        >
          Clear all filter
        </Button>
        <Grid container>
          <Grid container direction="column">
            <Collapse in={isOpen.category} collapsedSize={82}>
              <Paper variant="outlined" className={classes.paper}>
                <div>
                  <h3>Category</h3>
                  <span
                    className="curso r-pointer icon"
                    onClick={() =>
                      setOpen({ ...isOpen, category: !isOpen.category })
                    }
                  >
                    {isOpen.category ? <RemoveIcon /> : <AddIcon />}
                  </span>
                </div>
                <CategorySelectTreeView
                  categories={categories}
                  handleCategoryChange={handleCategoryChange}
                  checked={checkedCategory}
                />
              </Paper>
            </Collapse>

            <Collapse in={isOpen.author} collapsedSize={82}>
              <Paper variant="outlined" className={classes.paper}>
                <div>
                  <h3>Author</h3>
                  <span
                    className="curso r-pointer icon"
                    onClick={() =>
                      setOpen({ ...isOpen, author: !isOpen.author })
                    }
                  >
                    {isOpen.author ? <RemoveIcon /> : <AddIcon />}
                  </span>
                </div>
                <SelectedFilters
                  key={3}
                  data={authours}
                  bookFilterParams={bookFilterParams}
                  handleChange={handleAuthorChange}
                  checkedState={authorsCheckedState}
                />
              </Paper>
            </Collapse>

            <Collapse in={isOpen.language} collapsedSize={82}>
              <Paper variant="outlined" className={classes.paper}>
                <div>
                  <h3>Language</h3>
                  <span
                    className="curso r-pointer icon"
                    onClick={() =>
                      setOpen({ ...isOpen, language: !isOpen.language })
                    }
                  >
                    {isOpen.language ? <RemoveIcon /> : <AddIcon />}
                  </span>
                </div>
                <SelectedFilters
                  key={4}
                  data={languages}
                  bookFilterParams={bookFilterParams}
                  handleChange={handleLanguageChange}
                  checkedState={languagesCheckedState}
                />
              </Paper>
            </Collapse>

            <Collapse in={isOpen.format} collapsedSize={82}>
              <Paper variant="outlined" className={classes.paper}>
                <div>
                  <h3>Format</h3>
                  <span
                    className="curso r-pointer icon"
                    onClick={() =>
                      setOpen({ ...isOpen, format: !isOpen.format })
                    }
                  >
                    {isOpen.format ? <RemoveIcon /> : <AddIcon />}
                  </span>
                </div>
                <SelectedFilters
                  key={5}
                  data={attributes}
                  bookFilterParams={bookFilterParams}
                  handleChange={handleAttributeChange}
                  checkedState={attributesCheckedState}
                />
              </Paper>
            </Collapse>

            <Collapse in={isOpen.price} collapsedSize={82}>
              <Paper variant="outlined" className={classes.paper}>
                <div>
                  <h3>Filter by price</h3>
                  <span
                    className="curso r-pointer icon"
                    onClick={() => setOpen({ ...isOpen, price: !isOpen.price })}
                  >
                    {isOpen.price ? <RemoveIcon /> : <AddIcon />}
                  </span>
                </div>
                <PriceFilter
                  bookFilterParams={bookFilterParams}
                  handleChange={handleChangePrice}
                />
              </Paper>
            </Collapse>

            <Collapse in={isOpen.review} collapsedSize={82}>
              <Paper variant="outlined" className={classes.paper}>
                <div>
                  <h3>By Review</h3>
                  <span
                    className="curso r-pointer icon"
                    onClick={() =>
                      setOpen({ ...isOpen, review: !isOpen.review })
                    }
                  >
                    {isOpen.review ? <RemoveIcon /> : <AddIcon />}
                  </span>
                </div>
                <ReviewFilter
                  data={rates}
                  bookFilterParams={bookFilterParams}
                  handleChange={handleRateChange}
                  checkedState={ratesCheckedState}
                />
              </Paper>
            </Collapse>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};
export default BooksForSalePage;

const useStyles = makeStyles((theme: Theme) => ({
  grid: {
    margin: "20px 30px 0px 110px",
  },
  paper: {
    // maxWidth: "50%",
    borderRadius: 0,
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(4, 4),
    "& h3": {
      margin: 0,
    },
  },
  collapse: {
    marginTop: "15px",
  },
  item: {
    margin: theme.spacing(2, 2),
  },

  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  mobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      position: "sticky",
      bottom: 80,
      textAlign: "center",
    },
  },
  desktop: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  wrapper: {
    position: "absolute",
  },
  root: {
    display: "flex",
    justifyContent: "start",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  filterTitle: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

import {
  AppBar,
  Button,
  Checkbox,
  Collapse,
  Dialog,
  Fab,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Slide,
  Slider,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootStore } from "../../redux/store";
import ListBookForSale from "./ListBookForSale";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Author from "../../model/author";
import { Language } from "../../model/language";
import CloseIcon from "@material-ui/icons/Close";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import { TransitionProps } from "@material-ui/core/transitions";
import { getLanguages } from "../../redux/actions/language/getAction";
import { getCategories } from "../../redux/actions/category/getAction";
import { getAllAuthor } from "../../redux/actions/author/getActions";
import { getAttributes } from "../../redux/actions/attribute/getAction";
import { getBooksForSale } from "../../redux/actions/books/getAction";
import { Category } from "../../model/category";
import Attribute from "../../model/attribute";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BooksForSalePage: React.FunctionComponent<{}> = (props) => {
  /*-------------------------------Desktop Filter--------------------------------*/
  const classes = useStyles();
  const dispatch = useDispatch();
  const { predicate } = useParams() as any;

  //Selector
  const categories = useSelector((state: RootStore) => state.categoryBfs.data);
  const languages = useSelector((state: RootStore) => state.languages.data);
  const authours = useSelector((state: RootStore) => state.author.data);
  const attributes = useSelector((state: RootStore) => state.attributes.data);
  const pagination = useSelector((state: RootStore) => state.books.pagination);

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
  const [bookFilterParams, setBookFilterParams] = useState({
    categoryId: "",
    authorId: "",
    languageIds: "",
    attributeId: "",
    minPrice: 0,
    maxPrice: 1000,
    rates: 0,
  });

  //Function
  function handleLanguageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      setBookFilterParams({
        ...bookFilterParams,
        languageIds: event.target.name,
      });
    }
  }

  function handleCategoryChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      setBookFilterParams({
        ...bookFilterParams,
        categoryId: event.target.name,
      });
    }
  }

  function handleAuthorChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      setBookFilterParams({
        ...bookFilterParams,
        authorId: event.target.name,
      });
    }
  }

  function handleAttributeChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      setBookFilterParams({
        ...bookFilterParams,
        attributeId: event.target.name,
      });
    }
  }

  //useEffect
  useEffect(() => {
    dispatch(getLanguages());
    dispatch(getCategories());
    dispatch(getAllAuthor());
    dispatch(
      getAttributes({
        onSuccess: () => {},
        onFailure: () => {},
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("bfs: " + JSON.stringify(bookFilterParams));
    dispatch(
      getBooksForSale(predicate, bookFilterParams, {
        ...pagination,
      })
    );
    console.log("change :");
    // eslint-disable-next-line
  }, [bookFilterParams]);

  const handleChangePrice = (event: any, newValue: number | number[]) => {
    const price = newValue as number[];
    setBookFilterParams({
      ...bookFilterParams,
      minPrice: price[0],
      maxPrice: price[1],
    });
  };

  const [state, setState] = React.useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    const rateValue = parseInt(event.target.name);
    setBookFilterParams({
      ...bookFilterParams,
      rates: rateValue,
    });
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
        <Grid md={4} className={classes.desktop}>
          <Grid container>
            {/* <Grid item xs={4}> */}
            <Grid container direction="column" className={classes.grid}>
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
                  <Grid
                    item
                    container
                    direction="column"
                    className={classes.collapse}
                  >
                    <span>
                      <FormControl component="fieldset">
                        <FormGroup>
                          {categories?.map((category: Category) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={
                                    category.id === bookFilterParams.categoryId
                                      ? true
                                      : false
                                  }
                                  onChange={handleCategoryChange}
                                  name={category.id}
                                />
                              }
                              label={category.name}
                            />
                          ))}
                        </FormGroup>
                      </FormControl>
                    </span>
                  </Grid>
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
                  <Grid
                    item
                    container
                    direction="column"
                    className={classes.collapse}
                  >
                    <span>
                      <FormControl component="fieldset">
                        <FormGroup>
                          {authours?.map((author: Author) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={
                                    author.id === bookFilterParams.authorId
                                      ? true
                                      : false
                                  }
                                  onChange={handleAuthorChange}
                                  name={author.id}
                                />
                              }
                              label={author.name}
                            />
                          ))}
                        </FormGroup>
                      </FormControl>
                    </span>
                  </Grid>
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
                  <Grid
                    item
                    container
                    direction="column"
                    className={classes.collapse}
                  >
                    <span>
                      <FormControl component="fieldset">
                        <FormGroup>
                          {languages?.map((language: Language) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={
                                    language.id === bookFilterParams.languageIds
                                      ? true
                                      : false
                                  }
                                  onChange={handleLanguageChange}
                                  name={language.id}
                                />
                              }
                              label={language.name}
                            />
                          ))}
                        </FormGroup>
                      </FormControl>
                    </span>
                  </Grid>
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
                  <Grid
                    item
                    container
                    direction="column"
                    className={classes.collapse}
                  >
                    <span>
                      <FormControl component="fieldset">
                        <FormGroup>
                          {attributes?.map((attribute: Attribute) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={
                                    attribute.id ===
                                    bookFilterParams.attributeId
                                      ? true
                                      : false
                                  }
                                  onChange={handleAttributeChange}
                                  name={attribute.id}
                                />
                              }
                              label={attribute.name}
                            />
                          ))}
                        </FormGroup>
                      </FormControl>
                    </span>
                  </Grid>
                </Paper>
              </Collapse>

              <Collapse in={isOpen.price} collapsedSize={82}>
                <Paper variant="outlined" className={classes.paper}>
                  <div>
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
                  <Grid
                    item
                    container
                    direction="column"
                    className={classes.collapse}
                  >
                    <Slider
                      value={[
                        bookFilterParams.minPrice,
                        bookFilterParams.maxPrice,
                      ]}
                      onChange={handleChangePrice}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      className={classes.slider}
                      max={1000}
                    />
                    <p className={classes.price}>
                      Price: ${bookFilterParams.minPrice} - $
                      {bookFilterParams.maxPrice}
                    </p>
                  </Grid>
                </Paper>
              </Collapse>

              <Collapse in={isOpen.review} collapsedSize={82}>
                <Paper variant="outlined" className={classes.paper}>
                  <div>
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
                  <Grid
                    item
                    container
                    direction="column"
                    className={classes.collapse}
                  >
                    <FormControl component="fieldset">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                bookFilterParams.rates === 5 ? true : false
                              }
                              onChange={handleRateChange}
                              name="5"
                            />
                          }
                          label={<Rating name="read-only" value={5} readOnly />}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                bookFilterParams.rates === 4 ? true : false
                              }
                              onChange={handleRateChange}
                              name="4"
                            />
                          }
                          label={<Rating name="read-only" value={4} readOnly />}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                bookFilterParams.rates === 3 ? true : false
                              }
                              onChange={handleRateChange}
                              name="3"
                            />
                          }
                          label={<Rating name="read-only" value={3} readOnly />}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                bookFilterParams.rates === 2 ? true : false
                              }
                              onChange={handleRateChange}
                              name="2"
                            />
                          }
                          label={<Rating name="read-only" value={2} readOnly />}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                bookFilterParams.rates === 1 ? true : false
                              }
                              onChange={handleRateChange}
                              name="1"
                            />
                          }
                          label={<Rating name="read-only" value={1} readOnly />}
                        />
                      </FormGroup>
                    </FormControl>
                  </Grid>
                </Paper>
              </Collapse>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          {/*-------------------------------List Books For Sale--------------------------------*/}
          <ListBookForSale />
        </Grid>
      </Grid>

      <div className={classes.mobile}>
        <Fab
          variant="extended"
          size="medium"
          color="primary"
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
                <Grid
                  item
                  container
                  direction="column"
                  className={classes.collapse}
                >
                  <span>
                    <FormControl component="fieldset">
                      <FormGroup>
                        {categories?.map((category: Category) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  category.id === bookFilterParams.categoryId
                                    ? true
                                    : false
                                }
                                onChange={handleCategoryChange}
                                name={category.id}
                              />
                            }
                            label={category.name}
                          />
                        ))}
                      </FormGroup>
                    </FormControl>
                  </span>
                </Grid>
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
                <Grid
                  item
                  container
                  direction="column"
                  className={classes.collapse}
                >
                  <span>
                    <FormControl component="fieldset">
                      <FormGroup>
                        {authours?.map((author: Author) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  author.id === bookFilterParams.authorId
                                    ? true
                                    : false
                                }
                                onChange={handleAuthorChange}
                                name={author.id}
                              />
                            }
                            label={author.name}
                          />
                        ))}
                      </FormGroup>
                    </FormControl>
                  </span>
                </Grid>
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
                <Grid
                  item
                  container
                  direction="column"
                  className={classes.collapse}
                >
                  <span>
                    <FormControl component="fieldset">
                      <FormGroup>
                        {languages?.map((language: Language) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  language.id === bookFilterParams.languageIds
                                    ? true
                                    : false
                                }
                                onChange={handleLanguageChange}
                                name={language.id}
                              />
                            }
                            label={language.name}
                          />
                        ))}
                      </FormGroup>
                    </FormControl>
                  </span>
                </Grid>
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
                <Grid
                  item
                  container
                  direction="column"
                  className={classes.collapse}
                >
                  <span>
                    <FormControl component="fieldset">
                      <FormGroup>
                        {attributes?.map((attribute: Attribute) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  attribute.id === bookFilterParams.attributeId
                                    ? true
                                    : false
                                }
                                onChange={handleAttributeChange}
                                name={attribute.id}
                              />
                            }
                            label={attribute.name}
                          />
                        ))}
                      </FormGroup>
                    </FormControl>
                  </span>
                </Grid>
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
                <Grid
                  item
                  container
                  direction="column"
                  className={classes.collapse}
                >
                  <Slider
                    value={[
                      bookFilterParams.minPrice,
                      bookFilterParams.maxPrice,
                    ]}
                    onChange={handleChangePrice}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    className={classes.slider}
                    max={1000}
                  />
                  <p className={classes.price}>
                    Price: ${bookFilterParams.minPrice} - $
                    {bookFilterParams.maxPrice}
                  </p>
                </Grid>
              </Paper>
            </Collapse>

            <Collapse in={isOpen.review} collapsedSize={82}>
              <Paper variant="outlined" className={classes.paper}>
                <div>
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
                <Grid
                  item
                  container
                  direction="column"
                  className={classes.collapse}
                >
                  <FormControl component="fieldset">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              bookFilterParams.rates === 5 ? true : false
                            }
                            onChange={handleRateChange}
                            name="5"
                          />
                        }
                        label={<Rating name="read-only" value={5} readOnly />}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              bookFilterParams.rates === 4 ? true : false
                            }
                            onChange={handleRateChange}
                            name="4"
                          />
                        }
                        label={<Rating name="read-only" value={4} readOnly />}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              bookFilterParams.rates === 3 ? true : false
                            }
                            onChange={handleRateChange}
                            name="3"
                          />
                        }
                        label={<Rating name="read-only" value={3} readOnly />}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              bookFilterParams.rates === 2 ? true : false
                            }
                            onChange={handleRateChange}
                            name="2"
                          />
                        }
                        label={<Rating name="read-only" value={2} readOnly />}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              bookFilterParams.rates === 1 ? true : false
                            }
                            onChange={handleRateChange}
                            name="1"
                          />
                        }
                        label={<Rating name="read-only" value={1} readOnly />}
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
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
    margin: "50px 30px 0px 110px",
  },
  paper: {
    // maxWidth: "50%",
    borderRadius: 0,
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(4, 4),
    "& div": {
      justifyContent: "space-between",
      display: "flex",
    },
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
  slider: {
    color: "black",
  },
  price: {
    textAlign: "center",
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
}));

import {
  Button,
  Checkbox,
  Collapse,
  createStyles,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  Link,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Theme,
} from "@material-ui/core";
import "date-fns";
import { ContentState, convertFromHTML, EditorState } from "draft-js";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import VisibilityIcon from "@material-ui/icons/Visibility";
import TodayIcon from "@material-ui/icons/Today";
import ProductImage from "./components/ProductImage";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "redux/store";
import { useParams } from "react-router-dom";
import { getProductDetail } from "redux/actions/product/getActions";
import { format, getYear } from "date-fns";
import { getCategories } from "redux/actions/category/getAction";
import { getAttributes } from "redux/actions/attribute/getAction";
import { getLanguages } from "redux/actions/language/getAction";
import { BookDetail } from "model/book";
import { BookAttribute } from "model/attribute";
import { convertToHTML } from "draft-convert";

export default function ProductDetail() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { bookId } = useParams() as any;
  console.log("book id params: " + bookId);

  const initialBookParams: BookDetail = {
    id: "",
    name: "",
    shortDescription: "",
    description: "",
    price: 0,
    salePrice: 0,
    viewCount: 0,
    media: [],
    authorId: "",
    authorName: "",
    attributes: [],
    languageId: "",
    language: "",
    dimensions: "",
    publicationDate: new Date(),
    publisher: "",
    publicationCountry: "",
    stockStatus: "",
    totalStock: 0,
    isPublic: false,
    updateDate: new Date(),
    categoryIds: [],
  };
  //Selector
  const bookDetail = useSelector(
    (state: RootStore) => state.books.currentObject
  );
  const attributesSelectMenu = useSelector(
    (state: RootStore) => state.attributes.data
  );
  const categories = useSelector((state: RootStore) => state.categories.data);
  const languages = useSelector((state: RootStore) => state.languages.data);

  //State
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [shortDescription, setShortDescription] = useState(
    EditorState.createEmpty()
  );

  const [bookParams, setBooksParams] = useState<BookDetail>(
    bookDetail ? bookDetail : initialBookParams
  );

  const [mediaState, setMediaState] = useState(bookParams.media);


  const [isOpen, setOpen] = useState({
    image: true,
    category: true,
    public: true,
    language: true,
    publication: true,
  });
  const [attributeSelected, setAttributeSelected] = useState("");

  const [openAttr, setOpenAttr] = useState(new Array(0).fill(false));

  const [categoryState, setCategoryState] = useState(new Array(0).fill(false));


  //Function
  function handleImageChange (media: any){
    console.log("media ne: " + media);
    setMediaState(media);
  } 
  const handleDescriptionChange = (editorState: EditorState) => {
    setDescription(editorState);
    setBooksParams({
      ...bookParams,
      description: convertToHTML(description.getCurrentContent()),
    })
  };

  const handleShortDescriptionChange = (editorState: EditorState) => {
    setShortDescription(editorState);
    setBooksParams({
      ...bookParams,
      shortDescription: convertToHTML(shortDescription.getCurrentContent()),
    })
  };

  const handleAttributeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setAttributeSelected(event.target.value as string);
  };

  function updateCategoryState(categoryId: string, check: boolean){
    setCategoryState(categories.map((category, index) => {
      return category.id === categoryId ? check : categoryState[index];
    }));
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
    updateCategoryState(event.target.name, event.target.checked);
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if(event.target.checked){
      setBooksParams({
        ...bookParams,
        languageId: event.target.name
      })
    }
  };

  const handlePublicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBooksParams({
      ...bookParams,
      isPublic: event.target.checked
    })
  };

  const handleDateChange = (date: Date | null) => {
    console.log("loop");
    // dispatch({type:change_date,index})// attr attr[index].date=date
    // setSelectedDate(date);
  };
  const handleExpand = (index: number, newVal: boolean) => {
    setOpenAttr(
      openAttr.map((currentVal, id) => {
        return id === index ? newVal : currentVal;
      })
    );
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setBooksParams({
      ...bookParams,
      [event.target.name]: value,
    });
    console.log("book params:" + JSON.stringify(bookParams));
  }

  const handleSubmit = () => {
    const categoryIdsStateCheckList = categories.filter((category, index) => {
      return categoryState[index] === true
    })
    const categoryIdsCheckList : string[] = categoryIdsStateCheckList.map(x => x.id);

    setBooksParams({
      ...bookParams,
      categoryIds: categoryIdsCheckList,
      description: convertToHTML(description.getCurrentContent()),
      shortDescription: convertToHTML(shortDescription.getCurrentContent())
    })

   

    console.log("book params: "+ JSON.stringify(bookParams));
  }


  //Effect
  useEffect(() => {
    if (bookId) {
      dispatch(
        getProductDetail({
          id: bookId,
          onSuccess: (bookDetail:any) => {
            setOpenAttr(new Array(bookDetail.attributes?.length).fill(true));
            setBooksParams(bookDetail);
            setCategoryState(categories.map((category, index) => {
              return bookParams.categoryIds?.includes(category.id) ? true : false;
            }));
            setMediaState(bookDetail.media);
            if (bookDetail?.description) {
              setDescription(
                EditorState.createWithContent(
                  ContentState.createFromBlockArray(
                    convertFromHTML(bookDetail?.description).contentBlocks,
                    convertFromHTML(bookDetail?.description).entityMap
                  )
                )
              );
            }
      
            if (bookDetail?.shortDescription) {
              setShortDescription(
                EditorState.createWithContent(
                  ContentState.createFromBlockArray(
                    convertFromHTML(bookDetail?.shortDescription).contentBlocks,
                    convertFromHTML(bookDetail?.shortDescription).entityMap
                  )
                )
              );
            }
          },
          onFailure: () => {},
        })
      );
      
      // setOpenAttr(new Array(bookDetail.attributes?.length).fill(true));
      // setBooksParams(bookDetail);
      // setCategoryState(categories.map((category, index) => {
      //   return bookParams.categoryIds?.includes(category.id) ? true : false;
      // }));

     
    }

    dispatch(getAttributes());
    dispatch(getCategories());
    dispatch(getLanguages());
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId]);

  return (
    <div className={classes.root}>
      <Grid container direction="row" spacing={2}>
        <Grid item container xs={9} direction="column" spacing={2}>
          <Paper className={classes.paper}>
            <Grid item>
              <TextField
                id="name"
                name="name"
                label="Book name"
                variant="outlined"
                fullWidth
                value={bookParams.name}
                className={classes.text}
                onChange={handleChange}
              ></TextField>
            </Grid>
          </Paper>

          <Grid item className={classes.richText}>
            <Paper className={classes.paper}>
              <Editor
                editorState={description}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={handleDescriptionChange}
              />
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.collapsePaper}>
              <h3>Product data</h3>
            </Paper>
            <Paper className={classes.paper}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Attribute
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={attributeSelected}
                  onChange={handleAttributeChange}
                  label="Attribute"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {attributesSelectMenu?.map((attr) => (
                    <MenuItem value={attr.id}>{attr.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="outlined" className={classes.btn}>
                Add
              </Button>

              {bookParams.attributes?.map(
                (attr: BookAttribute, index: number) => {
                  return (
                    <Collapse in={openAttr[index]} collapsedSize={50}>
                      <Paper
                        variant="outlined"
                        className={classes.collapsePaperAttr}
                      >
                        <div className={classes.attribute}>
                          <h3>{attr.name}</h3>
                          <span
                            className="curso r-pointer icon"
                            //   onClick={() =>
                            //     setOpen({ ...isOpen, category: !isOpen.category })
                            //   }
                          >
                            {openAttr[index] ? (
                              <RemoveIcon
                                onClick={() => handleExpand(index, false)}
                              />
                            ) : (
                              <AddIcon
                                onClick={() => handleExpand(index, true)}
                              />
                            )}
                          </span>
                        </div>
                        <Grid
                          item
                          container
                          direction="row"
                          className={classes.collapse}
                          spacing={4}
                        >
                          <Grid item xs={6} direction="column">
                            <span className={classes.attribute}>
                              <p>Price ($):</p>
                              <TextField
                                id="standard-size-small"
                                size="small"
                                variant="outlined"
                                className={classes.input}
                                value={attr.price}
                              />
                            </span>

                            <span className={classes.attribute}>
                              <p>Total stock:</p>
                              <TextField
                                id="filled-number"
                                type="number"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                variant="outlined"
                                size="small"
                                className={classes.input}
                                value={attr.totalStock}
                              />
                            </span>

                            <Button size="small" className={classes.removeBtn}>
                              Remove
                            </Button>
                          </Grid>

                          <Grid item xs={6} direction="column">
                            <span className={classes.attribute}>
                              <p>Sale price ($):</p>
                              <TextField
                                id="standard-size-small"
                                size="small"
                                variant="outlined"
                                className={classes.input}
                                value={attr.salePrice}
                              />
                            </span>
                            <span className={classes.attribute}>
                              <p>Sale start date:</p>
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justifyContent="space-around">
                                  <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    value={
                                      getYear(
                                        new Date(attr.salePriceStartDate)
                                      ) === 1
                                        ? null
                                        : new Date(attr.salePriceStartDate)
                                    }
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                      "aria-label": "change date",
                                    }}
                                  />
                                </Grid>
                              </MuiPickersUtilsProvider>
                            </span>

                            <span className={classes.attribute}>
                              <p>Sale end date:</p>
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justifyContent="space-around">
                                  <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    value={
                                      getYear(
                                        new Date(attr.salePriceEndDate)
                                      ) === 1
                                        ? null
                                        : new Date(attr.salePriceEndDate)
                                    }
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                      "aria-label": "change date",
                                    }}
                                  />
                                </Grid>
                              </MuiPickersUtilsProvider>
                            </span>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Collapse>
                  );
                }
              )}
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.collapsePaper}>
              <h3>Short description</h3>
            </Paper>
            <Paper className={classes.paper}>
              <Editor
                editorState={shortDescription}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={handleShortDescriptionChange}
              />
            </Paper>
          </Grid>

          <Grid item container direction="row">
            <Grid item xs={6}>
              <Grid item className={classes.collapse}>
                <Collapse in={isOpen.language} collapsedSize={50}>
                  <Paper variant="outlined" className={classes.collapsePaper}>
                    <div className={classes.attribute}>
                      <h3>Product language</h3>
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
                      <span className={classes.checkBox}>
                        <FormControl component="fieldset">
                          <FormGroup>
                            {languages?.map((language) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={(language.id === bookParams.languageId) ? true : false}
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
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Grid item className={classes.collapse}>
                <Collapse in={isOpen.publication} collapsedSize={50}>
                  <Paper variant="outlined" className={classes.collapsePaper}>
                    <div className={classes.attribute}>
                      <h3>Product public infomation</h3>
                      <span
                        className="curso r-pointer icon"
                        onClick={() =>
                          setOpen({
                            ...isOpen,
                            publication: !isOpen.publication,
                          })
                        }
                      >
                        {isOpen.publication ? <RemoveIcon /> : <AddIcon />}
                      </span>
                    </div>
                    <Grid
                      item
                      container
                      direction="column"
                      className={classes.collapse}
                    >
                      <span className={classes.attribute}>
                        <p>Dimensions: </p>
                        <TextField
                          id="dimensions"
                          name="dimensions"
                          type="text"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          size="small"
                          className={classes.inputInfor}
                          value={bookParams.dimensions}
                          onChange={handleChange}
                        />
                      </span>

                      <span className={classes.attribute}>
                        <p>Publisher:</p>
                        <TextField
                          id="publisher"
                          name="publisher"
                          type="text"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          size="small"
                          className={classes.inputInfor}
                          value={bookParams.publisher ?? null}
                          onChange={handleChange}
                        />
                      </span>

                      <span className={classes.attribute}>
                        <p>Publication country:</p>
                        <TextField
                          id="publicationCountry"
                          name="publicationCountry"
                          type="text"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          size="small"
                          className={classes.inputInfor}
                          value={bookParams.publicationCountry}
                          onChange={handleChange}
                        />
                      </span>

                      <span className={classes.attribute}>
                        <p>Publication date:</p>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container justifyContent="flex-end">
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              format="dd/MM/yyyy"
                              margin="normal"
                              id="date-picker-inline"
                              value={
                                getYear(
                                  new Date(bookParams.publicationDate)
                                ) === 1
                                  ? null
                                  : new Date(bookParams.publicationDate)
                              }
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </span>
                    </Grid>
                  </Paper>
                </Collapse>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={3} direction="column">
          <Grid item>
            <Collapse in={isOpen.image} collapsedSize={50}>
              <Paper variant="outlined" className={classes.collapsePaper}>
                <div className={classes.attribute}>
                  <h3>Product image</h3>
                  <span
                    className="curso r-pointer icon"
                    onClick={() => setOpen({ ...isOpen, image: !isOpen.image })}
                  >
                    {isOpen.image ? <RemoveIcon /> : <AddIcon />}
                  </span>
                </div>
                <Grid
                  item
                  container
                  direction="column"
                  className={classes.collapse}
                >
                  <ProductImage media={mediaState} changeImage={handleImageChange}/>
                </Grid>
              </Paper>
            </Collapse>
          </Grid>

          <Grid item className={classes.collapse}>
            <Collapse in={isOpen.category} collapsedSize={50}>
              <Paper variant="outlined" className={classes.collapsePaper}>
                <div className={classes.attribute}>
                  <h3>Product categories</h3>
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
                  <span className={classes.checkBox}>
                    <FormControl component="fieldset">
                      <FormGroup>
                        {categories?.map((category, i) => (
                       
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={categoryState[i] ?? false}
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
          </Grid>

          <Grid item className={classes.collapse}>
            <Collapse in={isOpen.public} collapsedSize={50}>
              <Paper variant="outlined" className={classes.collapsePaper}>
                <div className={classes.attribute}>
                  <h3>Public</h3>
                  <span
                    className="curso r-pointer icon"
                    onClick={() =>
                      setOpen({ ...isOpen, public: !isOpen.public })
                    }
                  >
                    {isOpen.public ? <RemoveIcon /> : <AddIcon />}
                  </span>
                </div>
                <Grid
                  item
                  container
                  direction="column"
                  className={classes.collapse}
                >
                  <span className={classes.icon}>
                    <VisibilityIcon /> Status:{" "}
                  </span>
                  <span className={classes.checkBox}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={(bookParams.isPublic === true) ? true : false}
                          onChange={handlePublicChange}
                          name="published"
                          size="small"
                        />
                      }
                      label="Published"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!bookParams.isPublic}
                          onChange={handlePublicChange}
                          name="draft"
                          size="small"
                          disabled
                        />
                      }
                      label="Draft"
                    />
                  </span>

                  <span className={classes.icon}>
                    <TodayIcon /> Publish on:{" "}
                    {bookParams.updateDate &&
                      format(new Date(bookParams.updateDate), "PPP")}
                  </span>
                  <span className={classes.attribute}>
                    <Link href="#" className={classes.trash}>
                      Move to trash
                    </Link>
                    <Button variant="contained" className={classes.btnBlue} onClick={handleSubmit}>
                      Update
                    </Button>
                  </span>
                </Grid>
              </Paper>
            </Collapse>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    actionsContainer: {},
    title: {
      alignItems: "center",
      width: "100%",
    },
    formControl: {
      margin: "5px 5px 5px 50px",
      minWidth: 200,
      "& .MuiSelect-select": {
        maxHeight: "10px",
      },
    },
    collapsePaper: {
      borderRadius: 0,
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing(2, 4),
      "& h3": {
        margin: 0,
      },
    },
    collapsePaperAttr: {
      margin: "0px 50px",
      borderRadius: 0,
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing(2, 4),
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
    paper: {
      marginBottom: "20px",
    },
    richText: {
      "& .rdw-editor-main": {
        height: "200px",
      },
    },

    attribute: {
      display: "flex",
      justifyContent: "space-between",
    },
    attributeInfo: {
      display: "flex",
      justifyContent: "end",
    },
    label: {
      margin: "auto",
    },
    input: {
      width: "300px",
    },
    inputInfor: {
      width: "250px",
    },
    btn: {
      marginTop: "10px",
      color: "#135e96",
      borderColor: "#135e96",
    },
    trash: {
      color: "#b32d2e",
      textDecoration: "underline",
      marginLeft: "10px",
      marginTop: "10px",
      fontWeight: "bold",
    },
    btnBlue: {
      backgroundColor: "#135e96",
      color: "#fff",
      width: "100px",
      marginRight: "10px",
      marginBottom: "10px",
    },
    checkBox: {
      marginLeft: "30px",
      "& .MuiTypography-body1": {
        fontSize: "12px",
      },
    },
    icon: {
      display: "flex",
      alignItems: "center",
      marginBottom: 10,
    },
    removeBtn: {
      backgroundColor: "#b32d2e",
      color: "#fff",
      margin: "30px 0px",
    },
    text: {
      "& .MuiInputBase-input": {
        fontWeight: "bold",
      },
    },
  })
);

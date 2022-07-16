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
  Radio,
  RadioGroup,
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
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "redux/store";
import { useHistory, useParams } from "react-router-dom";
import { getProductDetail } from "redux/actions/product/getActions";
import { format, getYear } from "date-fns";
import { getCategories } from "redux/actions/category/getAction";
import { getAttributes } from "redux/actions/attribute/getAction";
import { getLanguages } from "redux/actions/language/getAction";
import { BookDetail } from "model/book";
import { BookAttribute } from "model/attribute";
import { convertToHTML } from "draft-convert";
import { addBook } from "redux/actions/product/postAction";
import { useSnackbar } from "notistack";
import VInput from "components/form/VInput";
import { ValidationName } from "helper/useValidator";
import ImageUploadContainer from "components/imageUpload/ImageUploadContainer";
import ProductDataContainer from "./components/ProductDataContainer";
import { Media } from "model/media";
import HeaderPage from "components/headerPage/HeaderPage";
import AuthorSelect from "components/AuthorSelect";
import { Author } from "model/author";

export default function ProductDetail() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  let { bookId } = useParams() as any;
  const history = useHistory();
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
    categoryIds: [] as string[],
    files: [],
    author: [] as Author[],
  };
  //Selector
  const bookDetail = useSelector(
    (state: RootStore) => state.books.currentObject
  );
  const attributesSelectMenu = useSelector(
    (state: RootStore) => state.attributes.data
  );
  const categories = useSelector(
    (state: RootStore) => state.categories.dataOptions
  );
  const languages = useSelector((state: RootStore) => state.languages.data);

  //State
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [shortDescription, setShortDescription] = useState(
    EditorState.createEmpty()
  );

  const [bookParams, setBooksParams] = useState<BookDetail>(
    bookDetail ? bookDetail : initialBookParams
  );
  type BookFile = File & Media;

  const [mediaState, setMediaState] = useState(bookParams.media);
  const [filesState, setFilesState] = useState<BookFile[]>(
    (bookParams.media as any) || []
  );

  useEffect(() => {
    if (bookParams.media?.length) {
      setFilesState(bookParams.media as any);
    }
  }, [bookParams.media]);

  const [isOpen, setOpen] = useState({
    image: true,
    category: true,
    public: true,
    language: true,
    publication: true,
    author: true,
  });
  const [attributeSelected, setAttributeSelected] = useState("");
  const [bookAttributeSelected, setBookAttributeSelected] = useState<
    BookAttribute[]
  >([]);

  const [isSubmit, setIsSubmit] = useState(false);

  const [openAttr, setOpenAttr] = useState(new Array(0).fill(false));

  // const [categoryState, setCategoryState] = useState(new Array(0).fill(false));

  const [attributeMenuState, setAttributeMenuState] =
    useState(attributesSelectMenu);

  const [isAdd, setAdd] = useState(false);

  //Function

  function handlePublicationDateChange(date: Date | null) {
    if (date) {
      setBooksParams({
        ...bookParams,
        publicationDate: new Date(date),
      });
    }
  }

  function handleChangeAttributeData(
    attributeId: string,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null,
    date: Date | null,
    dateName?: string
  ) {
    if (event) {
      setBookAttributeSelected(
        bookAttributeSelected.map((item) =>
          item.id === attributeId
            ? { ...item, [event.target.name]: Number(event.target.value) }
            : item
        )
      );
    }
    if (date && dateName === "salePriceStartDate") {
      setBookAttributeSelected(
        bookAttributeSelected.map((item) =>
          item.id === attributeId
            ? { ...item, salePriceStartDate: new Date(date) }
            : item
        )
      );
    }

    if (date && dateName === "salePriceEndDate") {
      setBookAttributeSelected(
        bookAttributeSelected.map((item) =>
          item.id === attributeId
            ? { ...item, salePriceEndDate: new Date(date) }
            : item
        )
      );
    }
  }

  function handleRemoveAttribute(attributeId: string) {
    setBookAttributeSelected(
      bookAttributeSelected.filter((x) => x.id !== attributeId)
    );
    const attributeToReturn = attributesSelectMenu.find(
      (x) => x.id === attributeId
    );
    if (attributeToReturn) {
      setAttributeMenuState((attributeMenuState) => [
        ...attributeMenuState,
        attributeToReturn,
      ]);
    }
  }
  function handleAddAttribute() {
    let attributeSelectedItem = attributeMenuState.find(
      (x) => x.id === attributeSelected
    );

    if (attributeSelectedItem) {
      const newAttribute: BookAttribute = {
        id: attributeSelectedItem.id || "",
        name: attributeSelectedItem.name,
        price: 0,
        salePrice: 0,
        totalStock: 0,
        salePriceStartDate: new Date(),
        salePriceEndDate: new Date(),
      };
      setBookAttributeSelected((bookAttributeSelected) => [
        ...bookAttributeSelected,
        newAttribute,
      ]);
      setAttributeMenuState(
        attributeMenuState.filter((x) => x.id !== newAttribute.id)
      );
    }

    setOpenAttr(new Array(bookAttributeSelected.length + 1).fill(true));
    setBooksParams({
      ...bookParams,
      attributes: bookAttributeSelected,
    });
  }
  // function handleImageChange(media: any) {
  //   setMediaState(media);
  // }
  const handleDescriptionChange = (editorState: EditorState) => {
    setDescription(editorState);
    setBooksParams({
      ...bookParams,
      description: convertToHTML(description.getCurrentContent()),
    });
  };

  const handleShortDescriptionChange = (editorState: EditorState) => {
    setShortDescription(editorState);
    setBooksParams({
      ...bookParams,
      shortDescription: convertToHTML(shortDescription.getCurrentContent()),
    });
  };

  const handleAttributeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setAttributeSelected(event.target.value as string);
  };

  // function updateCategoryState(categoryId: string, check: boolean) {
  //   setCategoryState(
  //     categories.map((category, index) => {
  //       return category.id === categoryId ? check : categoryState[index];
  //     })
  //   );
  // }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // updateCategoryState(event.target.name, event.target.checked);
    setBooksParams({
      ...bookParams,
      categoryIds: bookParams.categoryIds?.includes(
        event.target.name.toUpperCase()
      )
        ? (bookParams.categoryIds.filter(
            (x) => x !== event.target.name
          ) as string[])
        : !bookParams.categoryIds
        ? [event.target.name]
        : bookParams.categoryIds?.concat(event.target.name as string),
    });
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setBooksParams({
        ...bookParams,
        languageId: event.target.name,
      });
    }
  };

  const handlePublicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBooksParams({
      ...bookParams,
      isPublic: (event.target.value === "true") as boolean,
    });
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
  }

  const handleSubmit = () => {
    setIsSubmit(true);
    /**
     *  handle data again
     */

    if (!bookParams.name) {
      return;
    }
    if (!bookParams.attributes) {
      enqueueSnackbar("Please choose attributes", { variant: "error" });
      return;
    }
    setBooksParams({
      ...bookParams,
      // categoryIds: [...categoryIdsCheckList],
      publicationDate: bookParams.publicationDate || new Date(),
      description: convertToHTML(description.getCurrentContent()),
      shortDescription: convertToHTML(shortDescription.getCurrentContent()),
      attributes: [...bookAttributeSelected],
      media: mediaState,
      files: filesState as [],
    });
    setAdd(true);
  };

  //Effect
  useEffect(() => {
    if (isAdd) {
      dispatch(
        addBook({
          bookParams: bookParams,
          onSuccess: () => {
            if (bookId) {
              enqueueSnackbar("Edit book successfully", { variant: "success" });
            } else {
              enqueueSnackbar("Add book successfully", { variant: "success" });
            }
            history.goBack();
          },
          onFailure: () => {},
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdd]);
  useEffect(() => {
    dispatch(getCategories());
    if (bookId) {
      dispatch(
        getProductDetail({
          id: bookId,
          onSuccess: (bookDetail: any) => {
            setBooksParams(bookDetail);
            setMediaState(bookDetail.media);
            setBookAttributeSelected(bookDetail.attributes);
            setOpenAttr(new Array(bookDetail.attributes.length + 1).fill(true));
            setAttributeMenuState(
              attributeMenuState.filter((attr) => {
                return !bookAttributeSelected
                  .map((x) => x.id)
                  .includes(attr.id);
              })
            );
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
    }

    dispatch(
      getAttributes({
        onSuccess: (attribute: any) => {
          setAttributeMenuState(attribute);
        },
        onFailure: () => {},
      })
    );

    dispatch(getLanguages());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId]);
  useEffect(() => {
    setIsSubmit(false);
  }, [bookParams]);

  return (
    <div className={classes.root}>
      <HeaderPage title="Create Book" />
      <Grid container direction="row" spacing={2}>
        <Grid item container xs={9} direction="column" style={{ gap: "28px" }}>
          <Grid item>
            <ProductDataContainer title="Name">
              <VInput
                id="name"
                name="name"
                label="Book name"
                variant="outlined"
                fullWidth
                value={bookParams.name}
                className={classes.text}
                onChange={handleChange}
                rules={[ValidationName.Required]}
                inputRef={(input) => {
                  if (input != null && isSubmit) {
                    input.focus();
                    input.blur();
                  }
                }}
              />
            </ProductDataContainer>
          </Grid>
          <Grid item className={classes.richText}>
            <ProductDataContainer title="Description">
              <Editor
                editorState={description}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={handleDescriptionChange}
              />
            </ProductDataContainer>
          </Grid>
          <Grid item>
            <ProductDataContainer title="Product data">
              <div>
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
                    {attributeMenuState?.map((attr, index) => (
                      <MenuItem key={`menu-attr-${index}`} value={attr.id}>
                        {attr.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  className={classes.btn}
                  onClick={handleAddAttribute}
                >
                  Add
                </Button>

                {bookAttributeSelected?.map(
                  (attr: BookAttribute, index: number) => {
                    return (
                      <Collapse
                        in={openAttr[index]}
                        collapsedSize={50}
                        key={`collapse-${index}`}
                      >
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
                            <Grid item xs={6}>
                              <span className={classes.attribute}>
                                <p>Price ($):</p>
                                <TextField
                                  id="standard-size-small"
                                  name="price"
                                  size="small"
                                  variant="outlined"
                                  className={classes.input}
                                  value={attr.price}
                                  onChange={(e) =>
                                    handleChangeAttributeData(attr.id, e, null)
                                  }
                                />
                              </span>

                              <span className={classes.attribute}>
                                <p>Total stock:</p>
                                <TextField
                                  id="filled-number"
                                  name="totalStock"
                                  type="number"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  variant="outlined"
                                  size="small"
                                  className={classes.input}
                                  value={attr.totalStock}
                                  onChange={(e) =>
                                    handleChangeAttributeData(attr.id, e, null)
                                  }
                                />
                              </span>

                              <Button
                                size="small"
                                className={classes.removeBtn}
                                onClick={() => handleRemoveAttribute(attr.id)}
                              >
                                Remove
                              </Button>
                            </Grid>

                            <Grid item xs={6}>
                              <span className={classes.attribute}>
                                <p>Sale price ($):</p>
                                <TextField
                                  id="standard-size-small"
                                  name="salePrice"
                                  size="small"
                                  variant="outlined"
                                  className={classes.input}
                                  value={attr.salePrice}
                                  onChange={(e) =>
                                    handleChangeAttributeData(attr.id, e, null)
                                  }
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
                                      onChange={(date) =>
                                        handleChangeAttributeData(
                                          attr.id,
                                          null,
                                          date,
                                          "salePriceStartDate"
                                        )
                                      }
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
                                      onChange={(date) =>
                                        handleChangeAttributeData(
                                          attr.id,
                                          null,
                                          date,
                                          "salePriceEndDate"
                                        )
                                      }
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
              </div>
            </ProductDataContainer>
          </Grid>
          <Grid item>
            <ProductDataContainer title="Short description">
              <Editor
                editorState={shortDescription}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={handleShortDescriptionChange}
              />
            </ProductDataContainer>
          </Grid>
          <Grid item>
            <ProductDataContainer title="Product Images">
              <ImageUploadContainer
                files={filesState}
                setFiles={(val) => setFilesState(val)}
                onRemoveFile={(file) =>
                  setFilesState(filesState.filter((x) => x !== file))
                }
              />
            </ProductDataContainer>
          </Grid>
        </Grid>
        <Grid item container xs={3} direction="column" style={{ gap: "28px" }}>
          <Grid item className={classes.collapse}>
            <ProductDataContainer
              title="Product public infomation"
              isOpen={isOpen.publication}
              setOpen={() =>
                setOpen({
                  ...isOpen,
                  publication: !isOpen.publication,
                })
              }
            >
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
                          bookParams.publicationDate
                            ? new Date(bookParams.publicationDate)
                            : new Date()
                        }
                        onChange={handlePublicationDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </span>
              </Grid>
            </ProductDataContainer>
          </Grid>
          <Grid item className={classes.collapse}>
            <ProductDataContainer
              title="Product language"
              isOpen={isOpen.language}
              setOpen={() => setOpen({ ...isOpen, language: !isOpen.language })}
            >
              <Grid
                item
                container
                direction="column"
                className={classes.collapse}
              >
                <span className={classes.checkBox}>
                  <FormControl component="fieldset">
                    <FormGroup>
                      {languages?.map((language, index) => (
                        <FormControlLabel
                          key={`prod-lang-${index}`}
                          control={
                            <Checkbox
                              checked={
                                language.id === bookParams.languageId
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
            </ProductDataContainer>
          </Grid>

          <Grid item className={classes.collapse}>
            <ProductDataContainer
              title="Product categories"
              isOpen={isOpen.category}
              setOpen={() => setOpen({ ...isOpen, category: !isOpen.category })}
            >
              <Grid
                item
                container
                direction="column"
                className={classes.collapse}
              >
                <span className={classes.checkBox}>
                  <FormControl component="fieldset">
                    <FormGroup key={`list-checkbox-${bookParams?.id}`}>
                      {categories?.map((category, index) => (
                        <FormControlLabel
                          key={`cate-${index}`}
                          control={
                            <Checkbox
                              key={category.id}
                              checked={bookParams?.categoryIds?.includes(
                                category.id.toLocaleUpperCase()
                              )}
                              onChange={handleCategoryChange}
                              name={category.id.toUpperCase()}
                            />
                          }
                          label={category.name}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                </span>
              </Grid>
            </ProductDataContainer>
          </Grid>

          <Grid item className={classes.collapse}>
            <ProductDataContainer
              title="Author"
              isOpen={isOpen.author}
              setOpen={() => setOpen({ ...isOpen, author: !isOpen.author })}
            >
              <Grid
                item
                container
                direction="column"
                className={classes.collapse}
              >
                <AuthorSelect
                  value={bookParams.authorId}
                  onChange={(value) => {
                    setBooksParams({
                      ...bookParams,
                      author: value,
                      authorId: value.id,
                    });
                  }}
                />
              </Grid>
            </ProductDataContainer>
          </Grid>

          <Grid item className={classes.collapse}>
            <ProductDataContainer
              title="Public"
              isOpen={isOpen.public}
              setOpen={() => setOpen({ ...isOpen, public: !isOpen.public })}
            >
              <Grid
                item
                container
                direction="column"
                className={classes.collapse}
              >
                <span className={classes.icon}>
                  <VisibilityIcon style={{ marginRight: "8px" }} /> Status:{" "}
                </span>
                {/* <span className={classes.checkBox}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={bookParams.isPublic === true ? true : false}
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
                  </span> */}
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    defaultValue="false"
                    value={bookParams.isPublic?.toString()}
                    name="radio-buttons-group"
                    onChange={handlePublicChange}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Published"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="Draft"
                    />
                  </RadioGroup>
                </FormControl>

                {bookParams.id && (
                  <span className={classes.icon}>
                    <TodayIcon /> Publish on:{" "}
                    {bookParams.updateDate &&
                      format(new Date(bookParams.updateDate), "PPP")}
                  </span>
                )}

                <span className={classes.attribute}>
                  <Link href="#" className={classes.trash}>
                    Move to trash
                  </Link>
                  <Button
                    variant="contained"
                    className={classes.btnBlue}
                    onClick={handleSubmit}
                  >
                    {bookParams.id ? "Update" : "Create"}
                  </Button>
                </span>
              </Grid>
            </ProductDataContainer>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // padding: "0 16px",
      margin: " 0 5rem ",
    },
    actionsContainer: {},
    title: {
      alignItems: "center",
      width: "100%",
    },
    formControl: {
      margin: "5px 5px 5px 50px",
      minWidth: 200,
      "& .MuiInputBase-formControl": {
        maxHeight: "40px",
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
      margin: "10px 50px",
      borderRadius: 0,
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing(2, 4),
      "& h3": {
        margin: 0,
      },
    },
    collapse: {
      // marginTop: "15px",
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
      marginTop: "8px",
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

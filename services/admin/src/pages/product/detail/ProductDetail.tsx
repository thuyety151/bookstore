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
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
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
import { Attribute } from "model/attribute";

export default function ProductDetail() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { bookId } = useParams() as any;
  const [description, setDescription] = useState(EditorState.createEmpty());
  const bookDetail = useSelector(
    (state: RootStore) => state.books.currentObject
  );
  const attributesSelectMenu = useSelector(
    (state: RootStore) => state.attributes.data
  );

  useEffect(() => {
    console.log("dddd");
    dispatch(
      getProductDetail({
        id: bookId,
        onSuccess: () => {},
        onFailure: () => {},
      })
    );
    setOpenAttr(new Array(bookDetail.attributes?.length).fill(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, bookId]);

  const handleDescriptionChange = (editorState: EditorState) => {
    setDescription(editorState);
  };

  const [attributeSelected, setAttributeSelected] = useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log("loop");
    setAttributeSelected(event.target.value as string);
  };

  const [isOpen, setOpen] = useState({
    image: true,
    category: true,
    public: true,
  });
  const [openAttr, setOpenAttr] = useState(new Array(0).fill(false));
  console.log("opp", openAttr);

  const [isPublic, setPublic] = useState(true);

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
    console.log("Adsd", openAttr);
  };
  return (
    <div className={classes.root}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={9} direction="column" spacing={2}>
          <Paper className={classes.paper}>
            <Grid item>
              <TextField
                id="outlined-basic"
                label="Book name"
                variant="outlined"
                fullWidth
                value={bookDetail.name}
              ></TextField>
            </Grid>
          </Paper>

          <Grid item>
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
                  onChange={handleChange}
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
              {bookDetail.attributes?.map((attr, index: number) => {
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

                          <Button
                            size="small"
                            className={classes.removeBtn}
                          >
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
                            {getYear(new Date(attr.salePriceEndDate))}
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <Grid container justifyContent="space-around">
                                <KeyboardDatePicker
                                  disableToolbar
                                  variant="inline"
                                  format="MM/dd/yyyy"
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
                            {/* {setSelectedDate(attr.salePriceEndDate)} */}
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <Grid container justifyContent="space-around">
                                <KeyboardDatePicker
                                  disableToolbar
                                  variant="inline"
                                  format="MM/dd/yyyy"
                                  margin="normal"
                                  id="date-picker-inline"
                                  value={
                                    getYear(new Date(attr.salePriceEndDate)) ===
                                    1
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
              })}
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.collapsePaper}>
              <h3>Short description</h3>
            </Paper>
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
        </Grid>
        <Grid item xs={3} direction="column">
          <Grid item>
            <Collapse in={isOpen.image} collapsedSize={50}>
              <Paper variant="outlined" className={classes.collapsePaper}>
                <div className={classes.attribute}>
                  <h3>Product image</h3>
                  <span
                    className="curso r-pointer icon"
                    onClick={() =>
                      setOpen({ ...isOpen, image: !isOpen.image })
                    }
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
                  <ProductImage media={bookDetail.media} />
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
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={true}
                              onChange={handleChange}
                              name="gilad"
                            />
                          }
                          label="Gilad Gray"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={true}
                              onChange={handleChange}
                              name="jason"
                            />
                          }
                          label="Jason Killian"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={false}
                              onChange={handleChange}
                              name="antoine"
                            />
                          }
                          label="Antoine Llorca"
                        />
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
                          checked={isPublic}
                          onChange={handleChange}
                          name="published"
                          size="small"
                        />
                      }
                      label="Published"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!isPublic}
                          onChange={handleChange}
                          name="draft"
                          size="small"
                        />
                      }
                      label="Draft"
                    />
                  </span>

                  <span className={classes.icon}>
                    <TodayIcon /> Publish on: {bookDetail.publicationDate}
                  </span>
                  <span className={classes.attribute}>
                    <Link href="#" className={classes.trash}>
                      Move to trash
                    </Link>
                    <Button variant="contained" className={classes.btnBlue}>
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
      marginBottom: "30px",
    },
    attribute: {
      display: "flex",
      justifyContent: "space-between",
    },
    label: {
      margin: "auto",
    },
    input: {
      width: "350px",
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
      marginBottom: 10
    },
    removeBtn: {
      backgroundColor: "#b32d2e",
      color: "#fff"
    }
  })
);

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
import React, { useState } from "react";
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
import ImageUploadWidget from "components/imageUpload/ImageUploadWidget";
import ProductImage from "./components/ProductImage";
import ImageReview from "components/imageUpload/ImageReview";


export default function ProductDetail() {
  //TODO: hard data
  //const imageUrl =  "https://res.cloudinary.com/dnjhqv3qw/image/upload/v1637631791/ivkjdto0blzz99zsx2cj.jpg";
  const imageUrl =null;
  const classes = useStyles();
  const [description, setDescription] = useState(EditorState.createEmpty());

  const handleDescriptionChange = (editorState: EditorState) => {
    setDescription(editorState);
  };

  const [age, setAge] = useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  const [isOpen, setOpen] = useState({
    category: true,
    author: true,
    language: true,
    format: true,
    price: true,
    review: true,
    feature: true,
  });

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date("2014-08-18T21:11:54")
  );

  const [isPublic, setPublic] = useState(true);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
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
            <Paper className={classes.collapsePaper}><h3>Product data</h3></Paper>
            <Paper className={classes.paper}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Attribute
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={age}
                  onChange={handleChange}
                  label="Attribute"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <Button variant="outlined" className={classes.btn}>
                Add
              </Button>

              <Collapse in={true} collapsedSize={120}>
                <Paper variant="outlined" className={classes.collapsePaper}>
                  <div className={classes.attribute}>
                    <h3>Category</h3>
                    <span
                      className="curso r-pointer icon"
                      //   onClick={() =>
                      //     setOpen({ ...isOpen, category: !isOpen.category })
                      //   }
                    >
                      {isOpen.category ? <RemoveIcon /> : <AddIcon />}
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
                        />
                      </span>
                    </Grid>

                    <Grid item xs={6} direction="column">
                      <span className={classes.attribute}>
                        <p>Sale price ($):</p>
                        <TextField
                          id="standard-size-small"
                          size="small"
                          variant="outlined"
                          className={classes.input}
                        />
                      </span>
                      <span className={classes.attribute}>
                        <p>Sale start date:</p>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container justifyContent="space-around">
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              id="date-picker-inline"
                              value={selectedDate}
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
                              format="MM/dd/yyyy"
                              margin="normal"
                              id="date-picker-inline"
                              value={selectedDate}
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
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.collapsePaper}><h3>Short description</h3></Paper>
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
            <Collapse in={isOpen.author} collapsedSize={50}>
              <Paper variant="outlined" className={classes.collapsePaper}>
                <div className={classes.attribute}>
                  <h3>Product image</h3>
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
                  {imageUrl ? <ProductImage imageUrl={imageUrl} /> : <ImageReview />}
                </Grid>
              </Paper>
            </Collapse>
          </Grid>

          <Grid item>
            <Collapse in={isOpen.language} collapsedSize={50}>
              <Paper variant="outlined" className={classes.collapsePaper}>
                <div className={classes.attribute}>
                  <h3>Product categories</h3>
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

          <Grid item>
            <Collapse in={isOpen.author} collapsedSize={50}>
              <Paper variant="outlined" className={classes.collapsePaper}>
                <div className={classes.attribute}>
                  <h3>Public</h3>
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
                  <span className={classes.icon}>
                <VisibilityIcon />{" "}Status:{" "}
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
                    <TodayIcon /> {" "} Publish on: Jun 17, 2022
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
      margin: theme.spacing(1),
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
      marginTop: "15px",
      marginLeft: "15px",
      color: "#135e96",
      borderColor: "#135e96"
    },
    trash: {
      color: "red",
      textDecoration: "underline",
      marginLeft: "10px",
      marginTop: "10px",
      fontWeight: "bold"
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
        alignItems: "center"
    }
  })
);

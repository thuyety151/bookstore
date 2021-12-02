import {
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  makeStyles,
  Paper,
  Slider,
  Theme,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Rating } from "@material-ui/lab";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../../redux/store";

export default function BooksForSale() {
  const classes = useStyles();
  const [isOpen, setOpen] = useState({
    category: true,
    author: true,
    language: true,
    format: true,
    price: true,
    review: true,
    feature: true,
  });
  //Selector
  const categories = useSelector((state: RootStore) => state.categoryBfs);


  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChangePrice = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const { gilad, jason, antoine } = state;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
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
              <span className={classes.item}>Bussiness</span>
              <span className={classes.item}>Bussiness</span>
              <span className={classes.item}>Bussiness</span>
              <span className={classes.item}>Bussiness</span>
            </Grid>
          </Paper>
        </Collapse>

        <Collapse in={isOpen.author} collapsedSize={82}>
          <Paper variant="outlined" className={classes.paper}>
            <div>
              <h3>Author</h3>
              <span
                className="curso r-pointer icon"
                onClick={() => setOpen({ ...isOpen, author: !isOpen.author })}
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
              <span className={classes.item}>Bussiness</span>
              <span className={classes.item}>Bussiness</span>
              <span className={classes.item}>Bussiness</span>
              <span className={classes.item}>Bussiness</span>
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
              <FormControl component="fieldset">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={gilad}
                        onChange={handleChange}
                        name="gilad"
                      />
                    }
                    label="Gilad Gray"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={jason}
                        onChange={handleChange}
                        name="jason"
                      />
                    }
                    label="Jason Killian"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={antoine}
                        onChange={handleChange}
                        name="antoine"
                      />
                    }
                    label="Antoine Llorca"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Paper>
        </Collapse>

        <Collapse in={isOpen.format} collapsedSize={82}>
          <Paper variant="outlined" className={classes.paper}>
            <div>
              <h3>Format</h3>
              <span
                className="curso r-pointer icon"
                onClick={() => setOpen({ ...isOpen, format: !isOpen.format })}
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
              <span className={classes.item}>Bussiness</span>
              <span className={classes.item}>Bussiness</span>
              <span className={classes.item}>Bussiness</span>
              <span className={classes.item}>Bussiness</span>
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
                value={value}
                onChange={handleChangePrice}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                className={classes.slider}
              />
              <p className={classes.price}>Price: 0 - 100</p>
            </Grid>
          </Paper>
        </Collapse>

        <Collapse in={isOpen.review} collapsedSize={82}>
          <Paper variant="outlined" className={classes.paper}>
            <div>
              <h3>By Reivew</h3>
              <span
                className="curso r-pointer icon"
                onClick={() => setOpen({ ...isOpen, review: !isOpen.review })}
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
                        checked={gilad}
                        onChange={handleChange}
                        name="gilad"
                      />
                    }
                    label={<Rating name="read-only" value={5} readOnly />}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={jason}
                        onChange={handleChange}
                        name="jason"
                      />
                    }
                    label={<Rating name="read-only" value={4} readOnly />}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={antoine}
                        onChange={handleChange}
                        name="antoine"
                      />
                    }
                    label={<Rating name="read-only" value={3} readOnly />}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={antoine}
                        onChange={handleChange}
                        name="antoine"
                      />
                    }
                    label={<Rating name="read-only" value={2} readOnly />}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={antoine}
                        onChange={handleChange}
                        name="antoine"
                      />
                    }
                    label={<Rating name="read-only" value={1} readOnly />}
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Paper>
        </Collapse>

        <Collapse in={isOpen.feature} collapsedSize={82}>
          <Paper variant="outlined" className={classes.paper}>
            <div>
              <h3>Feature Books</h3>
              <span
                className="curso r-pointer icon"
                onClick={() => setOpen({ ...isOpen, feature: !isOpen.feature })}
              >
                {isOpen.feature ? <RemoveIcon /> : <AddIcon />}
              </span>
            </div>
            <Grid
              item
              container
              direction="column"
              className={classes.collapse}
            >
              <span className={classes.item}>Bussiness</span>
              <span className={classes.item}>Bussiness</span>
              <span className={classes.item}>Bussiness</span>
              <span className={classes.item}>Bussiness</span>
            </Grid>
          </Paper>
        </Collapse>
      </Grid>
      {/* </Grid> */}
      <Grid item xs={8}></Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  grid: {
    margin: "50px 30px 0px 120px",
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
}));

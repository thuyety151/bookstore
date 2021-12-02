import React from "react";
import {
  withStyles,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300 + theme.spacing(3) * 2,
    },
    margin: {
      height: theme.spacing(3),
    },
  })
);

const PrettoSlider = withStyles({
  root: {
    color: "red",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    pointerEvents: "none"
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

interface Props {
  value : number
}
export default function CustomizedSlider({value} : Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PrettoSlider
        valueLabelDisplay="off"
        aria-label="pretto slider"
        defaultValue={value}      
      />
    </div>
  );
}

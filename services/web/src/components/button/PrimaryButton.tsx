import React from "react";
import {
  Button,
  ButtonProps,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";

const PrimaryButton: React.FC<{ props: ButtonProps; text: string }> = ({
  props,
  text,
}) => {
  const classes = useStyles();

  return (
    <Grid item container justifyContent="center" alignContent="center" xs={12}>
      <Button
        variant="contained"
        style={{ backgroundColor: "#000", color: "#fff" }}
        fullWidth
        className={classes.btn}
        {...props}
      >
        {text}
      </Button>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  btn: {
    padding: theme.spacing(3, 3),
    margin: theme.spacing(1, 4),
    backgroundColor: "#000",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#000",
      color: "#fff",
    },
  },
}));
export default PrimaryButton;

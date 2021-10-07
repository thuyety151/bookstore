import React from "react";
import { Button, Grid, makeStyles, Theme } from "@material-ui/core";

const PrimaryButton: React.FC<{ text: string }> = ({text}) => {
  const classes = useStyles();

  return (
    <Grid item container justifyContent="center" alignContent="center" xs={12}>
      <Button
        variant="contained"
        style={{ backgroundColor: "#000", color: "#fff" }}
        fullWidth
        className={classes.btn}
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
    "&:hover": {
      backgroundColor: "#000",
      color: "#fff",
    },
  },
}));
export default PrimaryButton;

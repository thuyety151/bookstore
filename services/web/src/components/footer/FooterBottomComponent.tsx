import {
  createStyles,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Paper,
  Select,
  Theme,
} from "@material-ui/core";
import VisaLogo from "../../assets/images/visa-logo.png";
import PaypalLogo from "../../assets/images/paypal-logo.png";
import MasterCardLogo from "../../assets/images/MasterCard_Logo.png";
import React from "react";

const FooterBottomComponent: React.FC = () => {
  const classes = useStyles();
  const [state, setState] = React.useState<{
    age: string | number;
    name: string;
  }>({
    age: "",
    name: "hai",
  });
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof state;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} elevation={0}>
            <span>©2021 Book Worm. All rights reserved</span>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} elevation={0}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <div>
                <img style={{ height: 30 }} src={VisaLogo} alt="visa" />
                <img style={{ height: 30 }} src={PaypalLogo} alt="paypal" />
                <img style={{ height: 30 }} src={MasterCardLogo} alt="mc" />
              </div>

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Language
                </InputLabel>
                <Select
                  native
                  value={state.age}
                  onChange={handleChange}
                  label="Age"
                  inputProps={{
                    name: "age",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Currency
                </InputLabel>
                <Select
                  native
                  value={state.age}
                  onChange={handleChange}
                  label="Age"
                  inputProps={{
                    name: "age",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
              </FormControl>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
  })
);
export default FooterBottomComponent;

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
import VisaLogo from "../../../assets/images/visa-logo.png";
import PaypalLogo from "../../../assets/images/paypal-logo.png";
import MasterCardLogo from "../../../assets/images/MasterCard_Logo.png";
import React from "react";
import { lstCurrency, lstLanguage } from "../../../mocks/sidebar";
import { Language } from "../../../model/sidebar";
import "./styles.scss";

const FooterBottomComponent: React.FC = () => {
  const classes = useStyles();
  const [state, setState] = React.useState<{
    language: string | number;
    currency: string;
  }>({
    language: "",
    currency: "",
  });

  const handleChangeLanguage = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setState({ ...state, language: event.target.value as string });
  };
  const handleChangeCurrency = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setState({ ...state, currency: event.target.value as string });
  };
  return (
    <div className="footer__bottom">
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
        <Grid item xs={8} sm={6}>
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
              <div className="footer__bottom select">
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Language
                  </InputLabel>
                  <Select
                    native
                    value={state.language}
                    onChange={handleChangeLanguage}
                    label="Language"
                    inputProps={{
                      name: "age",
                      id: "outlined-age-native-simple",
                    }}
                  >
                    {lstLanguage.map((item: Language, index: number) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Currency
                  </InputLabel>
                  <Select
                    native
                    value={state.currency}
                    onChange={handleChangeCurrency}
                    label="Currency"
                    inputProps={{
                      name: "age",
                      id: "outlined-age-native-simple",
                    }}
                  >
                    {lstCurrency.map((item: Language, index: number) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
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

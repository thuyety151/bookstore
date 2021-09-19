import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { lstCurrency, lstLanguage } from "../../mocks/sidebar";
import { ILanguage } from "../../model/sidebar";
import { Button, Grid } from "@material-ui/core";
import facebook from "../../assets/icons/facebook.svg";
import google from "../../assets/icons/google.svg";
import github from "../../assets/icons/github.svg";
import twitter from "../../assets/icons/twitter.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      width: 300,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      flexGrow: 1,
      padding: theme.spacing(2, 0),
    },
    rootIcon: {
      flexGrow: 1,
    },
  })
);

export default function NativeSelects() {
  const classes = useStyles();
  const [state, setState] = React.useState<{
    language: string | number;
    currency: string;
  }>({
    language: "",
    currency: "",
  });

  const handleChangeLanguage = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState({...state,language: event.target.value as string});
  };
  const handleChangeCurrency = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState({...state,currency: event.target.value as string});
  };
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
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
              {lstLanguage.map((item: ILanguage, index: number) => {
                return (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
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
              {lstCurrency.map((item: ILanguage, index: number) => {
                return (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item  >
          <Button>
            <img src={facebook} style={{ height: 20 }} alt="facebook" />
          </Button>
          <Button>
            <img src={google} style={{ height: 20 }} alt="google" />
          </Button>
          <Button>
            <img src={twitter} style={{ height: 20 }} alt="twitter" />
          </Button>
          <Button>
            <img src={github} style={{ height: 20 }} alt="github" />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

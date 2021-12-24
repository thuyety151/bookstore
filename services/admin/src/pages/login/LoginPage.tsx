import {
  Button,
  CircularProgress,
  createStyles,
  FormHelperText,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import VInput from "components/form/VInput";
import { ValidationName } from "helper/useValidator";
import { get } from "lodash";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "redux/actions/user/userAction";
import { RootStore } from "redux/store";
import { ROUTE_REPORT } from "routers/types";

const LoginPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const { requesting } = useSelector(
    (state: RootStore) => state.authentication
  );
  const getInit = () => ({
    email: "",
    password: "",
  });

  const [form, setform] = useState(getInit());
  const handleChange = (key: string) => (e: any) => {
    setInvalid(false);
    setform({
      ...form,
      [key]: e.target.value,
    });
  };
  const handleSubmit = () => {
    setIsSubmit(true);
    /**
     *  handle data again
     */
    const x = Object.keys(form).map((key: string) => {
      return !!get(form, key); // false is invalid
    });

    if (x.includes(false)) {
      return;
    }

    dispatch(
      login({
        form,
        onSuccess: () => {
          history.push(ROUTE_REPORT);
        },
        onFailure: (error: any) => {
          setInvalid(true);
          enqueueSnackbar(error, { variant: "error" });
        },
      })
    );
  };
  return (
    <div className={classes.root}>
      <Paper variant="outlined" className={classes.container}>
        <Grid container justifyContent="center">
          <Typography variant="h5">Sign In</Typography>
          <Grid container className={classes.contents}>
            <VInput
              value={form.email}
              margin="dense"
              onChange={handleChange("email")}
              rules={[ValidationName.Required]}
              inputRef={(input) => {
                if (input != null && isSubmit) {
                  input.focus();
                  input.blur();
                }
              }}
            />
            <VInput
              value={form.password}
              margin="dense"
              type="password"
              onChange={handleChange("password")}
              rules={[ValidationName.Required]}
              inputRef={(input) => {
                if (input != null && isSubmit) {
                  input.focus();
                  input.blur();
                }
              }}
            />
            {invalid && form.email && form.password && (
              <FormHelperText id="my-helper-text" error={true}>
                Email or password is invalid
              </FormHelperText>
            )}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.signUp}
            onClick={handleSubmit}
          >
            {requesting ? (
              <CircularProgress
                size={26}
                color="inherit"
                style={{ color: "#fff" }}
              />
            ) : (
              " Sign In"
            )}
          </Button>
        </Grid>
      </Paper>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
    signUp: {
      textTransform: "none",
      borderRadius: "50px",
      "& .MuiButtonBase-root": {
        margin: "5px 0px 20px 330px",
      },
    },
    container: {
      width: "30%",
      padding: theme.spacing(8, 2),
    },
    form: {
      display: "flex",
      justifyContent: "center",
    },
    contents: {
      display: "grid",
      justifyContent: "center",
    },
  })
);

export default LoginPage;

import {
  Backdrop,
  Button,
  CircularProgress,
  createStyles,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/actions/user/userAction";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import * as yup from "yup";
import api from "../../boot/axios";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export default function RegisterComponent() {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const [isLoading, setLoading] = useState(false);

  const validationSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    confirmPassword: yup.string().required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword) {
        enqueueSnackbar("Confirm password is not match!", { variant: "error" });
        return;
      }
      let firstName = values.firstName;
      let lastName = values.lastName;
      let email = values.email;
      let password = values.password;

      try {
        setLoading(true);
        var response = await api.post("/account/register", {
          firstName,
          lastName,
          email,
          password,
        });
        if (response.data.token) {
          setLoading(false);
          localStorage.setItem("user", JSON.stringify(response.data));
          enqueueSnackbar("Login successfully", { variant: "success" });
          history.push("/");
        }
      } catch {
        setLoading(false);
        enqueueSnackbar("Email already exists!", {
          variant: "error",
        });
      }
    },
  });
  const handleOnClick = () => {
    history.push("/login");
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} variant="outlined" square>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs container direction="column">
            <Grid item>
              <Typography variant="h4" gutterBottom className={classes.text}>
                Create an account
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" gutterBottom className={classes.text}>
                Already have an account?
                <Link
                  href="#"
                  className={classes.link}
                  onClick={() => {
                    handleOnClick();
                  }}
                >
                  Sign in
                </Link>
              </Typography>
            </Grid>

            <form className={classes.form} onSubmit={formik.handleSubmit}>
              <Grid item xs={12} container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    label="First name"
                    variant="standard"
                    id="firstName"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Last name"
                    variant="standard"
                    id="lastName"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                    color="secondary"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email address"
                    variant="standard"
                    type="email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    color="secondary"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    variant="standard"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    color="secondary"
                    InputProps={{ // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Confirm Password"
                    variant="standard"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    color="secondary"
                    InputProps={{ // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownConfirmPassword}
                          >
                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  {isLoading ? (
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      className={classes.signUp}
                    >
                      <CircularProgress color="inherit" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      className={classes.signUp}
                    >
                      Create account
                    </Button>
                  )}
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "#fff6f6",
      height: 700,
      margin: 0
    },
    paper: {
      padding: theme.spacing(2),
      maxWidth: 500,
      textAlign: "left",
      "&:hover": {
        borderColor: "#000",
      },
      borderRadius: "20px",
      margin: "auto",
      position: "relative",
      top: 40,
    },
    text: {
      marginLeft: "15px",
      marginRight: "5px",
    },
    link: {
      marginLeft: "5px",
      color: "#f50057",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(1),
      "& .MuiTextField-root ": {
        margin: theme.spacing(1),
        width: "400px",
      },
      "& .MuiButtonBase-root": {
        margin: theme.spacing(1),
      },
    },

    signUp: {
      textTransform: "none",
      borderRadius: "50px",
      float: "right",
      marginRight: "70px !important",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

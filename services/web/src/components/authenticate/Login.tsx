import {
  Button,
  createStyles,
  Divider,
  // Divider,
  Grid,
  Link,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/actions/user/userAction";
import { Facebook } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import api from "../../boot/axios";

export default function LoginComponent() {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();


  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      var email = values.email;
      var password = values.password;

      try {
        var response = await api.post("/account/login", { email, password });
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          enqueueSnackbar("Login successfully", {variant: "success"})
          history.push("/");
        }
      }
      catch {
        enqueueSnackbar("Email or password is invalid!", {variant: "error"})
      }

    },
  });

  const handleOnClick = () => {
    history.push("/register");
  };

  const handleFacebookLogin = async () => {
    window.FB.login(
      async (response) => {
        if (response.authResponse) {
          console.log("Welcome!  Fetching your information.... ");
          console.log(response.authResponse.accessToken);

          var responseApi = await api.post(
            `/account/facebook-login?accessToken=${response.authResponse.accessToken}`,
            {}
          );

          console.log(JSON.stringify(responseApi));

          if (responseApi.data) {
            localStorage.setItem("user", JSON.stringify(responseApi.data));
            enqueueSnackbar("Login successfully", {
              variant: "success",
            });
            history.push("/");
          } else {
            enqueueSnackbar("Unauthorize", {
              variant: "error",
            });
          }
        } else {
          enqueueSnackbar("User cancelled login or did not fully authorize.", {
            variant: "error",
          });
        }
      },
      { scope: "public_profile, email" }
    );
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
                Sign in
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" gutterBottom className={classes.text}>
                New user?
                <Link
                  href=""
                  className={classes.link}
                  onClick={() => handleOnClick()}
                >
                  Create new account
                </Link>
              </Typography>
            </Grid>

            <form className={classes.form} onSubmit={formik.handleSubmit}>
              <Grid item xs={12} container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="filled"
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
                    variant="filled"
                    type="password"
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.signUp}
                  >
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </form>

            <Divider className={classes.divider}/>

            <Grid item className={classes.gridFb}>
              <Button
                variant="outlined"
                className={classes.facebook}
                startIcon={<Facebook />}
                onClick={handleFacebookLogin}

              >
                Continue with Facebook
              </Button>
            </Grid>
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
      backgroundColor: "#fff6f6"
    },
    paper: {
      padding: theme.spacing(2),
     
      maxWidth: 500,
      textAlign: "left",
      "&:hover": {
        borderColor: "#000",
      },
      borderRadius: "20px",
      margin: "auto"
    },
    text: {
      marginLeft: "15px",
    },
    link: {
      marginLeft: "5px",
      color: "#f50057"
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(1),
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "400px",
      },
      "& .MuiButtonBase-root": {
        margin: theme.spacing(1),
      },
    },
    button: {
      borderRadius: "50px",
      textTransform: "none",
      width: 300,
      height: "45px",
      fontWeight: 600,
      margin: "5px 20px 5px 70px",
    },
    facebook: {
      background: "#4267B2",
      borderRadius: "50px",
      textTransform: "none",
      width: 300,
      height: "45px",
      fontWeight: 600,
      color: '#fff',
      border: "1px solid #000",
      margin: "auto"
    },
    signUp: {
      textTransform: "none",
      borderRadius: "50px",
      "& .MuiButtonBase-root": {
        margin: "5px 0px 20px 330px",
      },
      float: "right",
      marginRight: "70px !important",
    },
    divider: {
      margin: "10px"
    },

   
    gridFb: {
      margin: "auto"
    }
  })
);

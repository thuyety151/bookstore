import {
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Account } from "../../model/account";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/actions/user/userAction";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "20px 20px 0px 20px",
      padding: "30px",
      boxShadow: "none",
    },
    btn: {
      backgroundColor: "#000",
      color: "#fff",
      padding: theme.spacing(1, 5, 1, 5),
      margin: theme.spacing(3, 0, 0, 0),
      "&:hover": {
        backgroundColor: "#000",
        color: "#fff",
      },
    },
  })
);
export default function AccountDetail() {
  const classes = useStyles();
  const dispatch = useDispatch();
  var user: Account = {
    firstName: "",
    lastName: "",
    token: "",
    email: "",
  };
  const userStorage = localStorage.getItem("user");
  if (userStorage) {
    user = JSON.parse(userStorage) as Account;
  }

  const validationSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.confirmPassword !== values.newPassword) {
        alert("Confirm password is incorect");
      } else {
        localStorage.removeItem("user");
        dispatch(
          userActions.updateAccount(
            values.firstName,
            values.lastName,
            values.currentPassword,
            values.newPassword
          )
        );
        if (localStorage.getItem("user")) {
          alert("Update account successfully");
        }
        else {
            alert("Error when updating");
        }
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Paper className={classes.root}>
          <Grid container spacing={3}>
            <Grid item>
              <Typography variant="h6">Edit Account</Typography>
            </Grid>

            <Grid item container direction="row" spacing={3}>
              <Grid item xs={6} container direction="column">
                <Grid item>
                  <Typography>First Name</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="firstName"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
              </Grid>

              <Grid item xs={6} container direction="column">
                <Grid item>
                  <Typography>Last Name</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    variant="outlined"
                    id="lastName"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} container direction="column">
              <Grid item>
                <Typography>Email</Typography>
              </Grid>
              <Grid item>
                <TextField
                  InputProps={{ readOnly: true }}
                  fullWidth
                  variant="outlined"
                  value={user.email}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Divider />
        <Paper className={classes.root}>
          <Grid container spacing={3}>
            <Grid item>
              <Typography variant="h6">Password Change</Typography>
            </Grid>

            <Grid item xs={12} container direction="column">
              <Grid item>
                <Typography>Current Password</Typography>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="currentPassword"
                  name="currentPassword"
                  value={formik.values.currentPassword}
                  onChange={formik.handleChange}
                  type="password"
                />
              </Grid>
            </Grid>

            <Grid item xs={12} container direction="column">
              <Grid item>
                <Typography>New Password</Typography>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  id="newPassword"
                  name="newPassword"
                  type="password"
                />
              </Grid>
            </Grid>

            <Grid item xs={12} container direction="column">
              <Grid item>
                <Typography>Confirm new password</Typography>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  type="password"
                  variant="outlined"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  id="confirmPassword"
                  name="confirmPassword"
                />
              </Grid>
            </Grid>
          </Grid>
          <Button variant="contained" className={classes.btn} type="submit">
            Save Changes
          </Button>
        </Paper>
      </form>
    </div>
  );
}

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
import { useSnackbar } from "notistack";
import api from "../../boot/axios";
import ImageUploadWidget from "../imagesUpload/ImageUploadWidget";
import { useEffect, useState } from "react";
import "./styles.scss";
import CloseIcon from "@material-ui/icons/Close";

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
  const { enqueueSnackbar } = useSnackbar();
  var user: Account = {
    firstName: "",
    lastName: "",
    token: "",
    email: "",
    photoUrl: "",
  };
  const [files, setFiles] = useState<any>([]);
  const userStorage = localStorage.getItem("user");
  if (userStorage) {
    user = JSON.parse(userStorage) as Account;
  }

  useEffect(() => {
    setFiles([
      {
        preview: user.photoUrl,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validationSchemaInfo = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
  });

  const validationSchemaPassword = yup.object({
    currentPassword: yup.string().required("Password is required"),
    newPassword: yup.string().required("New password is required"),
    confirmPassword: yup.string().required("Confirm password is required"),
  });

  const formikInfor = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      photo: null,
    },
    validationSchema: validationSchemaInfo,
    onSubmit: async (values) => {
      if (files.length > 0 && files[0]?.preview !== user.photoUrl) {
        // update
        let formData = new FormData();
        formData.append("File", files[0]);
        const res = await api.post("/medias", formData, {
          headers: { "Content-type": "multipart/form-data" },
        });
        if (res.data.isSuccess) {
          values.photo = res.data.value;
        }
      }
      try {
        var result = await api.post("/account/update-account-information", {
          firstName: values.firstName,
          lastName: values.lastName,
          photo: values.photo,
        });
        if (result.data.token) {
          localStorage.setItem("user", JSON.stringify(result.data));
          enqueueSnackbar("Update account information successfully", {
            variant: "success",
          });
        } else {
          enqueueSnackbar(result, {
            variant: "error",
          });
        }
      } catch {
        enqueueSnackbar("Error when updating account information", {
          variant: "error",
        });
      }
    },
  });

  const formikPassword = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchemaPassword,
    onSubmit: async (values) => {
      if (values.confirmPassword !== values.newPassword) {
        enqueueSnackbar("Confirm password is incorect", {
          variant: "error",
        });
      } else {
        try {
          var result = await api.post("/account/update-account-password", {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          });
          if (result.data.token) {
            localStorage.setItem("user", JSON.stringify(result.data));
            enqueueSnackbar("Update account password successfully", {
              variant: "success",
            });
          } else {
            enqueueSnackbar(result, {
              variant: "error",
            });
          }
        } catch {
          enqueueSnackbar("Error when updating account: Password incorrect", {
            variant: "error",
          });
        }
      }
    },
  });

  return (
    <div>
      <form onSubmit={formikInfor.handleSubmit}>
        <Paper className={classes.root}>
          <Grid container justifyContent="center" className="avatar">
            {files.length > 0 ? (
              <div className="avatar__container">
                <img
                  src={files[0].preview}
                  className="avatar__display"
                  alt="avatar"
                />
                <div className="avatar__clear">
                  <span onClick={() => setFiles([])}>
                    <CloseIcon fontSize="small" />
                  </span>
                </div>
              </div>
            ) : (
              <ImageUploadWidget
                setFiles={(files: any) => {
                  setFiles(files);
                }}
              />
            )}
          </Grid>
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
                    value={formikInfor.values.firstName}
                    onChange={formikInfor.handleChange}
                    error={
                      formikInfor.touched.firstName &&
                      Boolean(formikInfor.errors.firstName)
                    }
                    helperText={
                      formikInfor.touched.firstName &&
                      formikInfor.errors.firstName
                    }
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
                    value={formikInfor.values.lastName}
                    onChange={formikInfor.handleChange}
                    error={
                      formikInfor.touched.lastName &&
                      Boolean(formikInfor.errors.lastName)
                    }
                    helperText={
                      formikInfor.touched.lastName &&
                      formikInfor.errors.lastName
                    }
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
          <Button variant="contained" className={classes.btn} type="submit">
            Save Changes
          </Button>
        </Paper>
      </form>
      <Divider />

      <form onSubmit={formikPassword.handleSubmit}>
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
                  value={formikPassword.values.currentPassword}
                  onChange={formikPassword.handleChange}
                  type="password"
                  error={
                    formikPassword.touched.currentPassword &&
                    Boolean(formikPassword.errors.currentPassword)
                  }
                  helperText={
                    formikPassword.touched.currentPassword &&
                    formikPassword.errors.currentPassword
                  }
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
                  value={formikPassword.values.newPassword}
                  onChange={formikPassword.handleChange}
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  error={
                    formikPassword.touched.newPassword &&
                    Boolean(formikPassword.errors.newPassword)
                  }
                  helperText={
                    formikPassword.touched.newPassword &&
                    formikPassword.errors.newPassword
                  }
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
                  value={formikPassword.values.confirmPassword}
                  onChange={formikPassword.handleChange}
                  id="confirmPassword"
                  name="confirmPassword"
                  error={
                    formikPassword.touched.confirmPassword &&
                    Boolean(formikPassword.errors.confirmPassword)
                  }
                  helperText={
                    formikPassword.touched.confirmPassword &&
                    formikPassword.errors.confirmPassword
                  }
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

import { Button, Divider, Grid, Paper, TextField, Theme, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Account } from '../../model/account';
import { useFormik } from 'formik';

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
    var user: Account = {
        firstName: "",
        lastName: "",
        token: "",
        email: ""
    };
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
        user = JSON.parse(userStorage) as Account;
    }
    const formik = useFormik({
        initialValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            currentPassword: ' ',
            newPassword: ' ',
            confirmPassword: ' '
        },
        //validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        }

    });
    

    return (
        <div>
            <form onSubmit= {formik.handleSubmit}>
                <Paper className={classes.root} >

                    <Grid container spacing={3}>
                        <Grid item>
                            <Typography variant="h6">Edit Account</Typography>
                        </Grid>

                        <Grid item container direction="row" spacing={3}>
                            <Grid item xs={6} container direction="column">
                                <Grid item>
                                    <Typography>First Name</Typography>
                                </Grid>
                                <Grid item >
                                    <TextField fullWidth variant="outlined" value={formik.values.firstName} onChange={formik.handleChange} />
                                </Grid>
                            </Grid>

                            <Grid item xs={6} container direction="column">
                                <Grid item>
                                    <Typography >Last Name</Typography>
                                </Grid>
                                <Grid item >
                                    <TextField fullWidth variant="outlined" value={formik.values.lastName} onChange={formik.handleChange}  />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} container direction="column">
                            <Grid item>
                                <Typography>Email</Typography>
                            </Grid>
                            <Grid item >
                                <TextField InputProps={{ readOnly: true }} fullWidth variant="outlined" value={user.email} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <Divider />
                <Paper className={classes.root} >
                    <Grid container spacing={3}>
                        <Grid item>
                            <Typography variant="h6" >Password Change</Typography>
                        </Grid>

                        <Grid item xs={12} container direction="column">
                            <Grid item>
                                <Typography>Current Password</Typography>
                            </Grid>
                            <Grid item >
                                <TextField fullWidth variant="outlined" value={formik.values.currentPassword} onChange={formik.handleChange}/>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} container direction="column">
                            <Grid item>
                                <Typography>New Password</Typography>
                            </Grid>
                            <Grid item >
                                <TextField fullWidth variant="outlined" 
                                value={formik.values.newPassword} 
                                onChange={formik.handleChange} 
                                //error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                id ="newPassword"
                                name="newPassword"
                                //helperText={formik.touched.newPassword && formik.errors.newPassword}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} container direction="column">
                            <Grid item>
                                <Typography>Confirm new password</Typography>
                            </Grid>
                            <Grid item >
                                <TextField fullWidth variant="outlined" value={formik.values.confirmPassword} onChange={formik.handleChange}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button variant="contained" className={classes.btn} type="submit" >Save Changes</Button>
                </Paper>
            </form>

        </div>
    )
}
import {
    Button,
    createStyles,
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
import { GitHub, Facebook } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';


export default function LoginComponent() {
    const classes = useStyles();
    const history = useHistory();

    const dispatch = useDispatch();

    const validationSchema = yup.object({
        email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(userActions.login(values.email, values.password));
            if(localStorage.getItem('user')){
                history.push("/");
            }
        }
    })


    const handleOnClick = () => {
        history.push('/register');
    }

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
                            <Typography
                                variant="h4"
                                gutterBottom
                                className={classes.text}

                            >
                                Sign in
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="body2"
                                gutterBottom
                                className={classes.text}
                            >
                                New user?
                                <Link href="" className={classes.link} onClick={() => handleOnClick()}>
                                    Create new account
                                </Link>
                            </Typography>
                        </Grid>

                        <form className={classes.form} onSubmit={formik.handleSubmit}>
                            <Grid item xs={12} container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField label="Email" variant="filled" type="email"
                                        id="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email} />
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
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" className={classes.signUp}>
                                        Sign In
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>

                        {/* <Divider>Or</Divider>  */}

                        <Grid item >
                            <Button variant="outlined" className={classes.button} startIcon={<GitHub />}>
                                Continue with Google
                            </Button>
                        </Grid>
                        <Grid item >
                            <Button variant="outlined" className={classes.facebook} startIcon={<Facebook />}>
                                Continue with Facebook
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>
            </Paper>

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
            margin: "50px 50px 50px 680px",
            maxWidth: 500,
            textAlign: "left",
            "&:hover": {
                borderColor: "#000",
            },
            borderRadius: "20px"
        },
        text: {
            marginLeft: "15px",
        },
        link: {
            marginLeft: "5px"
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.spacing(1),
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '400px',
            },
            '& .MuiButtonBase-root': {
                margin: theme.spacing(1),
            },
        },
        button: {
            borderRadius: "50px",
            textTransform: "none",
            width: 300,
            height: "45px",
            fontWeight: 600,
            margin: "5px 20px 5px 70px"
        },
        facebook: {
            background: "#4267B2",
            borderRadius: "50px",
            textTransform: "none",
            width: 300,
            height: "45px",
            fontWeight: 600,
            margin: "5px 20px 5px 70px"
        },
        signUp: {
            textTransform: "none",
            borderRadius: "50px",
            '& .MuiButtonBase-root': {
                margin: "5px 0px 20px 330px",
            }
        }
    })
);



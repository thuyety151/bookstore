import {
    Button,
    createStyles,
    Grid,
    Link,
    makeStyles,
    Paper,
    TextField,
    Theme,
    Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/actions/user/userAction";
import { GitHub, Facebook } from "@material-ui/icons";
import { useHistory } from "react-router-dom";


export default function RegisterComponent() {
    const classes = useStyles();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(firstName, lastName, email, password);
        if (email && password && firstName && lastName) {
            dispatch(userActions.register(firstName, lastName, email, password));
        }
    }

    const handleOnClick = () => {
        history.push('/login');
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
                                Create an account
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="body2"
                                gutterBottom
                                className={classes.text}
                            >
                                Already have an account?
                                <Link href="#" className={classes.link} onClick={() => {handleOnClick()}}>
                                    Sign in
                                </Link>
                            </Typography>
                        </Grid>

                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid item xs={12} container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField label="First name" variant="standard" required value={firstName} onChange={e => setFirstName(e.target.value)} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Last name" variant="standard" required value={lastName} onChange={e => setLastName(e.target.value)} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Email address" variant="standard" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField label="Password" variant="standard" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="primary" className={classes.signUp}>
                                        Create account
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
            marginRight: "5px"
        },
        link: {
            marginLeft:"5px"
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.spacing(1),
            '& .MuiTextField-root ': {
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

           
        }
    })
);



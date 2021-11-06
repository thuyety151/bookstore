import { Grid, Paper, TextField, Theme, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from "@material-ui/core/styles";
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: "50px 20px 0px 100px",
            padding: "30px"
        },
        text:{
         fontWeight :"bold"
        }
    })
);
export default function BillDetail() {
    const classes = useStyles();
    return (
        <div>
            <Paper variant="outlined" className={classes.root} >
                <Grid container spacing={3}>
                    <Grid item>
                        <Typography variant="h6" className ={classes.text}>Bill details</Typography>
                    </Grid>

                    <Grid item container direction="row" spacing={3}>
                        <Grid item xs={6} container direction="column">
                            <Grid item>
                                <Typography className ={classes.text} >First Name</Typography>
                            </Grid>
                            <Grid item >
                                <TextField InputProps={{readOnly : true}} fullWidth variant="outlined" value="hehe" />
                            </Grid>
                        </Grid>

                        <Grid item xs={6} container direction="column">
                            <Grid item>
                                <Typography className ={classes.text} >Last Name</Typography>
                            </Grid>
                            <Grid item >
                                <TextField InputProps={{readOnly : true}}  fullWidth variant="outlined" value="hehe" />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} container direction="column">
                        <Grid item>
                            <Typography className ={classes.text} >Phone</Typography>
                        </Grid>
                        <Grid item >
                            <TextField InputProps={{readOnly : true}}  fullWidth variant="outlined" value="hehe" />
                        </Grid>
                    </Grid>

                    <Grid xs={12} item container direction="column">
                        <Grid item>
                            <Typography className ={classes.text} >Apartment number</Typography>
                        </Grid>
                        <Grid item >
                            <TextField InputProps={{readOnly : true}}  fullWidth variant="outlined" value="hehe" />
                        </Grid>
                    </Grid>

                    <Grid item xs={12} container direction="column">
                        <Grid item>
                            <Typography className ={classes.text}>Street address</Typography>
                        </Grid>
                        <Grid item >
                            <TextField InputProps={{readOnly : true}}  fullWidth variant="outlined" value="hehe" />
                        </Grid>
                    </Grid>

                    <Grid item xs={12} container direction="column">
                        <Grid item>
                            <Typography className ={classes.text} >Wards</Typography>
                        </Grid>
                        <Grid item >
                            <TextField InputProps={{readOnly : true}}  fullWidth variant="outlined" value="hehe" />
                        </Grid>
                    </Grid>

                    <Grid item xs={12} container direction="column">
                        <Grid item>
                            <Typography className ={classes.text}>District</Typography>
                        </Grid>
                        <Grid item >
                            <TextField InputProps={{readOnly : true}}  fullWidth variant="outlined" value="hehe" />
                        </Grid>
                    </Grid>

                    <Grid item xs={12} container direction="column">
                        <Grid item>
                            <Typography className ={classes.text}>City / Town</Typography>
                        </Grid>
                        <Grid item >
                            <TextField InputProps={{readOnly : true}}  fullWidth variant="outlined" value="hehe" />
                        </Grid>
                    </Grid>

                    <Grid item xs={12} container direction="column">
                        <Grid item>
                            <Typography className ={classes.text}>Email address</Typography>
                        </Grid>
                        <Grid item >
                            <TextField InputProps={{readOnly : true}}  fullWidth variant="outlined" value="hehe" />
                        </Grid>
                    </Grid>

                    <Grid item xs={12} container direction="column">
                        <Grid item>
                            <Typography className ={classes.text}>Postcode</Typography>
                        </Grid>
                        <Grid item >
                            <TextField InputProps={{readOnly : true}}  fullWidth variant="outlined" value="hehe" />
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Typography variant="h6" className ={classes.text} >Additional information</Typography>
                    </Grid>

                    <Grid item xs={12} container direction="column">
                        <Grid item>
                            <Typography className ={classes.text}>Order notes (optional)</Typography>
                        </Grid>
                        <Grid item >
                            <TextField fullWidth multiline minRows={5} variant="outlined" value="hehe" />
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}
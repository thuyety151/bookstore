import React from "react"
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Button, ButtonGroup, FormControl, MenuItem, Select } from "@material-ui/core";
import { FavoriteBorderOutlined } from "@material-ui/icons";
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import Rating from '@mui/material/Rating';
import {getReviews } from "../../redux/actions/review/reviewAction";

import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: "auto",
            textAlign: "left",
        },
        img: {
            margin: "auto",
            display: "block",
            maxWidth: "100%",
            maxHeight: "100%",
        },
        attribute: {
            color: "red",
            "&:hover": {
                color: "red",
                cursor: "pointer",
                fontWeight: 700
            }
        },
        favorite: {
            "&:hover": {
                color: "red",
                cursor: "pointer",
            },
        },
        button: {
            textTransform: "none",
            margin: "5px 20px 5px 70px"
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 400,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        buttonAddToCart:{
            textTransform: "none",
            minWidth: 300,
            alignItems: "center"
        },
        text:{
            fontWeight: 600
        }
    })
);


export default function Detail() {
    const classes = useStyles();
    const dispatch = useDispatch();
    //const displayCounter = this.state.counter > 0;
    const displayCounter = true;
    const [rateValue, setRateValue] = React.useState<number | null>(5);

    const [age, setAge] = React.useState('10');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };
    const bookId = "C0264CC0-9AFB-4CB4-9B80-08D993D1F90A";
    dispatch(getReviews(bookId));
    
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={5} alignItems="stretch">
                        <ButtonBase>
                            <img className={classes.img} alt="complex" src="https://firebasestorage.googleapis.com/v0/b/internship-august-2021-b1566.appspot.com/o/luat-tam-thuc.jpeg?alt=media&token=40221ba7-c0a2-48b9-b2d1-348f16e024c7" />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={7} container spacing={2}>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item>
                                <Typography
                                    gutterBottom
                                    variant="h3"
                                >
                                    Where the Crawdads Sing
                                </Typography>
                            </Grid>
                            <Grid item container direction="row">
                                <Grid item>
                                    <Rating name="read-only" value={rateValue} readOnly />
                                </Grid>
                                <Grid item>
                                    <Typography gutterBottom variant="body2">
                                        (3,714) By (author) Anna Banks
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item>
                                <Typography gutterBottom variant="h5" className={classes.text} >
                                    $29.95 - $59.95
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="body2">
                                    Book Format: Choose an option
                                </Typography>
                            </Grid>
                            <Grid item>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        value={age}
                                        onChange={handleChange}
                                        displayEmpty
                                        className={classes.selectEmpty}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value={10}>Hardcover $9.59</MenuItem>
                                        <MenuItem value={20}>Paperback $9.59</MenuItem>
                                        <MenuItem value={30}>Kindle $9.59</MenuItem>
                                    </Select>
                                </FormControl>

                            </Grid>

                            <Grid item>
                                <Typography gutterBottom variant="body2">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat.
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                container
                                direction="row"
                                spacing={3}
                            >
                                <Grid item>
                                    <ButtonGroup size="large" aria-label="small outlined button group">
                                        <Button>-</Button>
                                        {displayCounter && <Button disabled>1</Button>}
                                        {displayCounter && <Button>+</Button>}
                                    </ButtonGroup>

                                </Grid>
                                <Grid item>
                                    <Button className={classes.buttonAddToCart} size="large" variant="contained" color="secondary">
                                        Add to cart
                                    </Button>
                                </Grid>


                            </Grid>
                            <Grid
                                item
                                container
                                direction="row"
                                spacing={2}
                            >
                                <Grid item xs={3} container direction="row" className={classes.favorite}>
                                    <Grid item>
                                        <FavoriteBorderOutlined />
                                    </Grid>
                                    <Grid item>
                                        <Typography gutterBottom variant="body1"  >
                                            Add to Wishlist
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} container direction="row" className={classes.favorite}>
                                    <Grid item>
                                        <ShareOutlinedIcon />
                                    </Grid>
                                    <Grid item>
                                        <Typography gutterBottom variant="body1"  >
                                            Share
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}


import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Review } from '../../model/review';
import { Divider, Typography } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import Rating from '@mui/material/Rating';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        title: {
            fontWeight: 600
        }
    }),
);
interface Props {
    review: Review
}
export default function ReviewItem({ review }: Props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container direction="column" spacing={2}>
                <Grid item container direction="row" spacing={1}>
                    <Grid item>
                        <Typography variant="body1" className={classes.title} >{review.title}</Typography>

                    </Grid>
                    <Grid item alignItems="center">
                        <Rating name="read-only" value={review.rate} readOnly size="small" />
                    </Grid>
                </Grid>

                <Grid item>
                    {review.content}
                </Grid>

                <Grid item>
                    <Typography variant="body2" color="textSecondary">
                        {review.createDate?.split('T')[0]}
                    </Typography>

                </Grid>
                <Grid
                    item
                    container
                    direction="row"
                    spacing={2}
                >
                    <Grid item xs={1} container direction="row" spacing={1}>
                        <Grid item>
                            <ThumbUpOutlinedIcon />
                        </Grid>
                        <Grid item>
                            90
                        </Grid>
                    </Grid>
                    <Grid item xs={1} container direction="row" spacing={1}>
                        <Grid item>
                            <ThumbDownOutlinedIcon></ThumbDownOutlinedIcon>
                        </Grid>
                        <Grid item>
                            1
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider />
        </div>
    );
}

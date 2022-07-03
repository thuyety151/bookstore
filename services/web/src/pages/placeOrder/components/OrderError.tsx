import React, {  } from "react";
import {
  Grid,
  Typography,
  Paper,
  makeStyles,
  createStyles,
  Theme,
  Button,
  Avatar,
} from "@material-ui/core";
import { red } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import { generatePath, useHistory } from "react-router-dom";
import { Predicate, ROUTE_BOOKS_FOR_SALE } from "../../../routers/types";


const OrderError: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();

    const handleContinueClick = () => {
        history.push(
          generatePath(ROUTE_BOOKS_FOR_SALE, {
            predicate: Predicate.Popular,
          })
        );
      }
    return (
        <><Typography variant="h4" className={classes.title}>
            Order Error!
        </Typography><Grid container justifyContent="center">
                <Grid item xs={6} className={classes.gridContainer}>
                    <Avatar className={classes.red}>
                        <CloseIcon className={classes.large} />
                    </Avatar>
                    <Paper color="secondary" className={classes.paperOutside}>
                        <Paper variant="outlined" className={classes.paperInside}>
                            <Typography
                                variant="inherit"
                                className="text-bold"
                                style={{
                                    textAlign: "center",
                                    fontSize: "18px",
                                    paddingTop: "32px",
                                }}
                            >
                                Unfortunately, we have an issue with your order, try again
                                later.
                            </Typography>
                            <Button variant="contained" className={classes.errorButton} onClick={handleContinueClick}>Continue shopping</Button>
                        </Paper>
                    </Paper>
                </Grid>
            </Grid></>
    );
  };
  
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    
      paperOutside: {
        backgroundColor: red[500],
        height: 130,
        paddingTop: 20,
      },
      paperInside: {
        borderRadius: 0,
        position: 'relative',
        height: 120
  
      },
      red: {
        color: '#fff',
        backgroundColor: red[500],
        width: theme.spacing(7),
        height: theme.spacing(7),
        position: 'absolute',
        zIndex: 1,
        top: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        borderStyle: 'outset',
        borderColor: red[700]
      },
      large: {
        width: theme.spacing(5),
        height: theme.spacing(5),
      },
      errorButton: {
        backgroundColor: red[700],
        color: '#fff',
        fontWeight: 700,
        borderRadius: 50,
        textTransform: 'none',
        margin: 20,
        fontSize: 14,
        position: 'absolute',
        right: 0
  
      },
      gridContainer: {
        padding: theme.spacing(4),
        position: 'relative'
  
      },
      title: {
        textAlign: "center",
        padding: theme.spacing(2, 0),
        color: red[700]
      },
    })
  );
  export default OrderError;
  
import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import BillDetailComponent from '../../components/checkout/BillDetail';
import BillInfoComponent from '../../components/checkout/BillInfo';

const useStyles = makeStyles((theme : Theme) => 
    createStyles({
        root: {
            backgroundColor: "#fff6f6"
        },
        text :{
            fontWeight: "bold"
        }
    })
)
function CheckoutPage() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h4" align="center" className={classes.text}>Checkout</Typography>

            <Grid container>
                <Grid item xs={7}>
                    <BillDetailComponent />
                </Grid>
                <Grid item xs={5}>
                    <BillInfoComponent />
                </Grid>
            </Grid>
        </div>
    )
}

export default CheckoutPage;
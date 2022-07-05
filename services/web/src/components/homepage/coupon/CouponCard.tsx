import {
  Button,
  Card,
  CardActionArea,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { Coupon } from "../../../model/coupon";
import { setSelectedCoupon } from "../../../redux/actions/coupon/applyCouponAction";
import { saveCoupon } from "../../../redux/actions/coupon/saveCouponAction";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    textAlign: "left",
    padding: 10,
    margin: 5,
    height: 180
  },
  media: {
    height: 105,
    width: 220,
  },
  
  title: {
    fontWeight: 600,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  icon: {
    marginTop: 35,
  },
  button: {
    position: 'absolute',
    textTransform: 'none',
    width: 75,
    height: 25,
    marginTop: 20,
    left: 220,
  },
  gridTextContainer: {
    position: 'relative'
  }
});


export default function CouponCard(props: { coupon: Coupon , isUserCoupon: boolean, isSelection: boolean}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveCoupon = () => {
    dispatch(
      saveCoupon({
        couponId: props.coupon.id,
        onSuccess: () => {
          enqueueSnackbar("Save coupon successfully", {variant: "success"});
        },
        onFailure: (error: any)=> {
          enqueueSnackbar(error, {variant: "error"});
        }
      })

    )
  }

  const handleApplyCoupon = () => {
    console.log("apply")
    dispatch(
      setSelectedCoupon({
        couponId: props.coupon.id,
        onSuccess: () => {
          enqueueSnackbar("Apply coupon successfully", {variant: "success"})
        },
        onFailure: (error: any) => {
          enqueueSnackbar(error, {variant: "error"});
        }
      })
    )
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Grid container direction="row">
          <Grid item>
            <img
              className={classes.media}
              src={props.coupon.imageUrl}
              alt={props.coupon.description}
            />
          </Grid>
          <Grid item container direction="column" className={classes.gridTextContainer}>
            <Grid item xs={10}>
              <Typography className={classes.title} variant="subtitle2">
                {props.coupon.description}
              </Typography>
              <Typography variant="caption" color="textSecondary" component="p">
                Min spend: {props.coupon.minSpend}$
              </Typography>
              <Typography variant="caption" color="textSecondary" component="p">
                Expire date: {props.coupon.expireDate.split('T')[0]}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {props.isUserCoupon ? 
              <Button variant="contained" color="secondary" size="small" className={classes.button} disabled = {props.isSelection} onClick={handleApplyCoupon}>Apply</Button>
              : 
              <FileCopyOutlinedIcon className={classes.icon} fontSize="small" onClick={handleSaveCoupon}/>

              }
             
            </Grid>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}

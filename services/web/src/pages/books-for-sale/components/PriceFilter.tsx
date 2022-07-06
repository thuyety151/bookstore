import {
  Grid,
  makeStyles,
  Slider,
  Theme,
} from "@material-ui/core";
import { filterParams } from "../../../redux/actions/books/getAction";

interface Props {
  handleChange: (event: any, newValue: number | number[])  => void;
  bookFilterParams: filterParams;
}
export default function PriceFilter({
  handleChange,
  bookFilterParams,
}: Props) {
  const classes = useStyles();
  return (
    <>
      <Grid item container direction="column" className={classes.collapse}>
        <Slider
          value={[bookFilterParams.minPrice, bookFilterParams.maxPrice]}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          className={classes.slider}
          max={500}
        />
        <p className={classes.price}>
          Price: ${bookFilterParams.minPrice} - ${bookFilterParams.maxPrice}
        </p>
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
    collapse: {
        marginTop: "15px",
      },
    slider: {
        color: "black",
      },
      price: {
        textAlign: "center",
      },
}));

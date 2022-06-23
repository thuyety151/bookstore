import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { filterParams } from "../../../redux/actions/books/getAction";

interface Props {
  data: number[];
  handleChange: (position: number) => void;
  bookFilterParams: filterParams;
  checkedState: boolean[];
}
export default function ReviewFilter({
  data,
  handleChange,
  bookFilterParams,
  checkedState,
}: Props) {
  const classes = useStyles();

  return (
    <>
      <Grid item container direction="column" className={classes.collapse}>
        <FormControl component="fieldset">
          <FormGroup>
            {data.map((value: number, index: number) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedState[index]}
                    onChange={() => handleChange(index)}
                    name={value.toString()}
                    id={value.toString()}
                  />
                }
                label={<Rating name="read-only" value={value} readOnly />}
              />
            ))}
          </FormGroup>
        </FormControl>
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

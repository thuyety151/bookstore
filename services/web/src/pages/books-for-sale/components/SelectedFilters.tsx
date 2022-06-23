import {
    Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { filterParams } from "../../../redux/actions/books/getAction";

interface Props {
  data: any [];
  handleChange: (position: number) => void;
  bookFilterParams: filterParams;
  checkedState: boolean[]
}
export default function SelectedFilters({
  data,
  handleChange,
  bookFilterParams,
  checkedState
}: Props) {
  const classes = useStyles();
  
  return (
    <>
          <Grid item container direction="column" className={classes.collapse}>
            <span>
              <FormControl component="fieldset">
                <FormGroup>
                  {data?.map((item: any, index: number) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedState[index]}
                          onChange={() => handleChange(index)}
                          name={item.name}
                          id ={item.id}
                        />
                      }
                      label={item.name}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </span>
          </Grid>
       
    </>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 400,
  },
  collapse: {
    marginTop: "15px",
  },
}));

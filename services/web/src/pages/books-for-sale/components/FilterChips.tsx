import { Chip, makeStyles, Paper } from "@material-ui/core";
import { chipParam } from "../BooksForSale";

interface Props {
    filterData : chipParam[];
    handleDelete: (position : number ) => void;
}
export default function FilterChips(props : Props) {
  const classes = useStyles();


  return (
    <Paper component="ul" className={classes.root} elevation={0}>
    {props.filterData.map((data) => {
      return (
        <li key={data.key}>
          <Chip
            label={data.label}
            onDelete={() => props.handleDelete(data.key)}
            className={classes.chip}
          />
        </li>
      );
    })}
  </Paper>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "start",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
    backgroundColor: '#fff6f6'
  },
}));

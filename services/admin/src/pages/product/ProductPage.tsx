import {
  Grid,
  Typography,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import ProductTable from "./ProductTable";

const ProductPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.actionsContainer}>
        <Typography variant="h5" className={classes.title}>
          Books
        </Typography>
        <Grid item>
          {/* Table */}

          {/* End Table */}
        </Grid>
        <ProductTable />
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "0 16px",
    },
    actionsContainer: {},
    title: {
      padding: theme.spacing(2, 0),
    },
  })
);

export default ProductPage;

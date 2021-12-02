import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import AddForm from "./components/AddForm";
import AttributeTable from "./components/AttributeTable";

const AttributePage: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid container justifyContent="space-between">
        <Grid item xs={5}>
          <AddForm />
        </Grid>
        <Grid item xs={6} className={classes.table}>
          <AttributeTable />
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      marginLeft: theme.spacing(5),
    },
  })
);

export default AttributePage;

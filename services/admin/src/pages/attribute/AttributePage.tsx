import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "redux/store";
import AddForm from "./components/AddForm";
import AttributeTable from "./components/AttributeTable";
import EditForm from "./components/EditForm";

const AttributePage: React.FC = () => {
  const classes = useStyles();
  const [modelEdit, setModelEdit] = useState(null);
  const { success } = useSelector((state: RootStore) => state.attributes);

  return (
    <div>
      <Grid container justifyContent="space-evenly">
        <Grid item xs={6} className={classes.table}>
          <AttributeTable setModelEdit={setModelEdit} />
        </Grid>
        <Grid item xs={5} key={Number(success)}>
          <AddForm />
        </Grid>
        <Grid item xs={12}>
          <EditForm model={modelEdit} setModel={setModelEdit} />
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

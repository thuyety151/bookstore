import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import HeaderPage from "components/headerPage/HeaderPage";
import FilterContainer from "components/table/FilterContainer";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "redux/store";
import AddForm from "./components/AddForm";
import AttributeTable from "./components/AttributeTable";
import EditForm from "./components/EditForm";

const AttributePage: React.FC = () => {
  const classes = useStyles();
  const [modelEdit, setModelEdit] = useState(null);
  const [keywords, setKeywords] = useState("");
  const { success } = useSelector((state: RootStore) => state.attributes);

  const onSearch = (e: string) => setKeywords(e);

  return (
    <div style={{ margin: "0 5rem" }}>
      <HeaderPage title="Attributes" />
      <FilterContainer onSearch={onSearch} />
      <Grid container justifyContent="space-between" className="pt-md">
        <Grid item xs={6} className={classes.table}>
          <AttributeTable setModelEdit={setModelEdit} keywords={keywords} />
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
      // marginLeft: theme.spacing(5),
    },
    title: {
      padding: theme.spacing(2, 0),
      paddingLeft: theme.spacing(5),
    },
  })
);

export default AttributePage;

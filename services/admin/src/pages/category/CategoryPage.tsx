import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import HeaderPage from "components/headerPage/HeaderPage";
import ActionMenu from "components/table/ActionMenu";
import FilterContainer from "components/table/FilterContainer";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "redux/store";
import AddForm from "./components/AddForm";
import CategoryTable from "./components/CategoryTable";
import EditForm from "./components/EditForm";
import "./styles.scss";

const CategoryPage: React.FC = () => {
  const classes = useStyles();
  const [modelEdit, setModelEdit] = useState(null);
  const { success } = useSelector((state: RootStore) => state.categories);

  return (
    <div className="category-page ">
      <HeaderPage title="Categories" />
      <FilterContainer />
      <Grid container justifyContent="space-between" className="pt-lg">
        <Grid item xs={8} className={classes.table}>
          <CategoryTable setModelEdit={setModelEdit} />
        </Grid>
        <Grid item xs={4} key={Number(success)}>
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

export default CategoryPage;

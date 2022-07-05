import { Grid } from "@material-ui/core";
import HeaderPage from "components/headerPage/HeaderPage";
import FilterContainer from "components/table/FilterContainer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "redux/store";
import AddForm from "./components/AddForm";
import AuthorTable from "./components/AuthorTable";
import EditForm from "./components/EditForm";
import "./styles.scss";

const AuthorPage: React.FC = () => {
  const [modelEdit, setModelEdit] = useState(null);
  const { success } = useSelector((state: RootStore) => state.authors);
  return (
    <div className="authors" style={{ margin: "0 5rem" }}>
      <HeaderPage title="Authors" />
      <FilterContainer />
      <Grid container justifyContent="space-between" className="pt-md">
        <Grid item xs={6}>
          <AuthorTable setModelEdit={setModelEdit} />
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

export default AuthorPage;

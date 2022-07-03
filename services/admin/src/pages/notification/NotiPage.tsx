import { Grid } from "@material-ui/core";
import HeaderPage from "components/headerPage/HeaderPage";
import FilterContainer from "components/table/FilterContainer";
import { useSelector } from "react-redux";
import { RootStore } from "redux/store";
import NotiCreate from "./components/NotiCreate";
import NotiTable from "./NotiTable";
import "./styles.scss";

const NotiPage: React.FC = () => {
  const { requestingSend } = useSelector((state: RootStore) => state.notis);

  return (
    <div className="noti-page">
      <HeaderPage title="Notification" />
      <FilterContainer />
      <Grid
        container
        justifyContent="space-between"
        className="pt-md"
        spacing={2}
      >
        <Grid item xs={7}>
          <NotiTable />
        </Grid>
        <Grid item xs={5} key={Number(requestingSend)}>
          <NotiCreate />
        </Grid>
      </Grid>
    </div>
  );
};

export default NotiPage;

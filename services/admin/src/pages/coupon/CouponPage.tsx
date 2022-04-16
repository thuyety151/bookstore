import { Grid } from "@material-ui/core";
import HeaderPage from "components/headerPage/HeaderPage";
import FilterContainer from "components/table/FilterContainer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootStore } from "redux/store";
import AddForm from "./components/AddForm";
import CouponTable from "./components/CouponTable";
import EditForm from "./components/EditForm";

const CouponsPage: React.FC = () => {
  const [modelEdit, setModelEdit] = useState(null);
  const { success } = useSelector((state: RootStore) => state.coupons);
  return (
    <div style={{ margin: "0 5rem" }}>
      <HeaderPage title="Coupon" />
      <FilterContainer />
      <Grid container justifyContent="space-between" className="pt-md">
        <Grid item xs={7}>
          <CouponTable setModelEdit={setModelEdit} />
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

export default CouponsPage;
